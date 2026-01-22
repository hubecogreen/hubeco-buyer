import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
// import FiltersSidebar from "./Filters/ProductsFilter";
// import VendorProducts from "./VendorProducts";
import VendorProjects from "./VendorProjects";
import ProductGrid from "./VendorProducts";
// import { Skeleton } from "../ui/skeleton";

export default function CustomTabs({ id , searchTerm}: any) {
  
  // console.log('search term in tabs', searchTerm)
  return (
    <Tabs defaultValue="products" className="w-full px-20">
      {/* Tabs List */}
      <TabsList className="flex rounded-lg">
        <TabsTrigger
          value="products"
          className={cn(
            "px-4 py-2 text-brown transition-colors duration-200 text-[20px]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
            "data-[state=active]:bg-[#B906471A] data-[state=active]:text-[#B90647] font-semibold"
          )}
        >
          Products
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className={cn(
            "px-4 py-2 transition-colors duration-200 text-[#404040] text-[20px]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
            "data-[state=active]:bg-[#B906471A] data-[state=active]:text-[#B90647] font-semibold"
          )}
        >
          Projects
        </TabsTrigger>
      </TabsList>

      {/* Products Tab Content */}
      <TabsContent
        value="products"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6"
      >
        {/* <div className="col-span-12 lg:col-span-3">
          <FiltersSidebar />
        </div> */}

        <div className="col-span-12 lg:col-span-12">
          <ProductGrid id={id} searchTerm={searchTerm}/>
        </div>
      </TabsContent>

      {/* Projects Tab Content */}
      <TabsContent
        value="projects"
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 no-extra-space"
      >
        {/* <div className="col-span-12 lg:col-span-3">
          <FiltersSidebar />
        </div> */}

        <div className="col-span-12 lg:col-span-12">
          <VendorProjects id={id} searchTerm={searchTerm}/>
        </div>
      </TabsContent>
    </Tabs>
  );
}
