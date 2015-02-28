'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$resource',
	function($scope, Authentication,$resource) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.events = [{name:'None :('}];

        // Find a list of Events
        $scope.Events = $resource('events/:eventId', { eventId: '@_id'
    });
        $scope.events = $scope.Events.query({limit:24});
        //TODO at one point: bots
        
        // For an event, checks to see if the start date is the same as the end date.
        // Returns true/false
        $scope.isOneDayEvent = function (event){
            if (event !== undefined){
                var startDate = new Date(event.datetime_start).toDateString();
                var endDate = new Date(event.datetime_end).toDateString();
                return (startDate === endDate);
            }
        };
	}                                                  
]);
