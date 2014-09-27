var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    scope.driverMode = kendo.observable({
        title: 'Start your trip here',
        tripTitle: '',
        from: '',
        to: '',
        tripDescription: '',
        date: '',
        tripType: '',

        getInfo: function () {
           console.log(this.get('date'))
            var observableObject = new kendo.data.ObservableObject({
                'TripTitle': this.get('tripTitle'),
                'From' : this.get('from'),
                'To': this.get('to'),
                'Content' : this.get('tripDescription'),
                'Date' : new Date(this.get('date')),
                'TripType' : this.get('tripType'),
                
            });
             var applicationSettings = {
        apiKey: 'DW6AEjXKXlIKroMU'
    };
   
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