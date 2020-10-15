const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));


/*
Verbos HTTP
GET - Obtener recursos
POST - Almacenar, crear recursos
PATCH - Modificar una parte de un recurso
PUT - Modificar un recurso
DELETE - Borrar un recurso
*/

app.get("/", (req, res, next) =>{
    return res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});