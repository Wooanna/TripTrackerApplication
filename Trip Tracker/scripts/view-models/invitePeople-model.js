var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    scope.invitePeopleMode = kendo.observable({
        title: 'Invite people to watch your trip',
        contactList: [],
        invite: function () {

            var options = new ContactFindOptions();
            
            options.multiple = true;

            var fields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            navigator.contacts.find(fields, onSuccess, onError, options);
        }

    });

    //Extract all contacts
    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
        scope.invitePeopleMode.contactList = contacts;
    };


    function onError(contactError) {
        alert('Error: ' + JSON.stringify(contactError));
    };

}(app.viewmodels));