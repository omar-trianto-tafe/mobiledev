import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

export default function RegisterScreen({ route, navigation }) {
  const { item } = route.params;
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const { colors } = useTheme();
  
  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.primary}]}>
            <Card style={[styles.card, {backgroundColor: colors.background}]}>
                <Card.Title title={item.title} subtitle="Detail View" 
                    titleStyle={{color: colors.text}}
                    subtitleStyle={{color: colors.text}}/>
                <Card.Content>
                    <Text variant="bodyLarge" style={[styles.description, {color: colors.text}]}>
                        {item.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.meta}>
                        ID: {item.id}
                    </Text>
                </Card.Content>
            </Card>

            <Card style={[styles.card, {backgroundColor: colors.background}]}>
              <Card.Content>
                <TextInput
                  mode='outlined'
                  style={[styles.card, {backgroundColor: colors.background}]}
                  contentStyle={{ color: colors.text }}
                  label="Full name"
                  value={fullName}
                  onChangeText={fullName => setFullName(fullName)}
                />

                <TextInput
                  mode='outlined'
                  style={[styles.card, {backgroundColor: colors.background}]}
                  contentStyle={{ color: colors.text }}
                  label="Email"
                  value={email}
                  onChangeText={email => setEmail(email)}
                  keyboardType='email-address'
                />

                <TextInput
                  mode='outlined'
                  style={[styles.card, {backgroundColor: colors.background}]}
                  contentStyle={{ color: colors.text }}
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
  container:   { flex: 1, padding: 8 },
  card:        { margin: 12 },
  description: { marginBottom: 8 },
  meta:        { color: "#999" },
  button:      { margin: 32, padding: 8},
});