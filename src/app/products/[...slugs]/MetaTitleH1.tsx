
export default async function MetaTitleH1({
  params,
  searchParams
}: {
  params: { slugs?: string[] },
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<JSX.Element> {

async function fetchH1Tag(searchParams: { [key: string]: string | string[] | undefined }) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const ccid = searchParams.ccid;
  const scid = searchParams.scid;

  try {
    if (scid && typeof scid === "string") {
      const res = await fetch(`${baseURL}/subcategories/getSubcategoryByIdPublic/${scid}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        return data?.h1Tag || null;
      }
    } else if (ccid && typeof ccid === "string") {
      const res = await fetch(`${baseURL}/childCategories/getChildCategoryByIdPublic/${ccid}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        return data?.h1Tag || null;
      }
    }
  } catch (err) {
    console.error("Error fetching h1Tag:", err);
  }

  return null;
}
  const h1Tag = await fetchH1Tag(searchParams);

  return (
    <h1 className="sr-only">{h1Tag}</h1>
  );
}
