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

    $(".navbar").click(function () {
        $(this).parent().find(".project").slideToggle(200);
//        $(".project").slideToggle(200);
    });
//    var currentHeader = $(this).find(".navbar");
//    if (currentHeader.length == 0)
//        return;
//    makeSticky($(this), currentHeader);


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