### Défis 09, 16 et 18 — Synthèse (~1 min)
Défi 09 — j’ai d’abord clarifié avec l’équipe les critères d’acceptation pour aligner précisément le livrable avec le sujet. J’ai automatisé les vérifications clés pour éviter les oublis et itéré rapidement sur les non‑conformités, en veillant à ne pas introduire de régressions. L’enjeu majeur a été la gestion des dépendances croisées; je l’ai traité par un découpage clair et des checklists d’intégration.

Défi 16 — côté mobile, j’ai sécurisé l’exécution dans un contexte WSL/partage de connexion en mettant en place un tunnel fiable, puis en résolvant les conflits de ports, caches et certificats. Pour stabiliser le hot‑reload et accélérer les tests sur appareils, j’ai ajouté des scripts de lancement reproductibles et des consignes simples pour contourner les aléas réseau.

Défi 18 — j’ai priorisé la robustesse: séparation nette des responsabilités, automatisation des tâches répétitives et élimination des doublons pour garder une base lisible. J’ai renforcé la compatibilité outillage et mis en place des vérifications systématiques afin d’assurer une démonstration fluide et sans surprise à l’oral.

### SpookEpsi — Aide à la maquette Figma
J’ai accompagné Léo pour générer des images cohérentes avec l’identité visuelle de SpookEpsi (prompts affinés, cohérence des styles et des formats). L’objectif était d’alimenter rapidement la maquette Figma avec des visuels propres, légers et réutilisables. Le point délicat a été l’homogénéité esthétique entre séries d’images, résolu par des prompts normalisés et des variantes contrôlées.