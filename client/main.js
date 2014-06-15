if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Help your friends find a match.";
  };

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email', 'user_friends','friends_events', 'friends_location', 'friends_about_me'],
    }
  });

  Template.home.events({
      'click #btn-user-data': function(e) {
          Meteor.call('getUserData', function(err, data) {
               console.log('getUserData fired');
               console.log('data: ' + data);
               $('#result').text(JSON.stringify(data, undefined, 4));
           });
      }
  });

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
