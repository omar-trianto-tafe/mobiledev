import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

export default function RegisterScreen({ route, navigation }) {
  const { item } = route.params;
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  
  return (
    <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title={item.title} subtitle="Detail View" titleStyle={styles.body} subtitleStyle={styles.body}/>
                <Card.Content>
                    <Text variant="bodyLarge" style={styles.description}>
                        {item.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.meta}>
                        ID: {item.id}
                    </Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <TextInput
                  mode='outlined'
                  style={styles.card}
                  textColor='#424754'
                  label="Full name"
                  value={fullName}
                  onChangeText={fullName => setFullName(fullName)}
                />

                <TextInput
                  mode='outlined'
                  style={styles.card}
                  textColor='#424754'
                  label="Email"
                  value={email}
                  onChangeText={email => setEmail(email)}
                  keyboardType='email-address'
                />

                <TextInput
                  mode='outlined'
                  style={styles.card}
                  textColor='#424754'
                  label="Phone"
                  value={phone}
                  onChangeText={phone => setPhone(phone)}
                  keyboardType='numeric'
                />
              </Card.Content>

              <Button
                  mode="contained"
                  onPress={() => alert(`${fullName} registered to event ${item.title}`)}
                  style={styles.button}
                  buttonColor="#DDAB5E"
                  textColor="#424754"
              >
                  Submit Registration
              </Button>

            </Card>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   {flex: 1, padding: 8, backgroundColor: '#3CA6E5',},
  body:        { color: '#424754' },
  card:        { backgroundColor: '#F5F5F5', margin: 12 },
  description: { marginBottom: 8, color: "#424754" },
  meta:        { color: "#999" },
  button:      { margin: 32, padding: 8},
});