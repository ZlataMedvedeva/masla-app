import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Switch, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../context';
import { useFonts } from 'expo-font';

// Анимация для кнопки
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

interface OilDescription {
  title: string;
  content: string;
}

interface OilVolume {
  volume: string;
  price: number;
}

interface OilData {
  name: string;
  image: any;
  description: OilDescription[];
  price: string;
  volumes: OilVolume[];
}

interface OilDatabase {
  [key: string]: OilData;
}

const oilData: OilDatabase = {
  '1': {
    name: 'Масло чёрного тмина (Индия)',
    image: require('./assets/images/black-cumin-india.webp'),
    description: [
      {
        title: 'Знакомство с силой',
        content: 'Вы берёте ложку. Масло тёмное, тягучее, как густой вечер. Аромат — глубокий, пряный, с землёй, специями и чуть-чуть дымом.'
      },
      {
        title: 'Вкусовые ощущения',
        content: 'Пробуете — и сначала чувствуете мягкую горчинку, потом пряную волну, которая разливает тепло по всему телу. Без вспышек. Без агрессии. Но с характером. Вкус остаётся ещё долго — и будто собирает в теле силу, которая была рассыпана.'
      },
      {
        title: 'Для кого это масло',
        content: 'Это масло для тех, кто хочет укрепиться, поддержать свой организм. Его мягкая жгучесть включает ресурсы, но не пугает. Оно работает не резко, а с уважением к телу.'
      },
      {
        title: 'Состав',
        content: '🌿 В составе — витамины A, D, E, бета-каротин, жирные кислоты Омега-3 и Омега-6, минералы, фосфолипиды и тимохинон.'
      },
      {
        title: 'Польза',
        content: 'То, что помогает:\n\n- укрепить иммунитет и мягко пройти сезон простуд\n- поддержать пищеварение и микрофлору\n- снизить воспаление\n- улучшить работу мозга, нервной системы, сосудов\n- восстановиться после стресса, болезней или перегрузок\n- сохранить здоровье кожи, дыхания и женской сферы'
      },
      {
        title: 'Рекомендации',
        content: 'Если вы только начинаете знакомство с маслом чёрного тмина — Индия станет надёжным проводником. Это масло можно принимать курсами, добавлять по капле в еду, и слушать, как тело начинает включаться.\n\nПредставьте...\n\nВы пробуете первую ложечку. Вкус — мягкий, тёплый, чуть пряный. Он не требует, а сопровождает. И будто говорит: «Я с тобой. Я помогу»\n\nРаспробуйте. Не спеша. С уважением.\n\nИ, возможно, именно это масло останется с вами — надолго.'
      }
    ],
    price: '920/2300 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 920 },
      { volume: '300 мл', price: 2300 }
    ]
  },
  '2': {
    name: 'Масло чёрного тмина (Эфиопия)',
    image: require('./assets/images/black-cumin-ethiopia.webp'),
    description: [
      {
        title: 'Незабываемый вкус',
        content: 'Оно не стремится быть "приятным на вкус". Оно идёт своей дорогой. Масло чёрного тмина — это характер. Пряный, насыщенный, терпкий, тёмный, с ароматом, который говорит: «Я пришло, чтобы укрепить тебя».'
      },
      {
        title: 'Особенность',
        content: 'Это не просто добавка в еду — это масло, с которым советуются. Особая гордость — эфиопские семена. Они дают масло с многослойным вкусом, ярко выраженной терпкостью и насыщенным минеральным составом.'
      },
      {
        title: 'Для ценителей',
        content: 'Это масло выбирают те, кто уже знает, как работает тмин. Кто ищет глубину, а не компромисс. Вкус раскрывается, как специи на горячем песке: сначала горечь, затем тёплая пряность, потом долгое послевкусие.'
      },
      {
        title: 'Воздействие',
        content: 'Жгучесть — не агрессивная, а целительная. Масло согревает изнутри, включается мягко, но мощно. Организм будто вспоминает, как быть сильным.'
      },
      {
        title: 'Применение',
        content: 'Применяется курсами, добавляется по каплям, и работает на глубоком уровне — телесном и энергетическом.'
      },
      {
        title: 'Отличительные особенности',
        content: '💠 Отличительная особенность эфиопского масла:\n\n- более насыщенный минеральный состав\n- ярче, терпче и гуще по вкусу\n- особенно ценится знатоками\n- вызывает устойчивую любовь среди тех, кто пробовал'
      },
      {
        title: 'Свойства',
        content: '🩺 Свойства масла чёрного тмина:\n\n- иммуноповышающее\n- противовирусное, жаропонижающее\n- противовоспалительное\n- бронхорасширяющее, отхаркивающее\n- антисептическое, бактерицидное\n- противогрибковое, противопаразитарное\n- регенерирующее, ранозаживляющее\n- спазмолитическое, болеутоляющее\n- тонизирующее, мочегонное\n- сосудорасширяющее, антисклеротическое\n- противоаллергическое\n- поддерживает профилактику онкологических заболеваний'
      }
    ],
    price: '1600/4000 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 1600 },
      { volume: '300 мл', price: 4000 }
    ]
  },
  '3': {
    name: 'Масло абрикосовой косточки',
    image: require('./assets/images/apricot-oil.webp'),
    description: [
      {
        title: 'Описание',
        content: 'Светло-золотое, слегка вязкое, с ароматом свежего ядра абрикоса — это масло тонкое, но работающее. Его вкус — мягкий, с тёплой фруктовой ноткой и намёком на миндаль.'
      },
      {
        title: 'Производство',
        content: 'Мы отжимаем масло холодным способом — без нагрева, без контакта с металлом, из очищенных зрелых ядер. Такая технология позволяет сохранить:\n\n- живую структуру масла\n- витамины и жирные кислоты\n- натуральный вкус и аромат\n- высокую степень усвояемости'
      },
      {
        title: 'Состав',
        content: '💛 Что содержит:\n\n- Витамины: A, C, D, E, F, редкие B15 и B17\n- Жирные кислоты: Омега-6, олеиновая, пальмитиновая\n- Минералы: калий, кальций, магний, цинк, железо\n- Фосфолипиды — важны для клеточной регенерации'
      },
      {
        title: 'Применение',
        content: '📌 Можно использовать как внутрь, так и наружно. Это делает масло универсальным — оно питает изнутри и восстанавливает снаружи.'
      },
      {
        title: 'Для внутреннего применения',
        content: '🥄 Польза:\n\n- помогает коже выглядеть ровной и спокойной\n- поддерживает иммунитет, ЖКТ и обмен веществ\n- полезно при воспалениях, в сезон простуд\n- рекомендовано при авитаминозах\n- мягкое действие, подходит даже при чувствительном пищеварении'
      },
      {
        title: 'Для наружного применения',
        content: '🧴 Эффекты:\n\n- при сухости, шелушении, раздражении\n- для массажа, в том числе детского\n- укрепляет ресницы, питает губы и кутикулу\n- делает кожу более эластичной и гладкой\n- быстро впитывается, не оставляя плёнки'
      }
    ],
    price: '550/1350 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 550 },
      { volume: '300 мл', price: 1350 }
    ]
  },
  '4': {
    name: 'Масло грецкого ореха',
    image: require('./assets/images/walnut-oil.webp'),
    description: [
      {
        title: 'Характер',
        content: 'У него свой, особый темп. Без напора, без игры. Оно просто есть — сдержанное, достойное, с глубоким ореховым вкусом. Ни резкости, ни горчинки. Только гладкое, почти сливочное ощущение на языке.'
      },
      {
        title: 'Внешний вид',
        content: 'Цвет — как солнечный свет. Аромат — тонкий, уютный, будто вы только что разломили свежий орех. Вкус — ясный, маслянистый, чуть сладкий. Оно не требует акцентов. Оно — само акцент.'
      },
      {
        title: 'Польза',
        content: 'Грецкое масло — это про ясность. В нём много Омега-3, особенно важной для работы мозга, внимания, памяти и устойчивости к перегрузкам. Оно помогает тем, кто растёт. Тем, кто мыслит. Тем, кто хочет сохранить внутреннюю собранность, не теряя лёгкости.'
      },
      {
        title: 'Применение',
        content: 'Оно подходит детям, взрослым, пожилым — всем, кто хочет поддержать себя не таблеткой, а пищей. Усваивается легко, не даёт тяжести, мягко встраивается в ежедневный рацион.\n\nЛучше всего раскрывается в свежих блюдах:\n\n- в овощных салатах\n- в завтраках с творогом, фруктами\n- в запечённой тыкве, картофеле\n- и просто на кусочке хлеба'
      }
    ],
    price: '520/1300 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 520 },
      { volume: '300 мл', price: 1300 }
    ]
  },
  '5': {
    name: 'Рыжиковое масло',
    image: require('./assets/images/camelina-oil.webp'),
    description: [
      {
        title: 'Особенность',
        content: 'Это масло часто путают с грибами — и напрасно. Оно не из рыжиков. Оно из семян рыжика, растения Camelina sativa, которое ещё называют дикий лён, сибирский кунжут или даже золото удовольствия.'
      },
      {
        title: 'Вкус и цвет',
        content: 'Цвет — тёплый, янтарный, словно масло вобрало в себя всё солнце северного лета. А вкус — необычный: напоминает кунжут, но с лёгкой, едва уловимой остринкой, как у горчицы или редьки. Он удивляет — и запоминается. Это не нейтральное масло. Это масло с характером.'
      },
      {
        title: 'Происхождение',
        content: 'Родиной рыжика считают Юго-Восточную Азию и Восточную Европу. Сегодня он активно выращивается в Сибири. И именно здесь, в суровом и честном климате, семена набирают силу.'
      },
      {
        title: 'Польза',
        content: 'Почему рыжиковое масло ценят?\n\n- в нём до 40% Омега-3 — редкость для растительных масел\n- богато витаминами A, D, E и K\n- содержит фитостеролы и минералы\n- прекрасно усваивается, не вызывает тяжести\n- мягко поддерживает обмен веществ'
      },
      {
        title: 'Применение',
        content: 'Оно подходит не для жарки, а для настоящей, живой еды:\n\n- для салатов\n- для гарниров\n- для тёплых блюд\n- для каши утром\n- и особенно — для восстановления после болезни или стресса'
      }
    ],
    price: '350/850 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 350 },
      { volume: '300 мл', price: 850 }
    ]
  },
  '6': {
    name: 'Масло расторопши',
    image: require('./assets/images/milk-thistle-oil.webp'),
    description: [
      {
        title: 'Характер',
        content: 'У этого масла свой характер. Ненавязчивый, но уверенный. Вкус — сдержанный, ровный, тёплый. Цвет — от золотистого до янтарного. Оно не стремится удивить. Оно приходит, когда нужно восстановиться.'
      },
      {
        title: 'История',
        content: 'Расторопшу с давних времён называли "Божьим чертополохом" и "Святым чертополохом" — за её редкое, почти благословенное воздействие на печень. Это действительно растение, которое словно было даровано телу — чтобы исцеляться без борьбы, а через заботу.'
      },
      {
        title: 'Основной компонент',
        content: 'Сердце масла — силимарин. Это природное вещество, которое помогает печени регенерировать. Без форсажа. Без нагрузки. Оно просто создаёт условия, в которых клетки могут восстановиться. Спокойно, в своём ритме.'
      },
      {
        title: 'Состав',
        content: 'Состав — продуманный самой природой:\n\n- линолевая Омега-6 и олеиновая Омега-9\n- витамины A, D, E, F\n- фитостеролы и микроэлементы: цинк, медь, селен\n\nВсе компоненты работают вместе — не для эффекта, а для глубинной поддержки.'
      },
      {
        title: 'Когда применять',
        content: 'Масло расторопши особенно уместно:\n\n- после курсов приёма лекарств\n- после праздников и тяжёлой еды\n- при восстановлении после лечения\n- в моменты, когда печень устала\n- как тёплая профилактика'
      }
    ],
    price: '660/1650 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 660 },
      { volume: '300 мл', price: 1650 }
    ]
  },
  '7': {
    name: 'Масло штирийской тыквы',
    image: require('./assets/images/pumpkin-oil.webp'),
    description: [
      {
        title: 'Первое впечатление',
        content: 'Даже чайная ложка этого масла преображает блюдо. Оно тягучее, насыщенное, с глубоким вкусом зрелых тыквенных семечек и сладковатым, тёплым послевкусием. Цвет — как тень густой зелени в саду после дождя: тёмный, благородный, живой.'
      },
      {
        title: 'Происхождение',
        content: 'Семена штирийской тыквы — родом из Австрии, из провинции Штирия, где издавна ценили вкус, глубину и силу тыквенного масла. Сегодня эти семена выращивают фермеры в России, с тем же вниманием и любовью к своему делу.'
      },
      {
        title: 'Вкус',
        content: 'Вкус — глубокий, мягкий, обволакивающий с ореховыми и хлебными нотами. Оно особенно ярко раскрывается в еде:\n\n- запечённая свёкла с тыквенным маслом\n- ложечка в тыквенный крем-суп\n- салаты, картофель, пюре, паста'
      },
      {
        title: 'Состав',
        content: 'В составе — более 50 макро- и микроэлементов: калий, магний, фосфор, цинк, селен, железо, медь. Всё — в живой форме, понятной организму.'
      },
      {
        title: 'Польза',
        content: 'Масло помогает:\n\n- мягко очищать от паразитов\n- восстанавливать работу ЖКТ\n- поддерживать печень\n- укреплять мужское здоровье'
      }
    ],
    price: '730/1820 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 730 },
      { volume: '300 мл', price: 1820 }
    ]
  },
  '8': {
    name: 'Горчичное масло',
    image: require('./assets/images/mustard-oil.webp'),
    description: [
      {
        title: 'Характер',
        content: 'Это масло — как надёжный друг. Не громкий, но всегда к месту. У него свой, уверенный характер: пряный, насыщенный, с глубиной. Без резкости. Без жжения. Всё, что может горчить, остаётся в жмыхе. Само масло — гладкое, мягкое, с приятным теплом, которое раскрывается внутри и остаётся с вами.'
      },
      {
        title: 'Аромат и вкус',
        content: 'Аромат — тонкий, чуть хлебный. Вкус — живой и тёплый. Особенно вкусно с кашами, капустой, супами. Но есть блюда, в которых оно звучит особенно ярко:\n\n- с запечёнными овощами\n- в винегрете — там, где свёкла, горошек и кислинка капусты встречаются с мягкой пряностью'
      },
      {
        title: 'Польза',
        content: 'Горчичное масло — природный помощник:\n\n- поддерживает иммунитет\n- обладает антисептическими свойствами\n- помогает при сезонных простудах\n- бережно влияет на половую систему'
      },
      {
        title: 'Состав',
        content: 'В составе — всё, что питает и восстанавливает:\n\n🌿 жирные кислоты Омега-3, 6 и 9\n🌿 витамин Е\n🌿 цинк, фосфор, кальций, магний, железо'
      }
    ],
    price: '295/730 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 295 },
      { volume: '300 мл', price: 730 }
    ]
  },
  '9': {
    name: 'Льняное масло',
    image: require('./assets/images/linseed-oil.webp'),
    description: [
      {
        title: 'Первое впечатление',
        content: 'Это масло не про яркость. Оно про уют. Про прикосновение, которого не хватало. Густое, тягучее, мягкое — оно ложится в ложку, будто хочет остаться дольше.'
      },
      {
        title: 'Вкус',
        content: 'А когда касается языка, не спешит раскрыться: сначала лёгкая сладость, потом — мягкое, обволакивающее тепло, как шар, как поток, который не имеет углов. Без горечи, без нажима. Только спокойствие. И внутренняя ясность. На удивление вкусно.'
      },
      {
        title: 'Производство',
        content: 'Настоящее льняное масло никогда не горчит. И это не удача — это уважение к каждому этапу получения масла. Мы не нагреваем ни семена, ни само масло. Не используем металл. Берём только зрелое, чистое, насыщенное сырьё.'
      },
      {
        title: 'Состав',
        content: 'В нём всё, что нужно телу:\n\n- Омега-3, Омега-6 и Омега-9\n- витамины A, E, B, F, K\n- магний, цинк, селен, медь, фосфор'
      },
      {
        title: 'Польза',
        content: 'Оно мягко поддерживает пищеварение, успокаивает воспалительные процесс, питает сосуды, помогает в восстановлении и настраивает изнутри. Без давления. Без "быстрого эффекта". Просто работает — так, как работает природа — с любовью.'
      }
    ],
    price: '240/590 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 240 },
      { volume: '300 мл', price: 590 }
    ]
  },
  '10': {
    name: 'Кунжутное масло',
    image: require('./assets/images/sesame-oil.webp'),
    description: [
      {
        title: 'Характер',
        content: 'Это масло не стремится удивить. Оно мягкое, спокойное, с лёгким ароматом и нежным, вкусом. В нём нет ярких акцентов — только тепло, гармония, сила и умиротворение, которые дают внутреннюю опору. Кунжутное масло будто говорит: «Я рядом. Я позабочусь».'
      },
      {
        title: 'Применение',
        content: 'Оно раскрывается особенно глубоко в тёплой пище — в кашах, гарнирах, запечённых овощах, супах. Но особенное удовольствие — попробовать его с квашеной капустой. В этой паре — удивительный союз вкуса и пользы.'
      },
      {
        title: 'Состав',
        content: 'В кунжутном масле содержатся ценные жирные кислоты (Омега-6 и Омега-9), витамины A, B, C, D, E, K и целая палитра минералов: кальций, железо, цинк, магний, медь, фосфор, калий. Это масло особенно богато природным кальцием.'
      },
      {
        title: 'Польза',
        content: 'Это сильное масло для поддержки:\n\n- суставов, костей, хрящей\n- при остеохондрозе, артрите\n- улучшает кровообращение\n- питает ткани изнутри'
      }
    ],
    price: '300/750 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 300 },
      { volume: '300 мл', price: 750 }
    ]
  },
  '11': {
    name: 'Подсолнечное масло',
    image: require('./assets/images/sunflower-oil.webp'),
    description: [
      {
        title: 'Характер',
        content: 'Это масло ближе нам. Оно не стремится удивить. Оно лёгкое. Оно про повседневную заботу. Его вкус — едва уловимый, как солнечный зайчик на ладони.'
      },
      {
        title: 'Особенность',
        content: 'Натуральное подсолнечное масло из сырых семечек — такое, каким оно должно быть. Без обжарки, без резких ароматов, без тяжести. Только нежность и энергия солнца.'
      },
      {
        title: 'Витамины',
        content: 'Подсолнечное масло — настоящий чемпион по содержанию витамина Е (альфа-токоферола). Его здесь в 12 раз больше, чем в оливковом масле. Это один из самых мощных природных антиоксидантов, который замедляет старение, питает клетки и дарит организму внутреннюю поддержку.'
      },
      {
        title: 'Польза',
        content: 'Кроме того, вещества в составе масла:\n\n- улучшают память\n- поддерживают гормональную систему\n- участвуют в обмене веществ\n- помогают сохранить ясность ума'
      }
    ],
    price: '180/460 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 180 },
      { volume: '300 мл', price: 460 }
    ]
  },
  '12': {
    name: 'Конопляное масло',
    image: require('./assets/images/hemp-oil.webp'),
    description: [
      {
        title: 'Описание',
        content: 'Это масло создано самой природой, чтобы бережно поддерживать тело и напоминать о балансе. Нежное, текучее, с мягким вкусом свежескошенной травы и лёгким ароматом зелени, оно усваивается легко и деликатно.'
      },
      {
        title: 'Традиции',
        content: 'Конопляное масло — не просто продукт. Это часть традиций и настоящее возвращение к корням. Его ценили на Руси как ежедневную пищу и средство силы. Сегодня мы возрождаем этот опыт — с уважением к прошлому и вниманием к каждой детали.'
      },
      {
        title: 'Состав',
        content: 'Состав богат:\n\n- витамины A, B, C, D, E\n- макро- и микроэлементы\n- идеальное соотношение Омега-6 к Омега-3 — 3:1\n\nВсе компоненты в живой, легкоусвояемой форме.'
      },
      {
        title: 'Применение',
        content: 'Масло прекрасно сочетается с:\n\n- салатами\n- кашами\n- пюре\n- гарнирами\n- смузи\n\nВместе они помогают пищеварению, дарят лёгкость и насыщают организм нужными микроэлементами.'
      }
    ],
    price: '550/1350 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 550 },
      { volume: '300 мл', price: 1350 }
    ]
  },
  '13': {
    name: 'Масло кедрового ореха',
    image: require('./assets/images/cedar-nut-oil.webp'),
    description: [
      {
        title: 'Первое впечатление',
        content: 'Вы когда-нибудь пробовали масло, которое не просто питает — а будто обнимает изнутри? Густое, ароматное, с мягкой сладостью и тёплым послевкусием... В кедровом масле чувствуется всё: глубина сибирской земли, чистый воздух хвойных лесов и природная сила, что накапливалась сотнями лет.'
      },
      {
        title: 'Уникальность',
        content: 'Это одно из самых питательных масел, и его уникальность — в пиноленовой кислоте, которую можно встретить только в хвойных растениях. А также — в золотом балансе Омега-3 к Омега-6 (1:2), что делает его легко усвояемым и полезным для всех: от малышей до старших поколений.'
      },
      {
        title: 'Происхождение',
        content: 'Кедровое масло из северных орехов особенно ценится за богатый состав. В суровом климате Сибири кедры растут медленно, впитывая силу земли и устойчивость к ветрам и морозам. Именно поэтому их плоды дают насыщенное, мощное, целебное масло.'
      },
      {
        title: 'Историческая справка',
        content: 'Ещё в XVIII веке академик Паллас писал, что оно восстанавливает силы, возвращает молодость, укрепляет организм. Совпадение или нет, но и Распутин, и непобедимый борец Карелин — оба из сибирского кедрового края.'
      },
      {
        title: 'Применение',
        content: 'Добавьте каплю масла в кашу или на овощи — и еда зазвучит иначе. Оно не только вкусное, но и помогает восстанавливаться, поддерживать иммунитет, питать мозг, сердце, кожу.'
      }
    ],
    price: '1050/2550 (100/300 мл)',
    volumes: [
      { volume: '100 мл', price: 1050 },
      { volume: '300 мл', price: 2550 }
    ]
  }
};

