import React, { useState } from "react";
import { Link } from "react-router-dom";

//components
import Filters from "../components/products/Filters";

// data
import { data } from "../data/products";

const ProductsPage = () => {
  const [products, setProducts] = useState(data);
  const [selectedColor, setSelectedColor] = useState(null);

  // Color selection handler
  const handleColorSelect = (productId, colorIndex) => {
    setSelectedColor({ productId, colorIndex });
  };

  return (
    <div className="w-screen">
      <Filters />

      {/* product list */}
      <div className="max-w-[1400px] px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
        {products.map((product) => (
          <div className="bg-white overflow-hidden">
            <Link to={`/${product?.id}`} key={product?.id}>
              <div className="h-48 bg-white p-4 flex items-center justify-center rounded-md">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <Link to={`/${product?.id}`} key={product?.id}>
                  <h3 className="font-bold text-lg text-gray-700 uppercase">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex gap-1 pt-[6px]">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      className={`w-4 h-4 rounded-[5px] ${
                        selectedColor?.productId === product.id &&
                        selectedColor?.colorIndex === index
                          ? "ring-2 ring-offset-1 ring-gray-400"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          color === "burgundy" ? "#800020" : color,
                      }}
                      onClick={() => handleColorSelect(product.id, index)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              <p className="font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
