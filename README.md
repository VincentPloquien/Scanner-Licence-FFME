# Scanner de licences FFME

Ce projet est une appli web destinée à gérer une séance d'escalade en scannant la licence de chaque participant pour vérifier leurs informations (passeport, validité licence, date de naissance, ...) et exporter la liste des personnes présentes à la séance.

Utile pour les encadrants et professeurs d'escalade devant vérifier les compétences (ex: passeport blanc requis pour grimper) ou garder un historique des grimpeurs (ex: cas contacts COVID, témoins d'accidents, ...). Originellement développée pour le club de l'ASA Escalade d'Avrillé elle est universelle et vous permettra d'abandonner vos vieux classeurs lourds et qui prennent de la place !

## Utilisation

L'application est actuellement hébergée à l'adresse [https://app.asaescalade.fr](https://app.asaescalade.fr/).

**:warning: Attention**

Pour le moment, il n'est pas possible d'utiliser l'appli sur un appareil sans appareil photo.
Si vous ne voyez qu'un grand rectangle gris cela signifie que l'accès à la caméra est bloqué.

### Fonctionnalités

## Développement

### Feuille de route

### Installation de l'environnement de dev

Installation des dépendances ...

```bash
npm install
```

... ensuite générez les fichiers HTML statiques via [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Les modifications entraineront une régénération automatique.

**:warning: Attention**

Le scanner de QRCode utilisant les API d'accès à la caméra, les navigateurs (Chrome/Chromium notamment) requièrent que la page soit accédée via HTTPS. Il est donc nécessaire d'utiliser un environnement de développement en HTTPS, d'utiliser l'URL <http://localhost> ou de modifier votre configuration.
Plus d'infos sur <https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins#TOC-Testing-Powerful-Features>.
