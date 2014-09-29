var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function getTrips(e) {
        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            if (states[networkState] == 'No network connection') {
                alert('Please check your device connection and try again.');
            }
            else
            {
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
                    console.log(model.trips);
                    alert(JSON.stringify(data));
                },
                function (error) {
                    alert(JSON.stringify(error));
                });

            }
        }

         checkConnection();

       

    }



    scope.watchMode = {
        getTrips: getTrips
    }







}(app.viewmodels));