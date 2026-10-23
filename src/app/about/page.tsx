import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About VITRAG — Our Story | Premium Tableware & Gifting",
  description:
    "Discover the story behind VITRAG — a curated tableware and gifting brand from Chennai, bringing beauty to everyday dining and meaningful gifting.",
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 border-b border-[#EADBC8]/60 bg-[#FFF5E6]">
      <ol className="flex items-center gap-2 text-xs text-[#84766A]">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-[#6E2023]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none text-[#CBAE9B]">/</li>
        <li>
          <span className="text-[#6E2023] font-semibold" aria-current="page">
            Our Story &amp; Leadership
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <Breadcrumb />

      {/* Hero & Founder's Vision Section */}
      <section className="relative bg-[#6E2023] py-14 sm:py-20 text-white border-b border-[#55181A] overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top Brand Header */}
          <div className="text-center mb-10 sm:mb-12 flex flex-col items-center">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[#CBAE9B]/50 shadow-lg mb-4">
              <Image
                src="/logo.jpg"
                alt="VITRAG Brand Crest"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#CBAE9B] font-semibold">
              Our Story &amp; Leadership
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white mt-2 font-medium tracking-tight">
              The Founder&apos;s Vision
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#CBAE9B] font-light max-w-xl mx-auto italic">
              &ldquo;Beautifully Chosen. Thoughtfully Gifted.&rdquo;
            </p>
          </div>

          {/* Founder Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#55181A] border border-[#8A2B2F] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Left: Founder's Portrait */}
            <div className="lg:col-span-5 relative space-y-3">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden border-2 border-[#CBAE9B]/40 shadow-xl bg-[#252522]">
                <Image
                  src="/images/founder.png"
                  alt="Founder of VITRAG"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="text-center lg:text-left pt-1">
                <p className="font-heading text-2xl text-white font-medium">Pranath</p>
                <p className="text-xs text-[#CBAE9B] uppercase tracking-wider font-sans mt-0.5">
                  Founder &amp; Creative Director, VITRAG
                </p>
              </div>
            </div>

            {/* Right: Founder's Vision Statement */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#6E2023] text-[#CBAE9B] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full border border-[#CBAE9B]/30">
                <span>Founder&apos;s Mission</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl text-white font-medium leading-snug">
                &ldquo;Every gathering begins with a table, but it endures through the moments and memories we create around it.&rdquo;
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#FFF5E6]/90 font-light leading-relaxed">
                <p>
                  VITRAG was conceived with a clear conviction: tableware is not merely functional crockery — it is the centerpiece of hospitality, the soul of family celebrations, and an intimate expression of gratitude when gifted.
                </p>
                <p>
                  Rooted in Chennai at our Sowcarpet showroom, our mission is to elevate Indian dining spaces. From hand-finished ceramic platters and 24K gold rim detailing to velvet-lined dry fruit gift boxes, every creation bridges timeless craftsmanship with contemporary luxury.
                </p>
                <p>
                  Whether selecting a wedding trousseau set, an executive corporate hamper, or pieces for daily dining, every VITRAG piece is thoughtfully chosen to make your table a celebration.
                </p>
              </div>

              <div className="pt-4 border-t border-[#CBAE9B]/25 flex flex-wrap items-center gap-6 text-xs text-[#CBAE9B]">
                <div>
                  <span className="block font-semibold text-white">Patni Plaza, Sowcarpet</span>
                  <span>Chennai, Tamil Nadu 600001</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-[#CBAE9B]/30" />
                <div>
                  <span className="block font-semibold text-white">Showroom &amp; Concierge</span>
                  <span>+91 63691 42027</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">

          <div className="space-y-16">
            {/* The Beginning */}
            <div>
              <h2 className="font-heading text-3xl text-[#6E2023] sm:text-4xl font-medium">
                Where It All Began
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#252522]/85 font-light sm:text-lg">
                <p>
                  VITRAG was born from a simple observation — the most cherished
                  moments in our lives revolve around a table. A family dinner,
                  a festive gathering, a quiet morning chai. And yet, the objects
                  that grace those tables rarely receive the thought and care
                  they deserve.
                </p>
                <p>
                  Founded in Chennai, VITRAG is a curated tableware and gifting
                  brand that believes every meal is an occasion, and every gift
                  should feel personal. We set out to bridge the gap between
                  beautiful design and everyday living — selecting pieces that
                  are both artful and practical, elegant and enduring.
                </p>
                <p>
                  Our name, <em>VITRAG</em>, draws from the idea of purity and
                  detachment from the ordinary — an invitation to elevate the
                  everyday, to find beauty in the ritual of dining and the
                  warmth of giving.
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#EADBC8]" />

            {/* Our Mission */}
            <div>
              <h2 className="font-heading text-3xl text-[#6E2023] sm:text-4xl font-medium">
                Our Mission
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#252522]/85 font-light sm:text-lg">
                <p>
                  We exist to bring beauty to everyday dining and meaning to
                  every gift. At VITRAG, we thoughtfully curate crockery,
                  tableware, and gifting collections that transform ordinary
                  moments into memorable ones.
                </p>
                <p>
                  Whether you&apos;re setting a table for loved ones or
                  searching for a gift that speaks from the heart, we want every
                  VITRAG piece to feel like it was chosen with intention — because
                  it was.
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#EADBC8]" />

            {/* Values Section */}
            <div>
              <h2 className="font-heading text-3xl text-[#6E2023] sm:text-4xl font-medium">
                What We Stand For
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#84766A] sm:text-lg font-light">
                Every piece in our collection reflects four guiding principles.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <ValueCard
                  title="Quality"
                  description="We partner with trusted makers and brands to bring you tableware that is durable, food-safe, and designed to last through countless meals and memories."
                />
                <ValueCard
                  title="Craftsmanship"
                  description="From hand-finished ceramics to finely glazed stoneware, we celebrate the art and skill that goes into making each piece — honouring tradition while embracing modern design."
                />
                <ValueCard
                  title="Thoughtful Curation"
                  description="We don't stock everything — we select with intention. Each item in our collection has been chosen for its design, functionality, and ability to bring joy to your table."
                />
                <ValueCard
                  title="Customer Care"
                  description="Your experience matters as much as the products we sell. From careful packaging to responsive support, we're committed to making every interaction warm and effortless."
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#EADBC8]" />

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="font-heading text-3xl text-[#6E2023] sm:text-4xl font-medium">
                Explore Our Collections
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#84766A] sm:text-lg font-light">
                Discover tableware that elevates your dining and gifts that
                speak from the heart. Every piece, beautifully chosen.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/shop"
                  className="inline-block rounded-lg bg-[#6E2023] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#55181A] shadow-md"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/"
                  className="inline-block rounded-lg border border-[#6E2023] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#6E2023] transition-colors hover:bg-[#6E2023] hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-[#EADBC8] bg-white p-6 sm:p-8 shadow-xs">
      <h3 className="font-heading text-xl text-[#6E2023] sm:text-2xl font-medium">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#84766A] sm:text-base font-light">
        {description}
      </p>
    </article>
  );
}
