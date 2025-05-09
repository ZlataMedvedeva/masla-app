import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Linking } from 'react-native';
import { useAppContext } from './context';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function CartPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { cart, totalItems, removeFromCart, updateQuantity } = useAppContext();
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Формируем сообщение с товарами
    let message = "Хочу оформить заказ:\n\n";
    
    cart.forEach(item => {
      message += `- ${item.name} (${item.volume}) - ${item.quantity} шт. × ${item.price} ₽ = ${item.price * item.quantity} ₽\n`;
    });
    
    message += `\nИтого: ${totalPrice} ₽`;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем URL для WhatsApp
    const whatsappUrl = `https://wa.me/79829242325?text=${encodedMessage}`;
    
    // Открываем WhatsApp
    Linking.openURL(whatsappUrl).catch(err => {
      console.error("Не удалось открыть WhatsApp:", err);
      alert("Не удалось открыть WhatsApp. Убедитесь, что приложение установлено.");
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>КОРЗИНА ({totalItems} товаров)</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <FontAwesome name="shopping-cart" size={50} color="#4F6C36" />
          <Text style={styles.emptyText}>Ваша корзина пуста</Text>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View key={item.cartItemId} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemVolume}>{item.volume}</Text>
                {item.isDiscounted && (
                  <Text style={styles.discountBadge}>Скидка 10%</Text>
                )}
                <Text style={styles.itemPrice}>{item.price} ₽</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.cartItemId)}
              >
                <FontAwesome name="trash" size={20} color="#ff4757" />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Итого:</Text>
            <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
          </View>
          <ButtonAnimated 
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>ОФОРМИТЬ ЗАКАЗ</Text>
          </ButtonAnimated>
        </>
      )}
    </ScrollView>
  );
}

// Стили остаются без изменений
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
    padding: 20,
  },
  title: {
    fontFamily: 'Lena',
    fontSize: 28,
    color: '#4F6C36',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(71, 251, 40, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  itemVolume: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  discountBadge: {
    fontFamily: 'Racama',
    fontSize: 12,
    color: 'white',
    backgroundColor: '#4F6C36',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  itemPrice: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#4F6C36',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#4F6C36',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontFamily: 'Racama',
    fontSize: 16,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  totalText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#333',
  },
  totalPrice: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4F6C36',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  checkoutText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
  },
});
