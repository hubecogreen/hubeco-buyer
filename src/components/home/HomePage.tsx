import ImageSlider from "@/components/home/imageCarousel/Swiper";
import CategorySection from "@/components/home/categories/Category";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import BrandsSection from "@/components/home/brands/BrandsSection";
import ProjectsSection from "@/components/home/projects/ProjectSection";
import BlogsSection from "@/components/home/blogs/BlogSection";
import WorksSection from "@/components/home/works/Works";

const HomePage = () => {
  return (
    <div className="bg-white">
      <div className="banner-section  mx-auto h-64 md:h-full max-w-full">
        <ImageSlider />
      </div>
      <div></div>
      <div className="category-section pt-20  mx-auto pb-10">
        <CategorySection />
      </div>
      <div className="featured-section  mx-auto md:pb-10 md:m-w-full">
        <FeaturedProducts />
      </div>
      <div className="brands-section  mx-auto  ">
        <BrandsSection />
      </div>
      <div className="works-section  mx-auto  ">
        <WorksSection />
      </div>
      <div className="projects-section mx-auto relative flex items-center justify-center pt-[30px] bg-[url('/images/home/bg5.webp')] bg-top bg-no-repeat bg-cover">
        <ProjectsSection />
      </div>

      <div className="blogs-section  mx-auto  ">
        <BlogsSection />
      </div>
    </div>
  );
};

export default HomePage;
