import Container from "@/components/Container";

export default function CancellationPolicyPage() {
  return (
    <>
      <section className="pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-32 bg-white">
        <Container className="max-w-4xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic font-normal text-[#16323C] mb-4 leading-tight">Cancellation &amp; Refund Policy</h1>
            <p className="text-neutral-500 text-xs sm:text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="space-y-8 md:space-y-10 text-[#16323C]/80 text-[15px] sm:text-base leading-relaxed font-bricolage">
            <p>
              We understand that plans can change. This policy outlines the procedures for cancelling your reservation and the conditions for receiving a refund.
            </p>

            <section>
              <h2 className="font-playfair text-xl md:text-2xl font-medium text-[#16323C] mb-4">1. Standard Cancellation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Full Refund:</strong> Cancellations made more than 14 days prior to the check-in date will receive a 100% refund.</li>
                <li><strong>Partial Refund:</strong> Cancellations made between 7 and 14 days prior to check-in will receive a 50% refund.</li>
                <li><strong>No Refund:</strong> Cancellations made less than 7 days before the check-in date are not eligible for a refund.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-xl md:text-2xl font-medium text-[#16323C] mb-4">2. How to Cancel</h2>
              <p>
                To cancel your reservation, please contact our support team via email at{" "}
                <a href="mailto:stay@pinkpapaya.com" className="text-[#C07A5A] underline underline-offset-2 hover:opacity-80">stay@pinkpapaya.com</a> or call us at (310) 555-2140 with your booking details.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-xl md:text-2xl font-medium text-[#16323C] mb-4">3. No-Shows</h2>
              <p>
                If you do not arrive for your reservation and do not cancel in advance, you will be charged for the full amount of the stay, and no refund will be issued.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-xl md:text-2xl font-medium text-[#16323C] mb-4">4. Refund Processing</h2>
              <p>
                Refunds will be processed within 5-7 business days to the original method of payment.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-xl md:text-2xl font-medium text-[#16323C] mb-4">5. Special Circumstances</h2>
              <p>
                We may consider exceptions to this policy in cases of documented emergencies. Please contact us to discuss your situation.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
