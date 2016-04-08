'use strict';

var HomeView = require('./views/HomeView.js');

var $ = window.$ = window.jQuery = require('jquery');

$(document).on('ready', function() {
	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});
});


var homeView = new HomeView();
$('#content').html(homeView.render().el);


