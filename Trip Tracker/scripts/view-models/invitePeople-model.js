var app = app || {};
app.viewmodels = app.viewmodels || {};

(function(scope){
    scope.invitePeopleMode = kendo.observable({
        title: 'Invite people to watch your trip',
        contacts: [{
            displayName: "ChichoGosho"
        },
                  {
            displayName: "ChichoPesho"
        }]
                 
    });
    
}(app.viewmodels));