import { useState, useEffect, useMemo } from "react";
import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import CustomTextArea from "../ui/CustomTextArea";
import Button from "../ui/CustomButton";

function AddProductModal({
  open,
  onClose,
  onAdd,
  notificationApi,
  mode = "add",
  initialData = null,
}) {
  const defaultState = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  };

  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  //  Load Edit Data Logic here 
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultState);
    }
    setErrors({});
  }, [initialData, open]);

  /* ---------------- Validation ---------------- */

  const validateField = (field, value) => {
    switch (field) {
      case "title":
        if (!value.trim()) return "Title is required";
        if (value.trim().length < 3)
          return "Title must be at least 3 characters";
        return "";

      case "price":
        if (!value) return "Price is required";
        if (Number(value) <= 0)
          return "Price must be greater than 0";
        return "";

      case "category":
        if (!value) return "Category is required";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    const errorMessage = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    ["title", "price", "category"].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Image Upload Logic here

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageUpload = async (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      notificationApi.error({
        title: "Invalid file type",
        description: "Only JPG, PNG, WEBP allowed",
      });
      return Upload.LIST_IGNORE;
    }

    if (file.size / 1024 / 1024 >= 2) {
      notificationApi.error({
        title: "File too large",
        description: "Image must be smaller than 2MB",
      });
      return Upload.LIST_IGNORE;
    }

    const base64 = await getBase64(file);

    setFormData((prev) => ({
      ...prev,
      image: base64,
    }));

    notificationApi.success({
      title: "Image uploaded successfully",
    });

    return false;
  };

  //  Submit Logic here

  const handleSubmit = async () => {
    const isValid = validateAll();
    if (!isValid) return;

    try {
      setSubmitting(true);

      await onAdd({
        ...formData,
        title: formData.title.trim(),
        price: Number(formData.price),
      });

      notificationApi.success({
        title:
          mode === "add"
            ? "Product created successfully"
            : "Product updated successfully",
      });

      onClose();
    } catch {
      notificationApi.error({
        title: "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  //  Button State Logic here 

  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() &&
      Number(formData.price) > 0 &&
      formData.category
    );
  }, [formData]);

  return (
    <Modal
      title={mode === "add" ? "Add Product" : "Edit Product"}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={520}
    >
      <div className="space-y-4">

        {/* Title */}
        <div>
          <CustomInput
            label="Title"
            required
            value={formData.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <CustomInput
            label="Price"
            required
            type="number"
            value={formData.price}
            onChange={(e) =>
              handleChange("price", e.target.value)
            }
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">
              {errors.price}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <CustomSelect
            label="Category"
            required
            value={formData.category}
            onChange={(value) =>
              handleChange("category", value)
            }
            options={[
              { label: "Electronics", value: "electronics" },
              { label: "Jewelery", value: "jewelery" },
              { label: "Men's Clothing", value: "men's clothing" },
              { label: "Women's Clothing", value: "women's clothing" },
            ]}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category}
            </p>
          )}
        </div>

        {/* Description */}
        <CustomTextArea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
        />

        {/* Image Upload here */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Image (Optional)
          </label>

          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={handleImageUpload}
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt="preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div>
                <PlusOutlined />
                <div className="mt-2 text-sm">Upload</div>
              </div>
            )}
          </Upload>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" danger onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
          >
            {submitting
              ? "Processing..."
              : mode === "add"
                ? "Create"
                : "Update"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;
