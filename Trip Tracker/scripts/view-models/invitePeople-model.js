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
        };

        function onError(contactError) {
            alert('Error: ' + JSON.stringify(contactError));
        };

        var fields = [
            navigator.contacts.fieldType.id, 
            navigator.contacts.fieldType.displayName, 
            navigator.contacts.fieldType.name
        ];
            
        navigator.contacts.find(fields, onSuccess, onError, options);
    }
    scope.invitePeopleModeShow = {
        show: show
    };
      
   
}(app.viewmodels));