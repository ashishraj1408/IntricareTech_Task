import { useState, useEffect } from "react";
import { notification, Button, Spin, Empty, Alert } from "antd";
import { useLocation } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import AddProductModal from "../components/products/AddProductModal";
import { useProducts } from "../hooks/useProducts";

function Products() {
    const { products, loading, error, addProduct } = useProducts();

    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    console.log("Location State:", location.state);

    useEffect(() => {
        if (location.state?.openModal) {
            setModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);




    return (
        <AppLayout>
            {contextHolder}

            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Products
                </h2>

                <Button
                    type="primary"
                    onClick={() => setModalOpen(true)}
                >
                    Add Product
                </Button>
            </div>

            {/* Add Product Modal */}
            <AddProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={addProduct}
                notificationApi={api}
            />

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-20">
                    <Spin size="large" />
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-6"
                />
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
                <Empty description="No products found" />
            )}

            {/* Products Grid */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-40 object-contain mx-auto mb-4"
                            />

                            <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                                {product.title}
                            </h3>

                            <p className="text-indigo-600 font-bold">
                                ${product.price}
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}

export default Products;
