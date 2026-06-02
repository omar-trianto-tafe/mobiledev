import {View, StyleSheet} from "react-native";
import { Text, Card, Button, Icon } from "react-native-paper";

export default function DetailsScreen({ route, navigation }){
    const { item } = route.params;

    return(
        <View style={styles.container}>
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

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Icon
                    source="clock"
                    size={16}
                />
                <Text> {item.startTime}-{item.endTime} </Text>

                <Icon
                    source="map-marker"
                    size={16}
                />
                <Text> {item.location} </Text>
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
  container:   {flex: 1, padding: 8, backgroundColor: '#3CA6E5',},
  body:        { color: '#424754' },
  card:        { backgroundColor: '#F5F5F5', margin: 12 },
  description: { marginBottom: 8, color: "#424754" },
  meta:        { color: "#999" },
  button:      { marginTop: 8},
});