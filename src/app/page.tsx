import Footer from "./_components/Footer";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import HeroSection2 from "./_components/HeroSection2";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
        {/* <div className="h-screen"><Video /></div> */}
        <HeroSection />
        {/* <HeroSection2 /> */}
        <Footer />
      </div>
      <div></div>
    </div>
  );
}
