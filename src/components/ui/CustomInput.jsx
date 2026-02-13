import { Input } from "antd";

function CustomInput({ label, required = false, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      <Input
        className="border border-gray-300 rounded-md  text-sm 
                    transition"
        {...props}
      />
    </div>
  );
}

export default CustomInput;

