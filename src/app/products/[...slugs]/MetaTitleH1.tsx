"use client";
import { useEffect, useState } from "react";

export default function MetaTitleH1() {
  // This client component will read the document.title and render it as a visually hidden h1
  const [metaTitle, setMetaTitle] = useState('');
  useEffect(() => {
    setMetaTitle(document.title);
  }, []);
  return <h1 className="sr-only">{metaTitle}</h1>;
} 