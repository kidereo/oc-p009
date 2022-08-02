## Project
009 - Débuggez et testez un SaaS RH

## Path 
Développeur d'application - JavaScript React

## Bug / Fix summary 

[See project kanban "Billed bugs and tests TO DO"](https://www.notion.so/a7a612fc166747e78d95aa38106a55ec?v=2a8d3553379c4366b6f66490ab8f0b90)

1. Bug report - Bills: Missing sorting function. Fix: Added `orderBillsByDate()` in `./src/containers/Bills.js` to apply to data in `./src/views/BillsUI.js`.
2. Bug report - Login: Erroneous copy/paste of `e.target.querySelector()` inside `handleSubmitAdmin()` function. Fix: Changed selectors to `input[data-testid="admin-email-input"]` and `input[data-testid="admin-password-input"]`. 
3. Bug Hunt - Bills: Missing file extension validation. Fix: Added `if() else` inspection inside `handleChangeFile()` function in `./src/containers/NewBill.js`.
4. Bug Hunt - Dashboard: Missing dropdown state determination. Fix: Added `dropdownState` property in `./src/containers/Dashboard.js` to determine if the dropdown is unfurled and execute code in the `handleShowTickets()` function. Attention: At least 3 tests in the `Given I am connected as an Admin` suite could fail due to failure to pass appropriate `getByTestId()` in relevant DOMs. These have been fixed in `./src/__tests__/Dashboard.js` and prefixed with `//TEST EDITED AFTER [Bug Hunt] - Dashboard RESOLUTION`.
5. Add unit and integration tests
    1. Block views/Bills: The first test is missing the `expect` statement. Fix: Verify that the `windowIcon` is visible and that it has `"active-icon"` class added.
    2. Block container/Bills: 
        1. Get statement coverage for `Bills.js` to 80%. Fix: Added 5 extra tests to check the `Bills` functionalities.
        2. Add integration test to GET bills. Fix: Added a dedicated `GET Integration Test` suite.
    3. Block container/NewBill: 
        1. Get statement coverage for `NewBills.js` to 80%. Fix: Added 2 tests to bring the `NewBills.js` statement coverage to 79%.
        2. Add integration test to POST a new bill. Fix: Added a dedicated `POST Integration Test` suite.
6. Test E2E - Parcours Employé: Write up the tests. Fix: [See Plan_de_tests_End-To-End_(Employee).pdf](./src/assets/documents/Plan_de_tests_End-To-End_(Employee).pdf)


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
