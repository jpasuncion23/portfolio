/**
 * Fixed backdrop behind the whole one-page site: a fine dot pattern that fades
 * out downward, with soft teal and indigo glows. Colours come from the theme
 * tokens, so it adapts to light and dark mode.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-dots absolute inset-0" />
      <div className="absolute -top-48 left-[10%] h-[30rem] w-[42rem] max-w-[90vw] rounded-full bg-accent/15 blur-[110px]" />
      <div className="absolute -top-24 right-[-8rem] h-[26rem] w-[34rem] max-w-[80vw] rounded-full bg-glow/15 blur-[110px]" />
      <div className="absolute bottom-[-12rem] left-[-10rem] h-[24rem] w-[32rem] max-w-[80vw] rounded-full bg-glow/10 blur-[120px]" />
    </div>
  );
}
