Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    options.profile.picture = getFbPicture(user.services.facebook.accessToken);
    user.profile = options.profile;
  }
  return user;
});

// Save the profile pic to the user object
var getFbPicture = function(accessToken) {
  var result;
  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: accessToken,
      fields: 'picture'
    }
  });
  if (result.error) {
    throw result.error;
  }
  return result.data.picture.data.url;
};

// Initiate FB
function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    console.log('Successful call to the Facebook Open Graph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}

Facebook.prototype.getProfilePic = function() {
    return this.query('me/picture?height=40&width=40');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
    getProfilePic: function() {
        var pic = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = pic.getProfilePic();
        console.log('getProfilePic information retrieved');
        return data;
    }
});
