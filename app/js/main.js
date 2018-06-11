require.config({
  paths: {
    'angular': '../bower_components/angular/angular.min',
    'angular-route': '../bower_components/angular-route/angular-route.min',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'WdatePicker': '../lib/WdatePicker/WdatePicker',
    'MD5': '../lib/md5'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-cookies': {
      deps: ['angular']
    },
    'jquery': {
      exports: 'jquery'
    },
    'WdatePicker': {
      exports: 'WdatePicker'
    },
    'MD5': {
      exports: 'MD5'
    }
  }
});

require(['./app'], function() {
  angular.bootstrap(document, ['app']);
});
