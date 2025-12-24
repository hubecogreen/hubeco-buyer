import ImageSlider from "@/components/home/imageCarousel/Swiper";
import CategorySection from "@/components/home/categories/Category";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import BrandsSection from "@/components/home/brands/BrandsSection";
import ProjectsSection from "@/components/home/projects/ProjectSection";
import BlogsSection from "@/components/home/blogs/BlogSection";
import WorksSection from "@/components/home/works/Works";
import ContactSection from "./contacts/ContactSection";
import PartnersSection from "./partners/PartnersSection";
import CallToActionSection from "./actions/CallToActionSection";
import ProcureSection from "./procurement/ProcureSection";
import TrustedBy from "./Trusts/TrustedBy";
import GreenFinancing from "./financing/GreenFinancing";
import CategoryList from "../categories/CategoryList";

const HomePage = () => {
  return (
    <div className="bg-cream">
      {/* Optimize for Speed Index - Load everything immediately but efficiently */}
      <div className="banner-section mx-auto md:h-full ">
        <ImageSlider />
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
      
      <div className="calltoaction-section mx-auto pt-10 bg-cream">
        <CallToActionSection />
      </div>
      <div className="procure-section mx-auto pt-10 bg-cream">
        <ProcureSection />
      </div>
      <div className="partners-section mx-auto">
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
