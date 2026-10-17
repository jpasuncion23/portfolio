import { contact, profile } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ArrowUpIcon, contactIcons } from "@/components/ui/icons";

// Cached so prerendering can read the clock (Cache Components forbids uncached `new Date()`).
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await currentYear();

  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {year} {profile.name}
        </p>

        <div className="flex items-center gap-2">
          {contact.map((link) => {
            const Icon = contactIcons[link.icon];
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <Icon />
              </a>
            );
          })}
          <a
            href="#top"
            className="ml-2 inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <ArrowUpIcon />
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
