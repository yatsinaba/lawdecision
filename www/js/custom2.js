
$('.m').on({
    mouseenter: function(e){
        var $target = $(e.currentTarget),
            type = $target.attr('data-type');
        $target.parents('.column-container').find('.mmm.'+type).addClass('active');
    },
    mouseleave: function(e){
        var $target = $(e.currentTarget),
            type = $target.attr('data-type');
        $target.parents('.column-container').find('.mmm.'+type).removeClass('active');
    }
});
$('.mmm').on({
    mouseenter: function(e){
        var $target = $(e.currentTarget),
            type = $target.attr('data-type');
        $target.parents('.column-container').find('.m.'+type).addClass('active');
    },
    mouseleave: function(e){
        var $target = $(e.currentTarget),
            type = $target.attr('data-type');
        $target.parents('.column-container').find('.m.'+type).removeClass('active');
    }
});


var winW,
	winH,
	winS,
	isMobile = false,
	isTablet = false,
	tabletThr = 1024,				// tablet threshold
	mobileThr = 720,				// mobile threshold
	header,							// header
	hH = 55,						// header height
	pR = 4,							// paralax ratio
    timeoutMenu;

$.ajaxSetup({ cache: false }); // Prevents caching

// jQ Easing extension

//jQuery.easing.swing = jQuery.easing.swing;
jQuery.extend( jQuery.easing, {
	def: 'easeOutQuad',
	/*swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},*/
	easeInExpo: function (x, t, b, c, d) {
		return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t===0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});

function initOnLoad() {
	
	//adjustContent();
	slideSwitcher( $("#areas-of-cooperation") );
	formActionHandler( $("#contact-form"), "../php/sendmail.php" );
	if ( !isMobile ) { buildBGParalax( $(".bg-paralax-fx") ); }
	
}

function goGA( event, category, label ) {
	
	// Checking if Analytics is enabled
	if ( typeof(ga) == "function" ) { ga('send', 'event', category, event, label); }
	else { console.log( "goGA: Google Analytics was not initialized properly." ); }
	
}

function initOnReady() {
	
	header = $("#main-header");

    $('.lang').find('a').filter('.active').on({
        click: function(e){e.preventDefault();}
    });

    $('#contact-phone').inputmask({
        "mask": "+38(099) 999-99-99"
    });
}

$(document).on({
	ready: function(){
        getWindowDimensions();
        resizeSectionHeight();
		initOnReady();
        buildNavigationLogoTrigger($("#header-nav"));
	}
});

$(window).on({

	load: function(){
        getWindowDimensions();
	},
	
	resize: function(){

		getWindowDimensions();
		//adjustContent();
        resizeSectionHeight();
        //buildNavigation( $("#header-nav") );

	}
	
});

function windiowScroll(){
    winS = $(window).scrollTop();

    if ( winS >= 100 ) { header.addClass("compact"); }
    else { header.removeClass("compact"); }
}

function getWindowDimensions(){

	winH = $(window).height();
	winW = $(window).width();
    winS = $(window).scrollTop();
	
	if ( winW < tabletThr ) { isTablet = true; } else { isTablet = false; $("body").removeClass("show-nav");}
	if ( winW < mobileThr ) { isMobile = true; } else { isMobile = false; }

}

function resizeSectionHeight() {
    $('section').css({'min-height':winH-56+'px'});
    $('section').filter('#cover').css({'min-height':winH+'px'});
}

function adjustContent(){
	
	// 0. Getting window dimensions
	
	getWindowDimensions();
	
	// 2. Adjusting testimonials slideshow
	
	var liMH = 0,
		ulH = 0;
	
	$("#areas-of-cooperation-container")
		.find("li")
		.each(
			function(){
				var liH = $(this).height();
				if ( liH > liMH ){
					liMH = liH;
					ulH = liMH;
					$("#areas-of-cooperation-container").height( ulH );
				}	
		})
		.each(
			function(){
				var liH = $(this).height();
				
				if ( liH < ulH ) {
					$(this).css({
						top: (ulH-liH)/2
					});
				}
		});	
	
}

function slideSwitcher( slideShow ) {
	
	var description = slideShow.find(".description"),
		slideNavItems = slideShow.find(".slide-nav li.item");
		
	slideNavItems
		.on({
			/*
            click: function(){
				var slideInd = $(this).index()/ 2,
                    oT = $('#areas-of-cooperation').find('.column-container').offset().top;
				slideNavItems.removeClass("current");
				$(this).addClass("current");

                if($(window).width() > 1024) {
                    description
                        .removeClass("current")
                        .fadeOut(300)
                        .delay(300)
                        .eq(slideInd)
                        .addClass("current")
                        .fadeIn(300);
                } else{
                    $("body, html").stop().animate({
                        scrollTop: oT-56
                    },300, "easeInOutExpo");
                    description
                        .removeClass("current")
                        .slideUp(300)
                        .delay(300)
                        .eq(slideInd)
                        .addClass("current")
                        .slideDown(300);
                }

				return false;
			},*/
            mouseenter: function(){
                var slideInd = $(this).index()/ 2,
                    oT = $('#areas-of-cooperation').find('.column-container').offset().top,
                    _this = this;
                clearTimeout(timeoutMenu);

                if($(window).width() > 1024) {
                    timeoutMenu = setTimeout(function(){
                        slideNavItems.removeClass("current");
                        $(_this).addClass("current");
                        description
                            .removeClass("current")
                            .fadeOut(300)
                            .delay(300)
                            .eq(slideInd)
                            .addClass("current")
                            .fadeIn(300);
                    },300);
                } else {
                    timeoutMenu = setTimeout(function(){
                        $("body, html").stop().animate({
                            scrollTop: oT-56
                        },300, "easeInOutExpo");
                        slideNavItems.removeClass("current");
                        $(_this).addClass("current");
                        description
                            .removeClass("current")
                            .slideUp(300)
                            .delay(300)
                            .eq(slideInd)
                            .addClass("current")
                            .slideDown(300);
                    },300);
                }

                return false;
            },
            mouseleave: function() {
                clearTimeout(timeoutMenu);
            }
		});
	
}

function formActionHandler( form, actionURL ){
	
	form.on({
		submit: function(){
			
			$(this).removeClass("sent");
			
			var reqEmpty = $(this).find(".required").filter( function(){ return $(this).val() == "" || $(this).val() == "+38(0__) ___-__-__"; }),
				data = "";
				
			$(this).find(".invalid").removeClass("invalid");
			
			if ( reqEmpty.length !== 0 ) {
				reqEmpty
					.first()
					.addClass("invalid")
					.focus();
			} else {
			
				data = $(this).serialize();
							
				$.ajax({
					type: "POST",
					url: actionURL,
					data: data,
					beforeSend: function(){ form.addClass("standby"); },
					success: function( data ) {
						form.addClass("sent");
						setTimeout(function(){ resetForm( form ); }, 2000 );
					}
				});
			}
			
			return false;
		}
	});
	
	function resetForm( form ) {
		form.find("input, textarea").val("");
	}
	
}

function getBGImgSizes( objs ) {

	var outputArr = [];

	objs.each(
		function(){
			var objBGI = $(this).css("background-image").replace(/url\(|\)|\"/gm, "");
				img = new Image(),
				objBGS = parseInt($(this).css("background-size"),10);
			
			img.src = objBGI;			
			
			$(img).on({ load: function(){

					var bgW = img.width,
						bgH = img.height,
						bgR = bgW/bgH;
					
					if ( objBGS ) {
						bgW = objBGS;
						bgH = bgW/bgR;
					}
					
					outputArr.push( bgW + "x" + bgH );

				}
			});

		}
	);
	
	return outputArr;

}

function buildBGParalax ( objs ) {

	var objsArr = getBGImgSizes( objs );	
	
	objs.each(function(){
	
		var obj = $(this);

		$(window).on({
			scroll: function(){
				var oT = obj.offset().top,
					oH = obj.height(),
					oBP = obj.css("background-position"),
					oIS = objsArr[obj.index()-1];

					oBP = oBP.split(" ");
					oIS = oIS.split(/x/);
				
				var oIH = oIS[1],
					oBPx = oBP[0]; 
					
				if ( winS >= oT && winS < oT+oH) {
					obj.css({
						backgroundPosition: oBPx + " " + ((oH-oIH)+winS/pR) +"px"
					});
				}
				
			},
			resize: function(){
				
				// window resize fix
				objs.attr("style", "");
                resizeSectionHeight();

			}
		});
		
	});
	
}

function buildNavigation ( nav ) {
	
	var items = nav.find("li a:not([class='external'])");

	items//.off('click')
        .on({
		click: function(){

			if ( !$(this).parent().hasClass("current")  ) {
			
				//nav.find("li").removeClass("current");
				//$(this).parent().addClass("current");
				
				var ind = $(this).parent().index(),
					sec = $("section").eq(ind),
					sT = sec.offset().top,
					dH = $(document).height();	
					delta = sT-hH;

				if ( delta < 0 ) { delta = 0;}
				if ( delta > dH-winH ) { delta = dH-winH;}
				
				$("body, html").stop().animate({
					scrollTop: delta
				},1000, "easeInOutExpo");
			
			}
			
			return false;
			
		}
	});

	
	if ( isMobile || isTablet ) {
		$("#wrapper").swipe({
			threshold: 75,
			allowPageScroll: "vertical",
			swipeLeft: function() {
				if ( !$("body").hasClass("show-nav") ){ $("body").addClass("show-nav"); }
			},
			swipeRight: function() {
				if ( $("body").hasClass("show-nav") ){ $("body").removeClass("show-nav"); }
			},
			tap: function(){
				if ( $("body").hasClass("show-nav") ){ $("body").removeClass("show-nav"); } 
			}
			
		});
	}
	
	scrollSwitcher( $("section"), nav );
	
}

function buildNavigationLogoTrigger ( nav ) {
    nav.find(".logo a")
        //.off('click')
        .on({
            click: function(){
                $("body, html").stop().animate({
                    scrollTop: 0
                },1000, "easeInOutExpo");
                return false;
            }
        });

    $("#nav-trigger")
        //.off('click')
        .on({
            click: function(){
                $("body").toggleClass("show-nav");
                return false;
            }
        });
}

function scrollSwitcher( container, nav ) {

	container
		.each(function(){
			var obj = $(this),
				off,
				top,
				//h = obj.height(),
				h,
				ind = obj.index();
			
			$(window)
                //.off('scroll')
                .on({
				scroll: function(){
                    off = obj.offset();
                    top = off.top-hH;
                    h = winH;
                    console.log(h);
					if ( winS > top-1 && winS <= top+h ) {
						//console.log(ind-1);
						var curNav = nav.find("li").eq(ind);
						if ( !curNav.hasClass("current") ) {
							nav.find("li").removeClass("current");
							nav.find("li").eq(ind-1).addClass("current");
						}
					} else if ( winS === 0 ) {
						nav.find("li").removeClass("current");
						nav.find("li:first").addClass("current");
					}
				}
			});
		})
	
}


