import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SiteBackground from "@/components/layout/SiteBackground";

// Layout for the one-page portfolio. The navbar's #section links only work
// here, so other routes like /cv sit outside this group.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteBackground />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
