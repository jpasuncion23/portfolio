"use client";

import { useEffect, useState } from "react";
import { nav, navCta, profile } from "@/lib/data";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const initials = getInitials(profile.name);

// "top" is the hero; observing it clears the highlight when scrolled back up.
const observedIds = ["top", ...nav.map((item) => item.href.slice(1))];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the link for whichever section crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of observedIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: Esc closes it, and so does widening the
  // window past the md breakpoint (e.g. rotating a tablet), where it's hidden.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Dims the page behind the mobile menu; tapping it closes the menu. */}
      {open && (
        <div
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
        />
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          open
            ? "border-border bg-background"
            : scrolled
              ? "border-border bg-background/80 backdrop-blur-md"
              : "border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            onClick={close}
            className="flex min-h-11 min-w-11 items-center gap-2.5 rounded-lg font-semibold tracking-tight"
          >
            <span className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-sm font-semibold text-accent">
              {initials}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-md px-3 text-sm transition-colors",
                        isActive ? "text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {isActive && <span className="absolute inset-x-3 bottom-1 h-px bg-accent" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="grid size-11 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground md:size-10" />
            <div className="hidden md:block">
              <Button href="#contact" size="sm">
                {navCta}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-lg border border-border text-foreground md:hidden"
            >
              {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </Container>

        <div id="mobile-menu" className={cn("border-t border-border md:hidden", !open && "hidden")}>
          <Container>
            <nav aria-label="Mobile">
              <ul className="flex flex-col py-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "block rounded-md py-3 text-base transition-colors",
                        active === item.href.slice(1) ? "text-accent" : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href="#contact" onClick={close} className="mb-4 w-full">
              {navCta}
            </Button>
          </Container>
        </div>
      </header>
    </>
  );
}
