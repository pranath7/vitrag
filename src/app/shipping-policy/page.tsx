import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy — VITRAG | Tableware & Gifting",
  description:
    "Learn about VITRAG's shipping coverage, delivery timeframes, packaging standards, and how we ensure your tableware arrives safely.",
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
            Shipping Policy
          </span>
        </li>
      </ol>
    </nav>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="font-heading text-2xl text-[#252522] sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[#252522]/80">
        {children}
      </div>
    </section>
  );
}

export default function ShippingPolicyPage() {
  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Breadcrumb />

        <header className="mb-12">
          <h1 className="font-heading text-4xl text-[#252522] sm:text-5xl">
            Shipping Policy
          </h1>
          <p className="mt-4 text-sm text-[#8B8176]">
            Last updated: October 2026
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
            At VITRAG, we take great care in packaging and delivering your
            tableware safely. Below you&apos;ll find everything you need to know
            about our shipping process.
          </p>
        </header>

        <div className="space-y-12">
          {/* Shipping Coverage */}
          <PolicySection title="Shipping Coverage">
            <p>
              We currently offer shipping across <strong>Chennai</strong> and{" "}
              <strong>Tamil Nadu</strong>, with plans to expand our delivery
              network across India in the near future.
            </p>
            <p>
              For orders outside our current serviceable areas, please reach out
              to us via WhatsApp or email, and we&apos;ll do our best to arrange
              delivery on a case-by-case basis.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Processing Time */}
          <PolicySection title="Order Processing Time">
            <p>
              All orders are processed within{" "}
              <strong>1–2 business days</strong> after payment confirmation.
              Orders placed on weekends or public holidays will be processed on
              the next business day.
            </p>
            <p>
              You will receive a confirmation email or WhatsApp message once your
              order has been dispatched with tracking details.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Delivery Timeframes */}
          <PolicySection title="Delivery Timeframes">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E7E0D6]">
                    <th className="py-3 pr-4 font-semibold text-[#252522]">
                      Location
                    </th>
                    <th className="py-3 font-semibold text-[#252522]">
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#252522]/80">
                  <tr className="border-b border-[#E7E0D6]">
                    <td className="py-3 pr-4">Chennai (Local)</td>
                    <td className="py-3">2–4 business days</td>
                  </tr>
                  <tr className="border-b border-[#E7E0D6]">
                    <td className="py-3 pr-4">Tamil Nadu</td>
                    <td className="py-3">3–5 business days</td>
                  </tr>
                  <tr className="border-b border-[#E7E0D6]">
                    <td className="py-3 pr-4">Rest of India*</td>
                    <td className="py-3">5–10 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#8B8176]">
              *Pan-India shipping is being expanded. Availability may vary by
              pin code. Please check with us for confirmation.
            </p>
            <p>
              Delivery times are estimates and may vary due to logistics partner
              schedules, weather conditions, or unforeseen circumstances. We
              appreciate your patience.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Shipping Charges */}
          <PolicySection title="Shipping Charges">
            <p>
              Shipping charges are calculated at checkout based on your delivery
              location and the weight/size of your order. The exact shipping cost
              will be displayed before you confirm your order.
            </p>
            <p>
              We occasionally offer promotional free shipping on select orders.
              Any applicable offers will be communicated on our website, social
              media, or WhatsApp channel.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Order Tracking */}
          <PolicySection title="Order Tracking">
            <p>
              Once your order is shipped, you will receive a tracking number via
              email or WhatsApp. You can use this number to track your shipment
              through our logistics partner&apos;s website.
            </p>
            <p>
              If you have any questions about your order status, please don&apos;t
              hesitate to contact us.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Packaging & Safety */}
          <PolicySection title="Packaging & Safety">
            <p>
              We understand that tableware and crockery require special care
              during transit. Every VITRAG order is:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Individually wrapped in protective bubble wrap or foam
              </li>
              <li>
                Packed in sturdy, corrugated boxes designed for fragile items
              </li>
              <li>
                Sealed with &quot;Fragile&quot; and &quot;Handle with Care&quot;
                labels
              </li>
              <li>
                Inspected before dispatch to ensure quality and completeness
              </li>
            </ul>
            <p>
              We take pride in our packaging process to ensure your pieces arrive
              in perfect condition.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Damaged in Transit */}
          <PolicySection title="Damaged in Transit">
            <p>
              Despite our careful packaging, damage during transit can
              occasionally occur. If your order arrives damaged:
            </p>
            <ol className="ml-5 list-decimal space-y-2">
              <li>
                <strong>Do not discard</strong> the item or packaging
              </li>
              <li>
                Take clear photographs of the damaged item and the outer
                packaging
              </li>
              <li>
                Contact us within <strong>48 hours</strong> of delivery via
                WhatsApp or email
              </li>
              <li>
                We will arrange a replacement or refund after reviewing the
                damage
              </li>
            </ol>
            <p>
              Please note that claims made after 48 hours of delivery may not be
              eligible for a replacement or refund.
            </p>
          </PolicySection>
        </div>

        {/* Contact & Back */}
        <div className="mt-16 rounded-sm border border-[#E7E0D6] bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-[#252522] sm:text-2xl">
            Have Questions?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#252522]/70 sm:text-base">
            If you have any questions about our shipping policy, feel free to
            reach out to us at{" "}
            <a
              href="mailto:hello@vitrag.in"
              className="text-[#5A252E] underline underline-offset-2 hover:text-[#5A252E]/80"
            >
              hello@vitrag.in
            </a>{" "}
            or message us on WhatsApp.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#5A252E] transition-colors hover:text-[#5A252E]/80"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
