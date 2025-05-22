import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useTheme, Icon } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon source="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="roleplay"
        options={{
          title: 'Roleplay',
          tabBarIcon: ({ color, focused }) => (
            <Icon source="movie" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, focused }) => (
            <Icon source="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color, focused }) => (
            <Icon source="alert" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
