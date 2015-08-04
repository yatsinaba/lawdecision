$(window).on({
    load: function(){
        initOnLoad();
    },
    scroll: function(){
        windiowScroll();
    }

});
$(document).on({
    ready: function(){
        buildNavigation( $("#header-nav") );
        windiowScroll();
    }
});