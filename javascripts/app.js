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

	$('.hover_example_box').hover(function(){
			$(this).html('BRAH!');
		},function() {
			$(this).html('SICK!');
		}
	);


	$('#sidebar').width(($('#sidebar_container').width()-30));

	$(window).resize(function() {
		$('#sidebar').width(($('#sidebar_container').width()-30));
	});

});