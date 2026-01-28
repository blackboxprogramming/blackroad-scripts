'use client'

import { STRIPE_PRODUCTS } from '@/lib/stripe-config'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400">
            Scale your AI agents from prototype to production
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Developer Plan */}
          <PricingCard
            plan={STRIPE_PRODUCTS.developer}
            highlight={false}
          />

          {/* Professional Plan */}
          <PricingCard
            plan={STRIPE_PRODUCTS.professional}
            highlight={true}
          />

          {/* Enterprise Plan */}
          <PricingCard
            plan={STRIPE_PRODUCTS.enterprise}
            highlight={false}
          />
        </div>

        {/* FAQ Teaser */}
        <div className="mt-20 text-center">
          <p className="text-gray-400">
            Questions? <a href="/contact" className="text-blue-400 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ plan, highlight }: { plan: any; highlight: boolean }) {
  return (
    <div
      className={`
        relative rounded-2xl p-8 border-2
        ${highlight 
          ? 'border-blue-500 bg-gradient-to-b from-blue-900/20 to-transparent' 
          : 'border-gray-700 bg-gray-800/50'
        }
        hover:border-blue-400 transition-all duration-300
      `}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
          MOST POPULAR
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

      {/* Price */}
      <div className="mb-6">
        {plan.price === 0 ? (
          <div className="text-4xl font-bold">Free</div>
        ) : plan.price ? (
          <>
            <div className="text-5xl font-bold">${plan.price}</div>
            <div className="text-gray-400">per {plan.period}</div>
          </>
        ) : (
          <div className="text-4xl font-bold">Custom</div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {plan.contactSales ? (
        <a
          href="/contact"
          className="block w-full py-3 px-6 text-center bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
        >
          Contact Sales
        </a>
      ) : plan.price === 0 ? (
        <a
          href="/signup"
          className="block w-full py-3 px-6 text-center bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
        >
          Get Started Free
        </a>
      ) : (
        <form action="/api/checkout" method="POST">
          <input type="hidden" name="priceId" value={plan.priceId} />
          <button
            type="submit"
            className={`
              w-full py-3 px-6 rounded-lg font-semibold transition-colors
              ${highlight
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
              }
            `}
          >
            Subscribe Now
          </button>
        </form>
      )}
    </div>
  )
}
