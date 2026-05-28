import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Text, TextInput } from 'react-native-paper';

export default function HomeScreen({ navigation }) {

    const [text, setText] = React.useState("");
//Remote data here
const [events, setEvents] = React.useState([]);
const [loading, setLoading] = React.useState(false); //Add cool spin animation part2
const [error, setError] = React.useState('');

const EVENTS_URL = 'https://tafeshaun.github.io/elevate-data/events.json';

const loadEvents = async () => {
    try{
        setLoading(true);
        setError('');
        const response = await fetch(EVENTS_URL);
        if(!response.ok){
            throw new Error('Network response failed. Panic!')
        }
        const text = await response.text();
        const cleaned = text.replace(/^\uFEFF/, ''); //Clean
        const data = JSON.parse(cleaned);
        setEvents(data);
    }
    catch (e){
        setError('Could not load any events. Check git connection and maybe panic more');
        console.error(e);
    }
    finally {
        setLoading(false);
    }
 
}

React.useEffect(() => {
    loadEvents();
}, []);

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineMedium" style={styles.title}>
                        Welcome
                    </Text>
                    <Text variant="bodyLarge" style={styles.body}>
                        Find and register for Community Events
                    </Text>
                    <Button mode='outlined' style={{marginTop: '20px'}} textColor='#424754'
                        onPress={() => navigation.navigate('Events')}
                    >View Today's Events</Button>
                </Card.Content>
            </Card>
            <TextInput
                style={styles.card}
                textColor='#424754'
                label="Search Events..."
                value={text}
                onChangeText={text => setText(text)}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Chip style={styles.chip} textStyle={styles.chip}>Athletics</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Today</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Fitness</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Music</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Social</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Outdoors</Chip>
                <Chip style={styles.chip} textStyle={styles.chip}>Family</Chip>
            </View>

{/* ADD ERROR MSG HERE FOR LATER TESTING */}
{!!error && <Text style={{color: '#ff0000'}}>{error}</Text>}

{/* Add cool spin animation part2 */}
{loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

{events.map(event => (
<Card
    key={String(event.id)}
    style={styles.card}
    onPress={() => navigation.navigate("Details", { item: event })} //PARAMS!
>
    {/* Added subtitle to show date field from the remote JSON */}
    <Card.Title title={event.title} subtitle={event.date} titleStyle={styles.body} subtitleStyle={styles.body}/>
        <Card.Content>
            <Text variant="bodyMedium" style={styles.body}>{event.description}</Text>
        </Card.Content>
</Card>
))}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:  {flex: 1, padding: 8, backgroundColor: '#3CA6E5',},
    title:      { marginBottom: 12, fontWeight: 'bold', color: '#424754' },
    body:       { color: '#424754' },
    card:       { backgroundColor: '#F5F5F5', margin: 12 },
    chip:       { backgroundColor: '#F5F5F5', color: '#424754', margin: 4 },
});