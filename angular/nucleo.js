angular.module('MainApp', []);

//OPERACIONES MONGODB

function controladorPrincipal($scope, $http){

    $scope.peliculas = {};
    $scope.games = {};

    $scope.newPelicula = {};

    $http.get('/api/peliculas').success(function(data){

        $scope.peliculas = data;
        console.log(data);

    }).error(function(data){

        console.log('Error: ' + data);

    });

    $http.get('/games').success(function(data){

        $scope.games = {};
        console.log(data);

    })

    //Agregar Pelicula
    $scope.registrarPelicula = function(){

        $http.post('/api/pelicula', $scope.newPelicula).success(function(data){

            $scope.newPelicula = {}; //Borramos los datos del formulario
            $scope.peliculas = data;

        }).error(function(data){

            console.log('Error: ' + data);

        });

    }

    //Tomar el objeto seleccionado de la tabla
    $scope.selectPelicula = function(pelicula){

        $scope.newPelicula = pelicula;
        $scope.selected = true;
        console.log($scope.newPelicula, $scope.selected);

    };

    //Editar información de una pelicula
    $scope.modificarPelicula = function(newPelicula){

        $http.put('api/pelicula/' + $scope.newPelicula._id, $scope.newPelicula).success(function(data){

            $scope.newPelicula = {};
            $scope.peliculas = data;
            $scope.selected = false;

        }).error(function(data){

            console.log('Error: '  + data);

        });

    };

    //Eliminar información de una pelicula
    $scope.borrarPelicula = function(newPelicula){

        $http.delete('api/pelicula/' + $scope.newPelicula._id).success(function(data){

            $scope.newPelicula = {};
            $scope.peliculas = data;
            $scope.selected = false;

        }).error(function(data){

            console.log('Error: '  + data);

        });

    };

}

