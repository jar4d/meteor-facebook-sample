if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "Help your friends find a match.";
  };

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['public_profile', 'email', 'user_friends']
    }
  });

    Meteor.call('getProfilePic', function(err, data) {
      return Session.set('profilePic', data.location);
    });

  Template.home.events({
    'click #btn-user-data': function(e) {
        Meteor.call('getUserData', function(err, data) {
           $('#result').text(JSON.stringify(data, undefined, 4));
        });
    }
  });

  Template.header.profilePic = function () {
    return Session.get('profilePic');
  }

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var fbgraph = Meteor.require('fbgraph');
    console.log(fbgraph);
  });
}
