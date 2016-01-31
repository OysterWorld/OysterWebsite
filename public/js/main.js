
(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});
			
		// Initialize wowjs
			new WOW().init();

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Form Submission
			$(document).ready(function() {
		        var form = $('#contact-us'),
		        	popup = $('#confirmation-popup'),
		        	popupContainer = $('#confirmation-popup-container'),
		        	popupClose = $('#confirmation-popup-close'),
		        	successMessage = $('<p><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><title>checkmark-circle</title><desc>Email sent successfully.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#7AB800" cx="21" cy="21" r="21" /><path d="M11.9 21.8L18 28 33.2 12.7" stroke="#FFFFFF" stroke-width="2" /></g></svg><span>Thank you. Your message has been successfully sent. We love hearing from you! We will look over your message and get back to you as soon as possible.</span></p>'),
		        	errorMessage = $('<p><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="imgView" x="0px" y="0px" width="256" height="256" viewBox="0 0 106.06 106.06" style="display: block;" xml:space="preserve" class="detail convertSvgInline replaced-svg" data-id="42833" data-kw="sad37" fill="#000000"><g><path d="M15.516,15.512C-5.172,36.199-5.17,69.857,15.518,90.547c20.682,20.685,54.341,20.685,75.027-0.005   c20.687-20.685,20.685-54.341,0.002-75.023C69.859-5.172,36.2-5.172,15.516,15.512z M84.757,84.758   c-17.494,17.493-45.96,17.495-63.455,0.003c-17.498-17.498-17.496-45.967,0-63.461C38.797,3.807,67.261,3.805,84.759,21.302   C102.253,38.795,102.251,67.264,84.757,84.758z M77.017,74.001c0.658,1.521-0.042,3.286-1.562,3.944   c-1.521,0.659-3.286-0.042-3.944-1.562c-2.893-6.689-9.73-11.013-17.421-11.013c-7.868,0-14.747,4.32-17.522,11.006   c-0.479,1.152-1.596,1.85-2.771,1.851c-0.384,0-0.773-0.074-1.15-0.23c-1.53-0.637-2.255-2.393-1.62-3.922   c3.71-8.932,12.764-14.703,23.063-14.703C64.174,59.371,73.174,65.113,77.017,74.001z M33.193,40.06l-2.585,0.833   c-1.654,0.533-3.428-0.375-3.961-2.029c-0.533-1.654,0.376-3.427,2.03-3.96l12.728-4.104c1.654-0.531,3.427,0.377,3.96,2.031   c0.48,1.488-0.215,3.065-1.564,3.756c2.316,2.43,2.286,6.274-0.098,8.658c-2.421,2.421-6.349,2.421-8.771-0.002   C33.517,43.828,32.954,41.901,33.193,40.06z M80.368,38.674c-0.533,1.654-2.308,2.563-3.961,2.029l-2.585-0.833   c0.238,1.842-0.324,3.769-1.738,5.183c-2.423,2.423-6.351,2.423-8.771,0.002c-2.385-2.384-2.414-6.229-0.099-8.658   c-1.349-0.69-2.044-2.268-1.563-3.756c0.532-1.654,2.306-2.563,3.96-2.031l12.728,4.104C79.992,35.247,80.902,37.02,80.368,38.674z" style="" fill=""></path></g></svg><span>Oops! Something went wrong. Please try again later.</span></p>');

			    $(form).submit(function(event) {
			        var data = {};
					data.firstName = $('input[name=firstName]').val();
		            data.lastName = $('input[name=lastName]').val();
		            data.email = $('input[name=email]').val();		            
		            data.comment = $('textarea[name=comment]').val();
			        
					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
	                    url: $(form).attr('action'),						
	                    success: function(data) {
	                        $(popup).addClass('is-visible');
	                        $(popupContainer).append(successMessage);
	                        $(form)[0].reset();
	                    },
	                    error: function() {
	                        $(popup).addClass('is-visible');
	                        $(popupContainer).append(errorMessage);
					    }
	                });

			        event.preventDefault();

			        $(popupClose).click(function () {
                        $(popup).removeClass('is-visible');
        			});
			    });
			});
	
	});

})(jQuery);
