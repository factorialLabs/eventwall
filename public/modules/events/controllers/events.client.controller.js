'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Events', 'Users', '$filter', '$http',
	function($scope, $stateParams, $location, Authentication, Events, Users, $filter, $http) {
		$scope.authentication = Authentication;
        $scope.currentPage = 1;
        
        //Get list of category enums
        $http.get('/categories').
          success(function(data, status, headers, config) {
            $scope.categoriesList = data;
          }).
          error(function(data, status, headers, config) {
        });


		// Create new Event
		$scope.create = function() {

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

			// Redirect to the created event after save
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

            // Set the edited time to now.
            event.edited = new Date();

            //Redirect to updated event.
			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        // Watches $scope.currentPage for the paginator.
        $scope.$watch(function(scope){
            return scope.currentPage
        },
        function(page){
            $scope.find(page);
        });
		// Find a list of Events
		$scope.find = function(page) {
            $scope.category = $stateParams.category;

            $scope.results = Events.get({
                limit: 20,
                page: page-1,
                userId: $stateParams.userId,
                category: $stateParams.category
            },function(event){
                $scope.events = event.results;
                $scope.totalEvents = event.items;
                console.log($scope.totalEvents);
            });
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
      /**
       * groupByDate function
       * @param collection - promise containing an array of unordered events
       * @param getter - a function that returns the date property of an event.
       * @returns sorted by datetime_start: {{date1:[event1, event2], date2:[event3, event4], ...}}
       */

      function _groupByDate(collection, getter) {
        var result = {};
        var prop;

        // Puts each event into a JSON object with:
        // keys - Dates
        // values - array of events that occurs on the day as indicated in the key.
        angular.forEach( collection, function( element ) {

            //If the event is multi-day and the start date is earlier than today, set the date/displayDate as today for grouping.
            if (new Date(element.datetime_start) < new Date()){
                element.date = new Date().toLocaleDateString();
                element.displayDate = new Date();
            }
            //Otherwise we'll set date/displayDate as the event's start date.
            else{
                element.date = new Date(element.datetime_start).toLocaleDateString();
                element.displayDate = new Date(element.datetime_start);
            }

            // In order to get the date format into MM/DD/YYYY, we pad extra 0s.

            // Pad 0 before month
            if (element.date.indexOf('/') === 1){
                element.date = '0' + element.date;
            }
            // Pad 0 before date
            if (element.date.lastIndexOf('/') - element.date.indexOf('/') < 3){
                element.date = element.date.slice(0, element.date.indexOf('/')+1) + '0' +
                    element.date.charAt(element.date.lastIndexOf('/')-1) + element.date.slice(element.date.lastIndexOf('/'));
            }
          prop = getter(element); // Gets Date in String format.

            //Creates an array for the date if it doesn't already exist.
          if(!result[prop]) {
            result[prop] = [];
          }

            //Pushes the current event onto the correct date in the array.
          result[prop].push(element);
        });

          // Sort the object chronologically by keyand return
          return sortObjectByKey(result);
      }

        // Invalid collection or property, returns the collection.
      if(!angular.isObject(collection) || angular.isUndefined(property)) {
        return collection;
      }

      var getterFn = $parse('date');

      return filterWatcher.isMemoized('groupByDate', arguments) ||
        filterWatcher.memoize('groupByDate', arguments, this,
          _groupByDate(collection, getterFn));
    };
 }]);

// Sorts the object by key.
var sortObjectByKey = function(object){
    var keys = [];
    var sorted = {};

    for(var key in object){
        if(object.hasOwnProperty(key)){
            keys.push(key);
        }
    }

    keys.sort();

    angular.forEach(keys, function(key){
        sorted[key] = object[key];
    });

    return sorted;
};
