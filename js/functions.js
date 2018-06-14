(function ($) {


	// Preload
    $(window).on("load", function (){  // loads entire site
		'use strict';
		$('[data-loader="circle-side"]').fadeOut(); 
		$('#preloader').delay(350).fadeOut('slow'); 
		$('body').delay(350).css({
			'overflow': 'visible'
		});
		var $hero= $('.hero_home .content');
		var $hero_v= $('#hero_video .content ');
		$hero.find('h3, p, form').addClass('fadeInUp animated');
		$hero.find('.btn_1').addClass('fadeIn animated');
		$hero_v.find('.h3, p, form').addClass('fadeInUp animated');
		$(window).scroll();
	})

})(window.jQuery);