/**
 * Created by pooya on 8/31/14.
 */


if (typeof $ == 'undefined') {
    $ = function () {
    };
}

$(function () {
    //<!--[if lte IE 9]>
    (function (f) {
        window.setTimeout = f(window.setTimeout);
        window.setInterval = f(window.setInterval);
    })(function (f) {
        return function (c, t) {
            var a = [].slice.call(arguments, 2);
            return f(function () {
                c.apply(this, a)
            }, t)
        }
    });
//    <![endif]-->
    loadImages();


});


function loadImages() {

    $.ajax({
        url: 'data/data.json',
        dataType: 'json',
        success: function (data) {
            fillSections(data)

        },
        error: function (xhr, text) {
            console.log('An error occurred', xhr, text);
        }
    });


    /**
     * fill all sections with proper data
     */
    function fillSections(data) {

        var logoBar = makeLogoBar(data.logo);

        var menuBar = makeMenuBar(data.projectSections);

        var homeCarousel = makeHomeCarousel(data.homeCarousel);

        var sections = makeSections(data.projectSections);

        $('body').append($(logoBar));
        $('body').append($(menuBar));
        $('body').append($(homeCarousel));
        $('body').append($(sections));
        $("#home-carousel").carousel({
            interval: 3000,
            pause: false
        });
        $('.project').hover(
            function () {
                $(this).find('.project-overlay').slideDown(250); //.fadeIn(250)
            },
            function () {
                $(this).find('.project-overlay').slideUp(250); //.fadeOut(205)
            }
        );
        $(window).scroll(function () {
            var previousAnchorPoint = 0;
            var $previousBar = null;
//            console.log("---------------------");
            $('.sticky-bar').each(function () {
                var anchorPoint = $(this).closest(".sticky-bar-anchor").offset().top;
//                console.log("anchorPoint: "+anchorPoint+ "   PreviousAnchorPoint: "+ previousAnchorPoint);

                if ($(window).scrollTop() > anchorPoint) {
                    $(this).addClass('navbar-fixed-top');
                } else {
                    $(this).removeClass('navbar-fixed-top');
                }
                if ($previousBar != null && $(window).scrollTop() > anchorPoint && anchorPoint > previousAnchorPoint) {
                    $previousBar.removeClass('navbar-fixed-top');
                }

                previousAnchorPoint = anchorPoint;
                $previousBar = $(this);
            });
        });

        var id;
        $('.modal').on('show.bs.modal', function () {
            id = $(this).attr("id");

            // use setTimeout() to execute
            setTimeout(function () {
                map = prepareMap("map" + id);
                google.maps.event.trigger(map, "resize");
            }, 1000);
        });

        $(".sticky-bar-anchor").click(function () {
            $(this).parent().find(".row").slideToggle(200);
        });

        $(".section-menu").click(function () {
            var index = $(this).attr("data-index");

            scrollToElement(index);

        });

    }


}

function makeLogoBar(logo) {
    var logoBarString =
        '<nav class="navbar navbar-default my-logo-bar" role="navigation">' +
        '    <div class="container-fluid">' +
        '        <!-- Brand and toggle get grouped for better mobile display -->' +
        '        <div class="navbar-header">' +
        '            <a class="navbar-brand" href="javascript:;"><img src="' + logo + '"></a>' +
        '        </div>' +
        '    </div>' +
        '</nav>';

    return logoBarString;
}

