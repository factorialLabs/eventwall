'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Events',
	function($scope, $stateParams, $location, Authentication, Events) {
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
            console.log($scope.events);
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
	}
   //Filter based off a8m's groupBy filter
]).filter('groupByDate', [ '$parse', 'filterWatcher', function ( $parse, filterWatcher ) {
    return function (collection, property) {

      if(!isObject(collection) || isUndefined(property)) {
        return collection;
      }

      var getterFn = $parse(property);

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

        forEach( collection, function( elment ) {
          var elm = new Date(elment).toDateString;
          prop = getter(elm);

          if(!result[prop]) {
            result[prop] = [];
          }
          result[prop].push(elm);
        });
        return result;
      }
    }
 }]);
