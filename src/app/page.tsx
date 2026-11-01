
import StudioHeroSlider from "./components/home/studioslider/StudioHeroSlider";
import StudioCategories from "./components/home/categories/StudioCategories";
import HowItWorks from "./components/home/HowItWorks";
import AboutUs from "./components/home/AboutUs";

export default function Home() {
  return (
       <main>
      <StudioHeroSlider
       />
       <StudioCategories/>
       <HowItWorks/>
       <AboutUs/>

      {/* Your existing homepage sections */}
    </main>

  )
  
}
