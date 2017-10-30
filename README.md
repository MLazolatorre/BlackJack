# Projet Programation Web

### 1) Présentation

Notre projet se porte sur le jeu de carte Blackjack permettant à plusieurs utilisateurs de jouer ensemble sur une même table contre la banque.

Une partie de BlackJack commence par le mélange de 3 decks constitués de 52 cartes afin d'éviter toutes sortes de tricherie. Ensuite deux cartes sont distribuées à chaque joueur face ouverte ainsi qu'à la banque dont la deuxième carte sera face cachée. Chaque joueur aura la possibilité de s'arreter ou de demander une carte afin d'atteindre le plus près possible de la valeur de 21 et de battre la main de la banque.

Chaque carte a une valeur précise:
 - AS : 1 ou 11 au choix
 - Roi, Dame, Valet et 10 : 10
 - De 2 à 9 : 2 - 9

Si l'un des joueurs dépasse la valeur de 21 alors il est sorti de la manche et pert la somme des jetons qu'il a misée. En effet avant la distribution des cartes, chaque joueur mise une somme attribuée à la manche qui va être jouée. Si un joueur gagne contre la banque, il remporte le double de sa mise.

En ce qui concerne le comportement de la banque, celle-ci demandera une carte jusqu'à ce qu'elle atteigne la valeur de 17 ou plus.

Avant de pouvoir rejoindre une partie, un utilisateur doit s'inscrire ou se connecter depuis notre base de données afin d'avoir la liste des tables disponibles et de pouvoir rejoindre une partie.

### 2) Choix des technologies

Pour créer ce Blackjack nous avons utilisé pour le back, Node.JS pour notre serveur et MongoDB pour la base de données. Nous avons construit une API REST afin de traiter les différentes fonctionnalités effectuées par l'utilisateur.
Pour ce qui est du front, nous avons utilisé Express JS, JQuery, HTML et CSS.
Nous avons choisi ces technologies car elles nous semblaient être les plus abordables à apprendre et à utiliser pour réaliser une application avec Node.JS et sur un naviagteur web.

### 3) Les fonctionnalités

Pour ce qui est des fonctionnalités, l'ulisateur va pouvoir se connecter et s'inscrire. A la fin de son inscription, l'utilisateur reçoit 1000 jetons.
L'utilisateur choisi de rejoindre l'une des 5 tables disponibles de 3 joueurs maximum. Ensuite une partie se lance, le joueur mise et en fonction de ses cartes, va demander un carte ou s'arreter la. Le serveur va ensuite gerer la banque, le tirage des cartes et la remise des jetons.
Le joueur pourra ensuite quitter une table et se déconnecter de l'application.

### 4) Installation de l'application

Premièrement veuillez télécharger MongoDB via le lien ci-dessous en fonction de votre système d'exploitation.
https://www.mongodb.com/download-center#community
Pour démarrer MongoDB, exécutez le fichier mongod.exe (Windows) ou mongod (Unix), situé dans le dossier bin du dossier dans lequel MongoDB est installé. Lors de son lancement, MongoDB recherchera le dossier /data/bd à la racine de votre disque. Si ce dossier n'existe pas, créez-le.
Lors de l'execution du fichier, si la dernière ligne de commande affiche "waiting for connections", c'est que MongoDB est prêt à être utilisé.

Ensuite téléchargez et installez Node JS et notre projet. Ensuite via un invité de commande, placer vous dans le dossier Backend/app du projet et exécutez les commandes suivantes afin d'installer les différentes dépendances du projet:
```sh
$ npm i
$ npm dev
$ npm start
```

Utilisez le navigateur web de votre choix et ensuite dirigez-vous sur l'URL ci-dessous:
localhost:3000

Vous pouvez maintenant utiliser notre application.

