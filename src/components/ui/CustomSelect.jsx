import { Select } from "antd";

function CustomSelect({
  label,
  required = false,
  options = [],
  error,
  ...props
}) {
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

      <Select
        className="w-full"
        status={error ? "error" : ""}
        showSearch
        optionFilterProp="label"
        options={options}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default CustomSelect;
