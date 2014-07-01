if (typeof $ == 'undefined') {
    $ = function () {
    };
}


$(function () {

    $("home-carousel").carousel({
        interval : 3000,
        pause: false
    });

});