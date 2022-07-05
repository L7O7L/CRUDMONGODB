var mongoose = require("mongoose");
var EsquemaPeliculas = mongoose.Schema({

    nombre: String,
    genero: String,
    director: String,
    descripcion: String,
    img: String

});

module.exports = mongoose.model("pelicula", EsquemaPeliculas, "pelicula");