import { StyleSheet, Text, View, Linking, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function ContactsPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>КОНТАКТЫ</Text>
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Наши контакты</Text>
        <ButtonAnimated
          style={styles.contactItem}
          onPress={() => Linking.openURL('tel:+79829242325')}
        >
          <MaterialIcons name="phone" size={24} color="#4F6C36" />
          <Text style={styles.contactText}>+7 (982) 924-23-25</Text>
        </ButtonAnimated>
        <ButtonAnimated
          style={styles.contactItem}
          onPress={() => Linking.openURL('mailto:lugovoemaslo@yandex.ru')}
        >
          <MaterialIcons name="email" size={24} color="#4F6C36" />
          <Text style={styles.contactText}>lugovoemaslo@yandex.ru</Text>
        </ButtonAnimated>
      </View>
      <View style={styles.socialCard}>
        <Text style={styles.contactTitle}>Мы в соцсетях</Text>
        <View style={styles.socialButtons}>
          <ButtonAnimated
            style={styles.socialButton}
            onPress={() => openLink('https://vk.com/lugovoemaslo')}
          >
            <FontAwesome name="vk" size={30} color="#4F6C36" />
          </ButtonAnimated>
          <ButtonAnimated
            style={styles.socialButton}
            onPress={() => openLink('https://t.me/lugovoemaslo')}
          >
            <FontAwesome name="telegram" size={30} color="#4F6C36" />
          </ButtonAnimated>
          <ButtonAnimated
            style={styles.socialButton}
            onPress={() => openLink('https://api.whatsapp.com/send/?phone=79829242325')}
          >
            <FontAwesome name="whatsapp" size={30} color="#4F6C36" />
          </ButtonAnimated>
        </View>
      </View>
      <View style={styles.deliveryCard}>
        <Text style={styles.contactTitle}>Доставка</Text>
        <Text style={styles.deliveryText}>
          Доставляем по всей России и Казахстану по тарифу ТК СДЭК
        </Text>
      </View>
    </View>
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
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  socialCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  deliveryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  contactTitle: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
});
