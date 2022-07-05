var Pelicula = require("./modelos/pelicula");

//Obtener Peliculas
exports.getPeliculas = function(req, res){

    Pelicula.find({}, function(err, peliculas){

        if(err){

            res.send(err);

        }

        res.json(peliculas);

    });

};

//Adicionar un nuevo objeto Pelicula en la base de datos
exports.setPelicula = function(req, res){

    Pelicula.create({

        nombre: req.body.nombre,
        genero: req.body.genero,
        director: req.body.director,
        descripcion: req.body.descripcion,
        img: req.body.img}, function(err, pelicula){

            if(err){

                res.send(err);

            }

            Pelicula.find(function(err, pelicula){

                if(err){

                    res.send(err);

                }

                res.json(pelicula);

            });

        });

}

//Modifica un objeto pelicula de la base de datos
exports.updatePelicula = function(req, res){

    Pelicula.update({_id: req.params.pelicula_id},
        
        {$set: {

            nombre: req.body.nombre,
            genero: req.body.genero,
            director: req.body.director,
            descripcion: req.body.descripcion,
            img: req.body.img}}, function(err, pelicula){

                if(err){

                    res.send(err);

                }

                Pelicula.find(function(err, pelicula){


                    if(err){

                        res.send(err);

                    }

                    res.json(pelicula);

                });

            }
        
    );

}

//Eliminar un objeto pelicula de la base de datos
exports.removePelicula = function(req, res){

    Pelicula.remove({_id: req.params.pelicula_id}, function(err, pelicula){

        if(err){

            res.send(err);

        }

        Pelicula.find(function(err, peliculas){

            if(err){

                res.send(err);

            }

            res.json(peliculas);

        });

    });

}