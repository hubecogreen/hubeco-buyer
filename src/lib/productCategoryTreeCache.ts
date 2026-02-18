import store from "@/reduxStore";
import * as getEndpoint from "@/network/EndPoints";
import { saveCategories } from "@/reduxStore/slices/masterDataSlice";

let inFlightCategoryTreeRequest: Promise<any[]> | null = null;

const getCachedCategories = () => {
  const categories = store.getState()?.masterData?.categories;
  return Array.isArray(categories) ? categories : [];
};

export const getProductCategoryTree = async (
  callApi: (endpoint: string, method: string, payload?: any) => Promise<any>,
  options?: { force?: boolean }
) => {
  const force = options?.force ?? false;

  const cached = getCachedCategories();
  if (!force && cached.length > 0) {
    return cached;
  }

  if (inFlightCategoryTreeRequest) {
    return inFlightCategoryTreeRequest;
  }

  inFlightCategoryTreeRequest = (async () => {
    try {
      const result = await callApi(getEndpoint.default.PRODUCTS_CATEGORIES, "GET");
      const data = result?.data;

      if (Array.isArray(data) && data.length > 0) {
        store.dispatch(saveCategories(data));
        return data;
      }

      return cached;
    } finally {
      inFlightCategoryTreeRequest = null;
    }
  })();

  return inFlightCategoryTreeRequest;
};

