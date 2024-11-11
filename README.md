# Workshop Stalker

Ce projet vous aide à être alerté lorsqu'un addon Workshop que vous utilisez est mis à jour.

## Configuration de la liste d'addons

Pour que le script puisse surveiller les mises à jour, vous devez créer un fichier texte contenant la liste des addons que vous souhaitez suivre. Ce fichier doit être accessible par un lien public, comme un fichier sur GitHub ou Pastebin.

### Format du fichier d'addons

Le fichier doit être structuré de la manière suivante :

```bash
2840031720 -- TFA Base
1251198810 -- SH Whitelist Content
2812583789 -- Lady [PM/Ragdoll]
2859037519 -- Game of Thrones 7 [PM/Ragdoll - Work]
```

Line ligne contient :

1. L'ID de l'addon (ex : `2840031720`)
2. Optionnel : une description ou le nom de l'addon (ex : `-- TFA Base`)

La description après les deux tirets `--` est facultative, mais elle peut être utile pour identifier chaque addon.

### Exemple de lien vers le fichier
Voici un exemple de lien vers un fichier correctement formaté sur GitHub :  
[`https://raw.githubusercontent.com/Endless-Community/workshop_id_checker/refs/heads/main/liste`](https://raw.githubusercontent.com/Endless-Community/workshop_id_checker/refs/heads/main/liste)

### Installation
Pour installer et exécuter le projet, suivez ces étapes :

```bash
# Installer les dependances
npm install

# Lancer le script
npm start
# ou utilisez cette commande
node main.js
```

## Merci de Star le repo si vous utilisez ce code !
C'est pas obligatoire mais ça fait toujours plaisir !
