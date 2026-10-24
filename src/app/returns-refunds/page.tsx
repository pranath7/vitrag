import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds — VITRAG | Tableware & Gifting",
  description:
    "Read VITRAG's returns and refunds policy. Learn about our 7-day return window, refund process, and how to initiate a return for tableware and gifts.",
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-[#8B8176]">
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
            Returns &amp; Refunds
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

export default function ReturnsRefundsPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Breadcrumb />

        <header className="mb-12">
          <h1 className="font-heading text-4xl text-[#252522] sm:text-5xl">
            Returns &amp; Refunds
          </h1>
          <p className="mt-4 text-sm text-[#8B8176]">
            Last updated: October 2026
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
            We want you to love every VITRAG piece. If something isn&apos;t
            right, we&apos;re here to help. Please review our returns and
            refunds policy below.
          </p>
        </header>

        <div className="space-y-12">
          {/* Return Window */}
          <PolicySection title="Return Window">
            <p>
              We accept returns within <strong>7 days</strong> from the date of
              delivery. To be eligible for a return, the request must be
              initiated within this window.
            </p>
            <p>
              Items received after the 7-day window may not be eligible for a
              return or refund. We encourage you to inspect your order promptly
              upon arrival.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Eligible Returns */}
          <PolicySection title="Eligible Returns">
            <p>To qualify for a return, items must be:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Unused and unwashed</strong> — the item should not have
                been used for serving, dining, or any other purpose
              </li>
              <li>
                <strong>In original packaging</strong> — returned in the same
                packaging they were received in, with all protective materials
                intact
              </li>
              <li>
                <strong>In original condition</strong> — free from chips,
                cracks, stains, or any signs of use or damage caused after
                delivery
              </li>
              <li>
                <strong>Accompanied by proof of purchase</strong> — order
                confirmation email, invoice, or WhatsApp order reference
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Non-Eligible Returns */}
          <PolicySection title="Non-Eligible Returns">
            <p>
              Due to the nature of our products, the following items are{" "}
              <strong>not eligible</strong> for return:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Items that have been used, washed, or show signs of use</li>
              <li>
                Items damaged due to mishandling after delivery (drops, impacts,
                improper storage)
              </li>
              <li>Custom or personalised orders</li>
              <li>Gift cards and vouchers</li>
              <li>Items purchased during clearance or final sale promotions</li>
              <li>
                Items returned without original packaging or proof of purchase
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* How to Initiate a Return */}
          <PolicySection title="How to Initiate a Return">
            <p>
              Initiating a return is simple. Please follow these steps:
            </p>
            <ol className="ml-5 list-decimal space-y-3">
              <li>
                <strong>Contact us</strong> within 7 days of delivery via{" "}
                <a
                  href="mailto:hello@vitrag.in"
                  className="text-[#6E2023] underline underline-offset-2 hover:text-[#6E2023]/80"
                >
                  hello@vitrag.in
                </a>{" "}
                or WhatsApp with your order number and reason for return
              </li>
              <li>
                <strong>Share photographs</strong> of the item showing its
                current condition and the original packaging
              </li>
              <li>
                <strong>Await confirmation</strong> — our team will review your
                request and respond within 1–2 business days
              </li>
              <li>
                <strong>Ship the item</strong> once approved, following the
                return instructions we provide. Please pack the item securely to
                avoid damage during return transit
              </li>
            </ol>
            <p className="text-sm text-[#8B8176]">
              Return shipping costs may be borne by the customer unless the
              return is due to a defective or incorrect item sent by us.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Refund Process */}
          <PolicySection title="Refund Process">
            <p>
              Once we receive and inspect your returned item, we will notify you
              of the approval or rejection of your refund.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Approved refunds</strong> will be processed within{" "}
                <strong>5–7 business days</strong> to the original payment
                method
              </li>
              <li>
                For <strong>bank transfers or UPI payments</strong>, the refund
                will be credited to the same account
              </li>
              <li>
                For <strong>WhatsApp or COD orders</strong>, refunds will be
                processed via bank transfer to your provided account details
              </li>
            </ul>
            <p>
              Please note that your bank or payment provider may take additional
              time to reflect the refund in your account.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Exchange Policy */}
          <PolicySection title="Exchange Policy">
            <p>
              We currently offer exchanges on a case-by-case basis, subject to
              stock availability. If you&apos;d like to exchange an item:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Contact us within 7 days of delivery with your exchange request
              </li>
              <li>
                The item must meet the same eligibility criteria as returns
              </li>
              <li>
                If the replacement item differs in price, the difference will be
                charged or refunded accordingly
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Damaged / Defective Items & Mandatory Unboxing Video */}
          <PolicySection title="Transit Breakage & Mandatory Unboxing Video">
            <div className="p-4 bg-[#FFF0F0] border border-[#E8C5C8] rounded-xl text-xs text-[#6E2023] leading-relaxed mb-4">
              <strong>Crucial Policy Notice:</strong> Because crockery and glassware are delicate items, all customers must record an unedited unboxing video from the moment the package is received and unsealed. In the rare event of transit breakage or damage, a refund or replacement will <strong>ONLY</strong> be processed if an unboxing video is provided.
            </div>
            <p>
              If your parcel arrives with breakage:
            </p>
            <ol className="ml-5 list-decimal space-y-3">
              <li>
                <strong>Record a complete unboxing video</strong> showing the outer shipping label, box seal opening, and the damaged item inside.
              </li>
              <li>
                Contact us within <strong>48 hours</strong> of delivery via WhatsApp (
                <a
                  href="https://wa.me/916369142027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6E2023] underline font-medium hover:text-[#55181A]"
                >
                  +91 63691 42027
                </a>
                ) or email (
                <a
                  href="mailto:pranathwork@gmail.com"
                  className="text-[#6E2023] underline font-medium hover:text-[#55181A]"
                >
                  pranathwork@gmail.com
                </a>
                ) with the video.
              </li>
              <li>
                <strong>Do not discard</strong> the item or packaging until the claim is approved.
              </li>
            </ol>
            <p>
              Upon verification of the unboxing video, VITRAG will promptly arrange an immediate <strong>free replacement or full refund</strong> via UPI to your account. Claims without an unboxing video cannot be entertained.
            </p>
          </PolicySection>
        </div>

        {/* Contact & Back */}
        <div className="mt-16 rounded-xl border border-[#EADBC8] bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl text-[#252522] sm:text-2xl">
            Need Help with a Return or Replacement?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#252522]/70 sm:text-base">
            We are here to assist you. Reach out to our Sowcarpet showroom team at{" "}
            <a
              href="mailto:pranathwork@gmail.com"
              className="text-[#6E2023] underline underline-offset-2 hover:text-[#6E2023]/80 font-medium"
            >
              pranathwork@gmail.com
            </a>{" "}
            or message us on WhatsApp at{" "}
            <a
              href="https://wa.me/916369142027"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E2023] underline font-semibold hover:text-[#55181A]"
            >
              +91 63691 42027
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
