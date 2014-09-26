/**
 * Created by pooya on 8/31/14.
 */


if (typeof $ == 'undefined') {
    $ = function () {
    };
}

$(function () {
    loadImages();

    $(window).scroll(function () {
        $('.sticky-bar').each(function () {
            var anchorPoint=$(this).closest(".sticky-bar-anchor").offset().top;
            if ($(window).scrollTop() > anchorPoint) {
                $(this).addClass('navbar-fixed-top');
            } else {
                $(this).removeClass('navbar-fixed-top');
            }
        });
    });

});


function loadImages() {
    var dir = "media/home-carousel/";
    var fileextension = ".jpg";


    $.ajax({
        url: 'data/data.json',
        dataType: 'json',
        success: function (data) {
//            console.log(data);
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

        var homeCarousel = makeHomeCarousel(data.homeCarousel);

//        var sections = makeSection() + makeSection();
        var sections = makeSections(data.projectSections);

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

    }


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
    $.each(projectSections, function (i, section) {
        console.log(section);
        sections += makeSection(section);
    });

    return sections;
}

function makeSection(sectionData) {
    var sectionTemplateString =
        '<div class="sticky-bar-anchor">' +
        '   <div class="sticky-bar">' +
        '       <label class="section-header">${sectionTitle}</label>' +
        '   </div>' +
        '</div>' +
        '<div class="container projects">' +
        '   <div class="row">' +
        '       ${projects}' +
        '   </div>' +
        '</div>';


    var projectsString = "";

    $.each(sectionData.projects, function (i, project) {
        projectsString += makeProject(project);

    });


    var sectionString = sectionTemplateString.replace(/\${sectionTitle\}/g, sectionData.caption);
    sectionString = sectionString.replace(/\${projects\}/g, projectsString);

    return sectionString;
}


function makeProject(projectData) {
    var projectTemplateString =
        '<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 pager">' +
        '   <div class="project center-element">' +
        '       ${overlay}' +
        '       <img class="img-responsive project-image" src="media/service3.png">' +
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
        '               <img class="img-responsive pull-right" src="media/icons/google_maps.png" width="40%">' +
        '           </div>' +
        '           <div class="col-xs-6 col-md-6">' +
        '               <img class="img-responsive pull-left" src="media/icons/spec2.png" width="40%">' +
        '           </div>' +
        '       </div>' +
        '    </div>' +
        '</div>';


    var projectOverlayString = projectOverlayTemplateString;
    var projectString = projectTemplateString.replace(/\${overlay\}/g, projectOverlayString);
    projectString = projectString.replace(/\${title\}/g, projectData.name);

    return projectString;
}

