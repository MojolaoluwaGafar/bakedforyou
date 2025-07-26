import { useState } from "react";
import Button from "../Components/Button";
import toast from "react-hot-toast";

const UploadProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setProduct((prev) => ({
        ...prev,
        images: [...files],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);

    product.images.forEach((img, index) => {
      formData.append("images", img);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow rounded-lg">
      <div>
        <label className="block font-semibold mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="E.g. Chocolate fudge Cake"
          value={product.name}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Describe the product..."
          value={product.description}
          onChange={handleChange}
          className="textarea w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">₦</span>
          <input
            type="number"
            name="price"
            placeholder="5000"
            value={product.price}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Product Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="file-input w-full"
          required
        />
        <p className="text-sm text-gray-500 mt-1">You can upload more than one image.</p>
      </div>

      <Button
        type="submit"
        content="Upload Product"
        className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold mt-2"
      />
    </form>
  );
};

export default UploadProductForm;
