var myApp = angular.module('myCrud', []);

// Controller for  CRUD
myApp.controller('myController', function ($scope, $http) {
    console.log("In myContoller...");

    $scope.newUser = {};
    $scope.checkedUser = {};
    $scope.message = "";

    $scope.users = []


    $http.get("http://localhost:3000/data")
        .then(function (response) {
            console.log(response.data)
            $scope.users = response.data
            console.log($scope.users)
        }, function (error) {
            console.error(error);
        })

    $scope.saveUser = function () {

        $http.post("http://localhost:3000/data", JSON.stringify($scope.newUser))
            .then(function (response) {
                console.log(response)
                $scope.message = "User added Successful";
                // href="#/!";
                window.location.href = '#/!';
            }, function (error) {
                console.log(error);

            })
    };

    $scope.selectUser = function (user) {
        console.log(user);
        $scope.clickedUser = user;
    };

    $scope.updateUser = function (id, user) {
        console.log("hello")
        $http.put(`http://localhost:3000/data/${id}`, (user))
            .then(function (response) {
                console.log(response)
                $scope.message = "User updated Successful";
            }, function (error) {
                console.log(error);

            })

    };

    $scope.deleteUser = function () {
        // $scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);

        $http.delete(`http://localhost:3000/data/${$scope.clickedUser.id}`)
            .then(function (response) {
                console.log(response)
                $scope.message = "User deleted Successful";
            }, function (error) {
                console.log(error);

            })
    };
});

// Controller for Loggin
myApp.controller('logined', function ($scope, $http) {

    $scope.logInUser = {};
    users = [];
    $scope.message = "";
    var flag = 0;

    $scope.login = function () {
        $http.get("http://localhost:3000/data")
            .then(function (response) {
               
                users = response.data;
                for (x of users) {
                   
                    if (x.EMAIL == $scope.logInUser.EMAIL && x.FNAME == $scope.logInUser.FNAME) {
                        // $scope.message = "Login success"
                        alert("Success")
                        window.location.href = '#/!';
                        flag = 1;
                        break;
                    }


                }

                if (flag == 0) {
                    $scope.message = "Invalid cred"
                }

            }, function (error) {
                console.error(error);
            })
    }
})

// Controller for library sec 
myApp.controller('myLibController', function ($scope, $http) {
    console.log("In myLibContoller...");

    $scope.newLib = {};
    $scope.checkedUser = {};
    $scope.message = "";

    $scope.libraryData = []

    // Fetch all data 
    $http.get("http://127.0.0.1:8000/")
        .then(function (response) {
            console.log(response.data)
            $scope.libraryData = response.data
            console.log($scope.libraryData)
        }, function (error) {
            console.error(error);
        })

        // Add lib 
    $scope.saveLib = function () {

        $http.post("http://127.0.0.1:8000/addLib", JSON.stringify($scope.newLib))
            .then(function (response) {
                console.log(response)
                $scope.message = "Book added Successful";
                // href="#/!";
                window.location.href = '#/!';
            }, function (error) {
                console.log(error);

            })
    };

    $scope.selectLib = function (lib) {
      
        $scope.clickedLib = lib;
        console.log($scope.clickedLib);
    };

    // Update Lib 
    $scope.updateLib = function (id, editLib) {
        console.log(id)
        $http.put(`http://127.0.0.1:8000/update/${id}`, (editLib))
            .then(function (response) {
                console.log(response)
                $scope.message = "Book updated Successful";
            }, function (error) {
                console.log(error);

            })

    };


    // Delete by id 
    $scope.deleteLib = function () {
        // $scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
        console.log("delete")

        $http.delete(`http://127.0.0.1:8000/delete/${$scope.clickedLib.sno}`)
            .then(function (response) {
                console.log(response)
                $scope.message = "Book Deleted Successful";
            }, function (error) {
                console.log(error);

            })
    };

    // Delete All 
    $scope.deleteLibAll = function () {
        // $scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
        console.log("delete All")

        $http.delete(`http://127.0.0.1:8000/deleteAll`)
            .then(function (response) {
                console.log(response)
                $scope.message = "Book All Deleted Successful";
            }, function (error) {
                console.log(error);

            })
    };
});