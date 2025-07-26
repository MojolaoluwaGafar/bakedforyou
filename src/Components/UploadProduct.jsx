import UploadProductForm from "../Components/ProductUploadForm";
import axios from "axios";
import toast from "react-hot-toast";

const UploadProduct = () => {
  const handleSubmit = async (formData) => {
    try {
        const token = localStorage.getItem("token");
      const res = await axios.post(
  "http://localhost:5050/api/products/upload",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  }
);console.log("TOKEN:", token);

      toast.success("Product uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#006d77]">
        Upload a Product
      </h2>
      <UploadProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadProduct;
