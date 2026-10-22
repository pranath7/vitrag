import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VITRAG — Our Story | Premium Tableware & Gifting",
  description:
    "Discover the story behind VITRAG — a curated tableware and gifting brand from Chennai, bringing beauty to everyday dining and meaningful gifting.",
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-[#8B8176]">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-[#5A252E]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none">/</li>
        <li>
          <span className="text-[#252522]" aria-current="page">
            About
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#5A252E] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#E9DFD1]/80">
            Our Story
          </p>
          <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Made for Moments Worth
            <br className="hidden sm:block" /> Gathering Around
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#E9DFD1]/90">
            Beautifully Chosen. Thoughtfully Gifted.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumb />

          <div className="space-y-16">
            {/* The Beginning */}
            <div>
              <h2 className="font-heading text-3xl text-[#252522] sm:text-4xl">
                Where It All Began
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
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
            <hr className="border-[#E7E0D6]" />

            {/* Our Mission */}
            <div>
              <h2 className="font-heading text-3xl text-[#252522] sm:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
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
            <hr className="border-[#E7E0D6]" />

            {/* Values Section */}
            <div>
              <h2 className="font-heading text-3xl text-[#252522] sm:text-4xl">
                What We Stand For
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
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
            <hr className="border-[#E7E0D6]" />

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="font-heading text-3xl text-[#252522] sm:text-4xl">
                Explore Our Collections
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#252522]/80 sm:text-lg">
                Discover tableware that elevates your dining and gifts that
                speak from the heart. Every piece, beautifully chosen.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/collections"
                  className="inline-block rounded-sm bg-[#5A252E] px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#5A252E]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A252E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
                >
                  Shop Collections
                </Link>
                <Link
                  href="/"
                  className="inline-block rounded-sm border border-[#5A252E] px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-[#5A252E] transition-colors hover:bg-[#5A252E] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A252E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
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
    <article className="rounded-sm border border-[#E7E0D6] bg-white p-6 sm:p-8">
      <h3 className="font-heading text-xl text-[#5A252E] sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#252522]/70 sm:text-base">
        {description}
      </p>
    </article>
  );
}
