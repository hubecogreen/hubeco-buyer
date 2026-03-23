import dynamic from "next/dynamic";
import HeroSection from "@/components/home/hero/heroSection";
import GreenFinancing from "./financing/GreenFinancing";
import CategoryList from "../categories/CategoryList";

const TrustedBy = dynamic(() => import("./Trusts/TrustedBy"), {
  loading: () => <div className="min-h-[180px]" />,
});

const WorksSection = dynamic(() => import("./works/Works"), {
  loading: () => <div className="min-h-[280px]" />,
});

const CallToActionSection = dynamic(() => import("./actions/CallToActionSection"), {
  loading: () => <div className="min-h-[180px]" />,
});

const ProcureSection = dynamic(() => import("./procurement/ProcureSection"), {
  loading: () => <div className="min-h-[180px]" />,
});

const PartnersSection = dynamic(() => import("./partners/PartnersSection"), {
  loading: () => <div className="min-h-[180px]" />,
});

const BlogsSection = dynamic(() => import("./blogs/BlogSection"), {
  loading: () => <div className="min-h-[220px]" />,
});

const ContactSection = dynamic(() => import("./contacts/ContactSection"), {
  loading: () => <div className="min-h-[220px]" />,
});

const HomePage = () => {
  return (
    <div className="bg-cream">
      {/* Optimize for Speed Index - Load everything immediately but efficiently */}
      <div className="banner-section mx-auto md:h-full ">
        <HeroSection />
      </div>

      <div className="category-section mx-auto">
        <CategoryList />
        </div>

      {/* <div className="featured-section mx-auto md:pb-10 md:m-w-full">
        <FeaturedProducts />
      </div> */}

      {/* <div className="brands-section mx-auto">
        <BrandsSection />
      </div> */}
      <div className="green-financing-section mx-auto">
        <GreenFinancing />
      </div>
      <div className="trusted-section mx-auto bg-cream">
        <TrustedBy />
      </div>
         <div className="works-section mx-auto bg-cream">
        <WorksSection />
      </div>

      {/* <div className="projects-section mx-auto relative flex items-center justify-center pt-[30px] bg-[url('/images/home/bg5.webp')] bg-top bg-no-repeat bg-cover">
        <ProjectsSection />
      </div> */}
      
      <div className="calltoaction-section mx-auto  bg-cream">
        <CallToActionSection />
      </div>
      <div className="procure-section mx-auto  bg-cream">
        <ProcureSection />
      </div>
      <div className="partners-section mx-auto   ">
        <PartnersSection />
      </div>
      <div className="blogs-section mx-auto">
        <BlogsSection />
      </div>
      <div className="contact-section mx-auto   bg-cream">
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
