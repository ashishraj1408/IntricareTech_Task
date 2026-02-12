import AppLayout from "../../components/layout/AppLayout";
import { useProducts } from "../../hooks/useProducts";
import Card from "../../components/ui/Card";
import { Spin, Empty, Alert } from "antd";

function Products() {
  const { products, loading, error } = useProducts();

  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold mb-6">
        Products
      </h2>

      {loading && (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      )}

      {!loading && !error && products.length === 0 && (
        <Empty description="No products found" />
      )}

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
