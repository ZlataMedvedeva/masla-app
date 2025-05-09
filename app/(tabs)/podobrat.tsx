import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Link } from 'expo-router';
import { useAppContext } from './context';
import { useFonts } from 'expo-font';

const questions = [
  {
    id: 1,
    question: "Какова ваша основная цель использования масла?",
    options: [
      { id: 'health', text: "Улучшение здоровья и иммунитета", oils: ['1', '2', '6', '9'] },
      { id: 'beauty', text: "Красота и уход за кожей/волосами", oils: ['3', '5', '7', '10'] },
      { id: 'brain', text: "Поддержка мозга и нервной системы", oils: ['4', '9', '12', '13'] },
      { id: 'digestion', text: "Пищеварение и детокс", oils: ['2', '6', '7', '8'] }
    ]
  },
  {
    id: 2,
    question: "Какой вкус вы предпочитаете?",
    options: [
      { id: 'neutral', text: "Нейтральный, мягкий", oils: ['3', '9', '11'] },
      { id: 'nutty', text: "Ореховый", oils: ['4', '5', '13'] },
      { id: 'spicy', text: "Пряный, с характером", oils: ['1', '2', '8'] },
      { id: 'unique', text: "Необычный, запоминающийся", oils: ['5', '7', '10', '12'] }
    ]
  },
  {
    id: 3,
    question: "Как вы планируете использовать масло?",
    options: [
      { id: 'internal', text: "Принимать внутрь", oils: ['1', '2', '6', '9'] },
      { id: 'external', text: "Наружное применение", oils: ['3', '5', '7', '10'] },
      { id: 'cooking', text: "Добавлять в пищу", oils: ['4', '8', '9', '11'] },
      { id: 'all', text: "Все варианты", oils: ['3', '5', '7', '9', '10'] }
    ]
  },
  {
    id: 4,
    question: "Есть ли у вас особые потребности?",
    options: [
      { id: 'none', text: "Нет особых потребностей", oils: ['9', '11'] },
      { id: 'immunity', text: "Поддержка иммунитета", oils: ['1', '2', '6'] },
      { id: 'skin', text: "Проблемы с кожей", oils: ['3', '5', '7'] },
      { id: 'stress', text: "Стресс и усталость", oils: ['4', '9', '13'] }
    ]
  },
  {
    id: 5,
    question: "Какой бюджет вы рассматриваете?",
    options: [
      { id: 'low', text: "До 500 руб за 100 мл", oils: ['8', '9', '11'] },
      { id: 'medium', text: "500-1000 руб за 100 мл", oils: ['3', '5', '6', '10'] },
      { id: 'high', text: "Свыше 1000 руб за 100 мл", oils: ['1', '2', '4', '7', '13'] }
    ]
  }
];

const allOils = [
  { id: '1', name: 'Масло чёрного тмина (Индия)', image: require('./assets/images/black-cumin-india.webp') },
  { id: '2', name: 'Масло чёрного тмина (Эфиопия)', image: require('./assets/images/black-cumin-ethiopia.webp') },
  { id: '3', name: 'Масло абрикосовой косточки', image: require('./assets/images/apricot-oil.webp') },
  { id: '4', name: 'Масло грецкого ореха', image: require('./assets/images/walnut-oil.webp') },
  { id: '5', name: 'Рыжиковое масло', image: require('./assets/images/camelina-oil.webp') },
  { id: '6', name: 'Масло расторопши', image: require('./assets/images/milk-thistle-oil.webp') },
  { id: '7', name: 'Масло штирийской тыквы', image: require('./assets/images/pumpkin-oil.webp') },
  { id: '8', name: 'Горчичное масло', image: require('./assets/images/mustard-oil.webp') },
  { id: '9', name: 'Льняное масло', image: require('./assets/images/linseed-oil.webp') },
  { id: '10', name: 'Кунжутное масло', image: require('./assets/images/sesame-oil.webp') },
  { id: '11', name: 'Подсолнечное масло', image: require('./assets/images/sunflower-oil.webp') },
  { id: '12', name: 'Конопляное масло', image: require('./assets/images/hemp-oil.webp') },
  { id: '13', name: 'Масло кедрового ореха', image: require('./assets/images/cedar-nut-oil.webp') }
];

const oilVolumes = {
  '1': [{ volume: '100 мл', price: 920 }, { volume: '300 мл', price: 2300 }],
  '2': [{ volume: '100 мл', price: 1600 }, { volume: '300 мл', price: 4000 }],
  '3': [{ volume: '100 мл', price: 550 }, { volume: '300 мл', price: 1350 }],
  '4': [{ volume: '100 мл', price: 520 }, { volume: '300 мл', price: 1300 }],
  '5': [{ volume: '100 мл', price: 350 }, { volume: '300 мл', price: 850 }],
  '6': [{ volume: '100 мл', price: 660 }, { volume: '300 мл', price: 1650 }],
  '7': [{ volume: '100 мл', price: 730 }, { volume: '300 мл', price: 1820 }],
  '8': [{ volume: '100 мл', price: 295 }, { volume: '300 мл', price: 730 }],
  '9': [{ volume: '100 мл', price: 240 }, { volume: '300 мл', price: 590 }],
  '10': [{ volume: '100 мл', price: 300 }, { volume: '300 мл', price: 750 }],
  '11': [{ volume: '100 мл', price: 180 }, { volume: '300 мл', price: 460 }],
  '12': [{ volume: '100 мл', price: 550 }, { volume: '300 мл', price: 1350 }],
  '13': [{ volume: '100 мл', price: 1050 }, { volume: '300 мл', price: 2550 }]
};