function makeMenuBar(sections) {
    var menuBarString =
        '<nav class="navbar navbar-default" role="navigation">' +
        '    <div class="container-fluid">' +
        '        <!-- Brand and toggle get grouped for better mobile display -->' +
        '        <div class="navbar-header">' +
        '            <button type="button" class="navbar-toggle" data-toggle="collapse"' +
        '                    data-target="#bs-example-navbar-collapse-1">' +
        '                <span class="sr-only">Toggle navigation</span>' +
        '                <span class="icon-bar"></span>' +
        '                <span class="icon-bar"></span>' +
        '                <span class="icon-bar"></span>' +
        '            </button>' +
        '        </div>' +
        '        <!-- Collect the nav links, forms, and other content for toggling -->' +
        '        <div class="collapse navbar-collapse " id="bs-example-navbar-collapse-1">' +
        '            <ul class="nav navbar-nav">' +
        '                <li><a href="javascript:;">|</a></li>' +
        '                <li><a href="javascript:;">درباره ما</a></li>' +
        '                <li><a href="javascript:;">|</a></li>' +
        '                <li class="dropdown">' +
        '                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">${sectionsMainTitle}<span class="caret"></span></a>' +
        '                    <ul class="dropdown-menu" role="menu">' +
        '                        ${sectionTitle}' +
        '                    </ul>' +
        '                </li>' +
        '            </ul>' +
        '           </ul>' +
        '        </div>' +
        '        <!-- /.navbar-collapse -->' +
        '    </div>' +
        '    <!-- /.container-fluid -->' +
        '</nav>';

    var sectionMenuTemplate = '<li><a href="javascript:;" class="section-menu" data-index="${index}">${caption}</a></li>';
    var sectionMenuString = '';
    var sectionsMenuString = '';
    var dividerString = '<li class="divider"></li>';
    var index = 0;
    for (; index < sections.items.length - 1; index++) {
        sectionMenuString = sectionMenuTemplate.replace(/\${caption\}/g, sections.items[index].caption);
        sectionMenuString = sectionMenuString.replace(/\${index\}/g, index);
        sectionsMenuString += sectionMenuString;
    }
    sectionMenuString = sectionMenuTemplate.replace(/\${caption\}/g, sections.items[sections.items.length - 1].caption);
    sectionMenuString = sectionMenuString.replace(/\${index\}/g, index);
    sectionsMenuString += sectionMenuString;
    menuBarString = menuBarString.replace(/\${sectionTitle\}/g, sectionsMenuString);
    menuBarString = menuBarString.replace(/\${sectionsMainTitle\}/g, sections.caption);


    return menuBarString;

}

function makeHomeCarousel(images) {
    var homeCarouselTemplateString =
        '<div class="home-carousel" style="background-color: #ffffff">'
        + '    <div class="container">'
        + '       <div id="home-carousel" class="carousel slide" data-ride="carousel">'
        + '            <!-- Indicators -->'
        + '            <ol class="carousel-indicators">'
        + "${indicators}"
        + '            </ol>'
        + '            <!-- Slider Content (Wrapper for slides )-->'
        + '            <div class="row  center-block carousel-inner">'
        + "${images}"
        + '            </div>'
        + '             <!-- Controls -->'
        + '              <a class="left carousel-control" href="#home-carousel" data-slide="prev">'
        + '                  <span class="glyphicon glyphicon-chevron-left"></span>'
        + '              </a>'
        + '              <a class="right carousel-control" href="#home-carousel" data-slide="next">'
        + '                  <span class="glyphicon glyphicon-chevron-right"></span>'
        + '              </a>'
        + '        </div>'
        + '    </div>'
        + '</div>';

    var indicatorTemplateString = '<li data-target="#home-carousel" data-slide-to="${indicatorIndex}" class="${indicatorClasses}"></li>';
    var imageTemplateString =
        ' <div class="item ${classes}">'
        + '   <img src="${imageName}" class="slide-image">'
        + ' </div>';


    var indicatorsString = '';
    var imagesString = '';
    var indicatorString;
    var imageString;

    var homeCarouselImages = "";
    $.each(images, function (i, image) {
        homeCarouselImages += '<img src="' + image.name + '">';
        indicatorString = indicatorTemplateString.replace(/\${indicatorIndex\}/g, image.index);
        imageString = imageTemplateString.replace(/\${imageName\}/g, image.name);
        if (image.active) {
            indicatorString = indicatorString.replace(/\${indicatorClasses\}/g, "active");
            imageString = imageString.replace(/\${classes\}/g, "active");
        } else {
            indicatorString = indicatorString.replace(/\${indicatorClasses\}/g, "");
            imageString = imageString.replace(/\${classes\}/g, "");


        }
        indicatorsString += indicatorString;
        imagesString += imageString;
    });


    var homeCarouselString = homeCarouselTemplateString.replace(/\${indicators\}/g, indicatorsString);
    homeCarouselString = homeCarouselString.replace(/\${images\}/g, imagesString);


    return homeCarouselString;
}

function makeSections(projectSections) {

    var sections = "";
    $.each(projectSections.items, function (i, section) {
//        console.log(section);
        sections += makeSection(section, i);
    });

    return sections;
}

