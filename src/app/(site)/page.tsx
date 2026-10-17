import { contact, hero, nav, profile } from "@/lib/data";
import Hero from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

// Structured data so search engines know this page is about a person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.siteDescription,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  knowsAbout: hero.stack,
  email: contact.find((link) => link.icon === "email")?.href,
  sameAs: contact.filter((link) => link.href.startsWith("http")).map((link) => link.href),
};

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />

      {/* Temporary stand-ins so the nav links have somewhere to go. Replaced as each section is built. */}
      {nav.map((item) => (
        <Section
          key={item.href}
          id={item.href.slice(1)}
          eyebrow={`// ${item.label.toLowerCase()}`}
          title={`${item.label} section`}
          description="Coming soon."
          className="min-h-[60svh]"
        />
      ))}
    </main>
  );
}
