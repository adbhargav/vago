import Navbar from "./components/Navbar";
import ScrollHero from "./components/hero/ScrollHero";
import NextSection from "./components/hero/NextSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#061B55]">
      <Navbar />
      <ScrollHero />
      <NextSection />
    </main>
  );
}
