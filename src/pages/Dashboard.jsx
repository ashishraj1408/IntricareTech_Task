import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingOutlined,
  AppstoreOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/CustomButton";
import { useProducts } from "../hooks/useProducts";
import { Spin } from "antd";

function Dashboard() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  const totalProducts = products.length;

  const totalCategories = useMemo(() => {
    const categories = new Set(products.map(p => p.category));
    return categories.size;
  }, [products]);

  const totalRevenue = useMemo(() => {
    return products
      .reduce((acc, curr) => acc + curr.price, 0)
      .toFixed(2);
  }, [products]);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SectionHeader
          title="Product Management"
          description="Manage your products efficiently"
        />

        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/products", { state: { openModal: true } })}
        >
          <PlusOutlined />
          Add Product
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <Card className="hover:shadow-md transition duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">
                    {totalProducts}
                  </p>
                </div>

                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl">
                  <ShoppingOutlined />
                </div>
              </div>
            </Card>

            {/* Active Categories */}
            <Card className="hover:shadow-md transition duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Active Categories
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {totalCategories}
                  </p>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                  <AppstoreOutlined />
                </div>
              </div>
            </Card>

            {/* Revenue */}
            <Card className="hover:shadow-md transition duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Revenue
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    ₹{totalRevenue}
                  </p>
                </div>

                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xl">
                  <DollarOutlined />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity Placeholder */}
          <div className="mt-12">
            <Card>
              <h3 className="text-lg font-semibold mb-2">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500">
                Product updates and recent changes will appear here.
              </p>
            </Card>
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default Dashboard;
