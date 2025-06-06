import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  keywords?: any;
};

function Meta({ title, subtitle, description, keywords }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title}
          {subtitle ? ` | ${subtitle}` : ""}
        </title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
    </>
  );
}

export default Meta;
