import { useEffect, useState } from "react";
import {
  notification,
  Button,
  Empty,
  Alert,
  Pagination,
  Input,
  Popconfirm,
} from "antd";
import { useLocation, useSearchParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import AddProductModal from "../components/products/AddProductModal";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";
import CustomSelect from "../components/ui/CustomSelect";

const { Search } = Input;

function Products() {
  const {
    products,
    categories,
    loading,
    error,
    getProducts,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------------- CATEGORY ---------------- */

  const rawCategory = searchParams.get("category");
  const selectedCategory =
    !rawCategory || rawCategory === "undefined" ? "all" : rawCategory;

  /* ---------------- SEARCH ---------------- */

  const searchQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 500);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  /* ---------------- SEARCH SYNC ---------------- */

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    setSearchParams(params);
  }, [debouncedSearch]);

  /* ---------------- FILTER ---------------- */

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */

  const pageSize = 8;
  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  useEffect(() => {
    const maxPage = Math.ceil(filteredProducts.length / pageSize) || 1;

    if (currentPage > maxPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params);
    }
  }, [filteredProducts.length]);

  /* ---------------- AUTO MODAL ---------------- */

  useEffect(() => {
    if (location.state?.openModal) {
      setModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  /* ---------------- CATEGORY CHANGE ---------------- */

  const handleCategoryChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value === "all") {
      params.delete("category");
      getProducts();
    } else {
      params.set("category", value);
      getProductsByCategory(value);
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      api.success({ message: "Product deleted successfully" });
    } catch {
      api.error({ message: "Failed to delete product" });
    }
  };

  return (
    <AppLayout>
      {contextHolder}

      {/* FILTER SECTION */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Search
            placeholder="Search products..."
            allowClear
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full sm:w-64"
          />

          <CustomSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="min-w-[200px]"
            options={[
              { label: "All Categories", value: "all" },
              ...categories.map((cat) => ({
                label: cat,
                value: cat,
              })),
            ]}
          />
        </div>

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </div>

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <p className="text-sm text-gray-500">
          Manage your product inventory
        </p>
      </div>

      {/* MODAL */}
      <AddProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onAdd={selectedProduct ? updateProduct : addProduct}
        notificationApi={api}
        mode={selectedProduct ? "edit" : "add"}
        initialData={selectedProduct}
      />

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-2" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}

      {/* EMPTY */}
      {!loading && !error && filteredProducts.length === 0 && (
        <Empty
          description={
            searchQuery
              ? `No results found for "${searchQuery}"`
              : "No products found"
          }
        />
      )}

      {/* GRID */}
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-400 capitalize">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{product.price}
                    </p>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalOpen(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition"
                      >
                        <EditOutlined />
                      </button>

                      <Popconfirm
                        title="Delete Product"
                        description="Are you sure you want to delete this product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(product.id)}
                      >
                        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-500 hover:text-red-500 transition">
                          <DeleteOutlined />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProducts.length}
              onChange={(page) => {
                const params = new URLSearchParams(searchParams);
                params.set("page", page.toString());
                setSearchParams(params);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default Products;
