import { contact, profile, skills } from "@/lib/data";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";

// Structured data so search engines know this page is about a person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.siteDescription,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  knowsAbout: skills.flatMap((group) => group.skills),
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
      <About />
      <Work />
      <Skills />
      <Contact />
    </main>
  );
}