export default function OilDetailPage() {
  const [fontsLoaded] = useFonts({
    'Lena': require('./assets/fonts/Lena.ttf'),
    'Racama': require('./assets/fonts/Racama.ttf'),
  });

  const { id } = useLocalSearchParams<{ id: string }>();
  const { cart, addToCart, updateQuantity } = useAppContext();
  const oil = id ? oilData[id] : null;
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [inCart, setInCart] = useState<{quantity: number, cartItemId: string} | null>(null);

  useEffect(() => {
    if (id && selectedVolume) {
      const cartItemId = `${id}_${selectedVolume}`;
      const itemInCart = cart.find(item => item.cartItemId === cartItemId);
      setInCart(itemInCart ? {quantity: itemInCart.quantity, cartItemId} : null);
    } else {
      setInCart(null);
    }
  }, [cart, id, selectedVolume]);

  const handleAddToCart = () => {
    if (!selectedVolume || !oil) return;
    const volumeData = oil.volumes.find(v => v.volume === selectedVolume);
    if (!volumeData) return;
    const price = isDiscounted ? Math.round(volumeData.price * 0.9) : volumeData.price;
    addToCart({
      id: id as string,
      name: oil.name,
      price: price,
      image: oil.image,
      volume: selectedVolume,
      isDiscounted
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!inCart) return;
    updateQuantity(inCart.cartItemId, newQuantity);
  };

  if (!fontsLoaded) {
    return null;
  }

  if (!oil) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Масло не найдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={oil.image} style={styles.mainImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{oil.name}</Text>
        {oil.description.map((section: OilDescription, index: number) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionText}>{section.content}</Text>
          </View>
        ))}
        <View style={styles.volumeSelector}>
          <Text style={styles.sectionTitle}>Выберите объем:</Text>
          <View style={styles.volumeButtons}>
            {oil.volumes.map((volume, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.volumeButton,
                  selectedVolume === volume.volume && styles.selectedVolume
                ]}
                onPress={() => setSelectedVolume(volume.volume)}
              >
                <Text style={styles.volumeText}>{volume.volume}</Text>
                <Text style={styles.priceText}>{volume.price} ₽</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.discountRow}>
          <Text style={styles.discountText}>Пенсионерам - скидка 10%</Text>
          <Switch
            value={isDiscounted}
            onValueChange={setIsDiscounted}
            trackColor={{ false: '#767577', true: '#4F6C36' }}
            thumbColor={isDiscounted ? '#f5f5f5' : '#f4f3f4'}
          />
        </View>
        {selectedVolume && (
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Итого: {isDiscounted
                ? Math.round(oil.volumes.find(v => v.volume === selectedVolume)!.price * 0.9)
                : oil.volumes.find(v => v.volume === selectedVolume)!.price
              } ₽
            </Text>
          </View>
        )}
        {inCart ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(inCart.quantity - 1)}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{inCart.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(inCart.quantity + 1)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ButtonAnimated
            style={[
              styles.orderButton,
              !selectedVolume && styles.disabledButton
            ]}
            onPress={handleAddToCart}
            disabled={!selectedVolume}
          >
            <Text style={styles.orderButtonText}>
              {selectedVolume ? 'В КОРЗИНУ' : 'ВЫБЕРИТЕ ОБЪЕМ'}
            </Text>
          </ButtonAnimated>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
  },
  notFoundText: {
    fontFamily: 'Racama',
    fontSize: 18,
    color: '#4F6C36',
    textAlign: 'center',
    marginTop: 20,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Lena',
    fontSize: 32,
    color: '#4F6C36',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(121, 237, 92, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'Racama',
    fontSize: 20,
    color: '#4F6C36',
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  volumeSelector: {
    marginBottom: 20,
  },
  volumeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    marginTop: 10,
    borderColor: 'rgba(121, 237, 92, 0.2)',
    borderWidth: 1,
  },
  orderButtonText: {
    fontFamily: 'Racama',
    fontSize: 16,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F6C36',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
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
