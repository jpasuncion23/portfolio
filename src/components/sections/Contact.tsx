import { contact, contactSection, profile } from "@/lib/data";
import { gmailComposeUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, DownloadIcon, ExternalLinkIcon, MailIcon, MapPinIcon, contactIcons } from "@/components/ui/icons";

export default function Contact() {
  const email = contact.find((link) => link.icon === "email");
  const others = contact.filter((link) => link !== email);

  return (
    <Section
      id="contact"
      eyebrow={contactSection.eyebrow}
      title={contactSection.title}
      description={contactSection.description}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {email && (
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                <MailIcon className="size-3.5" />
                {contactSection.emailLabel}
              </p>
              {/* Plain text, not a mailto: link, so clicking it never silently does nothing. */}
              <p className="mt-4 text-xl font-semibold tracking-tight break-all select-all sm:text-3xl">{email.display}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={gmailComposeUrl(email.display, contactSection.emailSubject)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactSection.sendEmail}
                  <ExternalLinkIcon />
                </Button>
                <CopyButton text={email.display} label={contactSection.copyEmail} copiedLabel={contactSection.copiedEmail} />
                <Button href={email.href} variant="ghost">
                  <MailIcon />
                  {contactSection.emailApp}
                </Button>
              </div>

              <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-10 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="size-3.5" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {profile.availability}
                </span>
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <ul className="space-y-3">
            {others.map((link) => {
              const Icon = contactIcons[link.icon];
              return (
                <li key={link.label}>
                  <ContactRow href={link.href} external icon={<Icon className="size-5" />} title={link.label} detail={link.display} />
                </li>
              );
            })}
            <li>
              <ContactRow
                href={profile.cvPath}
                icon={<DownloadIcon className="size-5" />}
                title={contactSection.cvTitle}
                detail={contactSection.cvDescription}
              />
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({
  href,
  icon,
  title,
  detail,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/40 hover:bg-surface"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-muted transition-colors group-hover:text-accent">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm break-words text-muted">{detail}</span>
      </span>
      {external ? (
        <ExternalLinkIcon className="text-muted transition-colors group-hover:text-accent" />
      ) : (
        <ArrowRightIcon className="text-muted transition-colors group-hover:text-accent" />
      )}
    </a>
  );
}
