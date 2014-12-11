angular.module('GAE-example', ['ngGae'])
/**
 * controller for initialize google auth factory
 */
    .controller('AuthCtrl', ['$rootScope', '$window', '$scope', 'ngGae', function($rootScope, $window, $scope, ngGae) {
        $scope.isAuth = false;
        $window.init = function() {
            ngGae.setClientId('YOUR_CLIENT_ID');
            ngGae.setScopes('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me');
            ngGae.setImmediate(true);
            ngGae.init("client", "https://YOURDOMAIN.appspot.com/_ah/api").then(function() {
                console.log('init completed');
                if(ngGae.getLoginStatus() == false)
                    ngGae.auth().then(function() {
                        console.log('auth completed');
                        $scope.isAuth = true;
                        $rootScope.$broadcast("auth", {status: "success"});
                    });
            })
        };
    }]);