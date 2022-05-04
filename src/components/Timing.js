import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Button, View } from 'react-native';
import { colors } from '../utils/colors';
import { spacing }  from '../utils/sizes';
import { RoundedButton } from './RoundedButton';

export const Timing = ({onChangeTime}) => {
  return (
    <>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title={'0.05'} onPress={() => onChangeTime(0.05)} />
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title={'15'} onPress={() => onChangeTime(15)} />
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title={'20'} onPress={() => onChangeTime(20)} />
    </View>
    </>
    
  );
};

const styles = (size) => ({

    timingButton: {
      flex: 1,
      alignItems: 'center'
    },
    text: { color: colors.white },
  }); 