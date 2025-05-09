import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Switch, Animated } from 'react-native';
import { useAppContext } from './context';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

interface OilVolume {
  volume: string;
  price: number;
}

interface OilItem {
  id: string;
  name: string;
  image: any;
  volumes: OilVolume[];
  discount: string;
}

const oils: OilItem[] = [
  {
    id: '1',
    name: 'Льняное масло',
    image: require('./assets/images/linseed-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 240 },
      { volume: '300 мл', price: 590 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '2',
    name: 'Подсолнечное масло',
    image: require('./assets/images/sunflower-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 180 },
      { volume: '300 мл', price: 460 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '3',
    name: 'Масло чёрного тмина (Индия)',
    image: require('./assets/images/black-cumin-india.webp'),
    volumes: [
      { volume: '100 мл', price: 920 },
      { volume: '300 мл', price: 2300 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '4',
    name: 'Масло чёрного тмина (Эфиопия)',
    image: require('./assets/images/black-cumin-ethiopia.webp'),
    volumes: [
      { volume: '100 мл', price: 1600 },
      { volume: '300 мл', price: 4000 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '5',
    name: 'Масло штирийской тыквы',
    image: require('./assets/images/pumpkin-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 730 },
      { volume: '300 мл', price: 1820 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '6',
    name: 'Масло расторопши',
    image: require('./assets/images/milk-thistle-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 660 },
      { volume: '300 мл', price: 1650 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '7',
    name: 'Масло кедрового ореха',
    image: require('./assets/images/cedar-nut-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 1050 },
      { volume: '300 мл', price: 2550 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '8',
    name: 'Масло грецкого ореха',
    image: require('./assets/images/walnut-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 520 },
      { volume: '300 мл', price: 1300 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '9',
    name: 'Горчичное масло',
    image: require('./assets/images/mustard-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 295 },
      { volume: '300 мл', price: 730 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '10',
    name: 'Кунжутное масло',
    image: require('./assets/images/sesame-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 300 },
      { volume: '300 мл', price: 750 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  },
  {
    id: '11',
    name: 'Конопляное масло',
    image: require('./assets/images/hemp-oil.webp'),
    volumes: [
      { volume: '100 мл', price: 550 },
      { volume: '300 мл', price: 1350 }
    ],
    discount: 'Пенсионерам - скидка 10%'
  }
];

export default function CatalogPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { cart, addToCart, updateQuantity } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, string>>({});
  const [isDiscounted, setIsDiscounted] = useState<Record<string, boolean>>({});
  const [itemsInCart, setItemsInCart] = useState<Record<string, {quantity: number, cartItemId: string}>>({});

  useEffect(() => {
    const newItems: Record<string, {quantity: number, cartItemId: string}> = {};
    oils.forEach(oil => {
      const selectedVolume = selectedVolumes[oil.id];
      if (selectedVolume) {
        const cartItemId = `${oil.id}_${selectedVolume}`;
        const item = cart.find(item => item.cartItemId === cartItemId);
        if (item) {
          newItems[oil.id] = {
            quantity: item.quantity,
            cartItemId: item.cartItemId
          };
        }
      }
    });
    setItemsInCart(newItems);
  }, [cart, selectedVolumes]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const selectVolume = (oilId: string, volume: string) => {
    setSelectedVolumes(prev => ({
      ...prev,
      [oilId]: volume
    }));
  };

  const toggleDiscount = (oilId: string) => {
    setIsDiscounted(prev => ({
      ...prev,
      [oilId]: !prev[oilId]
    }));
  };

  const handleAddToCart = (oil: OilItem) => {
    const selectedVolume = selectedVolumes[oil.id];
    if (!selectedVolume) return;
    const volumeData = oil.volumes.find(v => v.volume === selectedVolume);
    if (!volumeData) return;
    const discountedPrice = isDiscounted[oil.id]
      ? Math.round(volumeData.price * 0.9)
      : volumeData.price;
    addToCart({
      id: oil.id,
      name: oil.name,
      price: discountedPrice,
      image: oil.image,
      volume: selectedVolume,
      isDiscounted: isDiscounted[oil.id]
    });
  };

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    updateQuantity(cartItemId, newQuantity);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>КАТАЛОГ НАТУРАЛЬНЫХ МАСЕЛ</Text>
      {oils.map(oil => (
        <View key={oil.id} style={styles.oilCard}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand(oil.id)}
          >
            <Image source={oil.image} style={styles.oilImage} />
            <View style={styles.headerText}>
              <Text style={styles.oilName}>{oil.name}</Text>
              <AntDesign
                name={expandedId === oil.id ? 'up' : 'down'}
                size={20}
                color="#4F6C36"
              />
            </View>
          </TouchableOpacity>
          {expandedId === oil.id && (
            <View style={styles.expandedContent}>
              <View style={styles.volumeSelector}>
                {oil.volumes.map(volume => (
                  <TouchableOpacity
                    key={volume.volume}
                    style={[
                      styles.volumeButton,
                      selectedVolumes[oil.id] === volume.volume && styles.selectedVolume
                    ]}
                    onPress={() => selectVolume(oil.id, volume.volume)}
                  >
                    <Text style={styles.volumeText}>{volume.volume}</Text>
                    <Text style={styles.priceText}>{volume.price} ₽</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.discountRow}>
                <Text style={styles.discountText}>{oil.discount}</Text>
                <Switch
                  value={!!isDiscounted[oil.id]}
                  onValueChange={() => toggleDiscount(oil.id)}
                  trackColor={{ false: '#767577', true: '#4F6C36' }}
                  thumbColor={isDiscounted[oil.id] ? '#f5f5f5' : '#f4f3f4'}
                />
              </View>
              {selectedVolumes[oil.id] && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalText}>
                    Итого: {isDiscounted[oil.id]
                      ? Math.round(
                          oil.volumes.find(v => v.volume === selectedVolumes[oil.id])!.price * 0.9
                        )
                      : oil.volumes.find(v => v.volume === selectedVolumes[oil.id])!.price
                    } ₽
                  </Text>
                </View>
              )}
              {itemsInCart[oil.id] ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(itemsInCart[oil.id].cartItemId, itemsInCart[oil.id].quantity - 1)}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{itemsInCart[oil.id].quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(itemsInCart[oil.id].cartItemId, itemsInCart[oil.id].quantity + 1)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ButtonAnimated
                  style={[
                    styles.orderButton,
                    !selectedVolumes[oil.id] && styles.disabledButton
                  ]}
                  onPress={() => handleAddToCart(oil)}
                  disabled={!selectedVolumes[oil.id]}
                >
                  <Text style={styles.orderButtonText}>
                    {selectedVolumes[oil.id] ? 'ДОБАВИТЬ В КОРЗИНУ' : 'ВЫБЕРИТЕ ОБЪЕМ'}
                  </Text>
                </ButtonAnimated>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

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
  oilCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4F6C36',
  },
  oilImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oilName: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: 'white',
    flexShrink: 1,
  },
  expandedContent: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  volumeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  volumeButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedVolume: {
    borderColor: '#4F6C36',
    backgroundColor: 'rgba(79, 108, 54, 0.1)',
  },
  volumeText: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#333',
  },
  priceText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#4F6C36',
    marginTop: 5,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  discountText: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  totalRow: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  totalText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
  },
  orderButton: {
    backgroundColor: '#4F6C36',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F6C36',
    borderRadius: 10,
    padding: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
});
