# Könyvek és hozzá tartozó review-k

Ez egy REST api amit könyvek és hozzá tartozó review-k kezeléséhez írtam.
Az API képes kezelni a felhasználók, könyvek és review-k CRUD műveleteit.
Express.js-t, MongoDB-t és Swagger-t használtam a projekthez.

## Tartalomjegyzék
- Features
- Installálás
- Használat
- API dokumentáció
- Routes
- Használt technológiák


## Features
- Book management: add, update, delete, get
- Review management: add, update, delete, get
- User management: add, update, delete, get
- User, Review Authentication: autentikált végpontok
- Swagger documentation: Auto-generated API dokumentáció

## Installálás

A projekt futtatásához fel kell telepíteni a Node.js-t és MongoDb-t.

1. Clone repository
git clone https://github.com/Akos1989/felveteli_feladat.git
2. navigálj a projekt mappába
3. Installáld a dependencieket
npm install express
npm install mongoose
npm install swagger-ui-express swagger-jsdoc
npm install cors
npm install dotenv
npm install --save-dev nodemon
npm install body-parser
4. Futtatsd a projektet: npm run devStart

## Használat

Postmannel tudod az endpointokat ellenőrizni.

## API dokumentáció

API dokumentációt itt éred el : http://localhost:8000/api-docs

## Routes

POST    /api/users/create     -   Felhasználó regisztráció
POST    /api/users/login      -   Felhasználó bejelentkezés
GET     /api/users            -   Összes felhasználó lekérése
PUT     /api/users/:id        -   Felhasználó adatainak frissítése ID alapján
DELETE  /api/users/:id        -   Felhasználó törlése ID alapján

GET     /api/books            -   Összes könyv lekérése
POST    /api/books            -   Új könyv létrehozása
GET     /api/books/:id        -   Egy könyv lekérése ID alapján
PATCH   /api/books/:id        -   Egy könyv frissítése ID alapján
DELETE  /api/books/:id        -   Egy könyv törlése ID alapján

GET     /api/reviews          -   Összes értékelés lekérése
POST    /api/reviews          -   Új értékelés létrehozása
GET     /api/reviews/:id      -   Egy értékelés lekérése ID alapján
PATCH   /api/reviews/:id      -   Egy értékelés frissítése ID alapján
DELETE  /api/reviews/:id      -   Egy értékelés törlése ID alapján



## Használt technológiák

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Documentation: Swagger
- Middleware: CORS, Body-Parser
- Testing Tools: Postman




