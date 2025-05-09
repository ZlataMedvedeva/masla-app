import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './context';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4F6C36' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="katalog"
          options={{ title: 'Каталог масел' }}
        />
        <Stack.Screen
          name="degustaciya"
          options={{ title: 'Онлайн-дегустация' }}
        />
        <Stack.Screen
          name="degustaciya/[id]"
          options={{ title: 'Дегустация масла' }}
        />
        <Stack.Screen
          name="kontakty"
          options={{ title: 'Контакты' }}
        />
        <Stack.Screen
          name="cart"
          options={{ title: 'Корзина' }}
        />
        <Stack.Screen
          name="favorites"
          options={{ title: 'Избранное' }}
        />
        <Stack.Screen
          name="podobrat"
          options={{ title: 'Подобрать масло' }}
        />
      </Stack>
    </AppProvider>
  );
}
