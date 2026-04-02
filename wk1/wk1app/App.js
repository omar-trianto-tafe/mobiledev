import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//React Paper Import

export default function App() {
  //Plain JS
  const [count, setCount] = useState(0);
  
  //Return the UI with the JS inside of it
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.counter}> Count: {count} </Text>
      <Button 
        title='Press to Count'
        onPress={() => setCount(count + 1)}
      />
      <Button 
        title='Reset'
        onPress={() => setCount(0)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counter: {
    fontSize: 20,
    marginBottom: 20,
    color: '#dc3a3a',
  }
});
 