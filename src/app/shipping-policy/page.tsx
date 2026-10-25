import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shipping Policy — VITRAG | Tableware & Gifting",
  description:
    "Learn about VITRAG's shipping coverage, delivery timeframes, packaging standards, and how we ensure your tableware arrives safely.",
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-[#54483E]">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-[#6E2023]"
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
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[#252522]">
        {children}
      </div>
    </section>
  );
}

export default function ShippingPolicyPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Breadcrumb />

        <header className="mb-12">
          <h1 className="font-heading text-4xl text-[#252522] sm:text-5xl">
            Shipping Policy
          </h1>
          <p className="mt-4 text-sm text-[#54483E]">
            Last updated: October 2026
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#252522] sm:text-lg">
            At VITRAG, we take great care in packaging and delivering your
            tableware safely. Below you&apos;ll find everything you need to know
            about our shipping process.
          </p>
        </header>

        <div className="space-y-12">
          {/* Shipping Coverage */}
          <PolicySection title="Shipping Coverage">
            <p>
              We provide insured dispatch across <strong>India</strong> from our Sowcarpet, Chennai showroom.
              Local deliveries within Chennai and Tamil Nadu arrive swiftly, while pan-India shipments are coordinated with leading express courier networks.
            </p>
            <p>
              For remote destinations or bulk wedding / corporate consignments, please reach out
              to our concierge team via WhatsApp ({siteConfig.contact.displayPhone}), and we will confirm optimal logistics and transit times for your pincode.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Processing Time */}
          <PolicySection title="Order Processing Time">
            <p>
              All orders are processed within{" "}
              <strong>1–2 business days</strong> after payment confirmation.
              Orders placed on weekends or public holidays will be processed on
              the next business day.
            </p>
            <p>
              You will receive a confirmation message on WhatsApp once your
              order has been dispatched with tracking details.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Delivery Timeframes */}
          <PolicySection title="Delivery Timeframes">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EADBC8]">
                    <th className="py-3 pr-4 font-semibold text-[#252522]">
                      Location
                    </th>
                    <th className="py-3 font-semibold text-[#252522]">
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#252522]">
                  <tr className="border-b border-[#EADBC8]">
                    <td className="py-3 pr-4">Chennai &amp; Tamil Nadu</td>
                    <td className="py-3 font-medium text-[#6E2023]">{siteConfig.shipping.deliveryTimelineEstimate}</td>
                  </tr>
                  <tr className="border-b border-[#EADBC8]">
                    <td className="py-3 pr-4">Pan-India Express</td>
                    <td className="py-3 font-medium text-[#6E2023]">{siteConfig.shipping.deliveryTimelineEstimate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#54483E]">
              All items are dispatched with multi-layer fragile cushioning and live parcel tracking numbers directly shared on WhatsApp.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Shipping Charges */}
          <PolicySection title="Shipping Charges">
            <p>
              • <strong>Free Shipping:</strong> All orders above <strong>₹4,000</strong> qualify for 100% complimentary delivery across India.
            </p>
            <p>
              • <strong>Standard Delivery:</strong> Orders below ₹4,000 incur a flat shipping charge of <strong>₹199</strong> to cover fragile ceramic handling and transit protective materials.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

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

          <hr className="border-[#EADBC8]" />

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

          <hr className="border-[#EADBC8]" />

          {/* Damaged in Transit & Mandatory Video */}
          <PolicySection title="Transit Breakage & Mandatory Unboxing Video">
            <div className="p-4 bg-[#FFF0F0] border border-[#E8C5C8] rounded-xl text-xs text-[#6E2023] leading-relaxed mb-4">
              <strong>Mandatory Policy Notice:</strong> Customers are required to record a continuous, unedited video while unboxing the delivery package. In the rare event of transit breakage or damage, a refund or replacement will ONLY be processed upon receiving this unboxing video proof.
            </div>
            <p>
              To claim a replacement for items broken during delivery:
            </p>
            <ol className="ml-5 list-decimal space-y-2">
              <li>
                <strong>Record an unboxing video</strong> showing the outer shipping label, box seal being cut open, and the inspection of the pieces.
              </li>
              <li>
                Send the video and photos to our WhatsApp concierge at{" "}
                <a
                  href="https://wa.me/916369142027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6E2023] underline font-medium hover:text-[#55181A]"
                >
                  +91 63691 42027
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:pranathwork@gmail.com"
                  className="text-[#6E2023] underline font-medium hover:text-[#55181A]"
                >
                  pranathwork@gmail.com
                </a>{" "}
                within <strong>48 hours</strong> of package arrival.
              </li>
              <li>
                Our team will verify the claim and immediately ship an insured replacement piece or process your refund.
              </li>
            </ol>
            <p className="text-sm text-[#54483E]">
              Please note: Claims submitted without an opening/unboxing video cannot be entertained.
            </p>
          </PolicySection>
        </div>

        {/* Contact & Back */}
        <div className="mt-16 rounded-xl border border-[#EADBC8] bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-[#252522] sm:text-2xl">
            Have Questions About Your Shipment?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#54483E] sm:text-base">
            Reach out directly to our Sowcarpet showroom team at{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-[#6E2023] underline underline-offset-2 hover:text-[#6E2023]/80 font-medium"
            >
              {siteConfig.contact.email}
            </a>{" "}
            or message us on WhatsApp at{" "}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E2023] underline font-semibold hover:text-[#55181A]"
            >
              {siteConfig.contact.displayPhone}
            </a>.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6E2023] transition-colors hover:text-[#6E2023]/80"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
