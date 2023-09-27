



# Model Prisma du jeux 

model Player {
  id        Int      @id @default(autoincrement())
  pseudo    String   
  urlPhotoProfile String
  matchesA  Match[]  @relation("PlayerAMatches")
  matchesB  Match[]  @relation("PlayerBMatches")
}

model Match {
  id        Int      @id @default(autoincrement())
  playerAId Int
  playerBId Int
  scoreA    Int
  scoreB    Int
  playedAt  DateTime @default(now())
  playerA   Player   @relation("PlayerAMatches", fields: [playerAId], references: [id])
  playerB   Player   @relation("PlayerBMatches", fields: [playerBId], references: [id])
}



# Listes et gestions des operation Crud 
### 1. **Créer un Service pour Player**

a. **Initialiser le Service Player**
   - Créez un fichier pour le service, par exemple `player.service.ts`.
   - Définissez une classe, par exemple `PlayerService`, qui contiendra les méthodes pour chaque opération CRUD.

b. **Implémenter les Méthodes CRUD dans le Service Player**
   - **Create:** Ajoutez une méthode pour créer un nouveau joueur.
   - **Read:** Ajoutez une méthode pour lire un joueur par son ID.
   - **Update:** Ajoutez une méthode pour mettre à jour les détails d'un joueur par son ID.
   - **Delete:** Ajoutez une méthode pour supprimer un joueur par son ID.
   - **List:** Ajoutez une méthode pour lister tous les joueurs.

### 2. **Créer un Contrôleur pour Player**

a. **Initialiser le Contrôleur Player**
   - Créez un fichier pour le contrôleur, par exemple `player.controller.ts`.
   - Définissez une classe, par exemple `PlayerController`, qui contiendra les méthodes pour chaque opération CRUD.

b. **Implémenter les Méthodes CRUD dans le Contrôleur Player**
   - Pour chaque opération CRUD dans le service, ajoutez une méthode correspondante dans le contrôleur pour gérer les requêtes HTTP.

### 3. **Créer un Service pour Match**

Répétez les étapes 1a et 1b pour créer un service pour le modèle `Match`, en définissant des méthodes CRUD appropriées pour gérer les matchs.

### 4. **Créer un Contrôleur pour Match**

Répétez les étapes 2a et 2b pour créer un contrôleur pour le modèle `Match`, en définissant des méthodes CRUD appropriées pour gérer les requêtes HTTP relatives aux matchs.

### 5. **Créer les Routes**
   - Définissez les routes dans votre application pour gérer les requêtes HTTP et les acheminer vers les méthodes appropriées dans vos contrôleurs.

### Liste des Tâches

1. **Service Player**
   - [x] Créer le fichier `player.service.ts`
   - [x] Implémenter la méthode Create
   - [x] Implémenter la méthode Read
   - [x] Implémenter la méthode Update
   - [x] Implémenter la méthode Delete
   - [x] Implémenter la méthode List
   
	1. **Contrôleur Player**
   - [ ] Créer le fichier `player.controller.ts`
   - [ ] Implémenter les méthodes CRUD correspondant aux méthodes du service
   - [ ] Définir les routes pour chaque méthode CRUD
   
3. **Service Match**
   - [ ] Créer le fichier `match.service.ts`
   - [ ] Implémenter la méthode Create
   - [ ] Implémenter la méthode Read
   - [ ] Implémenter la méthode Update
   - [ ] Implémenter la méthode Delete
   - [ ] Implémenter la méthode List
   
4. **Contrôleur Match**
   - [ ] Créer le fichier `match.controller.ts`
   - [ ] Implémenter les méthodes CRUD correspondant aux méthodes du service
   - [ ] Définir les routes pour chaque méthode CRUD
   
5. **Configuration des Routes**
   - [ ] Définir les routes dans l'application pour le modèle Player
   - [ ] Définir les routes dans l'application pour le modèle Match

