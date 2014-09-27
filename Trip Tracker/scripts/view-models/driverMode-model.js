var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    scope.driverMode = kendo.observable({
        title: 'Start your trip here',
        tripTitle: '',
        from: '',
        to: '',
        tripDescription: '',
        getInfo: function () {
            // console.log(this.get('tripTitle'));
            //  console.log(this.get('from'));
            //  console.log(this.get('to'));
            //  console.log(this.get('tripDescription'));
            var observableObject = new kendo.data.ObservableObject({
                'TripTitle': this.get('tripTitle'),
                'From' : this.get('from'),
                'To': this.get('to'),
                'Content' : this.get('tripDescription'),
                
            });
             var applicationSettings = {
        apiKey: 'DW6AEjXKXlIKroMU'
    };
    // initialize Icenium Everlive SDK
    var el = new Everlive({
        apiKey: applicationSettings.apiKey
    });
            var data = el.data('Trip');
data.create(observableObject,
    function(data){
        alert(JSON.stringify(data));
    },
    function(error){
        alert(JSON.stringify(error));
    });
        }

    });

}(app.viewmodels));