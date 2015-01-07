'use strict';

// Configuring the Articles module
angular.module('events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Events', 'events', 'dropdown', '/events(/create)?');
		Menus.addSubMenuItem('topbar', 'events', 'Upcoming Events', 'events');
		Menus.addSubMenuItem('topbar', 'events', 'Create an Event', 'events/create');
	}
]);