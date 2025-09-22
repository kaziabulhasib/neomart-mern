import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);

      // ✅ CORRECTED LINE: Use the updater function pattern
      set((state) => ({
        products: [...state.products, res.data.product], // Access products via the 'state' argument
        loading: false,
      }));

      toast.success("Product created successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to create product.";
      toast.error(errorMessage);
      set({ loading: false });
      console.log(error);
    }
  },
}));
