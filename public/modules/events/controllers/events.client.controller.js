'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Events','$filter',
	function($scope, $stateParams, $location, Authentication, Events,$filter) {
		$scope.authentication = Authentication;

		// Create new Event
		$scope.create = function() {
			// Create new Event object
			var event = new Events ({
				name: this.name,
                location: this.location,
                category: this.category,
                datetime_start: this.datetime_start,
                datetime_end: this.datetime_end,
                thumbnail: this.thumbnail,
                description: this.description,
                organizer: this.organizer
			});

			// Redirect after save
			event.$save(function(response) {
				$location.path('events/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Event
		$scope.remove = function(event) {
			if ( event ) { 
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events [i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;
            event.edited = new Date();

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Events
		$scope.find = function() {
			$scope.events = Events.query();
            //console.log($scope.events);
		};

		// Find existing Event
		$scope.findOne = function() {
			$scope.event = Events.get({ 
				eventId: $stateParams.eventId
			});
		};
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        //Parses date from a datetime string
        $scope.parseDate = function(datetime){
            return new Date(datetime).toDateString();
        };
        $scope.filterDatetime = function(str){
            var filter = $filter('date')(str, 'shortDate');
            console.log(filter);
            return filter;
        }
        
        
        // For an event, checks to see if the start date is the same as the end date.
        // Returns true/false
        $scope.isOneDayEvent = function (event){
            var startDate = new Date(event.datetime_start).toDateString();
            var endDate = new Date(event.datetime_end).toDateString();
            return (startDate === endDate);
        };
        
        //Checks to see if the current user is the creator of the event.
        //Returns true or false.
        $scope.isCreator = function(event){
            return ($scope.authentication.user && $scope.authentication.user._id === event.user._id);
        };
	}
   //Filter based off a8m's groupBy filter
]).filter('groupByDate', [ '$parse', 'filterWatcher', function ( $parse, filterWatcher ) {
    return function (collection, property) {

      if(!angular.isObject(collection) || angular.isUndefined(property)) {
        return collection;
      }
        //console.log(property);
      var getterFn = $parse('date');

      return filterWatcher.isMemoized('groupBy', arguments) ||
        filterWatcher.memoize('groupBy', arguments, this,
          _groupByDate(collection, getterFn));

      /**
       * groupBy function
       * @param collection
       * @param getter
       * @returns {{}}
       */
      function _groupByDate(collection, getter) {
        var result = {};
        var prop;

        angular.forEach( collection, function( element ) {
          //console.log(element.datetime_start);
          element.date = new Date(element.datetime_start).toDateString();
          prop = getter(element);

          if(!result[prop]) {
            result[prop] = [];
          }
          result[prop].push(element);
        });
        return result;
      }
    }
 }]);
