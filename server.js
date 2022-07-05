//Iniciar los modulos de MongoDB
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var rutas = require('./conexion_mongo/backend/rutas');
const bcrypt = require('bcrypt');
const User = require('./conexion_mongo/backend/modelos/user');

//Configuracion de MongoDB
mongoose.connect('mongodb://localhost/Peliculas');
app.use(express.static(__dirname + '/angular'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Cargar rutas de MongoDB
rutas.iniciar(__dirname);
rutas.principal(app);

//REGISTER AND LOGIN
app.post('/register', (req, res) => {

    const {username, password} = req.body;

    const user = new User({username, password});

    user.save(err => {

        if(err){

            res.status(500).send('Error al registrar al usuario');

        }else{

            return res.redirect("index.html")

        }

    });

})

app.post('/authenticate', (req, res) => {

    const {username, password} = req.body;

    User.findOne({username}, (err, user) => {

        if(err){

            res.status(500).send('Error al autenticar al usuario...');

        }else if(!user){

            res.status(500).send('El usuario no existe');

        }else{

            user.isCorrectPassword(password, (err, result) => {

                if(err){

                    res.status(500).send('Error al autenticar')

                }else if(result){

                    return res.redirect("primary_page.html")
        
                }else{

                    res.status(500).send('El usuario y/o contraseña incorrecta');

                }

            });

        }

    });

});

//Iniciar servidor 
app.listen(3000);
console.log("Escuchando en el puerto 3000");