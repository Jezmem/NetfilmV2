# Netfilm - Application de films avec TMDB

## Description

Netfilm est une application web développée avec React qui permet d'afficher les films tendances, de rechercher des films et de filtrer les résultats par genre en utilisant l'API de The Movie Database (TMDB).

## Fonctionnalités

- Affichage des films tendances
- Recherche de films par titre
- Filtrage des films par genre
- Affichage des détails des films

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- Une clé API TMDB (disponible sur [The Movie Database](https://www.themoviedb.org/))

## Installation

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/votre-repo/netfilm.git
cd netfilm
```

Installez les dépendances :

```bash
npm install
```

## Configuration

Modifiez le fichier `.env` à la racine du projet et ajoutez votre clé BEARER Token TMDB :

```env
REACT_APP_TMDB_BEARER_TOKEN=VOTRE_BEARER_TOKEN_TMDB
```

## Démarrer l'application

Lancez l'application en mode développement :

```bash
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans votre navigateur.

## Technologies utilisées

- React
- Tailwind CSS

## API utilisée

Netfilm utilise l'API de [The Movie Database (TMDB)](https://www.themoviedb.org/) pour récupérer les informations sur les films.
