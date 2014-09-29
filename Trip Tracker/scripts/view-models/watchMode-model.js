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
        console.log(userName);
        if (userName == '' || userName == null) {
            alert('Your name must be more than 0 symbols.');
        } else {

            for (var trip in window.allTrips) {
                for (var prop in window.allTrips[trip]) {
                    if (prop == 'SubscribedNames') {
                        var subscribedForCurrentTrip = window.allTrips[trip][prop];

                        for (var subscribedName in subscribedForCurrentTrip) {
                            if (subscribedForCurrentTrip[subscribedName] == userName) {
                                tripsForCurrentUser.push(window.allTrips[trip]);

                            }
                        }
                    }
                }
            }

        }

        $('#tripsByTheUser').kendoMobileListView({
            dataSource: tripsForCurrentUser,
            template: '<li><div  class="chosenTrips" >#: data.TripTitle#</div> </li>'
        });

        $('div.chosenTrips').click(function () {
            var title = $(this).text();
            $(this).css('color', 'blue');
            console.log(title);

            for (var trip in tripsForCurrentUser) {
                for (var prop in tripsForCurrentUser[trip]) {
                    if (tripsForCurrentUser[trip][prop] == title) {
                        var chosenTrip = tripsForCurrentUser[trip];
                        var chosenAsArray = [];
                        chosenAsArray.push(chosenTrip);

                        $('#singleTripContainer').kendoMobileListView({
                            dataSource: chosenAsArray,
                            template: '<li><h2><strong>#: data.TripTitle#</strong></h2>   <br /><span><strong>From: </strong> #: data.From# - <strong>To: </strong> #: data.To#</span>  <br /> <span><strong>Date: </strong>: #: data.Date#</span>   <br /> <p><strong>Description: </strong>   <br /> #: data.Content#</p></li>'
                        });

                        loadPhotos();

                        function loadPhotos() {
                            var applicationSettings = {
                                apiKey: 'DW6AEjXKXlIKroMU'
                            };
                            var el = new Everlive({
                                apiKey: applicationSettings.apiKey
                            });

                            el.Files.get().then(function (data) {
                                for (var image in data.result) {
                                    //console.log(data.result[image]);
                                    if (data.result[image].Filename == chosenTrip.TripImage) {
                                        console.log('img found')
                                        $('#tripImage').attr('src', data.result[image].Uri);
                                        console.log(data.result[image].Uri)
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });

    }
    scope.watchMode = {
        getTrips: getTrips,
        showTrips: showTrips,
    }

}(app.viewmodels));