if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Help your friends find a match.";
  };

  Template.hello.events({
    'click input': function () {
      // This is just sample code that we haven't deleted yet.
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_friends','friends_events', 'friends_location', 'friends_about_me'],
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
