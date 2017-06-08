angular.module('starter.controllers', [])
//login page controller
    .controller('LoginCtrl', function ($scope, $ionicModal, $state, GoogleSignin) {
        $scope.loginData = {};
        $scope.hideLogin = false;

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/loginModal.html', {
            scope: $scope,
            backdropClickToClose: false
        }).then(function (modal) {
            $scope.modal = modal;
        });


        $scope.login = function () {
            GoogleSignin.signIn().then(function (user) {
                $state.go('map', {user: user});
                console.log(user);
            }, function (err) {
                console.log(err);
            });
        };

        $scope.doLogin = function () {
            $scope.closeLogin();
        };

        $scope.closeLogin = function () {
            $scope.modal.hide();
            $scope.hideLogin = false;
            $state.go('map', {user: $scope.loginData.username});
        };
    })


    //home page controller
    .controller('MapCtrl', function ($scope, $state, $http, $ionicHistory) {
        if (!$state.params.user) {
            $state.go('login');
        }
        $scope.user = $state.params.user;

        $scope.userName = $scope.user ? $scope.user.w3.ig : "";

        $scope.testServerConnect = function () {

            $http.get("http://sportsmeetup-160707.appspot.com/greeting?name=Dhara")
                .then(function (response) {
                    //use server returned data here
                });

        }

        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    })
    .controller('FacilityCtrl', function ($scope, $state) {
        $scope.handleMoreClick = function () {

        };
    })
    .controller('HelpCtrl', function ($scope, $state) {
        $scope.comment = {
            text: ""
        };
        $scope.submitComments = function () {
            alert("Thanks.. Your comment has been submitted: " + $scope.comment.text);
        }


    })

    .controller('AboutCtrl', function ($scope, $state, $ionicHistory) {
        $scope.myFunc = function () {
            $scope.showMe1 = false;
            $scope.showMe2 = false;
            $scope.showMe = !$scope.showMe;
        }
        $scope.myFunc1 = function () {
            $scope.showMe = false;
            $scope.showMe2 = false;
            $scope.showMe1 = !$scope.showMe1;
        }

        $scope.myFunc2 = function () {
            $scope.showMe = false;
            $scope.showMe1 = false;
            $scope.showMe2 = !$scope.showMe2;
        }

        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    })
    .directive('map', function () {
        return {
            restrict: 'A',
            bindToController: true,
            link: function (scope, element, attrs, $state) {
                /*  var xmlhttp;
                 var responseJSON, lat, lng, gymname;
                 if (window.XMLHttpRequest) {
                 xmlhttp = new XMLHttpRequest();
                 } else {
                 // code for older browsers
                 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                 }
                 xmlhttp.onreadystatechange = function () {
                 if (this.readyState == 4 && this.status == 200) {
                 responseJSON = JSON.parse(this.responseText);
                 lat = responseJSON.lat;
                 lng = responseJSON.lon;
                 gymname = responseJSON.name;
                 // now responseJSON.latitude and responseJSON.longitude can be used
                 }
                 }; */

                // var request = new XMLHttpRequest();
                // request.open('GET', 'http://datastoretest-164219.appspot.com/startup?did=d1', false);
                // request.send(null);
                // if (request.status == 200) {
                //   responseJSON = JSON.parse(request.responseText);
                //   lat = responseJSON.lat;
                //   lng = responseJSON.lon;
                //   //document.getElementById("demo").innerHTML = responseJSON.lat;
                // }


                /*  xmlhttp.open('GET', 'http://datastoretest-164219.appspot.com/startup?did=d1', false);
                 //xmlhttp.open("GET", "http://datastoretest-164219.appspot.com/greeting?name=Dhara", true);
                 //xmlhttp.open("GET", "http://localhost:8080/greeting?name=Bo", true);
                 xmlhttp.send(); */


                var locations = [

                    ['Santa clara Gym 1', 37.353059, -121.936603, 5, 'facility.html']
                ];


                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: new google.maps.LatLng(37.3501577, -121.9384859),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var infowindow = new google.maps.InfoWindow();

                var marker, i;
                var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                var icon = {
                    url: 'http://icons.iconarchive.com/icons/sonya/swarm/256/gym-icon.png', // url
                    scaledSize: new google.maps.Size(25, 25), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                for (i = 0; i < locations.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map,
                        icon: icon,
                        url: locations[i][4]
                    });

                    google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                        return function () {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                            map.setZoom(15);
                            map.setCenter(marker.getPosition());
                        }
                    })(marker, i));

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            scope.goToFacility(locations[0]);
                        }
                    })(marker, i));
                }
            },
            controller: function ($scope, $state) {
                $scope.goToFacility = function (selectedLocation) {
                    $state.go('facility', {facilityInfo: selectedLocation});
                }
            }
        };
    })







