Router.map(function() {
  this.route('home', {
    path: '/',
    layoutTemplate: 'layout'
  });
  this.route('profile', {
    path: '/profile'
  });
});
