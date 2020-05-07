import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from 'view/mainScreen';
import { GameScreen } from 'view/gameScreen';
import * as Font from 'expo-font';
import * as Localization from 'expo-localization';
import { AppLoading } from 'expo';
import localiseWorker from 'workers/localiseWorker';
import settingWorker from 'workers/settingWorker';
import scoreWorker from 'workers/scoreWorker';
import audioWorker from 'workers/audioWorker';

export const settings = new settingWorker();
export const scores = new scoreWorker();
export const loc = new localiseWorker(Localization.locale);
export const audio = new audioWorker();

const fetchFonts = () => {
  return Font.loadAsync({
    'Lobster': require('font/Lobster.ttf')
  });
};

const Stack = createStackNavigator();

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

