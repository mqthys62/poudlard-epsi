// Questions du QCM - Défi #16 : Tu es un sorcier Harry !

export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    wizardType: 'auror' | 'alchemist' | 'healer' | 'magizoologist';
    score: number;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Quelle est ta matière préférée à Poudlard ?",
    options: [
      { text: "Défense contre les forces du Mal", wizardType: "auror", score: 3 },
      { text: "Potions et Alchimie", wizardType: "alchemist", score: 3 },
      { text: "Sortilèges de Soin", wizardType: "healer", score: 3 },
      { text: "Soins aux Créatures Magiques", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Comment réagis-tu face à un Détraqueur ?",
    options: [
      { text: "Je lance un Patronus sans hésiter !", wizardType: "auror", score: 2 },
      { text: "Je prépare une potion anti-dépression", wizardType: "alchemist", score: 2 },
      { text: "Je soigne les victimes d'abord", wizardType: "healer", score: 2 },
      { text: "Je cherche refuge avec les créatures", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 3,
    question: "Quel objet magique te fascine le plus ?",
    options: [
      { text: "La Baguette de Sureau", wizardType: "auror", score: 3 },
      { text: "La Pierre Philosophale", wizardType: "alchemist", score: 3 },
      { text: "Le Retourneur de Temps", wizardType: "healer", score: 3 },
      { text: "Le Vif d'Or", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Quelle créature magique adoptes-tu ?",
    options: [
      { text: "Un Phénix courageux", wizardType: "auror", score: 2 },
      { text: "Un Dragon pour ses écailles précieuses", wizardType: "alchemist", score: 2 },
      { text: "Une Licorne apaisante", wizardType: "healer", score: 2 },
      { text: "Un Niffleur adorable", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 5,
    question: "Tu découvres un artefact inconnu. Que fais-tu ?",
    options: [
      { text: "Je vérifie qu'il n'est pas dangereux", wizardType: "auror", score: 3 },
      { text: "J'analyse sa composition magique", wizardType: "alchemist", score: 3 },
      { text: "Je teste ses propriétés curatives", wizardType: "healer", score: 3 },
      { text: "Je cherche s'il attire des créatures", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Quel sortilège maîtrises-tu le mieux ?",
    options: [
      { text: "Expelliarmus (Désarmement)", wizardType: "auror", score: 2 },
      { text: "Alohomora (Ouverture)", wizardType: "alchemist", score: 2 },
      { text: "Episkey (Soin des blessures)", wizardType: "healer", score: 2 },
      { text: "Accio (Attraction)", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 7,
    question: "Voldemort attaque Poudlard ! Ton rôle ?",
    options: [
      { text: "Je combats en première ligne", wizardType: "auror", score: 3 },
      { text: "Je prépare des potions explosives", wizardType: "alchemist", score: 3 },
      { text: "Je soigne les blessés", wizardType: "healer", score: 3 },
      { text: "Je libère les créatures magiques", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Quelle serait ta carrière idéale ?",
    options: [
      { text: "Auror au Ministère de la Magie", wizardType: "auror", score: 3 },
      { text: "Chercheur en Alchimie", wizardType: "alchemist", score: 3 },
      { text: "Médicomage à Ste-Mangouste", wizardType: "healer", score: 3 },
      { text: "Professeur de Soins aux Créatures", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 9,
    question: "Tu trouves un grimoire ancien. Tu cherches ?",
    options: [
      { text: "Des sortilèges de combat", wizardType: "auror", score: 2 },
      { text: "Des formules de transmutation", wizardType: "alchemist", score: 2 },
      { text: "Des recettes de guérison", wizardType: "healer", score: 2 },
      { text: "Des secrets sur les créatures", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 10,
    question: "Ton plus grand rêve magique ?",
    options: [
      { text: "Devenir le sorcier le plus puissant", wizardType: "auror", score: 3 },
      { text: "Créer l'élixir de longue vie", wizardType: "alchemist", score: 3 },
      { text: "Sauver des milliers de vies", wizardType: "healer", score: 3 },
      { text: "Découvrir de nouvelles espèces", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 11,
    question: "Quelle maison de Poudlard te correspond ?",
    options: [
      { text: "Gryffondor (Courage)", wizardType: "auror", score: 2 },
      { text: "Serdaigle (Intelligence)", wizardType: "alchemist", score: 2 },
      { text: "Poufsouffle (Loyauté)", wizardType: "healer", score: 2 },
      { text: "Serpentard (Ambition)", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 12,
    question: "Un ami est en danger. Ta première réaction ?",
    options: [
      { text: "Je fonce le sauver sans réfléchir", wizardType: "auror", score: 3 },
      { text: "Je prépare une stratégie intelligente", wizardType: "alchemist", score: 3 },
      { text: "Je m'assure qu'il n'est pas blessé", wizardType: "healer", score: 3 },
      { text: "Je fais appel aux créatures magiques", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 13,
    question: "Quel lieu magique visites-tu ?",
    options: [
      { text: "La salle d'entraînement des Aurors", wizardType: "auror", score: 2 },
      { text: "Le laboratoire de Nicolas Flamel", wizardType: "alchemist", score: 2 },
      { text: "L'hôpital Ste-Mangouste", wizardType: "healer", score: 2 },
      { text: "La Forêt Interdite", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 14,
    question: "Quelle potion brasses-tu en priorité ?",
    options: [
      { text: "Felix Felicis (Chance liquide)", wizardType: "auror", score: 2 },
      { text: "Philtre de Métamorphose", wizardType: "alchemist", score: 2 },
      { text: "Essence de Dictame", wizardType: "healer", score: 2 },
      { text: "Élixir de Communication Animale", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 15,
    question: "Comment étudies-tu la magie ?",
    options: [
      { text: "Par la pratique et le combat", wizardType: "auror", score: 3 },
      { text: "Par l'expérimentation scientifique", wizardType: "alchemist", score: 3 },
      { text: "Par l'observation et l'empathie", wizardType: "healer", score: 3 },
      { text: "Par le contact avec la nature", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 16,
    question: "Ton plus grand défi à Poudlard ?",
    options: [
      { text: "Vaincre le plus grand sorcier noir", wizardType: "auror", score: 2 },
      { text: "Résoudre l'énigme alchimique ultime", wizardType: "alchemist", score: 2 },
      { text: "Guérir une maladie magique incurable", wizardType: "healer", score: 2 },
      { text: "Apprivoiser un Dragon sauvage", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 17,
    question: "Quelle qualité te caractérise le mieux ?",
    options: [
      { text: "La bravoure et le courage", wizardType: "auror", score: 3 },
      { text: "La curiosité et l'ingéniosité", wizardType: "alchemist", score: 3 },
      { text: "La compassion et la douceur", wizardType: "healer", score: 3 },
      { text: "La patience et la connection", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 18,
    question: "Quel professeur de Poudlard admires-tu ?",
    options: [
      { text: "Alastor Maugrey (Fol Œil)", wizardType: "auror", score: 2 },
      { text: "Severus Rogue (Maître des Potions)", wizardType: "alchemist", score: 2 },
      { text: "Pomona Chourave (Botanique)", wizardType: "healer", score: 2 },
      { text: "Rubeus Hagrid (Créatures Magiques)", wizardType: "magizoologist", score: 2 },
    ],
  },
  {
    id: 19,
    question: "Dans 10 ans, où te vois-tu ?",
    options: [
      { text: "Chef des Aurors, protégeant le monde magique", wizardType: "auror", score: 3 },
      { text: "Inventeur de nouvelles potions révolutionnaires", wizardType: "alchemist", score: 3 },
      { text: "Directeur de Ste-Mangouste", wizardType: "healer", score: 3 },
      { text: "Explorateur de contrées inconnues", wizardType: "magizoologist", score: 3 },
    ],
  },
  {
    id: 20,
    question: "Quel est ton plus grand pouvoir magique ?",
    options: [
      { text: "La force et la détermination", wizardType: "auror", score: 3 },
      { text: "L'intelligence et la créativité", wizardType: "alchemist", score: 3 },
      { text: "L'amour et la bienveillance", wizardType: "healer", score: 3 },
      { text: "L'harmonie avec la nature", wizardType: "magizoologist", score: 3 },
    ],
  },
];

