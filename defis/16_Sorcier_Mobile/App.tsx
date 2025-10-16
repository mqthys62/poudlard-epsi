import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';

export type WizardScore = {
  auror: number;
  alchemist: number;
  healer: number;
  magizoologist: number;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [wizardScore, setWizardScore] = useState<WizardScore>({
    auror: 0,
    alchemist: 0,
    healer: 0,
    magizoologist: 0,
  });

  const startQuiz = () => {
    setWizardScore({
      auror: 0,
      alchemist: 0,
      healer: 0,
      magizoologist: 0,
    });
    setCurrentScreen('quiz');
  };

  const finishQuiz = (scores: WizardScore) => {
    setWizardScore(scores);
    setCurrentScreen('result');
  };

  const restartQuiz = () => {
    setCurrentScreen('home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen === 'home' && <HomeScreen onStart={startQuiz} />}
      {currentScreen === 'quiz' && <QuizScreen onFinish={finishQuiz} />}
      {currentScreen === 'result' && (
        <ResultScreen scores={wizardScore} onRestart={restartQuiz} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
});
