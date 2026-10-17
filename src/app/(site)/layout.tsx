import Navbar from "@/components/layout/Navbar";

// Layout for the one-page portfolio. The navbar's #section links only work
// here, so other routes like /cv sit outside this group.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
