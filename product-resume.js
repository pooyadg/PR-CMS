if (typeof $ == 'undefined') {
    $ = function () {
    };
}


$(function () {

    $("home-carousel").carousel({
        interval: 3000,
        pause: false
    });


    $('.project').hover(
        function(){
            $(this).find('.project-overlay').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.project-overlay').slideUp(250); //.fadeOut(205)
        }
    );


//    var currentHeader = $(this).find(".navbar");
//    if (currentHeader.length == 0)
//        return;
//    makeSticky($(this), currentHeader);


});

$(function(){
    // Check the initial Poistion of the Sticky Header
    var stickyElement = '#stickybar';
    var stickyPlaceholder = '#stickyplaceholder';
    var stickyHeaderTop = $(stickyElement).offset().top;
    var elementHeight = $(stickyElement).css('height');


    $(window).scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop ) {
            $(stickyElement).addClass('navbar-fixed-top');
//            $(stickyElement).css({position: 'fixed'});
            $(stickyPlaceholder).css({height: elementHeight});

//            $(stickyElement).css('display', 'block');
        } else {
            $(stickyPlaceholder).css({height: 0});
//            $(stickyElement).css({position: 'static'});
//            $(stickyElement).css('display', 'none');
            $(stickyElement).removeClass('navbar-fixed-top');
        }
    });
});


function makeSticky(container, element) {
    var scrollTop = $(document).scrollTop();
    var sectionHeight = container.height();
    var offsetTop = container.offset().top;
    if (scrollTop + headerHeight < offsetTop) {
        $(element).removeClass("sticking");
    }
    else {
        if (scrollTop - offsetTop - sectionHeight + headerHeight > 0)
            $(element).removeClass("sticking"); else
            $(element).addClass("sticking");
    }
}