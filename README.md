Instructions pour installer le projet :
- Cloner le projet Sae-Dev-Mobile dans un IDE
- Supprimer les fichiers node_modules s'il y en a un
- Supprimer le fichier package-lock.json
- Supprimer le directory backend
- créer un nouveau directory backend


A partir d'ici tout se fait dans le terminal de commande :
- cd backend
- git init
- git remote add origin https://github.com/ChefCurrrry/backend_dev_mobile.git
- git remote -v (s'il affiche :
                                origin  https://github.com/ChefCurrrry/backend_dev_mobile.git (fetch)
                                origin  https://github.com/ChefCurrrry/backend_dev_mobile.git (push)
)
- git pull origin master


Maintenant, le backend est cloné aussi avec le projet principal
Ensuite il faut réinstaller les dépendances et les modules mais aussi expo-cli :
- Si vous êtes encore dans backend, revenez à la racine du projet avec cd../


Exécutez les commandes suivantes entre chaque installation :
- npm istall expo-cli
- npm install


Maintenant tout l'environnement est configuré pour lancer le projet avec Expo Go il faut faire :
- npx expo start

Téléchargez Expo Go sur votre téléphone puis scannez le QR-Code proposé dans le terminal, vous aurez ensuite accès à l'application,