6. **Tests**
   - [ ] Écrire et exécuter des tests pour chaque méthode dans les services et les contrôleurs pour s'assurer qu'ils fonctionnent comme prévu.

### Conclusion

En suivant ces étapes et en complétant chaque tâche de la liste, vous devriez être en mesure de créer des services et des contrôleurs pour les modèles `Player` et `Match` qui respectent les opérations CRUD, et de gérer efficacement les joueurs et les matchs dans votre application.


Pour gérer l'historique des matchs selon la logique fournie, vous devrez effectuer les opérations CRUD sur le modèle `Match`, et vous devrez également récupérer l'historique des matchs pour un joueur donné à partir du modèle `Player`. Voici une liste de tâches pour accomplir cela:


# Liste et gestion des operations Cruds relative a l'historique 
### 1. **Créer un Service pour Historique des Matchs**

a. **Initialiser le Service Historique**
   - Créer le fichier, par exemple `matchHistory.service.ts`.
   - Définir une classe, par exemple `MatchHistoryService`, qui contiendra les méthodes pour chaque opération CRUD et pour récupérer l'historique des matchs.

b. **Implémenter les Méthodes dans le Service Historique**
   - **Create:** Ajouter une méthode pour créer un nouveau match dans l'historique.
   - **Read:** Ajouter une méthode pour lire un match spécifique dans l'historique par son ID.
   - **Update:** Ajouter une méthode pour mettre à jour les détails d'un match spécifique dans l'historique par son ID.
   - **Delete:** Ajouter une méthode pour supprimer un match spécifique dans l'historique par son ID.
   - **List:** Ajouter une méthode pour lister tous les matchs dans l'historique.
   - **GetPlayerHistory:** Ajouter une méthode pour récupérer l'historique des matchs d'un joueur spécifique, en utilisant les relations `matchesA` et `matchesB`.

### 2. **Créer un Contrôleur pour Historique des Matchs**

a. **Initialiser le Contrôleur Historique**
   - Créer le fichier, par exemple `matchHistory.controller.ts`.
   - Définir une classe, par exemple `MatchHistoryController`, qui contiendra les méthodes pour chaque opération CRUD et pour récupérer l'historique des matchs.

b. **Implémenter les Méthodes dans le Contrôleur Historique**
   - Pour chaque opération CRUD et la récupération de l'historique dans le service, ajouter une méthode correspondante dans le contrôleur pour gérer les requêtes HTTP.

### 3. **Créer les Routes**
   - Définir les routes dans votre application pour gérer les requêtes HTTP et les acheminer vers les méthodes appropriées dans vos contrôleurs.

### Liste des Tâches

1. **Service Historique des Matchs**
   - [ ] Créer le fichier `matchHistory.service.ts`
   - [ ] Implémenter la méthode Create
   - [ ] Implémenter la méthode Read
   - [ ] Implémenter la méthode Update
   - [ ] Implémenter la méthode Delete
   - [ ] Implémenter la méthode List
   - [ ] Implémenter la méthode GetPlayerHistory
   
2. **Contrôleur Historique des Matchs**
   - [ ] Créer le fichier `matchHistory.controller.ts`
   - [ ] Implémenter les méthodes CRUD correspondant aux méthodes du service
   - [ ] Implémenter la méthode pour récupérer l'historique des matchs d'un joueur
   - [ ] Définir les routes pour chaque méthode
   
3. **Configuration des Routes**
   - [ ] Définir les routes dans l'application pour l'historique des matchs
   
4. **Tests**
   - [ ] Écrire et exécuter des tests pour chaque méthode dans les services et les contrôleurs pour s'assurer qu'ils fonctionnent comme prévu.

### Conclusion

En suivant ces étapes et en complétant chaque tâche de la liste, vous devriez être en mesure de gérer efficacement l'historique des matchs pour chaque joueur dans votre application, tout en respectant les opérations CRUD.


