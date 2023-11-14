/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type HeaderProps = {
  setCurrentView: (arg0: any) => void;
  setTime: (arg0: any) => void;
  currentView: number;
};

const options = ['Pomodoro', 'Short Break', 'Long Break'];

const Header = ({currentView, setTime, setCurrentView}: HeaderProps) => {
  function handlePres(index: number) {
    let defineTimer = 25;

    if (index === 1) {
      defineTimer = 5;
    } else if (index === 2) {
      defineTimer = 15;
    }

    setCurrentView(index);
    setTime(defineTimer * 60);
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePres(index)}
          style={[
            styles.itemStyle,
            currentView !== index && {borderColor: 'transparent'},
          ]}>
          <Text style={{fontWeight: 'bold'}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    borderWidth: 3,
    padding: 5,
    borderColor: 'white',
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Header;
