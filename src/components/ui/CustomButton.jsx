import { Button } from "antd";

function CustomButton({ children, variant = "primary", className = "", ...props }) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition duration-200";



  return (
    <Button
      className={`${base}  ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
