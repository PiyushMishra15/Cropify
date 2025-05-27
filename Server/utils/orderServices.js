//to get dateVsSalesData for the dashboard
//to get cotogerysalesvssalesData for the dashboard

const Order = require("../models/orderModel");

const dateFormatter = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Get date vs sales data for the dashboard
exports.getDateVsSalesData = async (orders) => {
  const data = [];
  map = new Map();
  orders.forEach((order) => {
    const date = dateFormatter(order.orderDate);
    if (map.has(date)) {
      map.set(
        date,
        map.get(date) + order.orderQty * order.productId.pricePerUnit
      );
    } else {
      map.set(date, order.orderQty * order.productId.pricePerUnit);
    }
    while (map.size > 0) {
      const [key, value] = map.entries().next().value;
      data.push({ date: key, totalAmount: value });
      map.delete(key);
    }
  });

  return data;
};

// Get category vs sales data for the dashboard

exports.getCategoryVsSalesData = async (orders) => {
  const data = [];
  const map = new Map();
  orders.forEach((order) => {
    const category = order.productId.category;
    if (map.has(category)) {
      map.set(
        category,
        map.get(category) + order.orderQty * order.productId.pricePerUnit
      );
    } else {
      map.set(category, order.orderQty * order.productId.pricePerUnit);
    }
  });
  map.forEach((value, key) => {
    data.push({ category: key, totalAmount: value });
  });

  return data;
};

//const category = [
//  "rice",
// "wheat",
//"nuts",
//"sugar",
// "spices",
// "fruits",
//"vegetables",
//"pulses",
//];
