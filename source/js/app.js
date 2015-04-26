/* AngularJS Module */
angular.module('AngularApp', [
    'ngRoute',
    'ui.bootstrap',
    'door3.css',
    'LocalStorageModule'
])
/* AngularJS Configuration */
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
})
/* Navigation Bar Controller */
.controller('NavbarController', ['$scope','$location', function($scope,$location){
    $scope.IsCollapsed = true;
    $scope.Toggle = function() {
        this.IsCollapsed = !this.IsCollapsed;
    };
    $scope.IsActive = function(path) {
        return path === $location.path();
    };
}])
/* Theme Changer Controller */
.controller('ThemeController', ['$scope','$css','localStorageService', function($scope,$css,localStorageService){
    $scope.Themes = {
      cerulean:  { Name: 'Cerulean'  , ID: 'cerulean'  },
      cosmo:     { Name: 'Cosmo'     , ID: 'cosmo'     },
      cyborg:    { Name: 'Cyborg'    , ID: 'cyborg'    },
      darkly:    { Name: 'Darkly'    , ID: 'darkly'    },
      flatly:    { Name: 'Flatly'    , ID: 'flatly'    },
      journal:   { Name: 'Journal'   , ID: 'journal'   },
      lumen:     { Name: 'Lumen'     , ID: 'lumen'     },
      paper:     { Name: 'Paper'     , ID: 'paper'     },
      readable:  { Name: 'Readable'  , ID: 'readable'  },
      sandstone: { Name: 'Sandstone' , ID: 'sandstone' },
      simplex:   { Name: 'Simplex'   , ID: 'simplex'   },
      slate:     { Name: 'Slate'     , ID: 'slate'     },
      spacelab:  { Name: 'Spacelab'  , ID: 'spacelab'  },
      superhero: { Name: 'Superhero' , ID: 'superhero' },
      united:    { Name: 'United'    , ID: 'united'    },
      yeti:      { Name: 'Yeti'      , ID: 'yeti'      },
      bootstrap: { Name: 'Bootstrap' , ID: 'bootstrap' }
    };
    $scope.ChangeTheme = function(theme) {
      if($scope.CurrentTheme.ID !== 'bootstrap') {
        $css.remove('//maxcdn.bootstrapcdn.com/bootswatch/3.3.4/' + $scope.CurrentTheme.ID + '/bootstrap.min.css');
      } else {
        $css.remove('bootstrap-3.3.4-dist/css/bootstrap.min.css');
      }
      $scope.CurrentTheme = $scope.Themes[theme];
      if($scope.CurrentTheme.ID !== 'bootstrap') {
        $css.add('//maxcdn.bootstrapcdn.com/bootswatch/3.3.4/' + $scope.CurrentTheme.ID + '/bootstrap.min.css');
      } else {
        $css.add('bootstrap-3.3.4-dist/css/bootstrap.min.css');
      }
      localStorageService.set('theme',$scope.CurrentTheme.ID);
    };
    var theme = localStorageService.get('theme');
    if(theme === null || theme == 'undefined') {
      theme = 'bootstrap';
    }
    $scope.CurrentTheme = $scope.Themes[theme];
    $scope.ChangeTheme($scope.CurrentTheme.ID);
}])
/* Main Application Controller */
.controller('AppController', ['$scope', function($scope){
    $scope.Application = {
        Name: 'Shawn\'s Angular App Skeleton'
    };
}]);