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

Facebook.prototype.getUserFriends = function() {
    return this.query('me/friends?fields=id,name,relationship_status,political,religion,work,languages,hometown,favorite_teams,education,birthday');
}

Facebook.prototype.searchFB = function() {
    return this.query('search?type=user&q=Josh+Campoverde');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    }, 
    getUserFriends: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserFriends();
        return data;
    },
    searchFB: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var result = fb.searchFB();
        return result;
    }
});
