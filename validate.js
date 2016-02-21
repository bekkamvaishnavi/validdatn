'use strict';

angular.module('vkApp')
  .service('Validate', function Validate($rootScope) {

    this.service = function(json) {
      var obj = JSON.parse(json);
      //error message json
      //{"response": {"code": 1,"error": {"message" : "The valve already exists."}}}
      if(obj.response.status >= 200 && obj.response.status < 400 || obj.response.code < 1){
  	      return obj.response.result;    		  
      } else  {
        console.log('service error', obj.response.code, ':', obj.response.error.message);
        if(obj && obj.response && obj.response.error){
    		$rootScope.$broadcast('userMessage', {type: 'alert', text: obj.response.error.message});        	
        } /*else {
        	$rootScope.$broadcast('userMessage', {type: 'alert', text: 'Create/Update Operation is successful'});
        }*/
        return {
          error: obj
        };
      }
    };
  });

// Global Error Handling

// 1) First create a 'Validate' service:

// angular.module('<your app name>')
//   .service('Validate', function Validate() {

//   this.service = function(json){
//     var obj = JSON.parse(json);
//     if(obj.response.status >= 200 && obj.response.status < 400){
//       return obj.response.content;
//     } else {
//       console.log('service error', obj);
//       return {
//         error: obj
//       };
//     }
//   };

//   });

// You can put whatever you want in here; I'm validating the status code and
// then returning obj.response.content or the error object. Ultimately you'd
// want this to be more sophisticated, checking for not just the 'status'
// attribute but the format of the response.


// 2) Now you can inject this into your service handler and transform the
// response like so:

// angular.module('<your app name>')
//   .factory('Users', function($resource, Validate) {
//     var serviceUrl = 'api/user/:id';

//     return $resource(serviceUrl, {}, {
//       'read' :  {
//         method: 'GET',
//         isArray: true,
//         transformResponse: Validate.service
//       }
//     });

//   });

// See how it's calling the 'service' method on the Validate handler? You
// could put other methods in there for validating other stuff. For example
// you could write a 'transformTimestampsToObjects' which would look for
// 'timestamp' attributes and turn them into javascript Date objects:


// transformResponse: Validate.transformTimestampsToObjects(Validate.service)


// 3) Finally, in your controllers you do something like:

// angular.module('<your app name>')
//   .controller('AdminCtrl', function ($scope, Users) {

//     $scope.users = Users.read();

//   });

// What I like about this is that it gives you granular control over your
// service handlers, but it's super-easy to inject.
