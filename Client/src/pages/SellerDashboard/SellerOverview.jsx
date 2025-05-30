import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import AreaGraph from "../../components/AreaGraph";
import BarGraph from "../../components/BarGraph";
import GraphSkeleton from "../../components/GraphSkeleton";
import useGraph from "../../hooks/useGraph";
import EmptyStatetext from "../../components/EmptyStatetext";

function SellerOverview() {
  const { fetchGraphData, isLoading } = useGraph();

  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);

  const visualizeData = async () => {
    let graphData = await fetchGraphData();
    setDateVsSales(graphData.dateVsSales);
    setCategoryVsSales(graphData.categoryVsSales);
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <h1 className="text-sm text-gray-500 mb-4 text-left">
        Visualize Tour Sales
      </h1>

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
