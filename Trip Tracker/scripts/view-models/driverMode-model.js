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
                tripId: '',
                freePlaces: 0,
               
              getInfo: function () {
                    if (this.get('tripTitle') == '' || this.get('from') == '' || this.get('to') == '' || this.get('date') == ''){
                        alert("Fields for Trip title, From, To and Date are required!");
                        
                    }
                    else {
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

                        function checkConnection() {
                            var networkState = navigator.connection.type;

                            var states = {};
                          
                            states[Connection.NONE] = 'No network connection';
                            if (states[networkState] == 'No network connection') {
                                alert('Please check your device connection and try again.');
                            } else {

                                var data = el.data('Trip');
                                data.create(observableObject, onSuccess, onError);

                                function onSuccess(data) {
                                    scope.driverMode.tripId = data.result.Id;
                                };

                                function onError(error) {
                                    alert(JSON.stringify(error));
                                };
                            }
                        }
                        checkConnection();
                    }
                },

                    addImage: function () {
                        var success = function (data) {
                            var picture = {
                                Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                                ContentType: "image/jpeg",
                                base64: data
                            };

                            el.Files.create(picture).then(function (picture) {
                                var idPic = picture.result.Id;
                                var namePic = picture.result.Filename;

                                window.pictureIdName.push({
                                    filename: namePic,
                                    id: idPic
                                });
                               
                            });
                            scope.driverMode.tripImage = picture.Filename;
                            navigator.vibrate();
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

                });

        }(app.viewmodels));