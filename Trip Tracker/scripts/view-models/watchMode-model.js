var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function getTrips(e) {
        function checkConnection() {

            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.NONE] = 'No network connection';

            if (states[networkState] == 'No network connection') {
                alert('Please check your device connection and try again.');
            } else {

                var applicationSettings = {
                    apiKey: 'DW6AEjXKXlIKroMU'
                };
                var el = new Everlive({
                    apiKey: applicationSettings.apiKey
                });

                var data = el.data('Trip');
                data.get()
                    .then(function (data) {
                            var model = {
                                title: 'Watch trips',
                                trips: data,

                            };
                            var vm = kendo.observable(model);
                            kendo.bind(e.view.element, vm);
                            window.allTrips = data.result;
                        },
                        function (error) {
                            alert(JSON.stringify(error));
                        });
            }

        }

        checkConnection();

    }

    function showTrips() {
        var tripsForCurrentUser = [];

        var userName = $('#userDisplayName').val();
        if (userName == '' || userName == null) {
            alert('Your name must be more than 0 symbols.');
        } else {

            for (var trip in window.allTrips) {
                for (var prop in window.allTrips[trip]) {
                    if (prop == 'SubscribedNames') {
                        var subscribedForCurrentTrip = window.allTrips[trip][prop];

                        for (var subscribedName in subscribedForCurrentTrip) {
                            if (subscribedForCurrentTrip[subscribedName] == userName) {
                                tripsForCurrentUser.push( window.allTrips[trip]);
                               
                            }
                        }
                    }
                }
            }

        }

    }

    scope.watchMode = {
        getTrips: getTrips,
        showTrips: showTrips
    }

}(app.viewmodels));