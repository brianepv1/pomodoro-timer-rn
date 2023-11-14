/* eslint-disable no-bitwise */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';

import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

function App(): JSX.Element {
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentView, setCurrentView] = useState(
    'NORMAL_TIME' | 'SHORT_BREAK' | 'LONG_BREAK',
  );

  useEffect(() => {
    let interval: any = null;

    if (startTimer) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setStartTimer(prev => !prev);
      setTime(startTimer ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [startTimer, time]);

  function handleStartTimer() {
    setStartTimer(!startTimer);
  }

  return (
    <SafeAreaView
      style={[styles.mainContainer, {backgroundColor: colors[currentView]}]}>
      <View style={styles.viewAndroid}>
        <Text style={styles.sectionTitle}>Pomodor app</Text>
        <Header
          setTime={setTime}
          setCurrentView={setCurrentView}
          currentView={currentView}
        />
        <Timer time={time} />
        <TouchableOpacity
          onPress={handleStartTimer}
          style={styles.setStartTimerButton}>
          <Text style={styles.setStartTimerText}>
            {startTimer ? 'STOP' : 'START'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  viewAndroid: {
    paddingTop: Platform.OS === 'android' ? 30 : undefined,
    paddingHorizontal: 15,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  setStartTimerButton: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  setStartTimerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
