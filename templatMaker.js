/**
 * Created by pooya on 8/31/14.
 */

if (typeof $ == 'undefined') {
    $ = function () {
    };
}
$(function () {

    var verticalTemplate = '<div class="btn-group-vertical">${buttons}</div>';
    var horizontalTemplate = '<div class="pager">${endButtons}</div>';
    var buttonTemplate = '<button class="${classes}" id="${jumpPoint}" value="${returnPoint}" >${buttonText}</button>';
    var $container = $('#container');
    var length = $container.children().length;
    var namespace = $.initNamespaceStorage(location.href + '-navigation');
    var storage = namespace.sessionStorage;

    var buttons = '';
    var endButtons = '';
    $('span').each(function () {
        var $this = $(this);
        var newButton = buttonTemplate.replace(/\${jumpPoint\}/g, $this.attr('id'));
        newButton = newButton.replace(/\${returnPoint\}/g, $this.attr('title'));
        var span;
        if ($this.attr('title') == "continueButton") {
            newButton = newButton.replace(/\${classes\}/g, "btn btn-default");
            span = '<span class="glyphicon glyphicon-play"/>';
            newButton = newButton.replace(/\${buttonText\}/g, $this.text() + " " + span);
            endButtons = endButtons + newButton.replace(/\${classes\}/g, "btn btn-default");

        } else if ($this.attr('title') == "reset-button") {
            newButton = newButton.replace(/\${classes\}/g, "btn btn-default");
            span = '<span class="glyphicon glyphicon-refresh"/>';
            newButton = newButton.replace(/\${buttonText\}/g, $this.text() + " " + span);
            endButtons = endButtons + newButton.replace(/\${classes\}/g, "btn btn-default");
        }
        else {
            newButton = newButton.replace(/\${buttonText\}/g, $this.text());
            if (length > 3) {
                buttons = buttons + newButton.replace(/\${classes\}/g, "btn btn-default");
            } else {
                newButton = newButton.replace(/\${classes\}/g, "btn btn-default btn-lg");
                $container.append(newButton);
            }
        }
        $this.remove();
    });

    if (length > 3) {

        verticalTemplate = verticalTemplate.replace(/\${buttons\}/g, buttons);
        $container.append(verticalTemplate);

    } else {
        $('.btn-lg').css(
            "margin-left", '10px'
        );
$('.row ').position({
    my: 'center',
    at: 'center',
    of: 'body'
});
        $('#continue').position({
            my: 'top',
            at: 'bottom',
            of: '#container'
        }).css(
            "margin-top", '50px'
        );

    }
    horizontalTemplate = horizontalTemplate.replace(/\${endButtons\}/g, endButtons);
    $('body').append(horizontalTemplate);
    var arrayOfReturnPoints = [];
    $('.btn').click(function () {
        var $this = $(this);

        window.parent.returnToOrigin();
        setTimeout(function () {
            window.parent.navigateAndPlay(parseInt($this.attr('id')));
        }, 500);
    }).each(function () {
        var $this = $(this);
        if ($this.val() == "continueButton" || $this.val() == "reset-button") {

            window.parent.clearReturn();
        }
        else {
            arrayOfReturnPoints.push(parseInt($this.val()));
            $this.addClass('navigate-link');
        }

    });

    $('.btn').filter('[value="reset-button"]').click(function () {
        storage.removeAll();
        refreshViewState();
    });


    arrayOfReturnPoints.sort(sortNumber);

    for (var i = 0; i < arrayOfReturnPoints.length; i++) {
        $('#' + arrayOfReturnPoints[i]).attr('disabled', 'disabled');
    }
    window.parent.registerReturn(arrayOfReturnPoints);
    var $links = $('.navigate-link');
    $links.click(function () {
        var index = $links.index(this);
        var $this = $('#' + arrayOfReturnPoints[index]);
        $this.attr('disabled', 'disabled');
        storage.set('visited-' + index, true);
        $(this).removeClass('btn-default').addClass('btn-success');
        $this.removeAttr('disabled');

    });
    function refreshViewState() {
        $('.navigate-link').each(function () {
            var index = $links.index(this);
            if (storage.get('visited-' + index)) {
                $(this).removeClass('btn-default').addClass('btn-success');
                $(this).attr('disabled', 'disabled');
                if (index < arrayOfReturnPoints.length) {
                    $('#' + arrayOfReturnPoints[index]).removeAttr('disabled');
                }
            } else {
                $(this).addClass('btn-default').removeClass('btn-success');
                if (index == 0) {
                    $('#1').removeAttr('disabled');
                }
            }
        });
    }
});

function sortNumber(a, b) {
    return a - b;
}

