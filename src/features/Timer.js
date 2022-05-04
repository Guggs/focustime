import React, { useState } from 'react';
import {View, Text, StyleSheet, Vibration, Button } from 'react-native';
import { Countdown } from '../components/Countdown'
import { RoundedButton } from '../components/RoundedButton'
import { spacing } from '../utils/sizes'
import { colors } from '../utils/colors'
import { ProgressBar, Colors } from 'react-native-paper';
import { Timing } from '../components/Timing';
import { useKeepAwake } from 'expo-keep-awake';



const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  0 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS
];


export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  }
  
  return (
    <View style={styles.container} >
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={setProgress} 
          onEnd={onEnd}  />
        <View style={{ padding: spacing.xxl }} >
        <Text style={styles.title} >
          Focusing on: 
        </Text>
        <Text style={styles.task} >
          {focusSubject}
        </Text>
      </View>
      </View>
      <View>
        <ProgressBar progress={progress} 
          color={colors.progressBar} 
          style={{height: spacing.sm}} />
      </View>
      <View style={styles.timingWrapper} >
        <Timing onChangeTime={setMinutes}/>  
      </View>
      <View style={styles.buttonWrapper} >
        {!isStarted ? 
          (
            <RoundedButton title={'start'} onPress={() => setIsStarted(true)}/>
          ):(
            <RoundedButton title={'pause'} onPress={() => setIsStarted(false)}/>
            )
        }       
      </View>
      <View style={styles.clearButtonWrapper}>
        <RoundedButton size={50} title={'clear'} onPress={clearSubject}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  countdown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'red'
  },
  clearButtonWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 0.1
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold"
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
  timingWrapper: {
    flexDirection: "row",
    flex: 0.1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: spacing.md
  }
})