# /landing-page

Build or audit the marketing landing page for $ARGUMENTS (or the home page if no argument).

## If building from scratch

Import and compose from components/marketing/:
- Hero — with A/B variant on headline
- LogoBar or WaitlistCounter — social proof immediately below hero
- FeatureGrid — 3 or 6 features with lucide icons
- Testimonials — 3 cards
- FAQ — 5-7 questions with FAQSchema enabled
- Final CTA section — repeat waitlist form with urgency copy

Wire analytics:
- Add useScrollDepthTracking() to track scroll depth
- trackEvent is already in each component

Wire A/B:
- Read 'hero-headline' variant from cookies
- Implement two headline variants

Add structured data to page.tsx:
- SoftwareAppSchema if SaaS product
- FAQSchema is handled by FAQ component automatically

## If auditing existing page

Check:
- [ ] All sections present: Hero, social proof, features, testimonials, FAQ, CTA
- [ ] Structured data present and valid (test at search.google.com/test/rich-results)
- [ ] OG image is real design — not placeholder stub
- [ ] sitemap.ts includes this route
- [ ] robots.ts allows crawling of this route
- [ ] Analytics events firing (scroll depth, CTA click, waitlist submit)
- [ ] A/B variants assigned in cookies
- [ ] Cookie consent present and wired to analytics
- [ ] Privacy policy linked from cookie banner
- [ ] Lighthouse 90+ on Performance, SEO, Accessibility, Best Practices
- [ ] Mobile layout works — no overflow, touch targets 44px minimum
- [ ] Dark mode renders correctly
- [ ] OG image tested at opengraph.xyz

Output: pass/fail per item. Fix all failures automatically.
