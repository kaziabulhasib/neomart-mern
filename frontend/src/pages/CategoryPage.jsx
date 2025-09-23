import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

const CategoryPage = () => {
  const { fetchProductByCategory, products } = useProductStore();
  useEffect(() => {
    fetchProductByCategory("jeans");
  }, [fetchProductByCategory]);

  console.log("products from CategoryPage", products);
  return <div>CategoryPage</div>;
};

export default CategoryPage;
