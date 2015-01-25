'use strict';

//1
angular.module('events').config(['$stateProvider',
	function($stateProvider) {
		// Events state routing
		$stateProvider.
		state('listEvents', {
			url: '/events',
			templateUrl: 'modules/events/views/list-events.client.view.html'
		}).
		state('createEvent', {
			url: '/events/create',
			templateUrl: 'modules/events/views/create-event.client.view.html'
		}).
		state('viewEvent', {
			url: '/events/:eventId',
			templateUrl: 'modules/events/views/view-event.client.view.html'
		}).
		state('editEvent', {
			url: '/events/:eventId/edit',
			templateUrl: 'modules/events/views/edit-event.client.view.html'
		}). 
        state('listEventsByUser', {
            url: '/events/user/:userId',
            templateUrl: 'modules/events/views/list-events-by-user.client.view.html'
        }).
        state('listEventsByCategory', {
            url: '/events/category/:category',
            templateUrl: 'modules/events/views/list-events-by-category.client.view.html'
        });
	}
]);
