'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$resource',
	function($scope, Authentication,$resource) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.events = [{name:'None :('}];

        // Find a list of Events
        $scope.Events = $resource('events/:eventId', { eventId: '@_id'
    });
        $scope.events = $scope.Events.query();
        //TODO at one point: bots
        $scope.dateString = function (date) {
            return new Date(date).toDateString();  
        };
	}                                                  
]);
