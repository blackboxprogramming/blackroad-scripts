#!/usr/bin/env bash
# BlackRoad OS - Automated DNS Configuration Script
# Configures Cloudflare DNS to point to Railway deployments

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CLOUDFLARE_ZONE_ID="d6566eba4500b460ffec6650d3b4baf6"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"

# Service mappings
declare -A SERVICES=(
    ["www"]="blackroad-os-web"
    ["app"]="blackroad-os-prism-console"
    ["agents"]="blackroad-os-agents"
    ["ops"]="blackroad-os-operator"
)

# Functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

check_requirements() {
    log_info "Checking requirements..."

    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed"
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        log_error "jq is required but not installed"
        log_info "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
        exit 1
    fi

    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        log_error "CLOUDFLARE_API_TOKEN environment variable not set"
        log_info "Get your API token from: https://dash.cloudflare.com/profile/api-tokens"
        exit 1
    fi

    log_success "All requirements met"
}

get_railway_url() {
    local service_name=$1
    local railway_url=""

    log_info "Getting Railway URL for $service_name..."

    # Try to get URL from Railway CLI
    if command -v railway &> /dev/null; then
        # This would need to be run in each repo directory
        # For now, we'll construct the expected URL
        railway_url="${service_name}-production.up.railway.app"
    else
        # Construct expected Railway URL
        railway_url="${service_name}-production.up.railway.app"
        log_warning "Railway CLI not found, using expected URL format: $railway_url"
    fi

    echo "$railway_url"
}

get_dns_record_id() {
    local subdomain=$1

    local response=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records?type=CNAME&name=$subdomain.blackroad.io" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")

    local record_id=$(echo "$response" | jq -r '.result[0].id // empty')
    echo "$record_id"
}

create_dns_record() {
    local subdomain=$1
    local target=$2

    log_info "Creating CNAME record: $subdomain.blackroad.io → $target"

    local response=$(curl -s -X POST \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{
            \"type\": \"CNAME\",
            \"name\": \"$subdomain\",
            \"content\": \"$target\",
            \"ttl\": 1,
            \"proxied\": true
        }")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        log_success "Created CNAME record for $subdomain.blackroad.io"
        return 0
    else
        local error=$(echo "$response" | jq -r '.errors[0].message')
        log_error "Failed to create CNAME record: $error"
        return 1
    fi
}

update_dns_record() {
    local subdomain=$1
    local target=$2
    local record_id=$3

    log_info "Updating CNAME record: $subdomain.blackroad.io → $target"

    local response=$(curl -s -X PUT \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$record_id" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{
            \"type\": \"CNAME\",
            \"name\": \"$subdomain\",
            \"content\": \"$target\",
            \"ttl\": 1,
            \"proxied\": true
        }")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        log_success "Updated CNAME record for $subdomain.blackroad.io"
        return 0
    else
        local error=$(echo "$response" | jq -r '.errors[0].message')
        log_error "Failed to update CNAME record: $error"
        return 1
    fi
}

configure_service() {
    local subdomain=$1
    local service_name=$2

    echo ""
    log_info "Configuring DNS for $subdomain.blackroad.io..."

    # Get Railway URL
    local railway_url=$(get_railway_url "$service_name")

    # Check if DNS record already exists
    local record_id=$(get_dns_record_id "$subdomain")

    if [ -n "$record_id" ]; then
        log_warning "DNS record already exists (ID: $record_id)"
        update_dns_record "$subdomain" "$railway_url" "$record_id"
    else
        create_dns_record "$subdomain" "$railway_url"
    fi
}

verify_dns() {
    local subdomain=$1

    log_info "Verifying DNS for $subdomain.blackroad.io..."

    local result=$(dig +short "$subdomain.blackroad.io" CNAME 2>/dev/null || echo "")

    if [ -n "$result" ]; then
        log_success "DNS record active: $result"
        return 0
    else
        log_warning "DNS not yet propagated (may take 1-5 minutes)"
        return 1
    fi
}

test_endpoint() {
    local subdomain=$1

    log_info "Testing https://$subdomain.blackroad.io/health..."

    local http_code=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 10 \
        "https://$subdomain.blackroad.io/health" || echo "000")

    if [ "$http_code" = "200" ]; then
        log_success "Service is healthy (HTTP $http_code)"
        return 0
    elif [ "$http_code" = "000" ]; then
        log_warning "Service not responding (may still be deploying)"
        return 1
    else
        log_warning "Service returned HTTP $http_code"
        return 1
    fi
}

# Main execution
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║       BlackRoad OS - Automated DNS Configuration          ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    check_requirements

    echo ""
    log_info "Starting DNS configuration for ${#SERVICES[@]} services..."

    # Configure DNS for each service
    for subdomain in "${!SERVICES[@]}"; do
        configure_service "$subdomain" "${SERVICES[$subdomain]}"
    done

    echo ""
    log_info "Waiting 10 seconds for DNS propagation..."
    sleep 10

    echo ""
    log_info "Verifying DNS records..."
    for subdomain in "${!SERVICES[@]}"; do
        verify_dns "$subdomain"
    done

    echo ""
    log_info "Testing service endpoints..."
    for subdomain in "${!SERVICES[@]}"; do
        test_endpoint "$subdomain"
    done

    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                   Configuration Complete                  ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    log_success "DNS configuration completed successfully!"
    echo ""
    log_info "Next steps:"
    echo "  1. Wait 1-5 minutes for full DNS propagation"
    echo "  2. Check status at: https://www.blackroad.io/status.html"
    echo "  3. Verify all services are healthy"
    echo ""
}

# Run main function
main "$@"
