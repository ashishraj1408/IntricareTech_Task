import AppLayout from "../components/layout/AppLayout";
import { SettingOutlined } from "@ant-design/icons";

function Setting() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        
        <SettingOutlined className="text-5xl text-gray-300 mb-6" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Settings
        </h2>

        <p className="text-gray-500">
          This feature is coming soon.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Stay tuned for upcoming updates.
        </p>

      </div>
    </AppLayout>
  );
}

export default Setting;
