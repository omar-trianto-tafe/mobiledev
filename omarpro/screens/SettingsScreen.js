import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, List, Switch, Snackbar, Button, Card } from 'react-native-paper';
import { useTheme, ThemeContext } from '../ThemeContext';  

export default function SettingsScreen() {
  const { colors, isDark, themeMode, updateTheme } = useTheme();

  const [sounds, setSounds] = React.useState(true);
  const [snack, setSnack] = React.useState(false);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Card style={[styles.card, {backgroundColor: colors.background}]}>
      <Text variant="headlineMedium" style={[styles.mb16, {color: colors.text}]}>Settings</Text>

      <List.Section>

        {/* DARK MODE SWITCH */}
        <List.Item
          title="Dark Mode"
          titleStyle={{color: colors.text}}
          description={isDark ? 'Enabled' : 'Disabled'}
          right={() => (
            <Switch 
              value={isDark} 
              onValueChange={() => updateTheme(isDark ? 'light' : 'dark')}
            />
          )}
        />

        {/* SOUNDS SWITCH (your original) */}
        <List.Item
          title="Sounds"
          titleStyle={{color: colors.text}}
          description={sounds ? 'On' : 'Off'}
          right={() => (
            <Switch 
              value={sounds} 
              onValueChange={() => setSounds(!sounds)} 
            />
          )}
        />

      </List.Section>

      <Button mode="contained" buttonColor="#DDAB5E" onPress={() => setSnack(true)}>
        Save Settings
      </Button>

      <Snackbar 
        visible={snack} 
        onDismiss={() => setSnack(false)} 
        duration={1500}
      >
        Settings saved
      </Snackbar>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  mb16: { marginBottom: 16 },
  card: { margin: 12, padding: 8 },
});
