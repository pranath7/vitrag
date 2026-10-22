import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — VITRAG | Tableware & Gifting",
  description:
    "Learn how VITRAG collects, uses, and protects your personal information. Our privacy policy covers data handling, cookies, and your rights.",
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
            Privacy Policy
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

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Breadcrumb />

        <header className="mb-12">
          <h1 className="font-heading text-4xl text-[#252522] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#8B8176]">
            Last updated: October 2026
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#252522]/80 sm:text-lg">
            At VITRAG (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we
            are committed to protecting your privacy and personal information.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website, place an
            order, or interact with us via WhatsApp and other channels.
          </p>
        </header>

        <div className="space-y-12">
          {/* Information We Collect */}
          <PolicySection title="Information We Collect">
            <p>
              We may collect the following types of information when you interact
              with us:
            </p>
            <h3 className="font-heading text-lg text-[#252522] sm:text-xl">
              Personal Information
            </h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Full name, email address, phone number, and shipping address
                (provided when placing an order or creating an account)
              </li>
              <li>
                Payment information (processed securely through our payment
                partners — we do not store your card details)
              </li>
              <li>
                WhatsApp messages and conversation history when you place orders
                or make enquiries via WhatsApp
              </li>
              <li>
                Gift recipient details (name and address) when provided for gift
                orders
              </li>
            </ul>

            <h3 className="font-heading text-lg text-[#252522] sm:text-xl">
              Automatically Collected Information
            </h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Browser type, device type, operating system, and IP address
              </li>
              <li>
                Pages visited, time spent on pages, and browsing patterns on our
                website
              </li>
              <li>
                Referring website URLs and search terms that led you to our site
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* How We Use Information */}
          <PolicySection title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Process and fulfil your orders, including shipping and delivery
              </li>
              <li>
                Communicate with you about your orders, enquiries, and support
                requests via email, SMS, or WhatsApp
              </li>
              <li>
                Send you promotional updates, new arrivals, and offers (only
                with your consent — you may opt out at any time)
              </li>
              <li>
                Improve our website, products, and customer experience through
                analytics
              </li>
              <li>
                Prevent fraud and ensure the security of transactions
              </li>
              <li>
                Comply with applicable legal obligations under Indian law
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Information Sharing */}
          <PolicySection title="Information Sharing & Disclosure">
            <p>
              We do not sell, rent, or trade your personal information. We may
              share your information only in the following circumstances:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Service providers</strong> — with trusted third parties
                who assist us in operating our website, processing payments,
                delivering orders, and providing customer support (e.g., payment
                gateways, logistics partners)
              </li>
              <li>
                <strong>WhatsApp / Meta</strong> — when you communicate with us
                via WhatsApp, your messages are subject to WhatsApp&apos;s own
                privacy policy. We use WhatsApp Business to manage orders and
                provide support
              </li>
              <li>
                <strong>Legal requirements</strong> — when required by law, court
                order, or government authority under applicable Indian
                legislation, including the Information Technology Act, 2000
              </li>
              <li>
                <strong>Business transfers</strong> — in the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the transaction
              </li>
            </ul>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Data Security */}
          <PolicySection title="Data Security">
            <p>
              We implement reasonable security measures to protect your personal
              information in accordance with the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011, under the Information
              Technology Act, 2000.
            </p>
            <p>These measures include:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>SSL/TLS encryption for all data transmitted via our website</li>
              <li>
                Secure payment processing through PCI-DSS compliant payment
                gateways
              </li>
              <li>
                Restricted access to personal information within our
                organisation
              </li>
              <li>Regular review of our data security practices</li>
            </ul>
            <p>
              While we strive to protect your information, no method of
              electronic transmission or storage is 100% secure. We encourage
              you to take precautions when sharing personal information online.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Cookies */}
          <PolicySection title="Cookies & Tracking Technologies">
            <p>
              Our website may use cookies and similar tracking technologies to
              enhance your browsing experience. These include:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Essential cookies</strong> — required for the website to
                function properly (e.g., shopping cart, session management)
              </li>
              <li>
                <strong>Analytics cookies</strong> — help us understand how
                visitors use our website so we can improve it (e.g., Google
                Analytics)
              </li>
              <li>
                <strong>Marketing cookies</strong> — used to deliver relevant
                advertisements and track campaign performance (only with your
                consent)
              </li>
            </ul>
            <p>
              You can manage or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect your ability
              to use some features of our website.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Third-Party Services */}
          <PolicySection title="Third-Party Services">
            <p>
              Our website may contain links to third-party websites and
              services. We are not responsible for the privacy practices of
              these external sites. We encourage you to review their privacy
              policies before providing any personal information.
            </p>
            <p>We work with the following types of third-party providers:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Payment gateways (e.g., Razorpay, PayU) for secure transaction
                processing
              </li>
              <li>
                Logistics and courier partners for order delivery
              </li>
              <li>
                Analytics platforms (e.g., Google Analytics) for website
                performance insights
              </li>
              <li>
                WhatsApp Business API for order management and customer
                communication
              </li>
            </ul>
            <p>
              Each of these providers has their own privacy policy governing how
              they handle data.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Your Rights */}
          <PolicySection title="Your Rights">
            <p>
              Under applicable Indian data protection laws, you have the right
              to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Access</strong> — request a copy of the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction</strong> — request correction of any
                inaccurate or incomplete information
              </li>
              <li>
                <strong>Withdrawal of consent</strong> — withdraw your consent
                for marketing communications at any time
              </li>
              <li>
                <strong>Deletion</strong> — request deletion of your personal
                information, subject to legal obligations that may require us to
                retain certain data
              </li>
              <li>
                <strong>Grievance redressal</strong> — raise concerns about how
                your data is handled
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details provided below.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Children's Privacy */}
          <PolicySection title="Children&apos;s Privacy">
            <p>
              Our website and services are not directed at individuals under the
              age of 18. We do not knowingly collect personal information from
              children. If you believe we have inadvertently collected
              information from a minor, please contact us and we will take steps
              to delete it promptly.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Changes to Policy */}
          <PolicySection title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, or legal requirements. Any
              updates will be posted on this page with a revised &quot;Last
              updated&quot; date.
            </p>
            <p>
              We encourage you to review this policy periodically. Continued use
              of our website after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </PolicySection>

          <hr className="border-[#EADBC8]" />

          {/* Contact */}
          <PolicySection title="Contact Us">
            <p>
              If you have any questions, concerns, or requests related to this
              Privacy Policy or how we handle your personal information, please
              contact us:
            </p>
            <div className="rounded-xl border border-[#EADBC8] bg-white p-5">
              <p className="font-heading font-medium text-lg text-[#6E2023]">VITRAG Tableware &amp; Gifting</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#252522]/80">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:pranathwork@gmail.com"
                    className="text-[#6E2023] underline underline-offset-2 hover:text-[#6E2023]/80 font-medium"
                  >
                    pranathwork@gmail.com
                  </a>
                </li>
                <li>WhatsApp: +91 63691 42027</li>
                <li>Address: Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai, Tamil Nadu 600001</li>
              </ul>
            </div>
            <p className="text-sm text-[#8B8176]">
              For grievance redressal under the Information Technology Act, 2000,
              please direct your communication to the email address above with
              the subject line &quot;Privacy Grievance.&quot;
            </p>
          </PolicySection>
        </div>

        <div className="mt-12">
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
