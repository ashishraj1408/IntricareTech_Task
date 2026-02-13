import { useEffect, useState, useCallback } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Fetch data here
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  //  Add logic here
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

  //  Update logic here
  const updateProduct = async (productData) => {
    try {
      const updated = await updateProductService(productData.id, productData);

      setProducts((prev) =>
        prev.map((item) =>
          item.id === productData.id ? { ...item, ...updated } : item,
        ),
      );

      return updated;
    } catch (err) {
      setError("Failed to update product");
      throw err;
    }
  };

  //  Delete logic
  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id);

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete product");
      throw err;
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    loading,
    error,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
