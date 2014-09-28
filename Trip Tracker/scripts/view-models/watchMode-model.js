var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function getTrips(e) {
  
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



    scope.watchMode = {
        getTrips: getTrips
    }







}(app.viewmodels));