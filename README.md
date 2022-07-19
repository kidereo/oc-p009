## Project
009 - Débuggez et testez un SaaS RH

## Path 
Développeur d'application - JavaScript React

## Bug / Fix summary 

[See project kanban "Billed bugs and tests TO DO"](https://www.notion.so/a7a612fc166747e78d95aa38106a55ec?v=2a8d3553379c4366b6f66490ab8f0b90)

1. Bug report - Bills: Missing sorting function. Fix: Added `orderBillsByDate()` in `./src/containers/Bills.js` to apply to data in `./src/views/BillsUI.js`.
2. Bug report - Login: Erroneous copy/paste of `e.target.querySelector()` inside `handleSubmitAdmin()` function. Fix: Changed selectors to `input[data-testid="admin-email-input"]` and `input[data-testid="admin-password-input"]`. 
3. Bug Hunt - Bills: Missing file extension validation. Fix: Added `if() else` inspection inside `handleChangeFile()` function in `./src/containers/NewBill.js`.

## Comment lancer l'application en local ?

### étape 1 - Lancer le backend :

```
npm run run:dev
```

Puis allez à l'adresse : `http://127.0.0.1:5678/`

### étape 2 - Lancer le frontend :

```
live-server
```

Puis allez à l'adresse : `http://127.0.0.1:8080/`


## Comment lancer tous les tests en local avec Jest ?

```
$ npm run test
```

## Comment lancer un seul test ?

Installez jest-cli :

```
$npm i -g jest-cli
$jest src/__tests__/your_test_file.js
```

## Comment voir la couverture de test ?

`http://127.0.0.1:8080/coverage/lcov-report/`

## Comptes et utilisateurs :

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```
