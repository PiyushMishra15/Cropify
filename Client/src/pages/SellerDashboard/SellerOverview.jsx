import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import AreaGraph from "../../components/AreaGraph";
import BarGraph from "../../components/BarGraph";
import GraphSkeleton from "../../components/GraphSkeleton";
import fetchGraphData from "../../hooks/useGraph";
import EmptyStatetext from "../../components/EmptyStatetext";

function SellerOverview() {
  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const visualizeData = async () => {
    setIsLoading(true);
    let graphData = await fetchGraphData();
    setDateVsSales(graphData.dateVsSales);
    setCategoryVsSales(graphData.categoryVsSales);
    setIsLoading(false);
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <h2 className="text-5xl ml-96 mt-2  font-semibold text-gray-700 mb-6">
        Visualize Tour Sales
      </h2>

      {isLoading ? (
        <GraphSkeleton noOfBoxes={2} />
      ) : dateVsSales.length === 0 ? (
        <EmptyStatetext text="No orders have been placed. Check back soon!" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4 px-4">
          <AreaGraph
            title="Date v/s Sales"
            lineData={dateVsSales}
            color={"#be123c"}
            xKey={"date"}
            yKey={"totalSales"}
          />
          <BarGraph
            title="Category v/s Sales"
            data={categoryVsSales}
            color={"#be123c"}
            xKey={"category"}
            yKey={"totalSales"}
          />
        </div>
      )}
    </>
  );
}

export default SellerOverview;
