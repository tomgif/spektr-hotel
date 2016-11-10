(function ($) {

	$('.js-fullscreen').click(function(){
		$('.b-page').toggleClass('is-full');
	});

	var magicLine = {
		init: function(){
			//из-за проблемы отображения
			//скрипт стартует до того как шрифт загружен
			fontSpy("MyriadProRegular", {
				success: magicLine.make //отработает только если шрифт загружен
			});
		},
		make: function(){
			var $el, leftPos, newWidth, $mainNav = $(".b-menu--top");
			
			$mainNav.append("<div class='b-menu__border'></div>");
			
			var $magicLine = $(".b-menu__border");

		    $magicLine
		        .width($(".is-selected").outerWidth())
		        .css("left", $(".is-selected").position().left)
		        .data("origLeft", $magicLine.position().left)
		        .data("origWidth", $magicLine.outerWidth());
		        
		    $(".b-menu--top .b-menu__item").hover(function() {
		        $el = $(this);
		        leftPos = $el.position().left;
		        newWidth = $el.outerWidth();
		        $magicLine.stop().animate({
		            left: leftPos,
		            width: newWidth,
		        });
		    }, function() {
		        $magicLine.stop().animate({
		            left: $magicLine.data("origLeft"),
		            width: $magicLine.data("origWidth"),
		        });    
		    });
		}
	};

	$(function () {

		magicLine.init();

		$(".js-scrollbar").mCustomScrollbar({
			theme: "rounded-dark",
			mouseWheelPixels: 200,
			advanced: {
				updateOnContentResize: true
			}
		});

		$('.js-more').click(function(e){
			e.preventDefault();
			var container = $(this).parents('.js-slide')
			
			container.toggleClass('is-visible');

			var index = $(e.currentTarget).attr('data-handler');

			if ($('.is-visible').length) {
				$('.js-slide:not(.is-visible)').toggleClass('is-hidden');
				$('.js-footer, .weather--content').fadeOut("fast", function(){
					if (index)
						$('.js-scrollbar').mCustomScrollbar("scrollTo", $('.js-slide h2').eq(index), "top");
				});
			}else{
				$('.js-slide').removeClass('is-hidden');
				$('.js-footer, .weather--content').fadeIn();
			}
		});

		$('.js-slide h2').click(function(){
			var more = $(this).parents('.js-slide').find('.js-more');
			var o = $(this).index('h2');
			$(more).attr('data-handler',o);
			$(more).click();
		});
	});
})(jQuery);