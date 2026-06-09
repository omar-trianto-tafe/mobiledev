import {View, StyleSheet} from "react-native";
import { Text, Card, Button, Icon } from "react-native-paper";
import { useTheme } from '../ThemeContext';

export default function DetailsScreen({ route, navigation }){
    const { item } = route.params;

    const { colors } = useTheme();

    return(
        <View style={[styles.container, {backgroundColor: colors.primary}]}>
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

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Icon
                    source="clock"
                    size={16}
                />
                <Text style={{color: '#F5F5F5'}}> {item.startTime}-{item.endTime} </Text>

                <Icon
                    source="map-marker"
                    size={16}
                />
                <Text style={{color: '#F5F5F5'}}> {item.location} </Text>
            </View>

            <Button
                mode="contained"
                onPress={() => navigation.navigate('Register', { item: item })}
                style={styles.button}
                buttonColor="#DDAB5E"
                textColor="#424754"
            >
                Register
            </Button>
            <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.button}
                buttonColor="#F5F5F5"
                textColor="#424754"
            >
                Go Back
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 8 },
  card:        { margin: 12 },
  description: { marginBottom: 8 },
  meta:        { color: "#999" },
  button:      { marginTop: 8},
});