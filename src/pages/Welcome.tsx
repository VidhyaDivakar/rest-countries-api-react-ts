import Nav from "../components/common/Nav";
import HeroSection from "../components/welcome/HeroSection";
import FeatureCountries from "../components/welcome/FeaturedCountries";
import Signupform from "../components/welcome/SignupForm";

export default function Welcome() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <FeatureCountries />
        <Signupform />
      </main>
    </>
  );
}
