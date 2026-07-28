import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import NextSection from "./components/hero/NextSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#08080c]">
      <Navbar />
      <Hero />
      <NextSection />
    </main>
  );
}



