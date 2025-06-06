// //React Imports

// import ProjectDetails from '@/components/projects/ProjectDetails'
// import React from 'react'

// //MUI imports

// const ProjectInfoPage: React.FC = () => {
//   return (
//     <>
//       <div className='max-w-full' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
//         <div>
//           <ProjectDetails/>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ProjectInfoPage

"use client";

// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import ProjectDetails from "@/components/projects/ProjectDetails";

import Head from "next/head";

function page({ params }: { params: { id: string } }) {
 // // console.log(params.id)
  // const id = params.slug
  // Vars

  return(
    <div className="bg-white">
    <Head>
      <title>Home | Projects</title>
    </Head>
   {/* <Header /> */} 

   <div className="category-section mx-auto pb-10">

      <ProjectDetails id={params.id}/>
    </div>

   {/* <Footer /> */}
  </div>
  ); 
}

export default page
