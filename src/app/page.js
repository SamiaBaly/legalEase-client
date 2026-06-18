import FeaturedLawyers from "@/componants/home/FeaturedLawyers";
import Hero from "@/componants/home/Hero";
import LegalCategories from "@/componants/home/LegalCategories";
import TopExperts from "@/componants/home/TopExperts";
import { div } from "framer-motion/client";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedLawyers />
      <LegalCategories />
      <TopExperts/>
    </div>
  );
}
