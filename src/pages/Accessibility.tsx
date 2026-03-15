export function Accessibility() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
      <div className="text-muted-foreground mb-8">
        Last Updated: {new Date().toLocaleDateString()}
      </div>

      <section className="mb-8">
        <p className="text-muted-foreground">
          [Your Company Name] is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards, in compliance with the European Accessibility Act (EAA).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Conformance Status</h2>
        <p className="text-muted-foreground">
          The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Our website aims to be fully conformant with WCAG 2.1 level AA.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Feedback</h2>
        <p className="text-muted-foreground">
          We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>Phone: [Your Phone Number]</li>
          <li>E-mail: <a href="mailto:accessibility@yourdomain.com" className="text-primary hover:underline">accessibility@yourdomain.com</a></li>
          <li>Visitor Address: [Your Registered Address]</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          We try to respond to feedback within 2 business days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Compatibility</h2>
        <p className="text-muted-foreground">
          Our website is designed to be compatible with standard assistive technologies and major modern web browsers. It may not display optimally on older browsers (e.g., Internet Explorer).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Technical Specifications</h2>
        <p className="text-muted-foreground">
          Accessibility of this website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          These technologies are relied upon for conformance with the accessibility standards used.
        </p>
      </section>
    </article>
  );
}
