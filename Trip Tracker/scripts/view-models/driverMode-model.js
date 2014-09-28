var app = app || {};
app.viewmodels = app.viewmodels || {};




(function (scope) {
    var applicationSettings = {
        apiKey: 'DW6AEjXKXlIKroMU'
    };
    var el = new Everlive({
        apiKey: applicationSettings.apiKey
    });

    scope.driverMode = kendo.observable({
        title: 'Start your trip here',
        tripTitle: '',
        from: '',
        to: '',
        tripDescription: '',
        date: '',
        tripType: '',
        tripImage: '',
        tripId: '3',
        freePlaces: 0,

        getInfo: function () {       
              
            var observableObject = new kendo.data.ObservableObject({
                'TripTitle': this.get('tripTitle'),
                'From': this.get('from'),
                'To': this.get('to'),
                'Content': this.get('tripDescription'),
                'Date': this.get('date'),
                'TripType': this.get('tripType'),
                'TripImage': this.get('tripImage'),
                'FreePlaces': this.get('freePlaces')
            });
           

            var data = el.data('Trip');
             
            data.create(observableObject, onSuccess, onError);
            
               function onSuccess (data) {
                 //   alert(JSON.stringify(data));
                scope.driverMode.tripId = data.result.Id;
                 // console.log(scope.driverMode.tripId);       
                };
            
            function onError(error) {
                    alert(JSON.stringify(error));
                };
        },

        addImage: function () {
            var success = function (data) {
                var picture =  {
                    Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                    ContentType: "image/jpeg",
                    base64: data
                };
             
                el.Files.create(picture);
                scope.driverMode.tripImage = picture.Filename;
                 alert('The trip image successfully added.');
            };
            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };
            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };
            navigator.camera.getPicture(success, error, config);
        }
      
        //


        //TODO
        //function loadPhotos() {
        //    everlive.Files.get().then(function (data) {
        //        var files = [];
        //        data.result.forEach(function (image) {
        //            files.push(image.Uri);
        //        });
        //        $("#images").kendoMobileListView({
        //            dataSource: files,
        //            template: "<img src='#: data #'>"
        //        });
        //    });
        //}
        //
        //
    });
    
      
       


}(app.viewmodels));