import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

interface OilItem {
  id: string;
  cartItemId: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
  volume: string;
  isDiscounted: boolean;
}

interface AppContextType {
  cart: OilItem[];
  favorites: string[];
  totalItems: number;
  addToCart: (oil: Omit<OilItem, 'quantity' | 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  toggleFavorite: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<OilItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(calculateTotalItems(cart));
  }, [cart]);

  const calculateTotalItems = (cartItems: OilItem[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Уведомление',
      text2: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const addToCart = (oil: Omit<OilItem, 'quantity'> & { quantity?: number }) => {
    const quantity = oil.quantity || 1;
    const cartItemId = `${oil.id}_${oil.volume}`;
    
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
      showToast(`Количество "${oil.name}" (${oil.volume}) увеличено`);
      setCart(
        cart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      showToast(`${oil.name} (${oil.volume}) добавлен в корзину`);
      setCart([...cart, { ...oil, quantity, cartItemId }]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(
      cart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite
      }}
    >
      {children}
      <Toast />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
