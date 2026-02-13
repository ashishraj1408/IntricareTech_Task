import { InputNumber } from "antd";

function CustomInputNumber({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <InputNumber
        className="w-full !rounded-md"
        {...props}
      />
    </div>
  );
}

export default CustomInputNumber;
