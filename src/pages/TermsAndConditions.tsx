export function TermsAndConditions() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="text-muted-foreground mb-8">
        Last Updated: {new Date().toLocaleDateString()}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Legal Information</h2>
        <p className="text-muted-foreground">
          This website is operated by [Your Company Name], a company registered in Portugal under the NIPC [Your VAT/NIPC], located at [Your Registered Address].
          By accessing or using our services, you agree to be bound by these Terms and Conditions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use of Services</h2>
        <p className="text-muted-foreground">
          You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent, or harmful.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Intellectual Property Rights</h2>
        <p className="text-muted-foreground">
          Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitations of Liability</h2>
        <p className="text-muted-foreground">
          We will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Governing Law</h2>
        <p className="text-muted-foreground">
          These terms and conditions will be governed by and construed in accordance with the laws of Portugal, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Portugal.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@yourdomain.com" className="text-primary hover:underline">support@yourdomain.com</a>.
        </p>
      </section>
    </article>
  );
}
