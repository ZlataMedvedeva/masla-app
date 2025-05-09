import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Image, Easing } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { useAppContext } from './context';
import { FontAwesome } from '@expo/vector-icons';
import { useCallback, useEffect, useRef } from 'react';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function HomePage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { favorites = [], cart = [] } = useAppContext();

  // Animation for "Луговое масло" text
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const animatedTextStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1],
    }),
  };

  const renderIcons = useCallback(() => (
    <View style={styles.iconsContainer}>
      <Link href="/favorites" asChild>
        <ButtonAnimated style={styles.iconButton}>
          <FontAwesome name="heart" size={24} color="white" />
          {favorites.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favorites.length}</Text>
            </View>
          )}
        </ButtonAnimated>
      </Link>
      <Link href="/cart" asChild>
        <ButtonAnimated style={styles.iconButton}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
              </Text>
            </View>
          )}
        </ButtonAnimated>
      </Link>
    </View>
  ), [favorites, cart]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Animated.Text style={[styles.title, animatedTextStyle]}>Луговое масло</Animated.Text>
        <Text style={styles.subtitle}>Семейное производство сыродавленых масел</Text>
        {renderIcons()}
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeBlock}>
          <Text style={styles.welcomeTitle}>Добро пожаловать в мир натуральных масел</Text>
          <Text style={styles.welcomeText}>
            Откройте для себя уникальные вкусы и ароматы наших масел холодного отжима.
            Каждое масло — это история, характер и польза для вашего здоровья.
          </Text>
        </View>

        <View style={styles.navButtons}>
          <Link href="/degustaciya" asChild>
            <ButtonAnimated style={styles.navButton}>
              <Image
                source={require('./assets/images/tasting-icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.navButtonText}>ОНЛАЙН-ДЕГУСТАЦИЯ</Text>
              <Text style={styles.navButtonSubtext}>Познакомьтесь с нашими маслами</Text>
            </ButtonAnimated>
          </Link>

          <Link href="/katalog" asChild>
            <ButtonAnimated style={styles.navButton}>
              <Image
                source={require('./assets/images/catalog-icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.navButtonText}>КАТАЛОГ МАСЕЛ</Text>
              <Text style={styles.navButtonSubtext}>Выберите своё масло</Text>
            </ButtonAnimated>
          </Link>

          <Link href="/podobrat" asChild>
            <ButtonAnimated style={styles.navButton}>
              <Image
                source={require('./assets/images/match-icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.navButtonText}>ПОДОБРАТЬ МАСЛО</Text>
              <Text style={styles.navButtonSubtext}>Найдите идеальное масло для вас</Text>
            </ButtonAnimated>
          </Link>

          <Link href="/kontakty" asChild>
            <ButtonAnimated style={styles.navButton}>
              <Image
                source={require('./assets/images/contacts-icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.navButtonText}>КОНТАКТЫ</Text>
              <Text style={styles.navButtonSubtext}>Свяжитесь с нами</Text>
            </ButtonAnimated>
          </Link>
        </View>

        <View style={styles.aboutBlock}>
          <Text style={styles.aboutTitle}>О нашем производстве</Text>
          <Text style={styles.aboutText}>
            Мы — семейная мастерская, где с любовью создают натуральные масла холодного отжима.
            Наша философия — сохранить всю природную пользу, вкус и аромат каждого семени.
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Image
                source={require('./assets/images/cold-press-icon.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Холодный отжим</Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={require('./assets/images/natural-icon.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>100% натурально</Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={require('./assets/images/eco-icon.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Эко-упаковка</Text>
            </View>
          </View>
        </View>

        <View style={styles.deliveryBlock}>
          <Text style={styles.deliveryText}>
            Доставляем по всей России и Казахстану через СДЭК
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#4F6C36',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 20,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Lena',
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(71, 251, 40, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: 'Racama',
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomeBlock: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  welcomeTitle: {
    fontFamily: 'Lena',
    fontSize: 26,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontFamily: 'Racama',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
  },
  navButtons: {
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  navButtonText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    marginBottom: 5,
  },
  navButtonSubtext: {
    fontFamily: 'Racama',
    fontSize: 14,
    color: '#000',
  },
  aboutBlock: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  aboutTitle: {
    fontFamily: 'Lena',
    fontSize: 24,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 15,
  },
  aboutText: {
    fontFamily: 'Racama',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  featureText: {
    fontFamily: 'Racama',
    fontSize: 12,
    color: '#4F6C36',
    textAlign: 'center',
  },
  deliveryBlock: {
    backgroundColor: '#4F6C36',
    borderRadius: 20,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  deliveryText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});