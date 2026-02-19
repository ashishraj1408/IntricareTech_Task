import { useEffect, useState, useCallback } from "react";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  createProduct,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- Fetch All Products ---------------- */

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------- Fetch By Category ---------------- */

  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductsByCategory(category);
      setProducts(data);
    } catch {
      setError("Failed to fetch category products");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Fetch Categories ---------------- */

  const getCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      console.log("Failed to fetch categories");
    }
  }, []);

  /* ---------------- Add ---------------- */

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      setError("Failed to create product");
      throw err;
    }
  };

  /* ---------------- Update ---------------- */

  const updateProduct = async (productData) => {
    try {
      const updated = await updateProductService(
        productData.id,
        productData
      );

      setProducts((prev) =>
        prev.map((item) =>
          item.id === productData.id
            ? { ...item, ...updated }
            : item
        )
      );

      return updated;
    } catch (err) {
      setError("Failed to update product");
      throw err;
    }
  };

  /* ---------------- Delete ---------------- */

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id);
      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError("Failed to delete product");
      throw err;
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  return {
    products,
    categories,
    loading,
    error,
    getProducts,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
