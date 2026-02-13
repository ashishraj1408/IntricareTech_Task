import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Setting = lazy(() => import("./pages/Setting"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
