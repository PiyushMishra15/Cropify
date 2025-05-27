const Order = require("../models/orderSchema");
const {
  getDateVsSalesData,
  getCategoryVsSalesData,
} = require("../utils/orderServices");

const getGraphData = async (req, res) => {
  try {
    let orders = await Order.find({ sellerId: req.sellerId })
      .select("-sellerId -orderLocation -userId")
      .populate({
        path: "productId",
        select: "category pricePerUnit",
      })
      .lean();
    const dateVsSales = getDateVsSalesData(orders);
    const categoryVsSales = getCategoryVsSalesData(orders);
    res
      .status(200)
      .send({ dateVsSales: dateVsSales, categoryVsSales: categoryVsSales });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = { getGraphData };