Bien sûr, pour ajouter la fonctionnalité permettant de rechercher tous les matchs entre deux joueurs spécifiques, vous devrez ajouter des méthodes appropriées dans le service et le contrôleur d'historique des matchs et définir une route pour cette fonctionnalité.

### 1. **Mettre à jour le Service pour l'Historique des Matchs**
   a. **Ajouter une Méthode de Recherche**
      - Ajouter une méthode, par exemple `getMatchesBetweenPlayers`, pour rechercher tous les matchs où deux joueurs spécifiques sont impliqués.

### 2. **Mettre à jour le Contrôleur pour l'Historique des Matchs**
   a. **Ajouter une Méthode de Recherche**
      - Ajouter une méthode correspondante dans le contrôleur pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques.

### 3. **Mettre à jour les Routes**
   a. **Définir une Route pour la Recherche**
      - Définir une route dans votre application pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques et les acheminer vers la méthode appropriée dans votre contrôleur.

### Liste des Tâches Mises à Jour

1. **Service Historique des Matchs**
   - [ ] Ajouter la méthode `getMatchesBetweenPlayers` pour rechercher tous les matchs entre deux joueurs spécifiques.
   
2. **Contrôleur Historique des Matchs**
   - [ ] Ajouter une méthode correspondante pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques.
   - [ ] Définir une route pour cette méthode de recherche.
   
3. **Configuration des Routes**
   - [ ] Définir une route dans l'application pour la recherche de matchs entre deux joueurs spécifiques.
   
4. **Tests**
   - [ ] Écrire et exécuter des tests pour la nouvelle méthode dans le service et le contrôleur pour s'assurer qu'elle fonctionne comme prévu.

### Conclusion

En ajoutant ces tâches à votre liste et en les complétant, vous serez en mesure de gérer efficacement la recherche de tous les matchs entre deux joueurs spécifiques dans votre application, en plus des autres opérations CRUD et de la gestion de l'historique des matchs.

Bien sûr, pour ajouter la fonctionnalité permettant de rechercher tous les matchs entre deux joueurs spécifiques, vous devrez ajouter des méthodes appropriées dans le service et le contrôleur d'historique des matchs et définir une route pour cette fonctionnalité.

### 1. **Mettre à jour le Service pour l'Historique des Matchs**
   a. **Ajouter une Méthode de Recherche**
      - Ajouter une méthode, par exemple `getMatchesBetweenPlayers`, pour rechercher tous les matchs où deux joueurs spécifiques sont impliqués.

### 2. **Mettre à jour le Contrôleur pour l'Historique des Matchs**
   a. **Ajouter une Méthode de Recherche**
      - Ajouter une méthode correspondante dans le contrôleur pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques.

### 3. **Mettre à jour les Routes**
   a. **Définir une Route pour la Recherche**
      - Définir une route dans votre application pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques et les acheminer vers la méthode appropriée dans votre contrôleur.

### Liste des Tâches Mises à Jour

1. **Service Historique des Matchs**
   - [ ] Ajouter la méthode `getMatchesBetweenPlayers` pour rechercher tous les matchs entre deux joueurs spécifiques.
   
2. **Contrôleur Historique des Matchs**
   - [ ] Ajouter une méthode correspondante pour gérer les requêtes HTTP de recherche de matchs entre deux joueurs spécifiques.
   - [ ] Définir une route pour cette méthode de recherche.
   
3. **Configuration des Routes**
   - [ ] Définir une route dans l'application pour la recherche de matchs entre deux joueurs spécifiques.
   
4. **Tests**
   - [ ] Écrire et exécuter des tests pour la nouvelle méthode dans le service et le contrôleur pour s'assurer qu'elle fonctionne comme prévu.

### Conclusion

En ajoutant ces tâches à votre liste et en les complétant, vous serez en mesure de gérer efficacement la recherche de tous les matchs entre deux joueurs spécifiques dans votre application, en plus des autres opérations CRUD et de la gestion de l'historique des matchs.