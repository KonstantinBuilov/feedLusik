import { AsyncStorage } from 'react-native';

export default function asHandler(type) {
    return {
        async load(){
            const value = await AsyncStorage.getItem(type);
            if (value !== null) {
                return JSON.parse(value);
            }
            else {
                if (type == 'feedLusicScore') {
                    return defaultScoreTable;
                }
                else {
                    return defaultSettings;
                }
            }
        },
        async save(obj) {
            await AsyncStorage.setItem(type, JSON.stringify(obj));
        }
    }
}

const defaultScoreTable = [
    { name: 'AAA', score: 10 },
    { name: 'AAB', score: 9 },
    { name: 'AAC', score: 8 },
    { name: 'AAD', score: 7 },
    { name: 'AAE', score: 6 },
    { name: 'AAF', score: 5 },
    { name: 'AAG', score: 4 },
    { name: 'AAH', score: 3 },
    { name: 'AAI', score: 2 },
    { name: 'AAJ', score: 1 }
];

const defaultSettings = {
    sound: true,
    music: true
};