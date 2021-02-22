# Scanner de licences FFME

Ce projet est une appli web destinée à gérer une séance d'escalade en scannant la licence de chaque participant pour vérifier leurs informations (passeport, validité licence, date de naissance, ...) et exporter la liste des personnes présentes à la séance.

Utile pour les encadrants et professeurs d'escalade devant vérifier les compétences (ex: passeport blanc requis pour grimper) ou garder un historique des grimpeurs (ex: cas contacts COVID, témoins d'accidents, ...). Originellement développée pour le club de l'ASA Escalade d'Avrillé elle est universelle et vous permettra d'abandonner vos vieux classeurs lourds et qui prennent de la place !

## Utilisation

L'application est actuellement hébergée à l'adresse [https://app.asaescalade.fr](https://app.asaescalade.fr/).

**:warning: Attention**

Pour le moment, il n'est pas possible d'utiliser l'appli sur un appareil sans appareil photo.
Si vous ne voyez qu'un grand rectangle gris cela signifie que l'accès à la caméra est bloqué.

### Travaux à venir

- [x] Passage de Svelte à Angular #3
- [x] Licence open-source
- [ ] Nouveau design de l'application
- [ ] Ajout d'une page de configuration #4
- [ ] Meilleure gestion du scanner (surtout si l'accès à la caméra est refusé)
- [ ] Ajout de tests unitaires

### Idées

Ces idées ne seront pas nécessairement développées. Elles sont encore en cours de réflexion.

- Archivage des données vers une plateforme externe : type S3 Glacier pour des csv/pdf ou bien gDoc pour exporter des statistiques

## Développement

### Proxy CORS

**Pour accéder à l'API FFME, il est indispensable d'utiliser un proxy afin d'éviter les erreurs de sécurité CORS.**
Pour le développement, ce proxy est géré par Angular, aucune manipulation spécifique n'est donc nécessaire.

nginx

```nginx
location /ffme/ {
        proxy_set_header                X-Real-IP $remote_addr;
        proxy_set_header                X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass                      https://licencie.ffme.fr/;
        proxy_redirect                  off;

        add_header                      'Access-Control-Allow-Origin' 'https://app.asaescalade.fr' always;
        add_header                      'Access-Control-Allow-Methods' 'GET' always;

        # Important pour éviter les soucis d'encodage avec l'API FFME
        charset                         iso-8859-1;
}
```

### Installation des dépendances...

```bash
npm install
```

### Lancement du compilateur / serveur HTTP

```bash
npm run start
```

L'application sera disponible sur `http://localhost:4200/`. Les modifications entraineront une régénération automatique de la page.

### Compilation statique

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

**:warning: Pas encore implémenté**
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

**:warning: Pas encore implémenté**
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
