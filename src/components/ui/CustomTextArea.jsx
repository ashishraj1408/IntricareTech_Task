import { Input } from "antd";

const { TextArea } = Input;

function CustomTextArea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <TextArea
        className="!rounded-md !text-sm"
        {...props}
      />
    </div>
  );
}

export default CustomTextArea;
