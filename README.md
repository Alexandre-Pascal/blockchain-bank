
# Blockchain Bank

Blockchain Bank est un système bancaire décentralisé construit sur la technologie blockchain, permettant aux utilisateurs de gérer et de transférer des fonds de manière sécurisée. Ce projet illustre l'utilisation des contrats intelligents et des principes décentralisés dans une application financière.

## Table des Matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Démarrage](#démarrage)
- [Utilisation](#utilisation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Description

Blockchain Bank est une application décentralisée (dApp) qui offre des services bancaires de base sans nécessiter d'autorité centralisée. Les utilisateurs peuvent créer des comptes, consulter leurs soldes et transférer des fonds. Toutes les transactions sont traitées via des contrats intelligents blockchain pour garantir transparence et sécurité.

## Fonctionnalités

- **Test de ses Comptes** : Tester des transactions sur différents comptes.
- **Suivi des Soldes** : Visualiser les soldes des comptes en temps réel.
- **Transactions Sécurisées** : Transférer des fonds entre comptes de manière sécurisée via des contrats intelligents.
- **Historique des Transactions** : Consulter un historique immuable des transactions pour chaque compte.

## Technologies

- **Contrats Intelligents** : Écrits en Solidity pour la logique du contrat blockchain.
- **Frontend** : JavaScript et CSS pour l'interface utilisateur.
- **Backend** : Node.js pour la gestion des API et des interactions utilisateur.
- **Blockchain** : Ethereum (ou toute blockchain compatible avec EVM).

## Démarrage

### Accéder directement au site déployé

Vous pouvez accéder à la version déployée de l'application via Vercel [ici](https://blockchain-bank.vercel.app).

### Installer le projet en local

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Alexandre-Pascal/blockchain-bank.git
   ```
2. **Installer les dépendances**
   Accédez aux dossiers `frontend` et `backend`, puis installez les dépendances en utilisant :
   ```bash
   npm install
   ```

3. **Configurer le réseau blockchain**
   Configurez un réseau de test compatible Ethereum (par ex., Sepolia) et ajoutez les informations de votre portefeuille/clé privée dans les fichiers d'environnement.

4. **Lancer l'application**
   Démarrez les serveurs backend et frontend :
   ```bash
   npm start
   ```

## Utilisation

1. **Se connecter avec un portefeuille** : Connectez-vous à l'application via un portefeuille compatible (par exemple, Metamask ou Rabby). Assurez-vous que votre portefeuille est configuré pour le réseau Sepolia.
2. **Tester les Dépôts et Retraits** : Effectuez des dépôts et des retraits sur votre compte de manière sécurisée en utilisant des fonds sur le réseau de test Sepolia.
3. **Transférer des Fonds** : Envoyez des fonds vers d'autres utilisateurs du réseau blockchain.
4. **Consulter l'Historique des Transactions** : Suivez toutes les transactions de votre compte via l'historique des transactions.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des problèmes, forker le dépôt et créer des pull requests pour aider à améliorer ce projet.

## Licence

Ce projet est sous licence MIT.
