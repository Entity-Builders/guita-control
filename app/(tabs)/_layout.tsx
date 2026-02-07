import { Tabs } from 'expo-router';
import { CurrencyProvider, ExpensesProvider } from '@eb-packages/ui';

export default function TabLayout() {
  return (
    <CurrencyProvider>
      <ExpensesProvider>
        <Tabs
          screenOptions={{
            headerStyle: { backgroundColor: '#1e293b' },
            headerTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#1e293b',
              borderTopColor: '#334155',
            },
            tabBarActiveTintColor: '#34d399',
            tabBarInactiveTintColor: '#94a3b8',
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Dashboard',
              headerTitle: 'GuitaControl',
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name='expenses'
            options={{
              title: 'Gastos',
              headerTitle: 'Gastos Fijos',
              headerShown: false,
            }}
          />
        </Tabs>
      </ExpensesProvider>
    </CurrencyProvider>
  );
}