export default function OilMatchPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { addToCart } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedOils, setRecommendedOils] = useState<string[]>([]);
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isDiscounted, setIsDiscounted] = useState(false);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendedOils();
    }
  };

  const calculateRecommendedOils = () => {
    const oilScores: Record<string, number> = {};
    
    Object.values(answers).forEach(answerId => {
      const question = questions.find(q => q.options.some(opt => opt.id === answerId));
      if (question) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          option.oils.forEach(oilId => {
            oilScores[oilId] = (oilScores[oilId] || 0) + 1;
          });
        }
      }
    });

    const sortedOils = Object.entries(oilScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);

    setRecommendedOils(sortedOils);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendedOils([]);
    setSelectedVolumes({});
    setQuantities({});
    setIsDiscounted(false);
  };

  const handleVolumeSelect = (oilId: string, volume: string) => {
    setSelectedVolumes(prev => ({
      ...prev,
      [oilId]: volume
    }));
    
    // Устанавливаем количество по умолчанию 1 при выборе объема
    if (!quantities[oilId]) {
      setQuantities(prev => ({
        ...prev,
        [oilId]: 1
      }));
    }
  };

  const handleQuantityChange = (oilId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [oilId]: newQuantity
    }));
  };

  const addToCartHandler = (oilId: string) => {
    const volume = selectedVolumes[oilId];
    const quantity = quantities[oilId] || 1;
    const oil = allOils.find(o => o.id === oilId);
    const volumeData = oilVolumes[oilId as keyof typeof oilVolumes].find(v => v.volume === volume);
  
    if (oil && volumeData) {
      const price = isDiscounted ? Math.round(volumeData.price * 0.9) : volumeData.price;
      const cartItemId = `${oilId}_${volume}`;
  
      // Добавляем сразу нужное количество
      addToCart({
        id: oilId,
        name: oil.name,
        price: price,
        image: oil.image,
        volume: volume,
        quantity: quantity, // Используем выбранное количество
        isDiscounted: isDiscounted,
        cartItemId: cartItemId
      });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ПОДОБРАТЬ ИДЕАЛЬНОЕ МАСЛО</Text>
      
      {recommendedOils.length === 0 ? (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => handleAnswer(questions[currentQuestion].id, option.id)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
            >
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Вам могут подойти:</Text>
          
          <View style={styles.discountRow}>
            <Text style={styles.discountText}>Пенсионерам - скидка 10%</Text>
            <Switch
              value={isDiscounted}
              onValueChange={setIsDiscounted}
              trackColor={{ false: '#767577', true: '#4F6C36' }}
              thumbColor={isDiscounted ? '#f5f5f5' : '#f4f3f4'}
            />
          </View>

          {recommendedOils.map(oilId => {
            const oil = allOils.find(o => o.id === oilId);
            const volumes = oilVolumes[oilId as keyof typeof oilVolumes];
            const selectedVolume = selectedVolumes[oilId];
            const quantity = quantities[oilId] || 1;
            const volumeData = volumes.find(v => v.volume === selectedVolume);
            const price = volumeData ? (isDiscounted ? Math.round(volumeData.price * 0.9) : volumeData.price) : 0;
            const totalPrice = price * quantity;
            
            return oil ? (
              <View key={oilId} style={styles.oilCard}>
                <Image source={oil.image} style={styles.oilImage} />
                <Text style={styles.oilName}>{oil.name}</Text>
                
                <View style={styles.volumeSelector}>
                  {volumes.map(volume => (
                    <TouchableOpacity
                      key={volume.volume}
                      style={[
                        styles.volumeButton,
                        selectedVolume === volume.volume && styles.selectedVolume
                      ]}
                      onPress={() => handleVolumeSelect(oilId, volume.volume)}
                    >
                      <Text style={styles.volumeText}>{volume.volume}</Text>
                      <Text style={styles.priceText}>
                        {isDiscounted ? Math.round(volume.price * 0.9) : volume.price} ₽
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                {selectedVolume && (
                  <>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(oilId, quantity - 1)}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                      
                      <Text style={styles.quantity}>{quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(oilId, quantity + 1)}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.totalRow}>
                      <Text style={styles.totalText}>Итого: {totalPrice} ₽</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCartHandler(oilId)}
                    >
                      <Text style={styles.addButtonText}>ДОБАВИТЬ В КОРЗИНУ</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ) : null;
          })}
          
          <TouchableOpacity
            style={styles.restartButton}
            onPress={resetQuiz}
          >
            <Text style={styles.restartText}>Пройти тест заново</Text>
          </TouchableOpacity>
        </View>
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
  quizContainer: {
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
  question: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#4F6C36',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  optionText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#4F6C36',
  },
  resultsContainer: {
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
  resultsTitle: {
    fontFamily: 'Racama',
    fontSize: 20,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 20,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  oilCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
  oilImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(79, 108, 54, 0.3)',
  },
  oilName: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 15,
  },
  volumeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F6C36',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
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
  totalRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
    width: '100%',
  },
  totalText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
  },
  addButton: {
    backgroundColor: '#4F6C36',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
  addButtonText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
  },
  restartButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  restartText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#4F6C36',
  },
});