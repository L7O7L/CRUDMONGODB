var Controlador = require("./controlador");
var mainDir = "";

module.exports = {

    principal: function(app){

        //Obtener todas las peliculas
        app.get("/api/peliculas", Controlador.getPeliculas);

        //Crear una nueva pelicula
        app.post("/api/pelicula", Controlador.setPelicula);

        //Modificar datos de una pelicula
        app.put('/api/pelicula/:pelicula_id', Controlador.updatePelicula);
        
        //Borrar una pelicula 
        app.delete('/api/pelicula/:pelicula_id', Controlador.removePelicula);

        //Aplicación principal
        app.get('*', function(req, res){

            res.sendFile(mainDir+'/angular/secondarypage.html');

        });

        //Aplicación para crear
        app.get('*', function(req, res){

            res.sendFile(mainDir+'/angular/agregar_pelicula.html');

        });

    },

    iniciar: function(main){

        mainDir = main;

    }

};