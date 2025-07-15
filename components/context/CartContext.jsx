import { createContext, useContext, useState , useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(()=>{
    const savedCart = localStorage.getItem("cart");
    return savedCart && savedCart != 'undefined' ? JSON.parse(savedCart) : [];
  });

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const deleteItem = (idx) =>{
    setCart((prevCart) => prevCart.filter((_, i) => i !== idx))
  }

  return (
    <CartContext.Provider value={{ cart, setCart , deleteItem}}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart
export const useCart = () => useContext(CartContext);
