import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { wizardTypes } from '../data/wizardTypes';
import { WizardScore } from '../App';

interface ResultScreenProps {
  scores: WizardScore;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ scores, onRestart }) => {
  // Déterminer le type de sorcier dominant
  const dominantType = (Object.keys(scores) as Array<keyof WizardScore>).reduce(
    (a, b) => (scores[a] > scores[b] ? a : b)
  );

  const wizard = wizardTypes[dominantType];
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentage = Math.round((scores[dominantType] / totalScore) * 100);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[wizard.gradient[0], wizard.gradient[1], '#1C1C1C']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.congratsText}>Félicitations !</Text>
            <Text style={styles.emoji}>{wizard.emoji}</Text>
            <Text style={styles.wizardName}>{wizard.name}</Text>
            <Text style={styles.wizardTitle}>{wizard.title}</Text>
          </View>

          {/* Score */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Ton affinité :</Text>
            <Text style={styles.scoreValue}>{percentage}%</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>Qui es-tu ?</Text>
            <Text style={styles.descriptionText}>{wizard.description}</Text>
          </View>

          {/* Caractéristiques */}
          <View style={styles.characteristicsCard}>
            <Text style={styles.cardTitle}>Tes Caractéristiques :</Text>
            {wizard.characteristics.map((char, index) => (
              <Text key={index} style={styles.characteristicItem}>
                {char}
              </Text>
            ))}
          </View>

          {/* Sorciers Célèbres */}
          <View style={styles.famousCard}>
            <Text style={styles.cardTitle}>Sorciers Célèbres :</Text>
            {wizard.famousWizards.map((name, index) => (
              <Text key={index} style={styles.famousItem}>
                ⭐ {name}
              </Text>
            ))}
          </View>

          {/* Carrière */}
          <View style={styles.careerCard}>
            <Text style={styles.cardTitle}>Ta Carrière Idéale :</Text>
            <Text style={styles.careerText}>{wizard.career}</Text>
          </View>

          {/* Forces */}
          <View style={styles.strengthsCard}>
            <Text style={styles.cardTitle}>Tes Forces :</Text>
            {wizard.strengths.map((strength, index) => (
              <Text key={index} style={styles.strengthItem}>
                ✅ {strength}
              </Text>
            ))}
          </View>

          {/* Faiblesses */}
          <View style={styles.weaknessesCard}>
            <Text style={styles.cardTitle}>Points d'Attention :</Text>
            {wizard.weaknesses.map((weakness, index) => (
              <Text key={index} style={styles.weaknessItem}>
                ⚠️ {weakness}
              </Text>
            ))}
          </View>

          {/* Bouton Recommencer */}
          <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
            <LinearGradient
              colors={['#740001', '#D3A625']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>🔄 Recommencer le Test</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Partage ton résultat avec tes amis ! 🪄
          </Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  congratsText: {
    fontSize: 24,
    color: '#D3A625',
    fontWeight: '600',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 80,
    marginVertical: 15,
  },
  wizardName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  wizardTitle: {
    fontSize: 18,
    color: '#D3A625',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: 'rgba(211, 166, 37, 0.5)',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#F5F5F5',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D3A625',
  },
  descriptionCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#D3A625',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D3A625',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#F5F5F5',
    lineHeight: 24,
  },
  characteristicsCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D3A625',
    marginBottom: 12,
  },
  characteristicItem: {
    fontSize: 15,
    color: '#F5F5F5',
    marginBottom: 8,
    lineHeight: 22,
  },
  famousCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  famousItem: {
    fontSize: 15,
    color: '#F5F5F5',
    marginBottom: 8,
  },
  careerCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  careerText: {
    fontSize: 15,
    color: '#F5F5F5',
    lineHeight: 22,
  },
  strengthsCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  strengthItem: {
    fontSize: 15,
    color: '#2ECC71',
    marginBottom: 8,
  },
  weaknessesCard: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  weaknessItem: {
    fontSize: 15,
    color: '#F39C12',
    marginBottom: 8,
  },
  restartButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#D3A625',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    fontSize: 16,
    color: '#D3A625',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ResultScreen;

