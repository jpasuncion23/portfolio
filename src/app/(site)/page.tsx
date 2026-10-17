import { contact, hero, profile } from "@/lib/data";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
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

// Temporary stand-in so a nav link has somewhere to go. Each is replaced as its section is built.
function ComingSoon({ id, label }: { id: string; label: string }) {
  return (
    <Section
      id={id}
      eyebrow={label}
      title={`${label} section`}
      description="Coming soon."
      className="min-h-[60svh]"
    />
  );
}

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />
      <ComingSoon id="about" label="About" />
      <Work />
      <ComingSoon id="skills" label="Skills" />
      <ComingSoon id="contact" label="Contact" />
    </main>
  );
}
