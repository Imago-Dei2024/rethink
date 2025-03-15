import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statistics from "@/components/Statistics";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import ServiceComparison from "@/components/ServiceComparison";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Team from "@/components/Team";
import PatientResources from "@/components/PatientResources";
import InsuranceInfo from "@/components/InsuranceInfo";
import PatientPortalPreview from "@/components/PatientPortalPreview";
import BlogPreview from "@/components/BlogPreview";
import WellnessShopPreview from "@/components/WellnessShopPreview";
import MobileAppTeaser from "@/components/MobileAppTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AboutPreview />
      <ServicesPreview />
      <Statistics />
      <Team />
      <ServiceComparison />
      <PatientResources />
      <InsuranceInfo />
      <PatientPortalPreview />
      <BlogPreview />
      <WellnessShopPreview />
      <MobileAppTeaser />
      <Testimonials />
      <CTA />
    </>
  );
}