function makeSection(sectionData, sectionIndex) {
    var sectionTemplateString =
        '<div id="${sectionId}" class="section">' +
        '   <div class="sticky-bar-anchor">' +
        '       <div class="sticky-bar">' +
        '          <label class="section-header">${sectionTitle}</label>' +
        '       </div>' +
        '   </div>' +
        '   <div class="container projects">' +
        '       <div class="row row-centered">' +
        '           ${projects}' +
        '       </div>' +
        '   </div>' +
        '</div>';


    var projectsString = "";

    $.each(sectionData.projects, function (i, project) {
        projectsString += makeProject(project, "" + sectionIndex + "" + i + "");
    });


    var sectionString = sectionTemplateString.replace(/\${sectionTitle\}/g, sectionData.caption);
    sectionString = sectionString.replace(/\${projects\}/g, projectsString);
    sectionString = sectionString.replace(/\${sectionId\}/g, "sec" + sectionIndex);

    return sectionString;
}


function makeProject(projectData, projectIndex) {
    var projectTemplateString =
        '<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-centered pager">' +
        '   <div class="project center-element">' +
        '       ${overlay}' +
        '       <img class="img-responsive project-image" src="${thumbnail}">' +
        '       <span class="project-title">${title}</span>' +
        '   </div>' +
        '</div>';


    var projectOverlayTemplateString =
        '<div class="project-overlay">' +
        '    <div class="container-fluid pager">' +
        '       <div class="row">' +
        '           <div class="col-xs-6 col-md-6">' +
        '               <img class="img-responsive pull-right" src="media/icons/spec.png" width="40%">' +
        '           </div>' +
        '           <div class="col-xs-6 col-md-6">' +
        '               <img class="img-responsive pull-left" src="media/icons/gallery.png" width="40%">' +
        '           </div>' +
        '       </div>' +
        '       <div class="row">' +
        '           <div class="col-xs-6 col-md-6">' +
        '               <a href="javascript:;" class="do-modal"  data-toggle="modal" data-target="#' + projectIndex + '">' +
        '                   <img class="img-responsive pull-right" src="media/icons/google_maps.png" width="40%">' +
        '               </a>' +
        '           </div>' +
        '           <div class="col-xs-6 col-md-6">' +
        '               <img class="img-responsive pull-left" src="media/icons/spec2.png" width="40%">' +
        '           </div>' +
        '       </div>' +
        '    </div>' +
        '</div>';

    var mapId = "map" + projectIndex;
    var googleMap = makeGoogleMap(projectData.coordinates, mapId);


    var lightboxString = makeLightbox(projectIndex, "نشانی پروژه", googleMap, projectData.address);


    $('body').append($(lightboxString));


    var projectOverlayString = projectOverlayTemplateString;
    var projectString = projectTemplateString.replace(/\${overlay\}/g, projectOverlayString);
    projectString = projectString.replace(/\${thumbnail\}/g, projectData.thumbnail);
    projectString = projectString.replace(/\${title\}/g, projectData.name);

    return projectString;
}


function makeLightbox(modalId, title, contentElement, footerString) {

    var lightboxString =
        '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">' +
        '   <div class="modal-dialog">' +
        '       <div class="modal-content">' +
        '           <div class="modal-header">' +
        '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '               <h4 class="modal-title">' + title + '</h4>' +
        '           </div>' +
        '           <div class="modal-body">' +
        contentElement +
        '           </div>' +
        '           <div class="modal-footer">' +
        '               <span>' + footerString + '</span>' +
        '           </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';


    return lightboxString;

}

var projectPositionMap = {};
function makeGoogleMap(projectPosition, mapId) {


    var mapElementString = '<div id="' + mapId + '" style="width:500px;height:380px;"></div>';
    projectPositionMap[mapId] = projectPosition;

    return mapElementString;
}

function prepareMap(mapId) {
    var marker;
    var coordinates = projectPositionMap[mapId].split(',');
    var myCenter = new google.maps.LatLng(coordinates[0], coordinates[1]);

    var mapProp = {
        center: myCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

//    console.log($('#' + mapId));

    var map = new google.maps.Map($('#' + mapId)[0], mapProp);


    marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
    google.maps.event.trigger(map, 'resize');
    return map;
}

function scrollToElement(index) {
    var container = $('body');
    var scrollTo = $('#sec' + index).find(".sticky-bar-anchor");
//    console.log("index is : " + index);
//    console.log("111 scrollTo.offset().top: " + scrollTo.offset().top);
//    console.log("222 container.offset().top: " + container.offset().top);
//    console.log("333 container.scrollTop(): " + container.scrollTop());

    $(document).scrollTop(scrollTo.offset().top - 140);
//    $(document).animate({
//        scrollTop: 1000//scrollTo.offset().top - container.offset().top + container.scrollTop()
//    }, 600);

//      $('body').animate({scrollTop :2000}, '500',function(){
//         //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
//          alert('Hello');
//      });

}