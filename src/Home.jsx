import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import PurchaseShowcase from "./components/hero/PurchaseShowcase";
import NextSection from "./components/hero/NextSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#08080c]">
      <Navbar />
      <Hero />
      <PurchaseShowcase />
      <NextSection />
    </main>
  );
}


