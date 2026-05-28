import {View, StyleSheet} from "react-native";
import { Text, Card, Button } from "react-native-paper";

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