import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, Animated } from 'react-native';
import { useAppContext } from './context';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const allOils = [
  {
    id: '1',
    name: 'Масло чёрного тмина (Индия)',
    shortDesc: 'Знакомство с силой',
    image: require('./assets/images/black-cumin-india.webp'),
    color: '#2c3e50'
  },
  {
    id: '2',
    name: 'Масло чёрного тмина (Эфиопия)',
    shortDesc: 'Вкус, который невозможно забыть',
    image: require('./assets/images/black-cumin-ethiopia.webp'),
    color: '#34495e'
  },
  {
    id: '3',
    name: 'Масло абрикосовой косточки',
    shortDesc: 'Для красоты снаружи и баланса изнутри',
    image: require('./assets/images/apricot-oil.webp'),
    color: '#e67e22'
  },
  {
    id: '4',
    name: 'Масло грецкого ореха',
    shortDesc: 'Для вкуса и нормальной работы мозга',
    image: require('./assets/images/walnut-oil.webp'),
    color: '#8e44ad'
  },
  {
    id: '5',
    name: 'Рыжиковое масло',
    shortDesc: 'Золото короткого лета',
    image: require('./assets/images/camelina-oil.webp'),
    color: '#f39c12'
  },
  {
    id: '6',
    name: 'Масло расторопши',
    shortDesc: 'Тишина, в которой восстанавливается печень',
    image: require('./assets/images/milk-thistle-oil.webp'),
    color: '#27ae60'
  },
  {
    id: '7',
    name: 'Масло штирийской тыквы',
    shortDesc: 'Густое, тёплое, зелёное золото',
    image: require('./assets/images/pumpkin-oil.webp'),
    color: '#d35400'
  },
  {
    id: '8',
    name: 'Горчичное масло',
    shortDesc: 'Сила, которая согревает и обогащает изнутри',
    image: require('./assets/images/mustard-oil.webp'),
    color: '#f1c40f'
  },
  {
    id: '9',
    name: 'Льняное масло',
    shortDesc: 'Тёплая тишина, которая остаётся',
    image: require('./assets/images/linseed-oil.webp'),
    color: '#3498db'
  },
  {
    id: '10',
    name: 'Кунжутное масло',
    shortDesc: 'Тёплая забота в каждой ложке',
    image: require('./assets/images/sesame-oil.webp'),
    color: '#e74c3c'
  },
  {
    id: '11',
    name: 'Подсолнечное масло',
    shortDesc: 'Солнечный вкус простоты и пользы',
    image: require('./assets/images/sunflower-oil.webp'),
    color: '#f1c40f'
  },
  {
    id: '12',
    name: 'Конопляное масло',
    shortDesc: 'Зелёное дыхание здоровья',
    image: require('./assets/images/hemp-oil.webp'),
    color: '#2ecc71'
  },
  {
    id: '13',
    name: 'Масло кедрового ореха',
    shortDesc: 'Таёжное золото силы и единения',
    image: require('./assets/images/cedar-nut-oil.webp'),
    color: '#16a085'
  }
];

export default function FavoritesPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { favorites, toggleFavorite } = useAppContext();
  const favoriteOils = allOils.filter(oil => favorites.includes(oil.id));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ИЗБРАННОЕ</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyFavorites}>
          <Text style={styles.emptyText}>У вас пока нет избранных масел</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteOils}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Link href={`/degustaciya/${item.id}`} asChild>
              <ButtonAnimated
                style={[styles.oilCard, { backgroundColor: item.color }]}
                activeOpacity={0.8}
              >
                <Image source={item.image} style={styles.oilImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.oilName}>{item.name}</Text>
                  <Text style={styles.oilShortDesc}>{item.shortDesc}</Text>
                </View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                >
                  <Text style={styles.favoriteIcon}>♥</Text>
                </TouchableOpacity>
              </ButtonAnimated>
            </Link>
          )}
        />
      )}
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
  emptyFavorites: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
  },
  listContainer: {
    paddingBottom: 20,
  },
  oilCard: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderColor: 'rgba(71, 251, 40, 0.2)',
    borderWidth: 1,
  },
  oilImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  textContainer: {
    flex: 1,
  },
  oilName: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    marginBottom: 5,
  },
  oilShortDesc: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#4F6C36',
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#4F6C36',
  },
});

