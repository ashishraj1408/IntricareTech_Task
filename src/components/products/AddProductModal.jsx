import { useState } from "react";
import { Modal, Input, InputNumber, Select, Button } from "antd";

const { Option } = Select;

function AddProductModal({
  open,
  onClose,
  onAdd,
  notificationApi,
}) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.price ||
      !formData.category
    ) {
      notificationApi.error({
        message: "Validation Error",
        description: "Please fill all required fields.",
      });
      return;
    }

    try {
      await onAdd({
        ...formData,
        image: "https://i.pravatar.cc",
      });

      notificationApi.success({
        message: "Success",
        description: "Product added successfully.",
      });

      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
      });

      onClose();
    } catch (err) {
      notificationApi.error({
        message: "Error",
        description: "Failed to add product.",
      });
    }
  };

  return (
    <Modal
      title="Add New Product"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) =>
            handleChange("title", e.target.value)
          }
        />

        <InputNumber
          placeholder="Price"
          className="w-full"
          value={formData.price}
          onChange={(value) =>
            handleChange("price", value)
          }
        />

        <Input.TextArea
          rows={3}
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
        />

        <Select
          placeholder="Select Category"
          value={formData.category}
          onChange={(value) =>
            handleChange("category", value)
          }
        >
          <Option value="electronics">Electronics</Option>
          <Option value="jewelery">Jewelery</Option>
          <Option value="men's clothing">Men's Clothing</Option>
          <Option value="women's clothing">Women's Clothing</Option>
        </Select>

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;
