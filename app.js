const express = require("express");
const app = express();
const PORT = process.env.PORT || 8877;
const arq = require("./pokemons.json");
const cors = require('cors');


const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:4200'
];
let find = false

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };

app.options('*', cors(corsOptions));

app.get("/status", cors(corsOptions), (req, res) => {
    res.json({
        msg: "ok",
    });
});

app.get("/", cors(corsOptions), (req, res) => {
    const id = req.query.id;

    if (typeof id === "undefined") {
        res.json(arq);
    }
    else {

        let pokemons = arq.pokemon
        for (let i in pokemons) {

            if (pokemons[i].id == id) {
                res.json(pokemons[i]);
                find = true
            }
        }

        if (find === false) {
            res.json({
                msg: "erro",
            });
        }

    }

});

app.listen(PORT, () => {
    console.log("escutando porta : " + PORT);
});
