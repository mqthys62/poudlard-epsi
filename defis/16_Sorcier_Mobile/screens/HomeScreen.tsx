import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0E1A40', '#740001', '#1C1C1C']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo / Titre */}
          <View style={styles.header}>
            <Text style={styles.emoji}>⚡</Text>
            <Text style={styles.title}>Tu es un Sorcier,</Text>
            <Text style={styles.subtitle}>Harry !</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Découvre quel type de sorcier sommeille en toi !
            </Text>
            <Text style={styles.subdescription}>
              Réponds à 20 questions pour révéler ta véritable nature magique.
            </Text>
          </View>

          {/* Types de Sorciers */}
          <View style={styles.typesContainer}>
            <Text style={styles.typesTitle}>4 Types de Sorciers :</Text>
            
            <View style={styles.typeCard}>
              <Text style={styles.typeEmoji}>⚔️</Text>
              <Text style={styles.typeName}>L'Auror Intrépide</Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeEmoji}>⚗️</Text>
              <Text style={styles.typeName}>L'Alchimiste Érudit</Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeEmoji}>💚</Text>
              <Text style={styles.typeName}>Le Guérisseur Bienveillant</Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeEmoji}>🐉</Text>
              <Text style={styles.typeName}>Le Magizoologiste Aventurier</Text>
            </View>
          </View>

          {/* Bouton Start */}
          <TouchableOpacity style={styles.startButton} onPress={onStart}>
            <LinearGradient
              colors={['#740001', '#D3A625']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>🪄 Commencer le Test</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Défi #16 - Workshop Poudlard RP 2025
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
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D3A625',
    textAlign: 'center',
    fontFamily: 'System',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(211, 166, 37, 0.3)',
  },
  description: {
    fontSize: 20,
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  subdescription: {
    fontSize: 16,
    color: '#D3A625',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  typesContainer: {
    marginBottom: 40,
  },
  typesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D3A625',
    marginBottom: 15,
    textAlign: 'center',
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D3A625',
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  typeName: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: '600',
    flex: 1,
  },
  startButton: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;

