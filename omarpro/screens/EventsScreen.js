import * as React from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { ScrollView, View, StyleSheet, Alert, Platform } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Text, Searchbar, TextInput, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

const STORAGE_KEY = 'cached_events';

export default function EventsScreen({ navigation }) {
    const { colors } = useTheme();

const [events, setEvents] = React.useState([]);
const [loading, setLoading] = React.useState(false); //Add cool spin animation part2
const [error, setError] = React.useState('');

// Load 
const loadLocalEvents = async () => {
try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) setEvents(JSON.parse(raw));
} catch (e) {
    console.error('Load failed:', e);
}
};

React.useEffect(() => {
loadLocalEvents();
}, []);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(events);

    // filter events by title or date based on search query
    const filteredEvents = events.filter(e => {
        const q = searchQuery.toLowerCase();
        return (
        e.title.toLowerCase().includes(q) ||
        e.date.toLowerCase().includes(q)
        );
    });

    // make chips selectable
    const [selectedChips, setSelectedChips] = React.useState([]);

    const tags = ['Athletics', 'Today', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'];

    const handlePress = (tag) => {
        if (selectedChips.includes(tag)) {
            setSelectedChips(selectedChips.filter((item) => item !== tag));
        } 
        else {
            setSelectedChips([...selectedChips, tag]);
        }
    };

    // Delete
    const deleteEvent = async (id) => {
        const buttons = [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const updated = events.filter(e => e.id !== id);
                    setEvents(updated);
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                },
            },
        ];
        // check platform since Alert.alert doesn't work on web, only on mobile
        if (Platform.OS === 'web') {
            if (window.confirm('Delete Event — Are you sure?')) {
            await buttons[1].onPress();
            }
        } else {
            Alert.alert('Delete Event', 'Are you sure?', buttons);
        }
        };

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.primary}]}>
            <Card style={[styles.card, {backgroundColor: colors.background}]}>
                <Card.Content>

                  <Searchbar
                      elevation={0}
                      style={[styles.searchbar, {backgroundColor: colors.background}]}
                      inputStyle={{ color: colors.text }}
                      placeholderTextColor="gray"
                      placeholder="Search Events..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                  />
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {tags.map((tag) => (
                          <Chip
                          key={tag}
                          selected={selectedChips.includes(tag)}
                          onPress={() => handlePress(tag)}
                          style={[styles.chip, {backgroundColor: colors.background}]}
                          textStyle={{color: colors.text}}
                          selectedColor="#DDAB5E"
                          mode='outlined' 
                          >
                              {tag}
                          </Chip>
                      ))}
                  </View>

                </Card.Content>
            </Card>

            <Text variant='bodyMedium' style={{ marginLeft: 12, color: colors.text }}>
                Showing {filteredEvents.length} event(s)
            </Text>

{/* ADD ERROR MSG HERE FOR LATER TESTING */}
{!!error && <Text style={{color: '#ff0000'}}>{error}</Text>}

{/* Add cool spin animation part2 */}
{loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

{filteredEvents.map(event => (
<Card
    key={String(event.id)}
    style={[styles.card, {backgroundColor: colors.background}]}
>
    {/* Added subtitle to show date field from the remote JSON */}
    <Card.Title title={event.title} subtitle={event.date} titleStyle={{color: colors.text}} subtitleStyle={{color: colors.text}}/>
        <Card.Content>
            <Text variant="bodyMedium" style={{color: colors.text}}>{event.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <IconButton
                  icon='eye'
                  iconColor={colors.text}
                  onPress={() => navigation.navigate("Details", { item: event })} //PARAMS!
                />
                <IconButton
                  icon='pencil-outline'
                  iconColor={colors.text}
                  //onPress={() => startEdit(event)}
                />
                <IconButton
                  icon='delete-outline'
                  iconColor='crimson'
                  onPress={() => deleteEvent(event.id)}
                />
              </View>
        </Card.Content>
</Card>
))}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:  {flex: 1, padding: 8,},
    title:      { marginBottom: 12, fontWeight: 'bold', color: '#424754' },
    card:       { margin: 12 },
    chip:       { borderColor: '#000000', margin: 4 },
    searchbar:  { borderWidth: 1, borderColor: '#000000', borderRadius: 8, marginBottom: 12 },
});