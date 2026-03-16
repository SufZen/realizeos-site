export function Accessibility() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
      <div className="text-muted-foreground mb-8">
        Last Updated: March 16, 2026
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Commitment</h2>
        <p className="text-muted-foreground">
          <strong>Realization, Unipessoal LDA</strong> is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards, in compliance with the European Accessibility Act (EAA — Directive (EU) 2019/882) and Portuguese accessibility requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Conformance Status</h2>
        <p className="text-muted-foreground">
          The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. The RealizeOS website (<a href="https://realizeos.ai" className="text-primary hover:underline">realizeos.ai</a>) aims to be fully conformant with <strong>WCAG 2.1 Level AA</strong>.
        </p>
        <p className="text-muted-foreground mt-4">
          We recognize that some areas of the website may not yet be fully accessible. We are actively working to identify and resolve any issues.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Measures Taken</h2>
        <p className="text-muted-foreground">
          Realization, Unipessoal LDA takes the following measures to ensure accessibility of the RealizeOS website:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>Include accessibility as part of our mission and development process.</li>
          <li>Provide accessible alternatives for visual and interactive content where possible.</li>
          <li>Ensure sufficient color contrast across both light and dark mode themes.</li>
          <li>Use semantic HTML elements and ARIA landmarks for assistive technology support.</li>
          <li>Provide keyboard navigation for all interactive elements.</li>
          <li>Continuously test with automated tools and aim to incorporate user feedback.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Feedback</h2>
        <p className="text-muted-foreground">
          We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li><strong>Email:</strong> <a href="mailto:Info@realizeos.ai" className="text-primary hover:underline">Info@realizeos.ai</a></li>
          <li><strong>Phone:</strong> <a href="tel:+351933904208" className="text-primary hover:underline">+351 933 904 208</a></li>
          <li><strong>Address:</strong> Largo Jose Afonso 44, Setúbal, Portugal</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          We try to respond to accessibility feedback within 5 business days and will work to resolve any issues as quickly as possible.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Compatibility</h2>
        <p className="text-muted-foreground">
          Our website is designed to be compatible with the following assistive technologies:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>Screen readers (e.g., NVDA, JAWS, VoiceOver).</li>
          <li>Screen magnification software.</li>
          <li>Speech recognition software.</li>
          <li>Keyboard-only navigation.</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          The website is designed to work with the latest versions of major web browsers, including Chrome, Firefox, Safari, and Edge. It may not display optimally on older or unsupported browsers (e.g., Internet Explorer).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Technical Specifications</h2>
        <p className="text-muted-foreground">
          Accessibility of this website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li>HTML5</li>
          <li>WAI-ARIA (Web Accessibility Initiative — Accessible Rich Internet Applications)</li>
          <li>CSS3</li>
          <li>JavaScript (ECMAScript 2020+)</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          These technologies are relied upon for conformance with the accessibility standards used.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitations and Alternatives</h2>
        <p className="text-muted-foreground">
          Despite our best efforts to ensure accessibility, there may be some limitations. Below is a description of known limitations and potential solutions:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
          <li><strong>Third-party content:</strong> Some embedded content from third parties may not fully meet accessibility standards. We work with our partners to encourage accessible content.</li>
          <li><strong>Dynamic content:</strong> Some highly interactive or animated elements may present challenges for certain assistive technologies. We provide alternative navigation paths where possible.</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          If you encounter content that is not accessible to you, please contact us and we will do our best to provide the information in an alternative format.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Enforcement Procedure</h2>
        <p className="text-muted-foreground">
          If you are not satisfied with our response to your accessibility feedback, you may contact the Portuguese Institute for Consumer Protection (Instituto Português do Consumidor) or the relevant national enforcement body to file a complaint regarding digital accessibility under the European Accessibility Act.
        </p>
      </section>
    </article>
  );
}
