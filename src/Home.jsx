import Navbar from "./components/Navbar";
import ScrollHero from "./components/hero/ScrollHero";
import NextSection from "./components/hero/NextSection";
import VAGOLoader from "./components/hero/VAGOLoader";

export default function Home() {
  return (
    <VAGOLoader>
      <main className="overflow-x-hidden bg-[#061B55]">
        <Navbar />
        <ScrollHero />
        <NextSection />
      </main>
    </VAGOLoader>
  );
}
