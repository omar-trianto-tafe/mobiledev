import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, IconButton} from 'react-native-paper';

import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RegisterScreen from "./screens/RegisterScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//Track stack pop-on and pop-off
function HomeStack() {
  return(
    <Stack.Navigator screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: '#3CA6E5'},
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
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Events" component={EventsScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#424754',
                tabBarInactiveTintColor: '#999',
                headerStyle: {backgroundColor: '#3CA6E5'},
                headerTintColor: '#424754',
              }}
            >

            <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}} />
            <Tab.Screen name="Events" component={EventsScreen}/>
            
            
            </Tab.Navigator>
          </NavigationContainer>
      </PaperProvider>
  );
}