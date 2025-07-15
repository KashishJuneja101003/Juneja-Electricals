import { useCart } from "./context/CartContext";
import { Link } from "react-router-dom";

const OrderGateway = () => {
  const { cart } = useCart();

  // Total item quantity
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-800 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-200 rounded-lg"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                <p className="text-sm text-gray-600">
                  Price: ₹{item.price} × {item.quantity}
                </p>
              </div>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
            </div>
          ))}

          <div className="mt-4 text-md w-fit bg-gray-200 p-3 rounded-lg">
            <div className="font-bold ">Order Details</div>
            <span className="font-semibold">Total: </span>₹
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            <br />
            <span className="font-semibold">GST:</span> ₹{0.18 * cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            <br />
            <span className="font-semibold">Pay:</span> <span className="text-red-600 font-semibold">₹{(0.18 + 1) * cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
          </div> 
          

          <Link to="/OrderGateway">
            <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderGateway;
