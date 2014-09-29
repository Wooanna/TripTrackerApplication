var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function show(e) {
        var options = new ContactFindOptions();

        options.multiple = true;

        function onSuccess(contacts) {

            var model = {
                title: 'Invite people to watch your trip',
                contactList: contacts,
            };
            var vm = kendo.observable(model);

            kendo.bind(e.view.element, vm);
            //for (var i = 0; i < contacts.length; i++) {
            //    console.log(contacts[i].id+' '+contacts[i].displayName);
            //}
        };

        function onError(contactError) {
            alert('Error: ' + JSON.stringify(contactError));
        };

        var fields = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.emails
        ];

        navigator.contacts.find(fields, onSuccess, onError, options);
    }



    function doneAdding(e) {
        var $inputs = $('input[type=checkbox]:checked');
        var peopleToAdd = [];

        for (var i = 0; i < $inputs.length; i++) {
            // console.log($inputs[i].id);
            peopleToAdd.push($inputs[i].id);
        }

        var applicationSettings = {
            apiKey: 'DW6AEjXKXlIKroMU'
        };
        var el = new Everlive({
            apiKey: applicationSettings.apiKey
        });


        var data = el.data('Trip');
        
        console.log(app.viewmodels.driverMode.TripId);
        data.updateSingle({ Id: app.viewmodels.driverMode.tripId, 'SubscribedNames': peopleToAdd },
     function (data) {
         alert(JSON.stringify(data));
     },
     function (error) {
         alert(JSON.stringify(error));
     });

        function onSuccess(data) {
            scope.driverMode.tripId = data.result.Id;
        };

        function onError(error) {
            alert(JSON.stringify(error));
        };

        console.log(peopleToAdd);
    }


    scope.invitePeopleModeShow = {
        show: show,
        doneAdding: doneAdding
    };

}(app.viewmodels));