import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import {
  Check,
  X,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Gift,
  Store,
  ArrowRight,
  Star,
  Layers,
  Award,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Why VITRAG vs Generic Crockery Brands | The Tableware Comparison",
  description:
    "An honest, side-by-side comparison between VITRAG handcrafted heirloom tableware and generic mass-market crockery retailers. Discover craftsmanship, food safety, packaging, and showroom guarantees.",
  openGraph: {
    title: "Why VITRAG vs Generic Crockery Brands | Comparison Guide",
    description:
      "Comparing VITRAG handcrafted stoneware, 24K gold accents, and bespoke gifting against mass-market crockery retailers.",
  },
};

export default function ComparePage() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello VITRAG, I am reviewing your tableware comparison guide and would like to enquire about your dinner sets and personalized curation."
  )}`;

  return (
    <main className="bg-[#FFF5E6] min-h-screen text-[#252522]">
      {/* 0. Breadcrumb Nav */}
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Compare Alternatives" }]} />
      </Container>

      {/* 1. CLEAR POSITIONING STATEMENT & HONEST TRADE-OFFS */}
      <section className="py-12 sm:py-16 bg-[#FAF3E7] border-b border-[#EADBC8]">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#6E2023]/10 text-[#6E2023] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full border border-[#6E2023]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#6E2023]" />
              <span>Honest Buyer&apos;s Comparison</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-[#6E2023] leading-tight font-medium">
              Why Discerning Hosts Choose VITRAG Over Mass Retail
            </h1>

            <p className="text-base sm:text-lg text-[#54483E] font-light leading-relaxed">
              We believe in total transparency. We don&apos;t claim to be the right choice for every buyer, nor do we attempt to be. Here is plainly how VITRAG differs from generic commercial crockery sellers and big-box marketplace vendors.
            </p>

            {/* Honest Trade-Offs Callout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 text-left">
              <div className="bg-white/80 border border-[#EADBC8] p-5 sm:p-6 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#54483E] font-semibold block mb-1">
                  When a Generic Brand is Better
                </span>
                <h3 className="font-heading text-lg text-[#252522] mb-2 font-medium">
                  Outdoor Catering &amp; Disposable Budgets
                </h3>
                <p className="text-xs text-[#54483E] font-light leading-relaxed">
                  If you need cheap, mass-produced melamine plates, disposable party bowls for a one-time industrial picnic, or cafeteria grade machine-stamped dishware at sub-₹200 price points, generic departmental retailers and marketplaces are a more economical choice.
                </p>
              </div>

              <div className="bg-[#6E2023] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-[#55181A]">
                <span className="text-[10px] uppercase tracking-widest text-[#CBAE9B] font-semibold block mb-1">
                  When VITRAG is the Right Choice
                </span>
                <h3 className="font-heading text-lg text-white mb-2 font-medium">
                  Family Rituals, Celebrations &amp; Heirloom Gifting
                </h3>
                <p className="text-xs text-[#FFF5E6]/90 font-light leading-relaxed">
                  If you value lead-free ceramic stoneware with authentic 24K gold rims, bespoke rigid presentation gift boxes, direct concierge customization on WhatsApp, and guaranteed safe transit from our Sowcarpet showroom, VITRAG is purpose-crafted for you.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURE COMPARISON TABLE */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#EADBC8]">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold block mb-2">
              Decision-Relevant Factors
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-[#6E2023] font-medium">
              Side-by-Side Comparison
            </h2>
            <p className="text-xs sm:text-sm text-[#54483E] mt-2 font-light">
              We selected the core dimensions that genuinely impact quality of life, food hygiene, hosting aesthetics, and gifting impressions.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#EADBC8] rounded-2xl shadow-sm bg-white">
            <table className="w-full min-w-[580px] text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAF3E7] border-b border-[#EADBC8]">
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#54483E] w-2/5">
                    Evaluation Criterion
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#6E2023] bg-[#6E2023]/10 w-[30%]">
                    VITRAG Tableware
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#54483E] w-[30%]">
                    Generic Online / Mass Crockery
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBC8]">
                {/* Row 1 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Material &amp; Craftsmanship
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      Substantial clay density, tactile glazing, hand-sculpted details
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Studio ceramic stoneware &amp; lead-free crystal</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Thin bone ash composite or brittle low-fire ceramic</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      24K Real Gold Accents
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      Metallic luster rim application
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-temperature fired 24K real gold rims</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Synthetic gold paint decal that rubs off quickly</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Food Safety &amp; Toxicity
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      Glaze safety for hot curries, acidic gravies &amp; daily food
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Certified Lead-Free &amp; Cadmium-Free</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Often unverified imports with heavy-metal glazes</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Gift-Ready Presentation Box
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      First impression for wedding, Diwali, and executive gifts
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Signature burgundy &amp; gold rigid presentation caskets</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Plain industrial brown corrugated carton</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Zero Breakage Guarantee
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      What happens if an item breaks during courier delivery
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Immediate replacement via unboxing video proof</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Protracted return disputes &amp; &apos;transit damage&apos; denials</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Concierge Ordering &amp; Customization
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      Personalized piece counts, video previews, and wedding sets
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct 1-on-1 WhatsApp consultation with showroom</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Automated bot tickets with 72-hour reply delays</span>
                    </div>
                  </td>
                </tr>

                {/* Row 7 */}
                <tr className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#252522]">
                    <span className="block text-sm font-heading font-semibold text-[#6E2023]">
                      Physical Showroom Presence
                    </span>
                    <span className="text-xs text-[#54483E] font-light">
                      Ability to touch, feel, and inspect before ordering in bulk
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 bg-[#6E2023]/5 font-medium text-[#6E2023]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Patni Plaza, Sowcarpet, Chennai flagship showroom</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#54483E] font-light">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Virtual-only drop-shippers with no verifiable store</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 3. KEY DIFFERENTIATORS */}
      <section className="py-14 sm:py-20 bg-[#FAF3E7] border-b border-[#EADBC8]">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold block mb-2">
              Beyond the Table
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-[#6E2023] font-medium">
              Where VITRAG Genuinely Excels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white border border-[#EADBC8] p-6 sm:p-8 rounded-2xl shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#6E2023]/10 text-[#6E2023] flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] font-medium">
                1. Clay Purity &amp; Glaze Resilience
              </h3>
              <p className="text-xs sm:text-sm text-[#54483E] font-light leading-relaxed">
                Commercial tableware is made by dry-pressing synthetic powder at high speeds to maximize factory yield. VITRAG ceramics are high-fired stoneware using naturally refined minerals, resulting in chip-resistant density that withstands daily Indian dining, sambars, and biryanis without discoloration.
              </p>
            </div>

            <div className="bg-white border border-[#EADBC8] p-6 sm:p-8 rounded-2xl shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#6E2023]/10 text-[#6E2023] flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] font-medium">
                2. Presentation that Precedes the Product
              </h3>
              <p className="text-xs sm:text-sm text-[#54483E] font-light leading-relaxed">
                A gift begins the second your guest receives the box. Rather than shipping crockery wrapped in bubble wrap and taped styrofoam, our pieces arrive in velvet-cushioned burgundy rigid boxes embossed with gold cresting, ready to gift directly to newlyweds or corporate partners.
              </p>
            </div>

            <div className="bg-white border border-[#EADBC8] p-6 sm:p-8 rounded-2xl shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#6E2023]/10 text-[#6E2023] flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] font-medium">
                3. Sowcarpet Showroom Accountability
              </h3>
              <p className="text-xs sm:text-sm text-[#54483E] font-light leading-relaxed">
                Online commerce shouldn&apos;t feel anonymous. Our flagship showroom in Patni Plaza, Sowcarpet, Chennai has been a trusted hub of hospitality and crockery for decades. You can speak directly to our founder, see the tableware in person, or request live video walk-throughs before ordering.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. SOCIAL PROOF (Customer Switchers) */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#EADBC8]">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold block mb-2">
              Customer Stories
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-[#6E2023] font-medium">
              What Customers Say After Switching
            </h2>
            <p className="text-xs sm:text-sm text-[#54483E] mt-2 font-light">
              Real feedback from hosts and wedding planners who previously bought from generic online retail chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Quote 1 */}
            <div className="bg-[#FFF5E6] border border-[#EADBC8] p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#CBAE9B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#CBAE9B]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#252522] italic font-light leading-relaxed">
                  &ldquo;For our daughter&apos;s wedding, we first ordered 80 dinner sets from a marketplace seller. 12 were cracked on delivery and customer care refused to help. We switched to Vitrag — Pranath arranged personalized verification on WhatsApp and delivered all 80 sets safely in Sowcarpet luxury boxes. Truly exceptional.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#EADBC8]/60">
                <p className="font-heading text-sm text-[#6E2023] font-semibold">
                  Meera &amp; Rajesh Kannan
                </p>
                <p className="text-[11px] text-[#54483E]">
                  Anna Nagar, Chennai • Wedding Host
                </p>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="bg-[#FFF5E6] border border-[#EADBC8] p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#CBAE9B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#CBAE9B]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#252522] italic font-light leading-relaxed">
                  &ldquo;The big mall brands charge ₹15,000 for dinnerware sets simply because of their brand marketing, but the gold trim wears off in 3 months. Vitrag&apos;s 24K gold rose bowl and plates have kept their shine through 6 months of weekly dinner parties. You can feel the clay weight immediately.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#EADBC8]/60">
                <p className="font-heading text-sm text-[#6E2023] font-semibold">
                  Siddharth Madhavan
                </p>
                <p className="text-[11px] text-[#54483E]">
                  Alwarpet, Chennai • Frequent Host
                </p>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="bg-[#FFF5E6] border border-[#EADBC8] p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#CBAE9B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#CBAE9B]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#252522] italic font-light leading-relaxed">
                  &ldquo;We gift dry fruit boxes every Diwali to our executive partners. Standard corporate vendors provide cheap tin or particle board. Vitrag&apos;s solid wood caskets with embossed brass lids received personal thank-you calls from every single client.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#EADBC8]/60">
                <p className="font-heading text-sm text-[#6E2023] font-semibold">
                  Pooja Shenoy
                </p>
                <p className="text-[11px] text-[#54483E]">
                  Bangalore • Corporate Gifting Partner
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. PRICING & VALUE COMPARISON */}
      <section className="py-14 sm:py-20 bg-[#FAF3E7] border-b border-[#EADBC8]">
        <Container size="lg">
          <div className="max-w-4xl mx-auto bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold block">
                  Value Architecture
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-medium">
                  Direct Showroom Value Without Middleman Markups
                </h2>
                <p className="text-xs sm:text-sm text-[#54483E] font-light leading-relaxed">
                  When you purchase luxury homeware from department store chains, up to 60% of the price covers mall leasing, celebrity marketing, and multiple distributor tiers.
                </p>
                <p className="text-xs sm:text-sm text-[#54483E] font-light leading-relaxed">
                  At VITRAG, we operate directly from Patni Plaza in Sowcarpet, Chennai. All pieces are quoted transparently on request based on the exact configuration you need — ensuring you pay strictly for premium ceramic craftsmanship, pure 24K gold accents, and bespoke packaging.
                </p>
              </div>

              <div className="space-y-3 bg-[#FFF5E6] p-6 rounded-2xl border border-[#EADBC8]">
                <h3 className="font-heading text-base text-[#6E2023] font-semibold">
                  The VITRAG Value Advantage:
                </h3>
                <ul className="space-y-2 text-xs text-[#252522]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Showroom Quotes:</strong> Transparent pricing tailored to individual or bulk set sizes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Complimentary Pan-India Delivery:</strong> Free shipping on all qualifying orders above ₹4,000.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero Surprise Packaging Fees:</strong> Luxury rigid burgundy gift packaging included with signature sets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Intermediaries:</strong> Direct WhatsApp support from the founder and showroom curation team.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. DIRECT CTA */}
      <section className="py-16 sm:py-24 bg-[#6E2023] text-white">
        <Container size="md">
          <div className="text-center space-y-6 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF5E6]/15 text-[#CBAE9B] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full border border-[#CBAE9B]/30">
              <MessageCircle className="w-3.5 h-3.5 text-[#CBAE9B]" />
              <span>Direct Concierge</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl text-white font-medium leading-tight">
              Evaluate VITRAG for Your Home or Event
            </h2>

            <p className="text-sm sm:text-base text-[#FFF5E6]/90 font-light leading-relaxed">
              Message us directly on WhatsApp for piece availability, custom wedding curations, or to schedule a private viewing at our Sowcarpet showroom.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFF5E6] hover:bg-white text-[#6E2023] text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl"
              >
                <MessageCircle className="w-4 h-4 text-[#6E2023]" />
                <span>Chat on WhatsApp (+91 63691 42027)</span>
              </a>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#CBAE9B]/50 hover:border-white text-[#FFF5E6] hover:text-white text-xs uppercase tracking-widest font-semibold px-7 py-4 rounded-xl transition-all"
              >
                <span>Browse Dinnerware</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-[11px] text-[#CBAE9B] pt-2">
              Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai • Pan-India Delivery
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
