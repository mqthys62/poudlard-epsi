/**
 * PatronusLoader Component
 * 
 * Animation de chargement représentant le Phoenix Patronus de l'EPSI
 * Défi #9 - Workshop Poudlard RP 2025
 * 
 * @module PatronusLoader
 */

import React, { useEffect, useRef } from 'react';
import './PatronusLoader.css';

/**
 * Tailles disponibles pour le loader
 */
export type PatronusSize = 'small' | 'medium' | 'large';

/**
 * États visuels du loader
 */
export type PatronusVariant = 'loading' | 'success' | 'error';

/**
 * Schémas de couleurs personnalisables
 */
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * Props du composant PatronusLoader
 */
export interface PatronusLoaderProps {
  /** Taille du loader */
  size?: PatronusSize;
  /** Variante d'état */
  variant?: PatronusVariant;
  /** Schéma de couleurs personnalisé */
  colorScheme?: ColorScheme;
  /** Afficher le texte de chargement */
  showText?: boolean;
  /** Texte personnalisé */
  text?: string;
  /** Callback appelé à chaque cycle d'animation */
  onAnimationCycle?: () => void;
  /** Classe CSS additionnelle */
  className?: string;
}

/**
 * Schémas de couleurs prédéfinis
 */
const COLOR_SCHEMES: Record<string, ColorScheme> = {
  default: {
    primary: '#00D9FF',
    secondary: '#FFD700',
    accent: '#C0C0C0',
  },
  success: {
    primary: '#00FF88',
    secondary: '#00D9FF',
    accent: '#88FFBB',
  },
  error: {
    primary: '#FF4444',
    secondary: '#FF8844',
    accent: '#FFAAAA',
  },
};

/**
 * Dimensions selon la taille
 */
const SIZES: Record<PatronusSize, number> = {
  small: 100,
  medium: 200,
  large: 300,
};

/**
 * Composant PatronusLoader
 * 
 * @example
 * ```tsx
 * <PatronusLoader size="medium" variant="loading" showText={true} />
 * ```
 */
export const PatronusLoader: React.FC<PatronusLoaderProps> = ({
  size = 'medium',
  variant = 'loading',
  colorScheme,
  showText = true,
  text = 'CHARGEMENT',
  onAnimationCycle,
  className = '',
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  // Déterminer le schéma de couleurs
  const colors = colorScheme || COLOR_SCHEMES[variant] || COLOR_SCHEMES.default;
  const loaderSize = SIZES[size];

  useEffect(() => {
    // Créer les particules de code dynamiquement
    const createCodeParticles = () => {
      if (!loaderRef.current) return;

      const codeSnippets = [
        'if', 'else', '{}', '()', '[]', 'fn', 
        'const', 'var', 'let', '&&', '||', '=>', 
        'def', 'class', 'import', 'return'
      ];

      // Nettoyer les particules existantes
      const existingParticles = loaderRef.current.querySelectorAll('.code-particle');
      existingParticles.forEach(p => p.remove());

      // Créer nouvelles particules
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.style.color = colors.primary;

        const angle = (i / 8) * Math.PI * 2;
        const radius = loaderSize * 0.3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        particle.style.animationDelay = `${i * 0.3}s`;

        loaderRef.current?.appendChild(particle);
      }
    };

    // Créer l'orbite binaire
    const createBinaryOrbit = () => {
      if (!loaderRef.current) return;

      const orbit = loaderRef.current.querySelector('.binary-orbit');
      if (!orbit) return;

      // Nettoyer les chiffres existants
      orbit.innerHTML = '';

      const binaryString = '01001000010001010100110001001100'; // "HELLO" en binaire

      for (let i = 0; i < binaryString.length; i++) {
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.textContent = binaryString[i];
        digit.style.color = colors.accent;

        const angle = (i / binaryString.length) * Math.PI * 2;
        const radius = loaderSize * 0.35;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        digit.style.left = `calc(50% + ${x}px)`;
        digit.style.top = `calc(50% + ${y}px)`;
        digit.style.transform = 'translate(-50%, -50%)';

        orbit.appendChild(digit);
      }
    };

    createCodeParticles();
    createBinaryOrbit();

    // Effet de scintillement
    const flickerInterval = setInterval(() => {
      const particles = loaderRef.current?.querySelectorAll('.binary-digit');
      if (particles && particles.length > 0) {
        const randomParticle = particles[Math.floor(Math.random() * particles.length)] as HTMLElement;
        randomParticle.style.color = Math.random() > 0.5 ? colors.secondary : colors.primary;
      }
    }, 200);

    // Callback de cycle d'animation
    let cycleCount = 0;
    const cycleInterval = setInterval(() => {
      cycleCount++;
      onAnimationCycle?.();
    }, 2000); // Cycle de 2 secondes

    return () => {
      clearInterval(flickerInterval);
      clearInterval(cycleInterval);
    };
  }, [size, colors, onAnimationCycle, loaderSize]);

  // Styles CSS-in-JS pour les couleurs dynamiques
  const dynamicStyles: React.CSSProperties = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
  } as React.CSSProperties;

  return (
    <div
      ref={loaderRef}
      className={`patronus-loader patronus-${size} patronus-${variant} ${className}`}
      style={{ width: loaderSize, height: loaderSize, ...dynamicStyles }}
      role="status"
      aria-label={text}
    >
      {/* Cercles de pouvoir */}
      <div className="power-ring" style={{ borderColor: colors.primary }}></div>
      <div className="power-ring" style={{ borderColor: colors.primary }}></div>
      <div className="power-ring" style={{ borderColor: colors.primary }}></div>

      {/* Orbite binaire */}
      <div className="binary-orbit"></div>

      {/* Phoenix central */}
      <div className="phoenix" style={{ width: loaderSize * 0.5, height: loaderSize * 0.6 }}>
        <div 
          className="phoenix-head"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}, ${colors.primary})`
          }}
        >
          <div className="phoenix-beak"></div>
        </div>
        
        <div 
          className="phoenix-wing-left"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, transparent 70%)`,
            filter: `drop-shadow(0 0 10px ${colors.primary})`
          }}
        ></div>
        
        <div 
          className="phoenix-wing-right"
          style={{
            background: `linear-gradient(225deg, ${colors.secondary} 0%, transparent 70%)`,
            filter: `drop-shadow(0 0 10px ${colors.secondary})`
          }}
        ></div>
        
        <div 
          className="phoenix-body"
          style={{
            background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`
          }}
        ></div>
        
        <div 
          className="phoenix-tail"
          style={{
            background: `linear-gradient(180deg, ${colors.secondary}, transparent)`
          }}
        ></div>
      </div>

      {/* Texte de chargement */}
      {showText && (
        <div 
          className="loading-text"
          style={{ color: colors.primary }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

/**
 * Hook personnalisé pour gérer l'état du loader
 * 
 * @example
 * ```tsx
 * const { variant, setLoading, setSuccess, setError } = usePatronusLoader();
 * 
 * // Pendant le chargement
 * setLoading();
 * 
 * // En cas de succès
 * setSuccess();
 * 
 * // En cas d'erreur
 * setError();
 * ```
 */
export const usePatronusLoader = () => {
  const [variant, setVariant] = React.useState<PatronusVariant>('loading');

  const setLoading = React.useCallback(() => setVariant('loading'), []);
  const setSuccess = React.useCallback(() => setVariant('success'), []);
  const setError = React.useCallback(() => setVariant('error'), []);

  return {
    variant,
    setLoading,
    setSuccess,
    setError,
  };
};

export default PatronusLoader;

