import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { questions } from '../data/questions';
import { WizardScore } from '../App';

interface QuizScreenProps {
  onFinish: (scores: WizardScore) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<WizardScore>({
    auror: 0,
    alchemist: 0,
    healer: 0,
    magizoologist: 0,
  });
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleAnswer = (wizardType: keyof WizardScore, score: number) => {
    // Mise à jour des scores
    const newScores = {
      ...scores,
      [wizardType]: scores[wizardType] + score,
    };
    setScores(newScores);

    // Animation de transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Passer à la question suivante ou terminer
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onFinish(newScores);
      }, 500);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0E1A40', '#740001', '#1C1C1C']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} / {questions.length}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Question */}
          <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
            <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
            <Text style={styles.questionText}>{question.question}</Text>
          </Animated.View>

          {/* Options */}
          <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option.wizardType, option.score)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(211, 166, 37, 0.2)', 'rgba(116, 0, 1, 0.2)']}
                  style={styles.optionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                  <Text style={styles.optionText}>{option.text}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  progressContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D3A625',
  },
  progressText: {
    fontSize: 14,
    color: '#D3A625',
    textAlign: 'center',
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(211, 166, 37, 0.3)',
  },
  questionNumber: {
    fontSize: 16,
    color: '#D3A625',
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(211, 166, 37, 0.4)',
    borderRadius: 12,
  },
  optionLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D3A625',
    width: 40,
    textAlign: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#F5F5F5',
    flex: 1,
    fontWeight: '500',
  },
});

export default QuizScreen;

