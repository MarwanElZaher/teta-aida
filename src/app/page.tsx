import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
