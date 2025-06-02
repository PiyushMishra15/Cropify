import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { MdCancel } from "react-icons/md";
import LeafletMap from "../../components/map/LeafletMap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InputTag from "../../components/InputTag";
import useProduct from "../../hooks/useProduct";
import { toast, Bounce } from "react-toastify";

function SellerProduct() {
  const navigate = useNavigate();
  const { operation } = useParams();
  const location = useLocation();
  const productEditData = location.state?.product || null;
  const brandName = localStorage.getItem("brandName");

  const { updateProduct, addProduct } = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = operation === "edit";

  const [lat, setLat] = useState(22.49);
  const [long, setLong] = useState(80.1);

  const [formData, setFormData] = useState({
    image: productEditData?.image || null,
    brandName: brandName || "",
    category: productEditData?.category || "",
    name: productEditData?.name || "",
    description: productEditData?.description || "",
    pricePerUnit: productEditData?.pricePerUnit || "",
    measuringUnit: productEditData?.measuringUnit || "",
    minimumOrderQuantity: productEditData?.minimumOrderQuantity || "",
    location: { coordinates: [long, lat] },
    deliveryRadius: productEditData?.deliveryRadius || "",
    quantity: productEditData?.quantity || "",
    shelfLife: productEditData?.shelfLife || "",
  });

  useEffect(() => {
    if (isEdit && productEditData) {
      const {
        image,
        category,
        name,
        description,
        pricePerUnit,
        measuringUnit,
        minimumOrderQuantity,
        location,
        deliveryRadius,
        quantity,
        shelfLife,
      } = productEditData;

      setFormData({
        image,
        brandName: brandName || "",
        category,
        name,
        description,
        pricePerUnit,
        measuringUnit,
        minimumOrderQuantity,
        location,
        deliveryRadius,
        quantity,
        shelfLife,
      });

      if (location?.coordinates) {
        setLong(location.coordinates[0]);
        setLat(location.coordinates[1]);
      }
    }
  }, [isEdit, productEditData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: { coordinates: [long, lat] },
    }));
  }, [lat, long]);

  const handleSubmit = async () => {
    if (!formData.image) {
      return toast.info("Please upload an image", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "bounce",
      });
    }
    const [lng, latCoord] = formData.location.coordinates;
    if (!latCoord || !lng) {
      return toast.info("Please Select a location ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "bounce",
      });
    }

    setIsLoading(true);

    try {
      let res = null;
      if (operation === "add") {
        res = await addProduct(formData);
      } else if (isEdit && productEditData?._id) {
        res = await updateProduct(productEditData._id, formData);
      }

      if (res) {
        navigate("/sellerDashboard/products");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <form
        className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEdit ? "Edit" : "Add"} Product
          </h2>
          <button
            type="submit"
            className="bg-sky-700 text-white px-6 py-2 rounded-full flex items-center gap-2 uppercase text-sm font-medium"
          >
            {isLoading && <Spinner width="w-5" color="#ffffff" />}
            <span>{operation.toUpperCase()}</span>
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Product Image
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 p-6 text-center">
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Preview"
                  className="max-h-60 mx-auto"
                />
                <MdCancel
                  className="absolute -top-2 -right-2 text-red-600 text-3xl cursor-pointer"
                  onClick={() => setFormData({ ...formData, image: null })}
                />
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-sm mb-1">
                  Click or drag & drop to upload image (JPG, PNG, JPEG)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const uploadedImage = e.target.files[0];
                    setFormData({ ...formData, image: uploadedImage });
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputTag
            label="Product Name"
            type="text"
            placeholder="Fresh Apples"
            toUpdate="name"
            value={formData.name}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Category
            </label>
            <select
              className="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg w-full p-2.5 outline-cyan-800"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select
              </option>
              {[
                "rice",
                "wheat",
                "nuts",
                "sugar",
                "spices",
                "fruits",
                "vegetables",
                "pulses",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <InputTag
            label="Measuring Unit"
            type="text"
            placeholder="kg"
            toUpdate="measuringUnit"
            value={formData.measuringUnit}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <InputTag
            label="Price Per Unit"
            type="number"
            placeholder="Rs.2000"
            toUpdate="pricePerUnit"
            value={formData.pricePerUnit}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <InputTag
            label="Minimum Order Quantity"
            type="number"
            placeholder="5 kg"
            toUpdate="minimumOrderQuantity"
            value={formData.minimumOrderQuantity}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <InputTag
            label="Stocks Left"
            type="number"
            placeholder="20 kg"
            toUpdate="quantity"
            value={formData.quantity}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <InputTag
            label="Shelf Life"
            type="text"
            placeholder="10 days"
            toUpdate="shelfLife"
            value={formData.shelfLife}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
          <InputTag
            label="Delivery Radius"
            type="number"
            placeholder="10 km"
            toUpdate="deliveryRadius"
            value={formData.deliveryRadius}
            setFormData={setFormData}
            outlineColor="outline-cyan-800"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-900 block mb-2">
            Description
          </label>
          <textarea
            rows={6}
            required
            className="bg-gray-50 text-black border border-gray-300 text-sm rounded-lg w-full p-2.5 outline-cyan-800"
            placeholder="Describe your product..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Location Picker */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-900 block mb-2">
            Choose Location
          </label>
          <LeafletMap
            width="w-full"
            height="h-[400px]"
            showSearchBox={true}
            latitude={lat}
            longitude={long}
            setLatitude={setLat}
            setLongitude={setLong}
          />
        </div>
      </form>
    </div>
  );
}

export default SellerProduct;
