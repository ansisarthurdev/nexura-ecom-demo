import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import { data } from "../data/products";
import { ShieldCheckIcon, StarIcon, TruckIcon } from "@phosphor-icons/react";
import { Button } from "@radix-ui/themes";
import { addToCart } from "../redux/slices/cartSlice";
import Alert from "../components/dialogs/Alert";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Success");

  const handleColorSelect = (productId, colorIndex) => {
    setSelectedColor({ productId, colorIndex });
  };

  const handleAddToCart = () => {
    if (!product || selectedColor === null) {
      // If no product or color is selected, show an alert
      setAlertTitle("Warning");
      setAlertMessage("Please select a color before adding to cart");
      setAlertOpen(true);
      return;
    }

    const colorName = product.colors[selectedColor.colorIndex];

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: colorName,
        quantity: quantity,
      })
    );
  };

  useEffect(() => {
    const foundProduct = data?.find((item) => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  // console.log(product);

  return (
    <div className="w-screen">
      <div className="max-w-[1400px] px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
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
              <Link
                to="/"
                className="text-gray-400 text-sm hover:text-gray-600 transition-all duration-300"
              >
                Backpacks
              </Link>
              <span className="text-gray-400 text-sm">/</span>
              <span className="text-gray-800 text-sm">{product?.name}</span>
            </div>

            <div className="my-4">
              <p className="text-3xl font-bold uppercase">{product?.name}</p>
              <p className="mt-3 text-sm text-gray-600">
                {product?.description}
              </p>

              <div className="my-4 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      size={18}
                      weight={
                        index < Math.floor(product?.rating || 0)
                          ? "fill"
                          : "regular"
                      }
                      className={
                        index < Math.floor(product?.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span>({product?.rating})</span>
                <span>{product?.ratingCount} Reviews</span>
              </div>

              <div className="md:hidden flex items-center justify-center my-6">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="max-w-full max-h-[300px] aspect-square object-contain h-auto rounded-md"
                />
              </div>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-xl font-bold text-gray-900">
                  ${product?.price}
                </p>

                <span className="text-sm text-gray-500">
                  Indulge now, 0% interest installments by Credit Card or Pay
                  Later
                </span>
              </div>

              <div className="my-4">
                <span>Colour: </span>

                <div className="flex gap-1 pt-[6px]">
                  {product?.colors?.map((color, index) => (
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

              <div className="my-4">
                <span>Quantity: </span>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <span>Description</span>
                <p className="text-sm text-gray-500 mt-2">
                  {product?.description}
                </p>
              </div>

              <Button
                radius="medium"
                className="w-full bg-gray-800 my-4"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>

              <div className="p-4 md:p-2 border rounded-md border-gray-200 mb-8">
                <div className="flex items-start gap-4 mb-4 border-b border-gray-200 pb-4">
                  <div className="bg-gray-100 rounded-full w-[36px] h-[36px] flex items-center justify-center">
                    <TruckIcon size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-1">Free Shipping</h3>
                    <p className="text-sm text-gray-400">
                      Minimum Purchase of $80
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 rounded-full w-[36px] h-[36px] flex items-center justify-center">
                    <ShieldCheckIcon size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-1">
                      Warranty Up to 1 Year
                    </h3>
                    <p className="text-sm text-gray-400">
                      Warranty coverage on products for one year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <img
              src={product?.image}
              alt={product?.name}
              className="max-w-[500px] w-full aspect-square object-contain h-auto rounded-md"
            />
          </div>
        </div>
      </div>

      <Alert
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title={alertTitle}
        description={alertMessage}
      />
    </div>
  );
};

export default ProductPage;
