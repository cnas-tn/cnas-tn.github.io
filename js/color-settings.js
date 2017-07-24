(function ($) {
    "use strict";

    $('.color-trigger').on('click', function () {
        $(this).parent().toggleClass('visible-palate');
    });
	
	//Primary Color
	$('.color-palate .primary-color-list .palate').on('click', function() {
		var PrimarynewThemeColor = $(this).attr('data-theme-file');
		var PrimarytargetCSSFile = $('link[id="primary-color-file"]');
	   $(PrimarytargetCSSFile).attr('href',PrimarynewThemeColor);
	   $('.color-palate .primary-color-list .palate').removeClass('active');
        $(this).addClass('active');
	});
	
	//Secondary Color
	$('.color-palate .secondary-color-list .palate').on('click', function() {
		var SecondarynewThemeColor = $(this).attr('data-theme-file');
		var SecondarytargetCSSFile = $('link[id="secondary-color-file"]');
	   $(SecondarytargetCSSFile).attr('href',SecondarynewThemeColor);
	   $('.color-palate .secondary-color-list .palate').removeClass('active');
        $(this).addClass('active');
	});


}(jQuery));