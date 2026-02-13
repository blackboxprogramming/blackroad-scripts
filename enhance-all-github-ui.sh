#!/usr/bin/env bash
# Enhanced UI for All GitHub Repositories
# Clones, enhances, and pushes UI improvements to all BlackRoad-OS repos

set -e

GITHUB_ORG="BlackRoad-OS"
WORK_DIR="/tmp/blackroad-ui-enhancement"
SHARED_COMPONENTS="/Users/alexa/shared"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🎨 BlackRoad GitHub UI Enhancement"
echo "===================================="
echo ""

# Create work directory
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

# Get list of repositories
echo -e "${BLUE}📋 Fetching repositories from $GITHUB_ORG...${NC}"
REPOS=$(gh repo list "$GITHUB_ORG" --limit 100 --json name --jq '.[].name')

if [ -z "$REPOS" ]; then
  echo -e "${RED}❌ No repositories found${NC}"
  exit 1
fi

REPO_COUNT=$(echo "$REPOS" | wc -l | tr -d ' ')
echo -e "${GREEN}✓ Found $REPO_COUNT repositories${NC}"
echo ""

# Counter for enhanced repos
ENHANCED_COUNT=0
SKIPPED_COUNT=0

# Enhance each repository
for repo in $REPOS; do
  echo -e "${BLUE}🔧 Processing $repo...${NC}"
  
  # Clone repository if not exists
  if [ ! -d "$repo" ]; then
    if ! gh repo clone "$GITHUB_ORG/$repo" 2>/dev/null; then
      echo -e "${YELLOW}  ⚠️  Could not clone $repo (may be archived/inaccessible)${NC}"
      ((SKIPPED_COUNT++))
      continue
    fi
  fi
  
  cd "$repo"
  
  # Check if it's a Next.js project
  if [ ! -f "package.json" ] || ! grep -q "next" package.json 2>/dev/null; then
    echo -e "${YELLOW}  ⊘  Not a Next.js project, skipping${NC}"
    cd "$WORK_DIR"
    ((SKIPPED_COUNT++))
    continue
  fi
  
  # Check if app directory exists
  if [ ! -d "app" ]; then
    echo -e "${YELLOW}  ⊘  No app directory found, skipping${NC}"
    cd "$WORK_DIR"
    ((SKIPPED_COUNT++))
    continue
  fi
  
  # Create components directory
  mkdir -p components
  
  # Copy shared UI components
  if [ -d "$SHARED_COMPONENTS/components" ]; then
    cp -r "$SHARED_COMPONENTS/components/"* components/ 2>/dev/null || true
    cp -r "$SHARED_COMPONENTS/styles/"* components/ 2>/dev/null || true
    echo "  ✓ Copied shared components"
  fi
  
  # Add/Update globals.css
  mkdir -p app
  cat > app/globals.css << 'EOF'
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

html {
  scroll-behavior: smooth;
}

*:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.1) 40px,
    rgba(255, 255, 255, 0.05) 80px
  );
  background-size: 200px 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }
}

@media (min-width: 769px) {
  .hide-desktop {
    display: none !important;
  }
}
EOF
  echo "  ✓ Created/updated globals.css"
  
  # Create README for UI components if it doesn't exist
  if [ ! -f "components/README.md" ]; then
    cat > components/README.md << 'EOF'
# BlackRoad UI Components

Shared UI components for consistent design across BlackRoad services.

## Components

### Button
```tsx
import { Button } from './components/Button'

<Button variant="primary" size="md">Click Me</Button>
```

Variants: `primary`, `secondary`, `tertiary`, `ghost`, `danger`
Sizes: `sm`, `md`, `lg`

### Card
```tsx
import { Card } from './components/Card'

<Card variant="elevated" hoverable>
  Content here
</Card>
```

Variants: `default`, `elevated`, `outlined`, `glass`

## Design Tokens

Import from `components/design-tokens`:
```tsx
import { colors, gradients, spacing } from './components/design-tokens'
```
EOF
    echo "  ✓ Created components README"
  fi
  
  # Git operations
  if git status --porcelain | grep -q .; then
    git add -A
    git commit -m "✨ Enhanced UI with shared components, animations, and improved design system

- Added reusable Button and Card components
- Implemented design token system
- Added CSS animations and transitions
- Improved accessibility with focus states
- Enhanced responsive design"
    
    # Push changes
    if git push origin main 2>/dev/null || git push origin master 2>/dev/null; then
      echo -e "${GREEN}  ✓ Pushed changes to GitHub${NC}"
      ((ENHANCED_COUNT++))
    else
      echo -e "${YELLOW}  ⚠️  Could not push changes (may need auth or different branch)${NC}"
      ((SKIPPED_COUNT++))
    fi
  else
    echo -e "${YELLOW}  ⊘  No changes to commit${NC}"
    ((SKIPPED_COUNT++))
  fi
  
  cd "$WORK_DIR"
  echo ""
done

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ UI Enhancement Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Summary:"
echo "  📦 Total repositories: $REPO_COUNT"
echo -e "  ${GREEN}✓ Enhanced: $ENHANCED_COUNT${NC}"
echo -e "  ${YELLOW}⊘ Skipped: $SKIPPED_COUNT${NC}"
echo ""
echo "Enhanced repositories now have:"
echo "  • Shared design tokens"
echo "  • Reusable Button & Card components"
echo "  • CSS animations (fade, slide, pulse, shimmer)"
echo "  • Improved accessibility"
echo "  • Better responsive design"
echo ""
echo "Cleanup work directory? (y/n)"
read -r CLEANUP
if [ "$CLEANUP" = "y" ]; then
  cd /
  rm -rf "$WORK_DIR"
  echo -e "${GREEN}✓ Cleaned up $WORK_DIR${NC}"
fi
