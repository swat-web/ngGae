angular.module('GAE-example', [])
/**
 * controller for initialize google auth factory
 */
    .controller('AuthCtrl', ['$rootScope', '$window', '$scope', 'GapiService', function($rootScope, $window, $scope, GapiService) {
        $scope.isAuth = false;
        $window.init = function() {
            GapiService.setClientId('226518157703-ci162kg5egku86q9nihjiuevrpjn7g8e.apps.googleusercontent.com');
            GapiService.setScopes('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me');
            GapiService.setImmediate(true);
            GapiService.init("client", "https://webtevacontrol.appspot.com/_ah/api").then(function() {
                $rootScope.load++;//for progress bar
                console.log('init completed');
                if(GapiService.getLoginStatus() == false)
                    GapiService.auth().then(function() {
                        $rootScope.load++;
                        console.log('auth completed');
                        $scope.isAuth = true;
                        $rootScope.$broadcast("auth", {status: "success"});
                    });
            })
        };
    }]);