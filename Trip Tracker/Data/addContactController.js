var app = app || {};
(function (scope) {
    
   scope.addContact = kendo.observable({

        name: 'Vanko',
        save: function () {
            var person = navigator.contacts.create({
                displayName: this.get('name')
            });
            person.save();
            console.log('saved');
        }

    });

   // scope.addContact.save();
    console.log(navigator.contacts);
    
}(app));