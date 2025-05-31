import { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/TableSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";
import useOrder from "../../hooks/useOrder";

function SellerOrderRequests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { getSellerOrders, isLoading } = useOrder();

  // Fetch orders
  const getOrders = async () => {
    const orderedData = await getSellerOrders();
    setData(orderedData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h2 className="text-5xl ml-96 mt-2   font-semibold text-gray-700 mb-6">
        All Orders
      </h2>

      {/* Search (disabled for now) */}
      <div className="flex justify-end px-4 mb-6">
        <input
          type="text"
          className="w-full max-w-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 disabled:cursor-not-allowed"
          placeholder="Search for products (Coming soon)"
          disabled
        />
      </div>

      {/* Table container with horizontal scroll on small devices */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <TableSkeleton />
        ) : data.length === 0 ? (
          <EmptyStatetext text="Your order request queue is currently empty. Keep an eye out for incoming orders!" />
        ) : (
          <table className="min-w-full text-center text-sm font-light border-collapse">
            <thead className="bg-gray-100 border-b font-medium text-gray-700">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">#</th>
                <th className="px-6 py-3 whitespace-nowrap">Image</th>
                <th className="px-6 py-3 whitespace-nowrap">Category</th>
                <th className="px-6 py-3 whitespace-nowrap">Product Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Order Date</th>
                <th className="px-6 py-3 whitespace-nowrap">Customer Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Phone No</th>
                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                <th className="px-6 py-3 whitespace-nowrap">Location</th>
                <th className="px-6 py-3 whitespace-nowrap">Total Price</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-neutral-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium">{idx + 1}</td>
                  <td className="px-6 py-2">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      loading="lazy"
                      className="w-12 h-12 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4">{item.productId.category}</td>
                  <td
                    className="px-6 py-4 max-w-[150px] truncate"
                    title={item.productId.name}
                  >
                    {item.productId.name}
                  </td>
                  <td className="px-6 py-4">{item.orderDate}</td>
                  <td
                    className="px-6 py-4 max-w-[140px] truncate"
                    title={item.userId.name}
                  >
                    {item.userId.name}
                  </td>
                  <td
                    className="px-6 py-4 max-w-[130px] truncate"
                    title={item.userId.contact}
                  >
                    {item.userId.contact}
                  </td>
                  <td
                    className="px-6 py-4 max-w-[180px] truncate"
                    title={item.userId.email}
                  >
                    {item.userId.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.orderQty} {item.productId.measuringUnit}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-sky-600 font-medium hover:underline"
                      onClick={() =>
                        navigate(
                          `/map/${item.orderLocation.coordinates[1]}/${item.orderLocation.coordinates[0]}`
                        )
                      }
                      title="View location on map"
                    >
                      {item.orderLocation.coordinates[1].toFixed(4)},{" "}
                      {item.orderLocation.coordinates[0].toFixed(4)}
                    </button>
                  </td>
                  <td className="px-6 py-4">Rs. {item.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-yellow-700 bg-yellow-100 font-semibold">
                      <GoDotFill className="mr-1" />
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SellerOrderRequests;
