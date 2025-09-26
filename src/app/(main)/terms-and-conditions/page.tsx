import Hero from "@/components/Hero";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Hero
        backgroundColor="#ffffff"
        title="Terms & Conditions"
        description="Please read our terms and conditions carefully before using our services."
        align="center"
        buttonPlacement="below"
        showCta={false}
        tone="light"
      />
      <section className="py-12 md:py-16">
        <Container className="prose prose-neutral max-w-4xl mx-auto">
          <HeaderContent
            title="Terms and Conditions"
            align="left"
            showCta={false}
            titleSize="sm"
          />
          <div className="mt-8 space-y-6 text-neutral-700">
            <p>
              Welcome to Pink Papaya Stays. By accessing our website and using
              our services, you agree to be bound by the following terms and
              conditions. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              1. Booking and Reservations
            </h2>
            <p>
              All bookings are subject to availability and confirmation. A valid
              credit card is required to secure a reservation. We reserve the
              right to cancel or modify reservations where it appears that a
              customer has engaged in fraudulent or inappropriate activity.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              2. Payment Policy
            </h2>
            <p>
              Full payment is required at the time of booking unless otherwise
              stated. We accept major credit cards. All prices are quoted in USD
              and are subject to applicable taxes.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              3. Guest Conduct
            </h2>
            <p>
              Guests are expected to conduct themselves in a respectful manner.
              Any damage to the property or disturbance to other guests may
              result in immediate eviction without a refund. Parties and loud
              gatherings are strictly prohibited.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              4. Limitation of Liability
            </h2>
            <p>
              Pink Papaya Stays is not responsible for any lost, stolen, or
              damaged personal belongings. We are not liable for any injuries
              that occur on the property.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              5. Privacy Policy
            </h2>
            <p>
              We are committed to protecting your privacy. Any personal
              information collected during the booking process will be used
              solely for the purpose of your reservation.
            </p>

            <h2 className="text-xl font-semibold text-neutral-900">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to change these terms and conditions at any
              time. Any such changes will be effective immediately upon posting
              to the website.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
