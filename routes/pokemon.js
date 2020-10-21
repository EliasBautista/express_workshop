const express = require('express');
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", (req, res, next) =>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next) =>{
    const pkmn = await db.query("SELECT * FROM POKEMON");
    //console.log(pkmn);
    return res.status(200).json({code: 1, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM POKEMON WHERE pok_id = " + id);
    console.log(Object.entries(pkmn).length);
    if (Object.entries(pkmn).length === 0){
        return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
    }else{
        return res.status(200).json({code: 1, message: pkmn});
    }
    // if (id >= 0 && id <= 150) {
    //     return res.status(200).send(pk[req.params.id - 1]);
    // }
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "'");
    //console.log(pkmn);
    if (Object.entries(pkmn).length === 0){
        return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
    }else{
        return res.status(200).json({code: 1, message: pkmn});
    }
    /* const pkmn = pk.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    }); */

    //(pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokemon no encontrado");
})

module.exports = pokemon;