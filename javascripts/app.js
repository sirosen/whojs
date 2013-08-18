$(document).ready(function() {
	Who.DEV.clearAllInputs();

	$('.run-this').click(function() {
		var _code = $.trim($(this).siblings('pre').text());
		eval(_code);
	});

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 250;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var currentWindowOnload = window.onload;

	window.onload = function() {
		if (currentWindowOnload) {
			currentWindowOnload();
		}
		// document.querySelector('.version').innerHTML = jasmineEnv.versionString();
	};

	function execJasmine() {
		jasmineEnv.execute();
	}

	// Feedback for the hover example.
	$('.hover_example_box').hover(function(){
			$(this).html('BRAH!');
		},function() {
			$(this).html('SICK!');
		}
	);

	$('form').submit(function(e) {
		e.preventDefault();
	});

	// Feedback for the typing enter example.
	$('#typing_enter_example form').submit(function(e) {
		e.preventDefault();
		alert('Submitted!');
	});


	$('#sidebar').width(($('#sidebar_container').width()-30));


	$(window).resize(function() {
		$('#sidebar').width(($('#sidebar_container').width()-30));
		if ($(window).width() < 480) {
			$('#scrolled_logo').hide()
		}
	});

	var _affixed = $('.sidenav').hasClass('affix') || $('.sidenav').hasClass('affix-bottom');
	// _affixed == true ? $('#scrolled_logo').fadeIn() : $('#scrolled_logo').hide();

	$(window).scroll(function() {
		var _widthIsGood = ($(window).width() > 992);
		_affixed = $('.sidenav').hasClass('affix') || $('.sidenav').hasClass('affix-bottom');
		(_affixed && _widthIsGood) ? $('#scrolled_logo').fadeIn() : $('#scrolled_logo').hide();
	});



});