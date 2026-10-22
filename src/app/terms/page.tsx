import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — VITRAG | Tableware & Gifting",
  description:
    "Read the terms and conditions governing your use of the VITRAG website and purchase of our tableware and gifting products.",
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
            Terms &amp; Conditions
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

export default function TermsPage() {
  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Breadcrumb />

        <header className="mb-12">
          <h1 className="font-heading text-4xl text-[#252522] sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-[#8B8176]">
            Last updated: October 2026
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
            Welcome to VITRAG. These Terms and Conditions (&quot;Terms&quot;)
            govern your access to and use of our website{" "}
            <strong>vitrag.in</strong> (&quot;Website&quot;) and the purchase of
            products offered by VITRAG (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). By using our Website or placing an order, you agree
            to be bound by these Terms.
          </p>
        </header>

        <div className="space-y-12">
          {/* Acceptance */}
          <PolicySection title="1. Acceptance of Terms">
            <p>
              By accessing or using our Website, you confirm that you are at
              least 18 years of age and have the legal capacity to enter into
              these Terms. If you do not agree with any part of these Terms,
              please do not use our Website or services.
            </p>
            <p>
              We reserve the right to update or modify these Terms at any time
              without prior notice. Continued use of the Website after any
              changes constitutes your acceptance of the revised Terms.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Products */}
          <PolicySection title="2. Products">
            <p>
              VITRAG offers curated tableware, crockery, and gifting products
              through our Website and WhatsApp ordering channels. We strive to
              display product images and descriptions as accurately as possible.
              However:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Colours may vary slightly due to screen settings and
                photographic lighting
              </li>
              <li>
                Minor variations in handmade or artisanal products (such as
                slight differences in glaze, pattern, or size) are inherent to
                their craftsmanship and are not considered defects
              </li>
              <li>
                Product availability is subject to stock and may change without
                notice
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Pricing */}
          <PolicySection title="3. Pricing">
            <p>
              All prices on our Website are listed in{" "}
              <strong>Indian Rupees (₹)</strong> and are inclusive of applicable
              taxes unless otherwise stated.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                We reserve the right to change prices at any time without prior
                notice
              </li>
              <li>
                Prices applicable to your order will be the prices displayed at
                the time of placing your order
              </li>
              <li>
                In the rare event of a pricing error, we will notify you and
                offer you the option to proceed at the correct price or cancel
                the order for a full refund
              </li>
              <li>
                Promotional discounts and offers are subject to specific terms
                and may be withdrawn at any time
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Orders */}
          <PolicySection title="4. Orders">
            <p>
              Placing an order on our Website or via WhatsApp constitutes an
              offer to purchase. All orders are subject to acceptance and
              availability.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                We reserve the right to refuse or cancel any order for any
                reason, including suspected fraud, pricing errors, or stock
                unavailability
              </li>
              <li>
                An order confirmation email or WhatsApp message will be sent
                once your order is accepted and payment is confirmed
              </li>
              <li>
                For WhatsApp orders, the order is considered confirmed once
                payment is received and acknowledged by our team
              </li>
              <li>
                You are responsible for providing accurate delivery information.
                We are not liable for delays or non-delivery caused by incorrect
                address details
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Payment */}
          <PolicySection title="5. Payment">
            <p>
              We accept payments through the following methods:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
              <li>Credit and debit cards</li>
              <li>Net banking</li>
              <li>Bank transfer (for WhatsApp orders)</li>
              <li>
                Cash on Delivery (COD) — available for select locations and
                order values
              </li>
            </ul>
            <p>
              All online payments are processed securely through our
              third-party payment gateway partners. We do not store your payment
              card details on our servers.
            </p>
            <p>
              Full payment must be received before an order is dispatched,
              unless the order is placed as COD.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Shipping */}
          <PolicySection title="6. Shipping & Delivery">
            <p>
              Shipping and delivery are governed by our{" "}
              <Link
                href="/shipping-policy"
                className="text-[#5A252E] underline underline-offset-2 hover:text-[#5A252E]/80"
              >
                Shipping Policy
              </Link>
              , which forms part of these Terms. Key points:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Delivery timeframes are estimates and not guaranteed
              </li>
              <li>
                Risk of loss and title for purchased items pass to you upon
                delivery
              </li>
              <li>
                We are not responsible for delays caused by logistics partners,
                natural events, or circumstances beyond our control
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Returns */}
          <PolicySection title="7. Returns & Refunds">
            <p>
              Returns and refunds are governed by our{" "}
              <Link
                href="/returns-refunds"
                className="text-[#5A252E] underline underline-offset-2 hover:text-[#5A252E]/80"
              >
                Returns &amp; Refunds Policy
              </Link>
              , which forms part of these Terms. By placing an order, you agree
              to the terms outlined in that policy.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* WhatsApp Ordering */}
          <PolicySection title="8. WhatsApp Ordering">
            <p>
              VITRAG offers the convenience of ordering via WhatsApp. By using
              this channel:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                You consent to receiving order-related communications via
                WhatsApp, including confirmations, tracking updates, and support
                messages
              </li>
              <li>
                WhatsApp conversations related to orders may be retained for
                record-keeping and dispute resolution purposes
              </li>
              <li>
                Your use of WhatsApp is also subject to{" "}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A252E] underline underline-offset-2 hover:text-[#5A252E]/80"
                >
                  WhatsApp&apos;s own terms and privacy policy
                </a>
              </li>
              <li>
                Prices and availability shared via WhatsApp are valid at the
                time of communication and are subject to change
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Intellectual Property */}
          <PolicySection title="9. Intellectual Property">
            <p>
              All content on our Website — including but not limited to text,
              images, logos, graphics, product photographs, design elements, and
              branding — is the intellectual property of VITRAG and is protected
              under applicable Indian intellectual property laws.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                You may not reproduce, distribute, modify, or commercially
                exploit any content from our Website without our prior written
                consent
              </li>
              <li>
                The VITRAG name, logo, and tagline (&quot;Beautifully Chosen.
                Thoughtfully Gifted.&quot;) are trademarks of VITRAG
              </li>
              <li>
                Limited personal, non-commercial use of our Website content
                (such as sharing product links) is permitted
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* User Conduct */}
          <PolicySection title="10. User Conduct">
            <p>
              When using our Website, you agree not to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Use the Website for any unlawful purpose or in violation of
                these Terms
              </li>
              <li>
                Attempt to interfere with or disrupt the Website&apos;s
                functionality or security
              </li>
              <li>
                Submit false or misleading information when placing orders or
                creating accounts
              </li>
              <li>
                Engage in any activity that could harm, overload, or impair our
                servers or infrastructure
              </li>
              <li>
                Use automated tools (bots, scrapers) to access or extract data
                from our Website
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Limitation of Liability */}
          <PolicySection title="11. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable Indian law:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                VITRAG shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of our Website or purchase of our products
              </li>
              <li>
                Our total liability for any claim related to an order shall not
                exceed the amount paid by you for that specific order
              </li>
              <li>
                We are not liable for any loss or damage resulting from events
                beyond our reasonable control, including natural disasters,
                pandemics, strikes, or government actions (force majeure)
              </li>
              <li>
                Our Website is provided &quot;as is&quot; without warranties of
                any kind, whether express or implied, to the extent permitted by
                law
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Indemnification */}
          <PolicySection title="12. Indemnification">
            <p>
              You agree to indemnify and hold harmless VITRAG, its owners,
              employees, and partners from any claims, damages, losses, or
              expenses (including legal fees) arising from your use of the
              Website, violation of these Terms, or infringement of any
              third-party rights.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Governing Law */}
          <PolicySection title="13. Governing Law & Jurisdiction">
            <p>
              These Terms are governed by and construed in accordance with the
              laws of <strong>India</strong>, including but not limited to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>The Indian Contract Act, 1872</li>
              <li>The Consumer Protection Act, 2019</li>
              <li>The Information Technology Act, 2000</li>
              <li>
                The Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011
              </li>
            </ul>
            <p>
              Any disputes arising out of or in connection with these Terms
              shall be subject to the exclusive jurisdiction of the courts in{" "}
              <strong>Chennai, Tamil Nadu, India</strong>.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Severability */}
          <PolicySection title="14. Severability">
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable by a court of competent jurisdiction, the remaining
              provisions shall continue in full force and effect. The invalid
              provision shall be modified to the minimum extent necessary to
              make it valid and enforceable.
            </p>
          </PolicySection>

          <hr className="border-[#E7E0D6]" />

          {/* Contact */}
          <PolicySection title="15. Contact Us">
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="rounded-sm border border-[#E7E0D6] bg-white p-5">
              <p className="font-medium text-[#252522]">VITRAG</p>
              <ul className="mt-2 space-y-1 text-sm text-[#252522]/80">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:hello@vitrag.in"
                    className="text-[#5A252E] underline underline-offset-2 hover:text-[#5A252E]/80"
                  >
                    hello@vitrag.in
                  </a>
                </li>
                <li>WhatsApp: Available on our website</li>
                <li>Location: Chennai, Tamil Nadu, India</li>
              </ul>
            </div>
          </PolicySection>
        </div>

        <div className="mt-12">
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
