import React from "react";
import { AiFillHome } from "react-icons/ai";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

function BreadCrumb({ breadcrumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="banner-section">
      <div className="relative md:flex block md:justify-start justify-center items-center md:px-20 px-3 bg-[url('/images/about/aboutBanner1.png')] bg-cover bg-center h-[100px] md:h-[200px] flex items-center justify-start text-white">
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex flex-wrap text-white text-sm md:text-md items-center"
        >
          {breadcrumbs.map((item, idx) => (
            <li
              key={item.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              <span className="flex items-center">
                {idx === 0 && <AiFillHome size={16} className="text-white mr-1.5" />}
                <span itemProp="name">{item.name}</span>
              </span>
              <meta itemProp="position" content={String(idx + 1)} />
              {idx < breadcrumbs.length - 1 && (
                <span className="mx-[2px] md:mx-2">/</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default BreadCrumb;
