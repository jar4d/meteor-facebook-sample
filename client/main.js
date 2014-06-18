if (Meteor.isClient) {

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['public_profile', 'email', 'user_friends']
    }
  });

  Template.home.events({
    'click #btn-user-data': function(e) {
      Meteor.call('getUserData', function(err, data) {
        $('#result').text(JSON.stringify(data, undefined, 4));
      });
    }
  });

  Template.header.helpers({
    profilePic: function() {
      return Meteor.user().profile.picture;
    }
  });

  Template.profile.helpers({
    getName: function() {
      return Meteor.user().profile.name;
    },
    getEmail: function() {
      return Meteor.user().services.facebook.email;
    },
    getGender: function() {
      return Meteor.user().services.facebook.gender;
    }
  });


}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var fbgraph = Meteor.require('fbgraph');
    console.log(fbgraph);
  });
}
