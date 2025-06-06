import React, { useEffect } from "react";
import LeafletMap from "../../components/map/LeafletMap";

const CustomerLocationSelector = ({
  customerLatitude,
  customerLongitude,
  setCustomerLatitude,
  setCustomerLongitude,
}) => {
  return (
    <div className="bg-gray-50  w-full xl:w-[500px] flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex w-full justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                Shipping Address
              </p>
              <div className="w-full z-10">
                <LeafletMap
                  width={"w-full"}
                  height={"h-96"}
                  showSearchBox={false}
                  latitude={customerLatitude}
                  longitude={customerLongitude}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLocationSelector;
