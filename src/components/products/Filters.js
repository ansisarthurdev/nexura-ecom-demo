import React from "react";
import { Link } from "react-router-dom";
import { Button, Select } from "@radix-ui/themes";
import { XIcon } from "@phosphor-icons/react";

const Filters = () => {
  const filterData = {
    size: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
    ],

    colour: [
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "grey", label: "Grey" },
      { value: "red", label: "Red" },
      { value: "white", label: "White" },
      { value: "yellow", label: "Yellow" },
    ],

    gender: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "unisex", label: "Unisex" },
    ],

    price: [
      { value: "0-50", label: "$0 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100-200", label: "$100 - $200" },
      { value: "200+", label: "$200+" },
    ],

    activity: [
      { value: "casual", label: "Casual" },
      { value: "hiking", label: "Hiking" },
      { value: "school", label: "School" },
      { value: "travel", label: "Travel" },
      { value: "work", label: "Work" },
    ],

    weight: [
      { value: "light", label: "Light (< 1kg)" },
      { value: "medium", label: "Medium (1-2kg)" },
      { value: "heavy", label: "Heavy (> 2kg)" },
    ],

    type: [
      { value: "daypack", label: "Daypack" },
      { value: "laptop", label: "Laptop" },
      { value: "hiking", label: "Hiking" },
      { value: "travel", label: "Travel" },
      { value: "camera", label: "Camera" },
      { value: "hydration", label: "Hydration" },
    ],
  };

  return (
    <section className="bg-gray-100">
      <div className="py-8 mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-gray-600 transition-all duration-300"
            >
              Home
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-gray-600 transition-all duration-300"
            >
              Bags
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-gray-800 text-sm">Backpacks</span>
          </div>

          <h1 className="text-3xl uppercase font-bold">Backpack Collection</h1>
        </div>

        <div className="flex-col md:flex-row md:flex md:items-end md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm mb-4 pl-6">Filter by</p>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 pl-6">
                {Object.entries(filterData).map(([filterName, options]) => {
                  const displayName =
                    filterName.charAt(0).toUpperCase() + filterName.slice(1);

                  return (
                    <Select.Root key={filterName} defaultValue={displayName}>
                      <Select.Trigger>{displayName}</Select.Trigger>
                      <Select.Content>
                        {options.map((option) => (
                          <Select.Item key={option.value} value={option.value}>
                            {option.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  );
                })}
              </div>
            </div>
          </div>

          <Button className="bg-gray-800 ml-6 mr-4">
            <p>Filter 3</p>

            <XIcon size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Filters;
