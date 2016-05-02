// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'findController'
      }
    }
  })

  .state('item-view', {
      url: '/item',
      templateUrl: 'templates/item-view.html',
      controller: 'itemController',
      params: {obj: [null]}
    })

  .state('tab.publish', {
    url: '/publish',
    views: {
      'tab-publish': {
        templateUrl: 'templates/tab-publish.html',
        controller: 'publishController'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'accountController'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'settingsController'
      }
    }
  })

  .state('tab.contact', {
      url: '/settings/contact',
      views: {
        'tab-settings': {
          templateUrl: 'templates/contact-view.html',
          controller: 'settingsController'
        }
      }
  })

  .state('tab.terms', {
      url: '/settings/terms',
      views: {
        'tab-settings': {
          templateUrl: 'templates/terms-view.html',
          controller: 'settingsController'
        }
      }
  })

  .state('tab.login', {
      url: '/settings/login',
      views: {
        'tab-settings': {
          templateUrl: 'templates/login-view.html',
          controller: 'loginController'
        }
      }
  })

  .state('tab.signup', {
      url: '/settings/signup',
      views: {
        'tab-settings': {
          templateUrl: 'templates/signup-view.html',
          controller: 'signupController'
        }
      }
  })


  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    });

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
