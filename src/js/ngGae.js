(function(window, angular, undefined) {
    'use strict';

    angular.module('ngGae', [])
        .factory('GapiService', ['$q', function($q) {
            var config = {
                    'client_id': '',//client id from google console
                    'scope': 'https://www.googleapis.com/auth/userinfo.email',
                    'immediate': 'false'
                },
                LoginStatus = false;

            return {
                /**
                 * Config: set google app client ID
                 * @param {string} value - Client ID from your google app
                 */
                setClientId: function(value) {
                    config.client_id = value;
                },
                /**
                 * Config: set scopes for your app
                 * @param {string} value - permissions (scopes) that you request from your user
                 */
                setScopes: function(value) {
                    config.scope = value;
                },
                /**
                 * Config: set immediate mode
                 * @param {boolean} value
                 */
                setImmediate: function(value) {
                    config.immediate = value;
                },
                /**
                 * Get login status
                 * @return {boolean} return login status
                 */
                getLoginStatus: function() {
                    return LoginStatus;
                },
                /**
                 * Signing in user to google account and execute callback functions
                 * @return {object} return promise
                 */
                auth: function() {
                    var deferred = $q.defer();
                    gapi.auth.authorize(config, function() {
                        LoginStatus = true;
                        deferred.resolve(true);
                    });
                    return deferred.promise;
                },

                /**
                 * Initializes the application. It loads all needed libraries
                 * @param {array} endPoints - parameters for gapi.client.load()
                 *
                 * @return {object} return promise
                 */
                init: function(endPoints) {
                    var deferred = $q.defer();
                    var promises = [];
                    angular.forEach( endPoints, function(ep_object){
                        if(ep_object.root) {
                            promises.push(gapi.client.load(ep_object.src, ep_object.version, null, ep_object.root));
                        }else{
                            promises.push(gapi.client.load(ep_object.src, ep_object.version));
                        }
                    });

                    $q.all(promises).then(function(){
                        deferred.resolve();
                    });
                    return deferred.promise;

                }
            };

        }])

})(window, window.angular);

function init() {
    window.ngGae_init();
}