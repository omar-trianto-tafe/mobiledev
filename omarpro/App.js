import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from 'react-native';
import { Provider as PaperProvider, IconButton} from 'react-native-paper';

import { useTheme, ThemeProvider } from './ThemeContext';

import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RegisterScreen from "./screens/RegisterScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// logo component
function HeaderLogo() {
  return (
    <Image
      style={{ width: 83, height: 32, resizeMode: 'contain' }}
      source={require('./assets/Logo.jpg')}
    />
  );
}

// track stack pop-on and pop-off
function HomeStack() {
  const { colors } = useTheme();

  return(
    <Stack.Navigator screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#424754',
            headerRight: () => (
              <IconButton 
                icon="cog"
                size={30}
                iconColor='#424754'
                onPress={ () => navigation.navigate('Settings')}
              />
            )
        }) 
      }>
      <Stack.Screen name="Home" component={HomeScreen}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Events" component={EventsScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
          <PaperProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ navigation }) => ({
                      tabBarActiveTintColor: '#424754',
                      tabBarInactiveTintColor: '#999',
                      headerStyle: {backgroundColor: '#3CA6E5'},
                      headerTintColor: '#424754',
                      headerRight: () => (
                        <IconButton 
                          icon="cog"
                          size={30}
                          iconColor='#424754'
                          onPress={ () => navigation.navigate('Settings')}
                        />
                      ),
                  })}
              >

              <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}} />
              <Tab.Screen name="Events" component={EventsScreen}/>
              <Tab.Screen name="Details" component={DetailsScreen} options={{tabBarButton: (props) => null}}/>
              <Tab.Screen name="Register" component={RegisterScreen} options={{tabBarButton: (props) => null}}/>
              <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarButton: (props) => null}}/>
              
              </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    </ThemeProvider>
  );
}