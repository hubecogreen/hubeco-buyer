import dynamic from 'next/dynamic';
import ImageSlider from "@/components/home/imageCarousel/Swiper";
import CategorySection from "@/components/home/categories/Category";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
// Lazy load non-critical sections for better Speed Index
const LazyBrandsSection = dynamic(() => import("@/components/home/brands/BrandsSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
});

const LazyWorksSection = dynamic(() => import("@/components/home/works/Works"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
});

const LazyProjectsSection = dynamic(() => import("@/components/home/projects/ProjectSection"), {
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
});

const LazyBlogsSection = dynamic(() => import("@/components/home/blogs/BlogSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
});

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Critical Above-the-fold Content - Load Immediately */}
      <div className="banner-section mx-auto h-64 md:h-full max-w-full">
        <ImageSlider />
      </div>
      
      <div className="category-section pt-20 mx-auto pb-10">
        <CategorySection />
      </div>
      
      <div className="featured-section mx-auto md:pb-10 md:m-w-full">
        <FeaturedProducts />
      </div>

      {/* Below-the-fold Content - Lazy Loaded for Better Speed Index */}
      <div className="brands-section mx-auto">
        <LazyBrandsSection />
      </div>
      
      <div className="works-section mx-auto">
        <LazyWorksSection />
      </div>
      
      <div className="projects-section mx-auto relative flex items-center justify-center pt-[30px] bg-[url('/images/home/bg5.webp')] bg-top bg-no-repeat bg-cover">
        <LazyProjectsSection />
      </div>

      <div className="blogs-section mx-auto">
        <LazyBlogsSection />
      </div>
    </div>
  );
};

export default HomePage;
