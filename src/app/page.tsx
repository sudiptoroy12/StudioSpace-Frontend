import StudioHeroSlider from "./components/home/studioslider/StudioHeroSlider";
import StudioCategories from "./components/home/categories/StudioCategories";
import HowItWorks from "./components/home/HowItWorks";
import AboutUs from "./components/home/AboutUs";
import HostGuarantee from "./components/home/HostGuarantee";
import FeaturedStudios from "./components/home/FeaturedStudios";

export default function Home() {
  return (
    <main>
      <StudioHeroSlider />
      <StudioCategories />
      <FeaturedStudios />
      <HowItWorks />
      <HostGuarantee />
      <AboutUs />

      {/* Your existing homepage sections */}
    </main>
  );
}
