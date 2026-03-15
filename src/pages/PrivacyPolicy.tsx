export function PrivacyPolicy() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="text-muted-foreground mb-8">
        Last Updated: {new Date().toLocaleDateString()}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction and Controller Details</h2>
        <p className="text-muted-foreground">
          Welcome to our Privacy Policy. This policy sets out how [Your Company Name] (Data Controller, registered in Portugal, NIPC [Your VAT/NIPC], located at [Your Registered Address]) uses and protects any information that you give us when you use this website. We are committed to ensuring that your privacy is protected in compliance with the General Data Protection Regulation (GDPR).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. What We Collect</h2>
        <p className="text-muted-foreground">
          We may collect the following information:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>Name and job title</li>
          <li>Contact information including email address</li>
          <li>Usage data, preferences, and interests</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Legal Basis and Purpose</h2>
        <p className="text-muted-foreground">
          We require this information to understand your needs and provide you with a better service, particularly for the following reasons (based on your consent, performance of a contract, or our legitimate interests):
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>Internal record keeping.</li>
          <li>Improving our products and services.</li>
          <li>Sending promotional emails about new products, special offers, or other information.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Retention and Security</h2>
        <p className="text-muted-foreground">
          We are committed to ensuring that your information is secure. We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Data Protection Rights (GDPR)</h2>
        <p className="text-muted-foreground">
          Under the GDPR, you have the following rights:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li><strong>The right to access</strong> - You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification</strong> - You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing</strong> - You have the right to request that we restrict the processing of your personal data.</li>
          <li><strong>The right to object to processing</strong> - You have the right to object to our processing of your personal data.</li>
          <li><strong>The right to data portability</strong> - You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies</h2>
        <p className="text-muted-foreground">
          Our website uses cookies to enhance user experience. A cookie is a small file which asks permission to be placed on your computer's hard drive. It helps analyze web traffic or lets you know when you visit a particular site. You can choose to accept or decline cookies through your browser settings or our cookie consent banner.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Us</h2>
        <p className="text-muted-foreground">
          If you would like to exercise any of your data protection rights or have questions, please contact us at <a href="mailto:privacy@yourdomain.com" className="text-primary hover:underline">privacy@yourdomain.com</a> or write to us at our registered address.
        </p>
      </section>
    </article>
  );
}
