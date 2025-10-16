// Types de Sorciers - Défi #16 : Tu es un sorcier Harry !

export interface WizardType {
  id: 'auror' | 'alchemist' | 'healer' | 'magizoologist';
  name: string;
  title: string;
  description: string;
  characteristics: string[];
  famousWizards: string[];
  career: string;
  strengths: string[];
  weaknesses: string[];
  emoji: string;
  color: string;
  gradient: string[];
}

export const wizardTypes: Record<string, WizardType> = {
  auror: {
    id: 'auror',
    name: "L'Auror Intrépide",
    title: "Gardien du Monde Magique",
    description:
      "Tu es un combattant né, toujours prêt à protéger les innocents. Ton courage et ta détermination font de toi un défenseur redoutable contre les forces du Mal. Le danger ne te fait pas peur, bien au contraire !",
    characteristics: [
      "🗡️ Courageux et audacieux",
      "⚡ Réactif et stratégique",
      "🛡️ Protecteur naturel",
      "💪 Déterminé et persévérant",
      "🎯 Sens aigu de la justice",
    ],
    famousWizards: [
      "Harry Potter",
      "Alastor Maugrey (Fol Œil)",
      "Nymphadora Tonks",
      "Kingsley Shacklebolt",
    ],
    career:
      "Auror au Ministère de la Magie, chargé de traquer les sorciers noirs et de maintenir l'ordre dans le monde magique.",
    strengths: [
      "Maîtrise exceptionnelle des sortilèges de combat",
      "Capacité à garder son sang-froid en situation critique",
      "Leadership naturel",
    ],
    weaknesses: [
      "Peut être trop impulsif",
      "Tendance à foncer tête baissée",
      "Difficulté à faire confiance",
    ],
    emoji: "⚔️",
    color: "#740001",
    gradient: ["#740001", "#D3A625"],
  },
  alchemist: {
    id: 'alchemist',
    name: "L'Alchimiste Érudit",
    title: "Maître de la Transformation Magique",
    description:
      "Ta soif de connaissance est insatiable. Tu es fasciné par les mystères de la magie et tu cherches constamment à repousser les limites du possible. L'alchimie n'a plus de secrets pour toi !",
    characteristics: [
      "🧠 Intelligent et curieux",
      "🔬 Esprit scientifique",
      "📚 Passionné de savoir",
      "⚗️ Créatif et innovateur",
      "🎨 Perfectionniste méticuleux",
    ],
    famousWizards: [
      "Nicolas Flamel",
      "Severus Rogue",
      "Horace Slughorn",
      "Hermione Granger",
    ],
    career:
      "Chercheur en Alchimie, développant de nouvelles potions et élixirs révolutionnaires pour améliorer la vie des sorciers.",
    strengths: [
      "Maîtrise avancée de la chimie magique",
      "Capacité d'analyse et de résolution de problèmes",
      "Patience et rigueur scientifique",
    ],
    weaknesses: [
      "Peut être trop théorique",
      "Oublie parfois le monde réel",
      "Tendance à la solitude",
    ],
    emoji: "⚗️",
    color: "#1A472A",
    gradient: ["#0E1A40", "#946B2D"],
  },
  healer: {
    id: 'healer',
    name: "Le Guérisseur Bienveillant",
    title: "Ange de Sainte-Mangouste",
    description:
      "Ton cœur déborde de compassion. Tu consacres ta vie à soigner et soulager la souffrance des autres. Ton empathie et ta douceur font de toi un pilier sur lequel on peut toujours compter.",
    characteristics: [
      "❤️ Empathique et compatissant",
      "🕊️ Doux et apaisant",
      "🌟 Altruiste et généreux",
      "🤲 Patient et attentionné",
      "✨ Optimiste et positif",
    ],
    famousWizards: [
      "Pomona Chourave",
      "Neville Londubat",
      "Luna Lovegood",
      "Dilys Derwent",
    ],
    career:
      "Médicomage à l'hôpital Ste-Mangouste, spécialisé dans les blessures magiques et les sorts de guérison avancés.",
    strengths: [
      "Excellentes connaissances en médecine magique",
      "Capacité à rassurer et apaiser",
      "Dévouement sans faille",
    ],
    weaknesses: [
      "Peut s'oublier pour les autres",
      "Sensible aux émotions négatives",
      "Difficulté à dire non",
    ],
    emoji: "💚",
    color: "#ECB939",
    gradient: ["#ECB939", "#FFFFFF"],
  },
  magizoologist: {
    id: 'magizoologist',
    name: "Le Magizoologiste Aventurier",
    title: "Ami des Créatures Magiques",
    description:
      "Tu as un lien unique avec le monde animal magique. Les créatures te font confiance instantanément et tu comprends leur langage. L'aventure et la découverte de nouvelles espèces t'appellent !",
    characteristics: [
      "🦄 Connecté à la nature",
      "🌍 Esprit d'aventure",
      "🐉 Respectueux de toute vie",
      "🦅 Observateur attentif",
      "🌿 Calme et patient",
    ],
    famousWizards: [
      "Norbert Dragonneau (Newt Scamander)",
      "Rubeus Hagrid",
      "Rolf Scamander",
      "Charlie Weasley",
    ],
    career:
      "Magizoologiste explorateur, découvrant et protégeant les créatures magiques rares à travers le monde.",
    strengths: [
      "Communication exceptionnelle avec les créatures",
      "Connaissance encyclopédique du règne animal magique",
      "Courage face aux créatures dangereuses",
    ],
    weaknesses: [
      "Préfère les animaux aux humains",
      "Peut être trop confiant avec des créatures",
      "Difficulté avec les conventions sociales",
    ],
    emoji: "🐉",
    color: "#0E1A40",
    gradient: ["#1A472A", "#5D5D5D"],
  },
};

