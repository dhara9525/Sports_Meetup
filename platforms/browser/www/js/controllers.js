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
                $state.go('tab.map', {user: user});
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
            $state.go('tab.map', {user: $scope.loginData.username});
        };
    })


    //home page controller
    .controller('MapCtrl', function ($scope, $state, $http) {
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

    })
    .controller('FacilityCtrl', function ($scope, $state, $http) {
        if (!$state.params.facilityInfo) {
            $state.go('map');
        }

    })
    .controller('FacilityCtrl', function ($scope, $state) {
        $scope.handleMoreClick = function () {

        };

        function init() {
            $scope.facilityInfo = $state.params.facilityInfo;

            $http.get("https://datastoretest-164219.appspot.com/test/gym")
                .then(function (response) {
                    $scope.facilityData = response.data.results;
                });
        }

        init();
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




    .controller('GymPageCtrl', function ($scope, $state, $ionicHistory) {

    })


    .controller('ReporttimeCtrl', function ($scope, $state, $ionicHistory) {
         var GymCrowd;
         var Facility;
         var Gym;


        $scope.showSelectGym = function(mySelectGym) {
            console.log(mySelectGym);
            Gym =  mySelectGym;
        }


        $scope.showSelectGymCrowd = function(mySelect) {
            console.log(mySelect);
            GymCrowd =  mySelect;
        }


        $scope.showSelectFacility = function( mySelectFacility) {
            console.log( mySelectFacility);
            Facility =   mySelectFacility;
        }


        $scope.submitComments = function () {
            var x = document.getElementById("myText").value;
            alert("Thanks.. Your comment has been submitted: \n \n Gym: " +Gym + "\n Facility: - " +Facility +"\n Gym Crowd: " +GymCrowd +"\n Wait Time: "+x );
        }

    })






    .directive('map',['$http',function($http) {
        return {
            restrict: 'A',
            bindToController: true,
            link: function (scope, element, attrs) {

                getGymMapData();

                function getGymMapData() {
                    $http.get("https://datastoretest-164219.appspot.com/test/map")
                        .then(function (response) {
                            var mapMarkers = response.data.results;

                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 14,
                                center: new google.maps.LatLng(mapMarkers[0].lat, mapMarkers[0].lon),
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

                            mapMarkers.forEach(function (marker) {
                                var mapMarker = new google.maps.Marker({
                                    position: new google.maps.LatLng(marker.lat, marker.lon),
                                    map: map,
                                    icon: icon
                                });

                                google.maps.event.addListener(mapMarker, 'click', (function (mapMarker) {
                                    return function () {
                                        infowindow.setContent(marker.name);
                                        infowindow.open(map, mapMarker);
                                        map.setZoom(15);
                                        map.setCenter(mapMarker.getPosition());
                                    }
                                })(mapMarker));

                                google.maps.event.addListener(mapMarker, 'dblclick', (function () {
                                    return function () {
                                        scope.goToFacility(marker);
                                    }
                                })());
                            });
                        });
                }
            },
            controller: function ($scope, $state, $http) {
                $scope.httpService = $http;
                $scope.goToFacility = function (selectedLocation) {
                    $state.go('facility', {facilityInfo: selectedLocation});
                }
            }
        };
    }]);







