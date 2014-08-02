/**
 * Created by pooya on 8/2/14.
 */
var WH = WH || {};
var ua = navigator.userAgent.toLowerCase();
var isiPad = ua.indexOf('ipad');
var isiPhone = ua.indexOf('iphone');
if (typeof stylepath == 'undefined')stylepath = '';
if (typeof wgContentLanguage == 'undefined')wgContentLanguage = '';
var doneOnloadHook;
var bShrunk = false;
function hookEvent(hookName, hookFunct) {
    if (window.addEventListener) {
        window.addEventListener(hookName, hookFunct, false);
    } else if (window.attachEvent) {
        window.attachEvent("on" + hookName, hookFunct);
    }
}
if (typeof wgBreakFrames !== 'undefined' && wgBreakFrames) {
    if (window.top != window) {
        window.top.location = window.location;
    }
}
function toggle_element_activation(ida, idb) {
    if (!document.getElementById) {
        return;
    }
    document.getElementById(ida).disabled = true;
    document.getElementById(idb).disabled = false;
}
function toggle_element_check(ida, idb) {
    if (!document.getElementById) {
        return;
    }
    document.getElementById(ida).checked = true;
    document.getElementById(idb).checked = false;
}
WH.onLoadChineseSpecific = function () {
    $('#header #wpUserVariant').change(function () {
        var variant = $('#wpUserVariant').val();
        setCookie('wiki_sharedvariant', variant, 0);
        var hs = location.href.split("?");
        var loc = "";
        if (hs.length > 1) {
            var params = hs[1].replace(/^variant=[^&#]+/, "").replace(/&variant=[^&#]+/, "");
            if (params) {
                loc = hs[0] + "?" + params;
            }
            else {
                loc = hs[0];
            }
        }
        else {
            loc = hs[0];
        }
        location.href = loc;
    });
};
if (wgContentLanguage == 'zh') {
    $(document).ready(WH.onLoadChineseSpecific);
}
var share_requester;
function handle_shareResponse() {
}
function clickshare(selection) {
    share_requester = null;
    try {
        share_requester = new XMLHttpRequest();
    } catch (error) {
        try {
            share_requester = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
            return false;
        }
    }
    share_requester.onreadystatechange = handle_shareResponse;
    url = window.location.protocol + '//' + window.location.hostname + '/Special:CheckJS?selection=' + selection;
    share_requester.open('GET', url);
    share_requester.send(' ');
}
function shareTwitter(source) {
    var title = wgTitle;
    var url = encodeURIComponent(location.href);
    if (title.search(/How to/) != 0) {
        title = 'How to ' + title;
    }
    if (source == 'aen') {
        status = "I just wrote an article on @wikiHow - " + title + ".";
    } else if (source == 'africa') {
        status = "wikiHow.com is sending a book to Africa when you write a new how-to article. Help out here: http://bit.ly/9qWKe";
        title = "";
        url = "";
    } else {
        status = "Reading @wikiHow on " + title + ".";
    }
    window.open('https://twitter.com/intent/tweet?text=' + status + ' ' + url);
    return false;
}
function button_click(obj) {
    if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.appVersion < 7)) {
        return false;
    }
    jobj = jQuery(obj);
    background = jobj.css('background-position');
    if (background == undefined || background == null)
        background_x_position = jobj.css('background-position-x'); else
        background_x_position = background.split(" ")[0];
    if (obj.id.indexOf("tab_") >= 0) {
        obj.style.color = "#514239";
        obj.style.backgroundPosition = background_x_position + " -111px";
    }
    if (obj.id == "play_pause_button") {
        if (jobj.hasClass("play")) {
            obj.style.backgroundPosition = "0 -130px";
        }
        else {
            obj.style.backgroundPosition = "0 -52px";
        }
    }
    if (jobj.hasClass("search_button")) {
        obj.style.backgroundPosition = "0 -29px";
    }
}
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return[curleft, curtop];
}
function setCookie(name, value, expireDays) {
    var expireDays = typeof expires == 'undefined' ? 7 : expireDays;
    var daysMs = expireDays * 24 * 60 * 60 * 1000
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + daysMs);
    document.cookie = name + "=" + escape(value) + (!expireDays ? "" : ";expires=" + expireDate.toGMTString()) + ";path=/";
}
function getCookie(c_name) {
    var x, y, cookiesArr = document.cookie.split(";");
    for (var i = 0; i < cookiesArr.length; i++) {
        x = cookiesArr[i].substr(0, cookiesArr[i].indexOf("="));
        y = cookiesArr[i].substr(cookiesArr[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
function scroll_open(id, height, max_height) {
    document.getElementById(id).style.top = height + "px";
    document.getElementById(id).style.display = "block";
    document.getElementById(id).style.position = "relative";
    height += 1;
    if (height < max_height) {
        window.setTimeout("scroll_open('" + id + "'," + height + "," + max_height + ")", 15);
    }
}
function share_article(who) {
    switch (who) {
        case'email':
            clickshare(1);
            window.location = 'http://' + window.location.hostname + '/Special:EmailLink/' + window.location.pathname;
            break;
        case'facebook':
            clickshare(4);
            var d = document, f = 'http://www.facebook.com/share', l = d.location, e = encodeURIComponent, p = '.php?src=bm&v=4&i=1178291210&u=' + e(l.href) + '&t=' + e(d.title);
            1;
            try {
                if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host))throw(0);
                share_internal_bookmarklet(p)
            } catch (z) {
                a = function () {
                    if (!window.open(f + 'r' + p, 'sharer', 'toolbar=0,status=0,resizable=0,width=626,height=436'))l.href = f + p
                };
                if (/Firefox/.test(navigator.userAgent))setTimeout(a, 0); else {
                    a()
                }
            }
            void(0);
            break;
        case'twitter':
            clickshare(8);
            shareTwitter();
            break;
        case'delicious':
            clickshare(2);
            window.open('http://del.icio.us/post?v=4&partner=whw&noui&jump=close&url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title), 'delicious', 'toolbar=no,width=700,height=400');
            void(0);
            break;
        case'stumbleupon':
            clickshare(9);
            window.open('http://www.stumbleupon.com/submit?url=' + encodeURIComponent(location.href));
            void(0);
            break;
        case'digg':
            javascript:clickshare(3);
            window.open(' http://digg.com/submit?phase=2&url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title) + '&bodytext=&topic=');
            break;
        case'blogger':
            javascript:clickshare(7);
            window.open('http://www.blogger.com/blog-this.g?&u=' + encodeURIComponent(location.href) + '&n=' + encodeURIComponent(document.title), 'blogger', 'toolbar=no,width=700,height=400');
            void(0);
            break;
        case'google':
            javascript:clickshare(5);
            (function () {
                var a = window, b = document, c = encodeURIComponent, d = a.open("https://plus.google.com/share?url=" + c(b.location), "bkmk_popup", "left=" + ((a.screenX || a.screenLeft) + 10) + ",top=" + ((a.screenY || a.screenTop) + 10) + ",height=420px,width=550px,resizable=1,alwaysRaised=1");
                a.setTimeout(function () {
                    d.focus()
                }, 300)
            })();
            break;
    }
}
var sajax_debug_mode = false;
var sajax_request_type = "GET";
function sajax_debug(text) {
    if (!sajax_debug_mode)return false;
    var e = document.getElementById('sajax_debug');
    if (!e) {
        e = document.createElement("p");
        e.className = 'sajax_debug';
        e.id = 'sajax_debug';
        var b = document.getElementsByTagName("body")[0];
        if (b.firstChild)b.insertBefore(e, b.firstChild); else b.appendChild(e);
    }
    var m = document.createElement("div");
    m.appendChild(document.createTextNode(text));
    e.appendChild(m);
    return true;
}
function sajax_init_object() {
    sajax_debug("sajax_init_object() called..")
    var A;
    try {
        A = new XMLHttpRequest();
    } catch (e) {
        try {
            A = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                A = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (oc) {
                A = null;
            }
        }
    }
    if (!A)
        sajax_debug("Could not create connection object.");
    return A;
}
function sajax_do_call(func_name, args, target) {
    var i, x, n;
    var uri;
    var post_data;
    uri = wgServer +
        ((wgScript == null) ? (wgScriptPath + "/index.php") : wgScript) + "?action=ajax";
    if (sajax_request_type == "GET") {
        if (uri.indexOf("?") == -1)
            uri = uri + "?rs=" + encodeURIComponent(func_name); else
            uri = uri + "&rs=" + encodeURIComponent(func_name);
        for (i = 0; i < args.length; i++)
            uri = uri + "&rsargs[]=" + encodeURIComponent(args[i]);
        post_data = null;
    } else {
        post_data = "rs=" + encodeURIComponent(func_name);
        for (i = 0; i < args.length; i++)
            post_data = post_data + "&rsargs[]=" + encodeURIComponent(args[i]);
    }
    x = sajax_init_object();
    if (!x) {
        alert("AJAX not supported");
        return false;
    }
    try {
        x.open(sajax_request_type, uri, true);
    } catch (e) {
        if (window.location.hostname == "localhost") {
            alert("Your browser blocks XMLHttpRequest to 'localhost', try using a real hostname for development/testing.");
        }
        throw e;
    }
    if (sajax_request_type == "POST") {
        x.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
        x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    x.setRequestHeader("Pragma", "cache=yes");
    x.setRequestHeader("Cache-Control", "no-transform");
    x.onreadystatechange = function () {
        if (x.readyState != 4)
            return;
        sajax_debug("received (" + x.status + " " + x.statusText + ") " + x.responseText);
        if (typeof(target) == 'function') {
            target(x);
        }
        else if (typeof(target) == 'object') {
            if (target.tagName == 'INPUT') {
                if (x.status == 200)target.value = x.responseText;
            }
            else {
                if (x.status == 200)target.innerHTML = x.responseText; else target.innerHTML = "<div class='error'>Error: " + x.status + " " + x.statusText + " (" + x.responseText + ")</div>";
            }
        }
        else {
            alert("bad target for sajax_do_call: not a function or object: " + target);
        }
        return;
    }
    sajax_debug(func_name + " uri = " + uri + " / post = " + post_data);
    x.send(post_data);
    sajax_debug(func_name + " waiting..");
    delete x;
    return true;
}
var mainPageFAToggleFlag = false;
function mainPageFAToggle() {
    var firstChild = jQuery('#toggle');
    if (mainPageFAToggleFlag == false) {
        jQuery('#hiddenFA').slideDown('slow').show(function () {
            firstChild.html(wfMsg('mainpage_fewer_featured_articles'));
            jQuery('#moreOrLess').attr('src', wgCDNbase + '/skins/WikiHow/images/arrowLess.png');
            jQuery("#featuredNav").hide();
            jQuery("#featuredNav").show();
        });
        mainPageFAToggleFlag = true;
    } else {
        jQuery('#hiddenFA').slideUp('slow').hide(function () {
            firstChild.html(wfMsg('mainpage_more_featured_articles'));
            jQuery('#moreOrLess').attr('src', wgCDNbase + '/skins/WikiHow/images/arrowMore.png');
            jQuery("#featuredNav").hide();
            jQuery("#featuredNav").show();
        });
        mainPageFAToggleFlag = false;
    }
}
function setStyle(obj, style) {
    if (obj) {
        if (navigator.userAgent.indexOf('MSIE') > 0) {
            obj.style.setAttribute('csstext', style, 0);
        } else {
            obj.setAttribute('style', style);
        }
    }
}
function wfMsg(key) {
    if (typeof WH.lang[key] === 'undefined') {
        return'[' + key + ']';
    } else {
        var msg = WH.lang[key];
        if (arguments.length > 1) {
            var syntax = /(^|.|\r|\n)(\$([1-9]))/g;
            var replArgs = arguments;
            msg = msg.replace(syntax, function (match, p1, p2, p3) {
                return p1 + replArgs[p3];
            });
        }
        return msg;
    }
}
function wfTemplate(tmpl) {
    var syntax = /(^|.|\r|\n)(\$([1-9]))/g;
    var replArgs = arguments;
    var out = tmpl.replace(syntax, function (match, p1, p2, p3) {
        return p1 + replArgs[p3];
    });
    return out;
}
function wfGetPad(url) {
    if (url.search(/^http:\/\//) >= 0) {
        return url;
    } else {
        return wgCDNbase + url;
    }
}
function getRequestObject() {
    var request;
    try {
        request = new XMLHttpRequest();
    } catch (error) {
        try {
            request = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
            return false;
        }
    }
    return request;
}
var sh_links = Array("showads");
function sethideadscookie(val) {
    var date = new Date();
    if (val == 1)
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); else
        date.setTime(date.getTime() - (30 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "wiki_hideads=" + val + expires + "; path=/";
}
function showorhideads(hide) {
    var style = 'display: inline;';
    if (hide) {
        style = 'display: none;';
    }
    $(".wh_ad_inner").hide();
    for (var i = 0; i < sh_links.length; i++) {
        var e = document.getElementById(sh_links[i]);
        if (!e)continue;
        if (hide) {
            style = 'display: inline;';
        } else {
            style = 'display: none;';
        }
        setStyle(e, style);
    }
    $(".show_ads").show();
}
function hideads() {
    sethideadscookie(1);
    showorhideads(true);
    clickshare(20);
}
function showads() {
    sethideadscookie(0);
    showorhideads(false);
    window.location.reload();
}
var cp_request;
var cp_request2;
function cp_finish() {
    gatTrack("Author_engagement", "Click_done", "Publishing_popup");
    if (document.getElementById('email_friend_cb') && document.getElementById('email_friend_cb').checked == true) {
        gatTrack("Author_engagement", "Author_mail_friends", "Publishing_popup");
        try {
            cp_request = new XMLHttpRequest();
        } catch (error) {
            try {
                cp_request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (error) {
                return false;
            }
        }
        var params = "friends=" + encodeURIComponent(document.getElementById('email_friends').value) + "&target=" + window.location.pathname.substring(1);
        var url = "http://" + window.location.hostname + "/Special:CreatepageEmailFriend";
        cp_request.open('POST', url);
        cp_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        cp_request.send(params);
    }
    if (document.getElementById('email_notification') && document.getElementById('email_notification').checked == true) {
        gatTrack("Author_engagement", "Email_updates", "Publishing_popup");
        try {
            cp_request2 = new XMLHttpRequest();
        } catch (error) {
            try {
                cp_request2 = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (error) {
                return false;
            }
        }
        var params = "";
        if (document.getElementById('email_address_flag').value == '1') {
            params = "action=addNotification&target=" + window.location.pathname.substring(1);
        } else {
            params = "action=addNotification&email=" + encodeURIComponent(document.getElementById('email_me').value) + "&target=" + window.location.pathname.substring(1);
        }
        var url = "http://" + window.location.hostname + "/Special:AuthorEmailNotification";
        cp_request2.open('POST', url);
        cp_request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        cp_request2.send(params);
    }
    if (document.getElementById('dont_show_again') && document.getElementById('dont_show_again').checked == true) {
        gatTrack("Author_engagement", "Reject_pub_pop", "Reject_pub_pop");
        try {
            cp_request2 = new XMLHttpRequest();
        } catch (error) {
            try {
                cp_request2 = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (error) {
                return false;
            }
        }
        var params = "action=updatePreferences&dontshow=1";
        var url = "http://" + window.location.hostname + "/Special:AuthorEmailNotification";
        cp_request2.open('POST', url);
        cp_request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        cp_request2.send(params);
    }
    jQuery("#dialog-box").dialog("close");
}
var gHideAds = gHideAds || false;
var gchans = gchans || false;
var google_analytics_domain_name = ".wikihow.com"
var gRated = false;
function ratingReason(reason, itemId, type) {
    if (!reason) {
        return;
    }
    $.ajax({url: '/Special:RatingReason?item_id=' + itemId + '&reason=' + reason + '&type=' + type}).done(function (data) {
        $('#' + type + '_rating').html(data);
    });
}
function rateItem(r, itemId, type) {
    if (!gRated) {
        $.ajax({url: '/Special:RateItem?page_id=' + itemId + '&rating=' + r + '&type=' + type}).done(function (data) {
            if (type == "sample") {
                $('#' + type + '_rating').css('height', '100px');
            }
            $('#' + type + '_rating').html(data);
        });
    }
    gRated = true;
}
function updateWidget(id, x) {
    var url = '/Special:Standings/' + x;
    $.get(url, function (data) {
        $(id).fadeOut();
        $(id).html(data['html']);
        $(id).fadeIn();
    }, 'json');
}
function updateTimer(id) {
    var e = jQuery("#" + id);
    var i = parseInt(e.html());
    if (i > 1) {
        e.fadeOut(400, function () {
            i--;
            e.html(i);
            e.fadeIn();
        });
    }
}
function parseIntWH(num) {
    if (!num) {
        return 0;
    }
    return parseInt(num.replace(/,/, ''), 10);
}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function setupEmailLinkForm() {
    $("#emaillink").submit(function () {
        var params = {fromajax: true};
        $("#emaillink input").each(function () {
            params[$(this).attr('name')] = $(this).val();
        });
        $.post('/Special:EmailLink', params, function (data) {
            $("#dialog-box").html(data);
            setupEmailLinkForm();
        });
        return false;
    });
}
function emailLink() {
    var url = "/extensions/wikihow/common/jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.min.js";
    $.getScript(url, function () {
        var url2 = '/Special:EmailLink?target=' + wgPageName + '&fromajax=true';
        $("#dialog-box").load(url2, function () {
            $("#dialog-box").dialog({modal: true, title: "E-mail This Page to a Friend", width: 650, height: 400, closeText: 'Close'});
            setupEmailLinkForm();
        });
    });
    return false;
}
function getToolTip(obj, on) {
    if (on) {
        if (jQuery.browser.msie && jQuery.browser.version == "6.0")
            return;
        var txt = jQuery(obj).parent().find('span').html();
        if (txt) {
            var pos = jQuery(obj).offset();
            var posTop = pos.top - 55;
            jQuery('<div class="tooltip_text"><div>' + txt + '</div></div>').appendTo('body');
            var imgWidth = pos.left + (jQuery('.tooltip').width() / 2);
            var posLeft = imgWidth - 23;
            jQuery('.tooltip_text').css('top', posTop).css('left', posLeft);
        }
    } else {
        if (jQuery.browser.msie && jQuery.browser.version == "6.0")
            return;
        jQuery('.tooltip_text').remove();
    }
}
function plusone_vote(obj) {
    _gaq.push(['_trackEvent', 'plusone', obj.state]);
}
jQuery(".lbg").live('click', function () {
    var id = jQuery(this).attr("id").split("_");
    jQuery('#lbgi_' + id[1]).click();
});
jQuery('#tb_steps').live('click', function () {
    $('#tb_steps').addClass('on');
    $('#tb_tips').removeClass('on');
    $('#tb_warnings').removeClass('on');
    $('html, body').animate({scrollTop: $('#steps').offset().top - 70}, 'slow');
});
jQuery('#tb_tips').live('click', function () {
    $('#tb_tips').addClass('on');
    $('#tb_steps').removeClass('on');
    $('#tb_warnings').removeClass('on');
    $('html, body').animate({scrollTop: $('#tips').offset().top - 70}, 'slow');
});
jQuery('#tb_warnings').live('click', function () {
    $('#tb_warnings').addClass('on');
    $('#tb_steps').removeClass('on');
    $('#tb_tips').removeClass('on');
    $('html, body').animate({scrollTop: $('#warnings').offset().top - 70}, 'slow');
});
function extractParamFromUri(uri, paramName) {
    if (!uri) {
        return;
    }
    var uri = uri.split('#')[0];
    var parts = uri.split('?');
    if (parts.length == 1) {
        return;
    }
    var query = decodeURI(parts[1]);
    paramName += '=';
    var params = query.split('&');
    for (var i = 0, param; param = params[i]; ++i) {
        if (param.indexOf(paramName) === 0) {
            return unescape(param.split('=')[1]);
        }
    }
}
WH.addScrollEffectToTOC = function () {
    if ($('#toc').length)WH.addScrollEffectToHashes($('#toc * a'));
    if ($('#method_toc').length)WH.addScrollEffectToHashes($('#method_toc a'));
};
WH.addScrollEffectToHashes = function (anchors) {
    anchors.each(function () {
        var href = $(this).attr('href');
        var parts = href.split(/#/);
        if (parts.length <= 1 || !parts[1]) {
            return;
        }
        var hash = parts[1];
        var anchor = $('a[name="' + hash + '"]');
        if (anchor.length != 1) {
            return;
        }
        $(this).click(function () {
            $.scrollTo(anchor, 1000);
            if (history.pushState) {
                history.pushState(null, null, '#' + hash);
            } else {
                location.hash = '#' + hash;
            }
            return false;
        });
    });
};
WH.isPageScrolledToArticleBottom = function () {
    var elem = '.article_bottom';
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    elemTop += 125;
    var elemBottom = elemTop + $(elem).height();
    return((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
};
WH.isPageScrolledToWarningsORArticleInfo = function () {
    var elem1 = '#warnings';
    var elem2 = '#article_info_header';
    var the_elem = '';
    if ($(elem1).length) {
        the_elem = elem1;
    } else {
        the_elem = elem2;
    }
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var offset = $(the_elem).offset();
    return offset ? offset.top <= docViewBottom : false;
};
WH.isPageScrolledToFollowTable = function () {
    var the_elem = '#follow_table';
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var offset = $(the_elem).offset();
    return offset ? offset.top <= docViewBottom : false;
};
(function ($) {
    $('#search_site_bubble,#search_site_footer').live('click', function (e) {
        if ($(this).siblings('input[name="search"]').val().length == 0) {
            e.preventDefault();
            return false;
        }
    });
})(jQuery);
$(document).ready(function () {
    var oldMSIE = $.browser.msie && $.browser.version <= 7;
    if ($('#slideshowdetect').length && slider && !getCookie('sliderbox') && isiPhone < 0 && isiPad < 0 && !oldMSIE) {
        if ($('#slideshowdetect_mainpage').length) {
            $(window).bind('scroll', function () {
                if (!getCookie('sliderbox')) {
                    if (WH.isPageScrolledToFollowTable() && $('#sliderbox').css('right') == '-500px' && !$('#sliderbox').is(':animated')) {
                        slider.init();
                    }
                    if (!WH.isPageScrolledToFollowTable() && $('#sliderbox').css('right') == '0px' && !$('#sliderbox').is(':animated')) {
                        slider.closeSlider();
                    }
                }
            });
        }
        else {
            $(window).bind('scroll', function () {
                if (!getCookie('sliderbox')) {
                    if (WH.isPageScrolledToWarningsORArticleInfo() && $('#sliderbox').css('right') == '-500px' && !$('#sliderbox').is(':animated')) {
                        slider.init();
                    }
                    if (!WH.isPageScrolledToWarningsORArticleInfo() && $('#sliderbox').css('right') == '0px' && !$('#sliderbox').is(':animated')) {
                        slider.closeSlider();
                    }
                }
            });
        }
    }
    if ($('#showslideshow').length) {
        var url = '/Special:GallerySlide?show-slideshow=1&big-show=1&article_layout=2&aid=' + wgArticleId;
        $.getJSON(url, function (json) {
            if (json && json.content) {
                document.getElementById('showslideshow').innerHTML = json.content;
                fireUpSlideShow(json.num_images);
                $('#showslideshow').slideDown();
            }
        });
    }
    $('.step_checkbox').click(function () {
        if ($(this).hasClass('step_checked')) {
            $(this).removeClass('step_checked');
        }
        else {
            $(this).addClass('step_checked');
            try {
                if (_gaq) {
                    _gaq.push(['_trackEvent', 'checks', 'non-mobile', 'checked']);
                }
            } catch (err) {
            }
        }
        return false;
    });
    $('.css-checkbox').click(function () {
        $(this).parent().find('.checkbox-text').toggleClass('fading');
    });
    initTopMenu();
    initAdminMenu();
    $('#site_notice_x').click(function () {
        var exdate = new Date();
        var expiredays = 30;
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = "sitenoticebox=1;expires=" + exdate.toGMTString();
        $('#site_notice').hide();
    });
});
WH.setGooglePlusOneLangCode = function () {
    var langCode = '';
    if (wgUserLanguage == 'pt') {
        langCode = 'pt-BR';
    }
    if (wgUserLanguage == 'es' || wgUserLanguage == 'de') {
        langCode = wgUserLanguage;
    }
    if (langCode) {
        window.___gcfg = {lang: langCode};
    }
};
jQuery(document).on('click', 'a#wikitext_downloader', function (e) {
    e.preventDefault();
    var data = {'pageid': wgArticleId};
    jQuery.download('/Special:WikitextDownloader', data);
});
jQuery("#authors").click(function (e) {
    $("#originator_names").toggle();
    return false;
});
jQuery("#originator_names_close").click(function (e) {
    $("#originator_names").hide();
    return false;
});
WH.displayTranslationCTA = function () {
    var userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
    userLang = typeof userLang == 'string' ? userLang.substring(0, 2).toLowerCase() : '';
    if (window.location.href.indexOf('testtranscta=') !== false) {
        var matches = /testtranscta=([a-z]+)/.exec(window.location.href);
        if (matches) {
            userLang = matches[1];
        }
    }
    var transCookie = getCookie('trans');
    if (transCookie != '1' && userLang && typeof WH.translationData != 'undefined' && typeof WH.translationData[userLang] != 'undefined') {
        var msg = WH.translationData[userLang]['msg'];
        if (msg) {
            $('#main').prepend("<span id='gatNewMessage'><div class='message_box'>" + msg + "<div class='transd-no' style='float:right;padding-right:10px;font-size:12px;'><a href='#'>No thanks</a></div></div></span>");
            $('.transd-no').click(function () {
                $('.message_box').hide();
                setCookie('trans', 1, 30);
                return false;
            });
        }
    }
};
$(document).ready(WH.displayTranslationCTA);
WH.maybeDisplayTopSocialCTA = function () {
    var referrer = document.referrer ? document.referrer : '';
    var testNetwork = extractParamFromUri(location.href, 'soc');
    if (testNetwork) {
        referrer = testNetwork;
    }
    var social = '';
    if (/facebook\.com/.test(referrer)) {
        social = 'facebook';
    } else if (/pinterest\.com/.test(referrer)) {
        social = 'pinterest';
    } else if (/twitter\.com/.test(referrer)) {
        social = 'twitter';
    } else if (/plus\.google\.com/.test(referrer)) {
        social = 'gplus';
    }
    if (social) {
        var checkMsg = function (msg) {
            return msg && $.trim(msg).indexOf('[') !== 0;
        }
        var insertHTMLcallback = function (html) {
            if (!$.trim(html))return;
            var node = $(html);
            node.css({height: '0px'});
            $('body').prepend(node);
            $('#pin-head-cta').animate({height: '+230px'}, 700);
            $('#main, #footer_shell').css({position: 'relative'});
        };
        var html = wfMsg('social-html-' + social);
        html = checkMsg(html) ? html : '';
        if (!html) {
            html = wfMsg('social-html');
            html = checkMsg(html) ? html : '';
        }
        if (html) {
            insertHTMLcallback(html);
        } else {
            $.get('/Special:WikihowShare?soc=' + social, insertHTMLcallback);
        }
    }
};
$(document).ready(WH.maybeDisplayTopSocialCTA);
WH.supplementAnimations = function () {
    $.extend($.easing, {easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return c / 2 * t * t + b;
        return-c / 2 * ((--t) * (t - 2) - 1) + b;
    }, easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }, easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return c / 2 * t * t * t * t + b;
        return-c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }, easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0)return b;
        if (t == d)return b + c;
        if ((t /= d / 2) < 1)return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }, easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined)s = 1.70158;
        if ((t /= d / 2) < 1)return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }});
}
function initAdminMenu() {
    $('ul#tabs li').hover(function () {
        var that = $(this);
        menu_show(that);
    }, function () {
        var that = $(this);
        menu_hide(that);
    });
}
var on_menu = false;
function initTopMenu() {
    WH.supplementAnimations();
    var on_menu = false;
    $('#header ul#actions li').hover(function () {
        var that = $(this);
        var wait = (on_menu) ? 150 : 0;
        clearTimeout($(this).data('timeout2'));
        that.data('timeout', setTimeout(function () {
            menu_show(that);
            on_menu = true;
        }, wait));
    }, function () {
        var that = $(this);
        var wait = 150;
        clearTimeout(that.data('timeout'));
        if ((/Firefox/.test(navigator.userAgent)) && ($('#wpName1_head').is(":focus") || $('#wpPassword1_head').is(":focus"))) {
            wait = 2000;
        }
        that.data('timeout2', setTimeout(function () {
            menu_hide(that);
            on_menu = false;
        }, wait));
    });
    $('.th_close').click(function () {
        var revId = $(this).attr('id');
        var giverIds = $('#th_msg_' + revId).find('.th_giver_ids').html();
        var url = '/Special:ThumbsNotifications?rev=' + revId + '&givers=' + giverIds;
        $.get(url, function (data) {
        });
        $('#th_msg_' + revId).hide();
        $('#notification_count').html($('#notification_count').html() - 1);
    });
    $('#bubble_search .search_box, #cse_q').click(function () {
        $(this).addClass('search_white');
    });
    $(".nav").click(function () {
        if ($(this).attr('href') == '#')return false;
    });
    $('.userlogin #wpName1, #wpName1_head').val(wfMsg('usernameoremail')).css('color', '#ABABAB').click(function () {
        if ($(this).val() == wfMsg('usernameoremail')) {
            $(this).val('');
            $(this).css('color', '#333');
        }
    });
    if (!($.browser.msie && $.browser.version <= 8.0)) {
        if ($('.userlogin #wpPassword1').get(0))$('.userlogin #wpPassword1').get(0).type = 'text';
        if ($('#wpPassword1_head').get(0))$('#wpPassword1_head').get(0).type = 'text';
    }
    $('.userlogin #wpPassword1, #wpPassword1_head').val(wfMsg('password')).css('color', '#ABABAB').focus(function () {
        if ($(this).val() == wfMsg('password')) {
            $(this).val('');
            $(this).css('color', '#333');
            $(this).get(0).type = 'password';
        }
    });
    $("#forgot_pwd").click(function () {
        if ($("#wpName1").val() == 'Username or Email')$("#wpName1").val('');
        getPassword(escape($("#wpName1").val()));
        return false;
    });
    $("#forgot_pwd_head").click(function () {
        if ($("#wpName1_head").val() == 'Username or Email')$("#wpName1_head").val('');
        getPassword(escape($("#wpName1_head").val()));
        return false;
    });
}
$("#method_toc_unhide").click(function () {
    $("#method_toc a.excess").show();
    $("#method_toc_hide").show();
    $(this).hide();
    return false;
});
$("#method_toc_hide").click(function () {
    $("#method_toc a.excess").hide();
    $("#method_toc_unhide").show();
    $(this).hide();
    return false;
});
$(document).ready(function () {
    $(".section").each(function () {
        var h3Height = $('h3:first', this).height();
        $(this).css('padding-top', h3Height + 'px');
    });
});
(function ($) {
    var headerToggling = false;
    $(window).scroll(function () {
        if (!headerToggling) {
            if ($(window).scrollTop() <= 0) {
                headerToggling = true;
                toggleHeader(false);
            }
            else {
                if (!bShrunk) {
                    headerToggling = true;
                    toggleHeader(true);
                }
            }
        }
    });
    function toggleHeader(bShrink) {
        if ($.browser.msie && parseFloat($.browser.version) < 8)return;
        if (bShrink) {
            $('#header').addClass('shrunk').animate({height: '39px'}, 200, function () {
                $(this).css('overflow', 'visible');
                headerToggling = false;
            });
            $('#main').addClass('shrunk_header');
            bShrunk = true;
        }
        else {
            $('#header').animate({height: '72px'}, 150, function () {
                $(this).removeClass('shrunk');
                $(this).css('overflow', 'visible');
                $('#main').removeClass('shrunk_header');
                headerToggling = false;
            });
            bShrunk = false;
        }
    }
})(jQuery);
$(window).scroll(function () {
    headerHeight = $("#header").height();
    previousHeader = null;
    currentHeader = null;
    if ($.browser.msie && parseFloat($.browser.version) < 8) {
    }
    else {
        $(".section.sticky").each(function () {
            currentHeader = $(this).find("h2");
            if (!$(currentHeader).is(":visible"))
                currentHeader = $(this).find("h3");
            if (currentHeader.length == 0)
                return;
            makeSticky($(this), currentHeader);
        });
        $(".tool.sticky").each(function () {
            currentHeader = $('.tool_header');
            if (currentHeader.length == 0)
                return;
            if (extractParamFromUri(document.location.search, 'gt_mode') != 1) {
                makeSticky($(this), currentHeader);
            }
        });
    }
});
function makeSticky(container, element) {
    scrollTop = $(document).scrollTop();
    sectionHeight = container.height();
    offsetTop = container.offset().top;
    if (scrollTop + headerHeight < offsetTop) {
        $(element).removeClass("sticking");
    }
    else {
        if (scrollTop - offsetTop - sectionHeight + headerHeight > 0)
            $(element).removeClass("sticking"); else
            $(element).addClass("sticking");
    }
}
$(document).ready(function () {
    if ($.browser.msie && $.browser.version <= 8) {
        $('.css-checkbox').removeClass('css-checkbox');
        $('.css-checkbox-label').removeClass('css-checkbox-label');
    }
});
(function ($) {
    $(document).on('click', "a[href^=#_note-], a[href^=#_ref-]", function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 100}, 0);
    });
})(jQuery);
function initToolTitle() {
    $(".firstHeading").before("<h5>" + $(".firstHeading").html() + "</h5>")
}
function addOptions() {
    $(".firstHeading").before('<span class="tool_options_link">(<a href="#">Change Options</a>)</span>');
    $(".firstHeading").after('<div class="tool_options"></div>');
    $(".tool_options_link").click(function () {
        if ($('.tool_options').css('display') == 'none') {
            $('.tool_options').slideDown();
        }
        else {
            $('.tool_options').slideUp();
        }
    });
}
function menu_show(choice) {
    if ($.browser.msie && parseFloat($.browser.version) < 9) {
        $(choice).find('.menu, .menu_login, .menu_messages').stop(true, true).show();
    }
    else {
        $(choice).find('.menu, .menu_login, .menu_messages').stop(true, true).slideDown(300, 'easeInOutBack');
    }
    if ($('.menu_message_morelink') && $(choice).attr('id') == 'nav_messages_li' && $('#notification_count').is(":visible")) {
        $('#notification_count').hide();
        if (mw.echo) {
            var api = new mw.Api({ajax: {cache: false}}), notifications, data, unread = [], apiData;
            apiData = {'action': 'query', 'meta': 'notifications', 'notformat': 'flyout', 'notprop': 'index|list|count', 'notlimit': 5, };
            api.get(mw.echo.desktop.appendUseLang(apiData)).done(function (result) {
                notifications = result.query.notifications;
                unread = [];
                $.each(notifications.index, function (index, id) {
                    data = notifications.list[id];
                    if (!data.read) {
                        unread.push(id);
                    }
                });
                if (unread.length == 0)return;
                api.post(mw.echo.desktop.appendUseLang({'action': 'echomarkread', 'list': unread.join('|'), 'token': mw.user.tokens.get('editToken')})).done(function (result) {
                }).fail(function () {
                });
            });
        }
    }
}
function menu_hide(choice) {
    if ($.browser.msie && parseFloat($.browser.version) < 9) {
        $(choice).find('.menu, .menu_login, .menu_messages').stop(true, true).hide();
    }
    else {
        $(choice).find('.menu, .menu_login, .menu_messages').stop(true, true).slideUp(200);
    }
};
var swfobject = function () {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function () {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1", ag = [0, 0, 0], ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } catch (Z) {
                }
            }
        }
        return{w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac}
    }(), k = function () {
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function () {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) {
                    (function () {
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) {
                (function () {
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {success: false, id: Y};
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return!a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {success: false, id: X};
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {
        }
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return(Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }

    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return{registerObject: function (ab, X, aa, Z) {
        if (M.w3 && ab && X) {
            var Y = {};
            Y.id = ab;
            Y.swfVersion = X;
            Y.expressInstall = aa;
            Y.callbackFn = Z;
            o[o.length] = Y;
            w(ab, false)
        } else {
            if (Z) {
                Z({success: false, id: ab})
            }
        }
    }, getObjectById: function (X) {
        if (M.w3) {
            return z(X)
        }
    }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
        var X = {success: false, id: ah};
        if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
            w(ah, false);
            K(function () {
                ae += "";
                ag += "";
                var aj = {};
                if (af && typeof af === r) {
                    for (var al in af) {
                        aj[al] = af[al]
                    }
                }
                aj.data = ab;
                aj.width = ae;
                aj.height = ag;
                var am = {};
                if (ad && typeof ad === r) {
                    for (var ak in ad) {
                        am[ak] = ad[ak]
                    }
                }
                if (Z && typeof Z === r) {
                    for (var ai in Z) {
                        if (typeof am.flashvars != D) {
                            am.flashvars += "&" + ai + "=" + Z[ai]
                        } else {
                            am.flashvars = ai + "=" + Z[ai]
                        }
                    }
                }
                if (F(Y)) {
                    var an = u(aj, am, ah);
                    if (aj.id == ah) {
                        w(ah, true)
                    }
                    X.success = true;
                    X.ref = an
                } else {
                    if (aa && A()) {
                        aj.data = aa;
                        P(aj, am, ah, ac);
                        return
                    } else {
                        w(ah, true)
                    }
                }
                if (ac) {
                    ac(X)
                }
            })
        } else {
            if (ac) {
                ac(X)
            }
        }
    }, switchOffAutoHideShow: function () {
        m = false
    }, ua: M, getFlashPlayerVersion: function () {
        return{major: M.pv[0], minor: M.pv[1], release: M.pv[2]}
    }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) {
        if (M.w3) {
            return u(Z, Y, X)
        } else {
            return undefined
        }
    }, showExpressInstall: function (Z, aa, X, Y) {
        if (M.w3 && A()) {
            P(Z, aa, X, Y)
        }
    }, removeSWF: function (X) {
        if (M.w3) {
            y(X)
        }
    }, createCSS: function (aa, Z, Y, X) {
        if (M.w3) {
            v(aa, Z, Y, X)
        }
    }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) {
        var Z = j.location.search || j.location.hash;
        if (Z) {
            if (/\?/.test(Z)) {
                Z = Z.split("?")[1]
            }
            if (aa == null) {
                return L(Z)
            }
            var Y = Z.split("&");
            for (var X = 0; X < Y.length; X++) {
                if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                    return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                }
            }
        }
        return""
    }, expressInstallCallback: function () {
        if (a) {
            var X = c(R);
            if (X && l) {
                X.parentNode.replaceChild(l, X);
                if (Q) {
                    w(Q, true);
                    if (M.ie && M.win) {
                        l.style.display = "block"
                    }
                }
                if (E) {
                    E(B)
                }
            }
            a = false
        }
    }}
}();
;
;
(function (a) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], a)
    } else {
        a(jQuery)
    }
}(function ($) {
    var j = $.scrollTo = function (a, b, c) {
        return $(window).scrollTo(a, b, c)
    };
    j.defaults = {axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1, limit: true};
    j.window = function (a) {
        return $(window)._scrollable()
    };
    $.fn._scrollable = function () {
        return this.map(function () {
            var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin)return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return/webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    };
    $.fn.scrollTo = function (f, g, h) {
        if (typeof g == 'object') {
            h = g;
            g = 0
        }
        if (typeof h == 'function')h = {onAfter: h};
        if (f == 'max')f = 9e9;
        h = $.extend({}, j.defaults, h);
        g = g || h.duration;
        h.queue = h.queue && h.axis.length > 1;
        if (h.queue)g /= 2;
        h.offset = both(h.offset);
        h.over = both(h.over);
        return this._scrollable().each(function () {
            if (f == null)return;
            var d = this, $elem = $(d), targ = f, toff, attr = {}, win = $elem.is('html,body');
            switch (typeof targ) {
                case'number':
                case'string':
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = win ? $(targ) : $(targ, this);
                    if (!targ.length)return;
                case'object':
                    if (targ.is || targ.style)toff = (targ = $(targ)).offset()
            }
            var e = $.isFunction(h.offset) && h.offset(d, targ) || h.offset;
            $.each(h.axis.split(''), function (i, a) {
                var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = j.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (h.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += e[pos] || 0;
                    if (h.over[pos])attr[key] += targ[a == 'x' ? 'width' : 'height']() * h.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (h.limit && /^\d+$/.test(attr[key]))attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && h.queue) {
                    if (old != attr[key])animate(h.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(h.onAfter);
            function animate(a) {
                $elem.animate(attr, g, h.easing, a && function () {
                    a.call(this, targ, h)
                })
            }
        }).end()
    };
    j.max = function (a, b) {
        var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c;
        if (!$(a).is('html,body'))return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    };
    function both(a) {
        return $.isFunction(a) || typeof a == 'object' ? a : {top: a, left: a}
    };
    return j
}));
;
if (typeof console == "undefined" || typeof console.log == "undefined")var console = {log: function () {
}};
(function ($) {
    $('#fb_login_head,#fb_login').live('click', function (e) {
        e.preventDefault();
        alert('Facebook login still loading. Please try again when page is fully loaded.');
    });
})(jQuery);
WH = WH || {};
WH.FB = WH.FB || {};
WH.FB.permsExtended = 'email,user_interests,user_likes,user_work_history,user_education_history,user_location';
WH.FB.permsBasic = 'email';
WH.FB.doWikiHowLogin = function (authResponse) {
    var today = new Date();
    var expires_date = (new Date(today.getTime() + 3600 * 1000)).toGMTString();
    document.cookie = 'wiki_fbuser=' + escape(authResponse.userID) + ';expires=' + expires_date;
    document.cookie = 'wiki_fbtoken=' + escape(authResponse.accessToken) + ';expires=' + expires_date;
    window.location = '/Special:FBLogin';
}
WH.FB.storeContact = function (accessToken) {
    jQuery.get('/Special:FBAppContact?token=' + accessToken);
}
WH.FB.doLogin = function () {
    jQuery('#bubbles #login').html('[Logging in <img src="' + wgCDNbase + '/skins/WikiHow/images/fb_loading.gif"/>]');
    WH.FB.doFBLogin(function (response) {
        WH.FB.doWikiHowLogin(response.authResponse);
    });
}
WH.FB.initEventListeners = function () {
    jQuery('#fb_login_head,#fb_login').die('click').live('click', function () {
        WH.FB.doLogin();
    });
    jQuery('#fl_enable_acct').live('click', function (e) {
        e.preventDefault();
        WH.FB.doFBLogin(function (response) {
            $('#dialog-box').html('<img src="/extensions/wikihow/rotate.gif" alt="" />');
            jQuery('#dialog-box').dialog({width: 750, modal: true, closeText: 'Close', position: '10px', title: 'Are you sure you want to Enable Facebook Login?'});
            $('#dialog-box').load('/Special:FBLink', {token: response.authResponse.accessToken, a: 'confirm'});
        }, WH.FB.permsExtended);
    });
}
WH.FB.initLikeButtons = function () {
    if ($.browser.msie && $.browser.version <= 7) {
        $(".like_button").html("");
    }
}
WH.FB.init = function (debug) {
    window.fbAsyncInit = function () {
        chUrl = wgServer + '/extensions/wikihow/xd_receiver.htm';
        FB.init({appId: wgFBAppId, cookie: true, status: true, xfbml: true, oauth: true, channelUrl: chUrl});
        WH.FB.initEventListeners();
        FB.Event.subscribe('edge.create', function (targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
        });
        FB.Event.subscribe('edge.remove', function (targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
        });
    };
    var locale = 'en_US';
    if (wgUserLanguage != 'en') {
        locale = wgUserLanguage + '_' + wgUserLanguage.toUpperCase();
    }
    if (wgUserLanguage == 'pt') {
        locale = 'pt_BR';
    }
    WH.FB.initLikeButtons();
    (function () {
        var fbs = '//connect.facebook.net/' + locale + '/all.js';
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = document.location.protocol + fbs;
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
    }());
}
WH.FB.doFBLogin = function (callback, perms) {
    perms = perms == null ? WH.FB.permsBasic : perms;
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            callback(response);
        } else {
            FB.login(function (response) {
                if (response.authResponse) {
                    callback(response);
                } else {
                    alert("Oops. We can't connect you to Facebook. Please check back later");
                }
            }, {scope: perms});
        }
    });
};
if (typeof console == "undefined" || typeof console.log == "undefined")var console = {log: function () {
}};
WH = WH || {};
WH.GP = WH.GP || {};
WH.GP.pressed = false;
WH.GP.init = function () {
    (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js?onload=renderGPlusButtons';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    }());
    $('#gplus_connect, #gplus_connect_head').click(function () {
        WH.GP.pressed = true;
        return false;
    });
    $('#pb-gp-disco').click(function () {
        var confirm = false;
        $('<div></div>').appendTo('body').html('If you disconnect your G+ account, you won\'t be able to reconnect it. We highly advise against doing this. Are you sure you want to continue?').dialog({modal: true, title: 'Are you sure you want to do this?', zIndex: 10000, autoOpen: true, width: 400, resizable: false, closeText: 'Close', buttons: {Cancel: function () {
            confirm = false;
            $(this).dialog("close");
        }, "Disconnect": function () {
            confirm = true;
            $(this).dialog("close");
        }}, close: function (event, ui) {
            $(this).remove();
            if (confirm) {
                WH.GP.disconnectUser();
            }
        }});
        return false;
    });
}
WH.GP.doWikiHowLogin = function (authResponseToken) {
    var request = gapi.client.plus.people.get({'userId': 'me'});
    request.execute(function (profile) {
        gapi.client.load('oauth2', 'v2', function () {
            var request2 = gapi.client.oauth2.userinfo.get();
            request2.execute(function (obj) {
                if (obj['email']) {
                    email = obj['email'];
                    var submit_form = $(document.createElement('form'));
                    var callback_url;
                    if (wgContentLanguage == 'en') {
                        callback_url = '/Special:GPlusLogin';
                    }
                    else {
                        callback_url = '/Special:GPlusLogin';
                    }
                    submit_form.attr('method', 'post').attr('action', callback_url).attr('action', '/Special:GPlusLogin').attr('enctype', 'multipart/form-data').append($('<input name="user_id" value="' + profile.id + '"/>')).append($('<input name="user_name" value="' + profile.displayName + '"/>')).append($('<input name="user_email" value="' + email + '"/>')).append($('<input name="user_avatar" value="' + profile.image.url + '"/>')).appendTo('body').submit();
                }
            });
        });
    });
}
function onSignInCallback(authResult) {
    if (WH.GP.pressed) {
        gapi.client.load('plus', 'v1', function () {
            if (authResult['access_token']) {
                gapi.auth.setToken(authResult);
                WH.GP.doWikiHowLogin(authResult['access_token']);
            } else if (authResult['error']) {
                console.log('There was an error: ' + authResult['error']);
            }
            console.log('authResult', authResult);
        });
    }
}
function renderGPlusButtons() {
    gapi.signin.render('gplus_connect_head', {'callback': 'onSignInCallback', 'clientid': '475770217963-cj49phca8tqki2ggs0ttcaerhs8339eh.apps.googleusercontent.com', 'cookiepolicy': 'http://wikihow.com', 'apppackagename': 'com.wikihow.wikihowapp', 'requestvisibleactions': 'http://schemas.google.com/AddActivity', 'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'});
    gapi.signin.render('gplus_connect', {'callback': 'onSignInCallback', 'clientid': '475770217963-cj49phca8tqki2ggs0ttcaerhs8339eh.apps.googleusercontent.com', 'cookiepolicy': 'http://wikihow.com', 'apppackagename': 'com.wikihow.wikihowapp', 'requestvisibleactions': 'http://schemas.google.com/AddActivity', 'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'});
    gapi.signin.render('gplus_disco_link', {'clientid': '475770217963-cj49phca8tqki2ggs0ttcaerhs8339eh.apps.googleusercontent.com', 'cookiepolicy': 'http://wikihow.com', 'requestvisibleactions': 'http://schemas.google.com/AddActivity', 'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'});
}
WH.GP.disconnectUser = function () {
    var authResult = gapi.auth.getToken();
    var access_token = authResult['access_token'];
    if (access_token) {
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;
        $.ajax({type: 'GET', url: revokeUrl, async: false, contentType: "application/json", dataType: 'jsonp', success: function (nullResponse) {
            location.href = '/Special:GPlusLogin?disconnect=user';
        }, error: function (e) {
            alert('error: Go to https://plus.google.com/apps to manually disconnect account.');
        }});
    }
    else {
        alert('Could not find token');
    }
};
function loadGoogleCSESearchBox(whLang) {
    (function () {
        var f = document.getElementById('cse-search-box');
        if (!f) {
            f = document.getElementById('searchbox_demo');
        }
        if (f && f.q) {
            var q = f.q;
            var n = navigator;
            var l = location;
            var su = function () {
                var u = document.createElement('input');
                var v = document.location.toString();
                var existingSiteurl = /(?:[?&]siteurl=)([^&#]*)/.exec(v);
                if (existingSiteurl) {
                    v = decodeURI(existingSiteurl[1]);
                }
                var delimIndex = v.indexOf('://');
                if (delimIndex >= 0) {
                    v = v.substring(delimIndex + '://'.length, v.length);
                }
                u.name = 'siteurl';
                u.value = v;
                u.type = 'hidden';
                f.appendChild(u);
            };
            if (n.appName == 'Microsoft Internet Explorer') {
                var s = f.parentNode.childNodes;
                for (var i = 0; i < s.length; i++) {
                    if (s[i].nodeName == 'SCRIPT' && s[i].attributes['src'] && s[i].attributes['src'].nodeValue == unescape('http:\x2F\x2Fwww.google.com\x2Fcoop\x2Fcse\x2Fbrand?form=cse-search-box\x26lang=en')) {
                        su();
                        break;
                    }
                }
            } else {
                su();
            }
            if (n.platform == 'Win32') {
            }
            if (window.history.navigationMode) {
                window.history.navigationMode = 'compatible';
            }
            var b = function () {
                if (q.value == '' && location.href.match(/^http:\/\//)) {
                    q.style.background = '#FFFFFF url(http:\x2F\x2Fpad3.whstatic.com\x2Fskins\x2FWikiHow\x2Fgoogle_custom_search_watermark_' + whLang + '.gif) 8px no-repeat';
                }
            };
            var f = function () {
                q.style.background = '#ffffff';
            };
            q.onfocus = f;
            q.onblur = b;
            if (!/[&?]q=[^&]/.test(l.search)) {
                b();
            }
        }
    })();
};
var gatUser = 'Anon_Editing';
if (typeof(wgUserName) != "undefined") {
    if (wgUserName != null) {
        gatUser = 'Registered_Editing';
    }
}
function gatTrack(category, action, label, value) {
    var call = '';
    if (typeof(value) != "undefined") {
        call = category + ', ' + action + ', ' + label + ', ' + value;
        _gaq.push(['_trackEvent', category, action, label, value]);
    } else if (typeof(label) != "undefined") {
        call = category + ', ' + action + ', ' + label;
        _gaq.push(['_trackEvent', category, action, label]);
    } else {
        call = category + ', ' + action;
        _gaq.push(['_trackEvent', category, action]);
    }
}
function gatStartObservers() {
    var regClickEvent = function (id, param2, param3) {
        var evtType, fn;
        if (typeof param2 == 'string') {
            evtType = param2;
            fn = param3;
        } else {
            evtType = 'click';
            fn = param2;
        }
        if (evtType == 'click') {
            jQuery('#' + id).click(fn);
        } else if (evtType == 'submit') {
            jQuery('#' + id).submit(fn);
        }
    };
    var regClickEventByClass = function (klass, param2, param3) {
        var evtType, fn;
        if (typeof param2 == 'string') {
            evtType = param2;
            fn = param3;
        } else {
            evtType = 'click';
            fn = param2;
        }
        if (evtType == 'click') {
            jQuery('.' + klass).click(fn);
        } else if (evtType == 'submit') {
            jQuery('.' + klass).submit(fn);
        }
    };
    if (document.getElementById("gatEdit")) {
        regClickEvent('gatEdit', function (e) {
            gatTrack(gatUser, "Edit", "Edit_page");
        });
    }
    if (document.getElementById("gatEditFooter")) {
        regClickEvent('gatEditFooter', function (e) {
            gatTrack(gatUser, "Edit", "Edit_footer");
        });
    }
    if (document.getElementById("gatWriteAnArticle")) {
        regClickEvent('gatWriteAnArticle', function (e) {
            gatTrack(gatUser, "Write1", "Write1");
        });
    }
    if (document.getElementById("gatWriteAnArticleFooter")) {
        regClickEvent('gatWriteAnArticleFooter', function (e) {
            gatTrack(gatUser, "Write1", "Write1_footer");
        });
    }
    if (document.getElementById("gatSuggestedTitle")) {
        regClickEvent('gatSuggestedTitle', function (e) {
            gatTrack(gatUser, "Write2", "Articles_to_write");
        });
    }
    if (document.getElementById("gatCreateForm")) {
        regClickEvent('gatCreateForm', 'submit', function (e) {
            gatTrack(gatUser, "Write2", "Own_topic");
        });
    }
    if (document.getElementById('gatCreateFormTopics')) {
        regClickEvent('gatCreateFormTopics', 'submit', function (e) {
            gatTrack(gatUser, "Write2", "Suggest_topic");
        });
    }
    if (document.getElementById('gatPubAssist')) {
        regClickEvent('gatPubAssist', function (e) {
            gatTrack(gatUser, "Pub_assist");
        });
    }
    if (document.getElementById('gatCreateSubmitAnyway')) {
        regClickEvent('gatCreateSubmitAnyway', function (e) {
            gatTrack(gatUser, "Write3");
        });
    }
    if (document.getElementById('cp_next')) {
        regClickEvent('cp_next', function (e) {
            gatTrack(gatUser, "Write3");
        });
    }
    if (document.getElementById('gatTalkPost')) {
        regClickEvent('gatTalkPost', 'submit', function (e) {
            gatTrack("Communication", "Talk_post");
        });
    }
    if (document.getElementById('gatDiscussionPost')) {
        regClickEvent('gatDiscussionPost', 'submit', function (e) {
            gatTrack("Communication", "Discussion_post");
        });
    }
    if (document.getElementById("gatDiscussionFooter")) {
        regClickEvent('gatDiscussionFooter', function (e) {
            gatTrack("Communication", "Discussion_page", "Discuss_footer");
        });
    }
    if (document.getElementById("gatDiscussionTab")) {
        regClickEvent('gatDiscussionTab', function (e) {
            gatTrack("Communication", "Discussion_page", "Discuss_tab");
        });
    }
    if (document.getElementById('gatNewMessage')) {
        regClickEvent('gatNewMessage', function (e) {
            gatTrack("Communication", "Msg_notification", "Msg_notification");
        });
    }
    if (document.getElementById('nav_login') && (gatUser == 'Anon_Editing')) {
        regClickEvent('nav_login', function (e) {
            gatTrack("Accounts", "Begin_login", "Begin_login");
        });
    }
    if (document.getElementById('nav_signup') && (gatUser == 'Anon_Editing')) {
        regClickEvent('nav_signup', function (e) {
            gatTrack("Accounts", "Begin_login", "Begin_login");
        });
    }
    if (document.getElementById('userloginlink_signup')) {
        regClickEvent('userloginlink_signup', function (e) {
            gatTrack("Accounts", "Create_account", "Any_page");
        });
    }
    if (document.getElementById('userloginlink_login')) {
        regClickEvent('userloginlink_login', function (e) {
            gatTrack("Accounts", "Create_account", "Any_page");
        });
    }
    if (document.getElementById('wpLoginattempt')) {
        regClickEvent('wpLoginattempt', function (e) {
            gatTrack("Accounts", "Login");
        });
    }
    if (document.getElementById('wpCreateaccount')) {
        regClickEvent('wpCreateaccount', function (e) {
            gatTrack("Accounts", "Finish_account");
        });
    }
    if (document.getElementById('bubble_search')) {
        regClickEvent('bubble_search', 'submit', function (e) {
            gatTrack("Search", "Search", "L-search");
        });
    }
    if (document.getElementById('footer_search')) {
        regClickEvent('footer_search', 'submit', function (e) {
            gatTrack("Search", "Search", "L-search");
        });
    }
    window.oTrackUserAction = function () {
        window['optimizely'] = window['optimizely'] || [];
        window['optimizely'].push(["trackEvent", "user_action", {'anonymous': true}]);
        var actions = getCookie('nuacts');
        if (actions === undefined) {
            actions = 0;
        }
        actions++;
        $.cookie('nuacts', actions, {expires: 365, path: '/'});
        if (actions == 1) {
            window['optimizely'].push(["trackEvent", "user_action1"]);
        }
        else if (actions == 5) {
            window['optimizely'].push(["trackEvent", "user_action5"]);
        }
        else if (actions == 10) {
            window['optimizely'].push(["trackEvent", "user_action10"]);
        }
    }
    var oTrackEdit = function () {
        if (typeof window['wgNamespaceNumber'] !== 'undefined' && window.wgNamespaceNumber == 0) {
            window['optimizely'] = window['optimizely'] || [];
            window['optimizely'].push(["trackEvent", "edit", {'anonymous': true}]);
            var edits = getCookie('num_edits');
            if (edits === undefined) {
                edits = 0;
            }
            edits++;
            $.cookie('num_edits', edits, {expires: 365, path: '/'});
            if (edits == 1) {
                window['optimizely'].push(["trackEvent", "edit1"]);
            }
            else if (edits == 5) {
                window['optimizely'].push(["trackEvent", "edit5"]);
            }
            else if (edits == 10) {
                window['optimizely'].push(["trackEvent", "edit10"]);
            }
            window.oTrackUserAction();
        }
    }
    if (document.getElementById('wpSave')) {
        if (typeof isGuided !== "undefined" && isGuided) {
            regClickEventByClass('wpSave', function (e) {
                oTrackEdit();
                gatTrack(gatUser, "Save", "Save_button");
            });
        }
        else {
            regClickEvent('wpSave', function (e) {
                oTrackEdit();
                gatTrack(gatUser, "Save", "Save_button");
            });
        }
    }
    if (document.getElementById('wpPreview')) {
        regClickEvent('wpPreview', function (e) {
            gatTrack(gatUser, "Preview", "Preview_button");
        });
    }
    if (document.getElementById('gatPSBSave')) {
        regClickEvent('gatPSBSave', function (e) {
            gatTrack(gatUser, "Save", "Save_bar");
        });
    }
    if (document.getElementById('gatPSBPreview')) {
        regClickEvent('gatPSBPreview', function (e) {
            gatTrack(gatUser, "Preview", "Preview_bar");
        });
    }
    if (document.getElementById('gatGuidedSave')) {
        regClickEvent('gatGuidedSave', function (e) {
            gatTrack(gatUser, "Save", "Save_button");
        });
    }
    if (document.getElementById('gatGuidedPreview')) {
        regClickEvent('gatGuidedPreview', function (e) {
            gatTrack(gatUser, "Preview", "Preview_button");
        });
    }
    if (document.getElementById('gatImagePopup')) {
        regClickEvent('gatImagePopup', function (e) {
            gatTrack(gatUser, "Add_img", "Editing_page");
        });
    }
    if (document.getElementById('gatWPUploadPopup')) {
        regClickEvent('gatWPUploadPopup', function (e) {
            gatTrack("Registered_Editing", "Upload_img", "Editing_page");
        });
    }
    if (document.getElementById('gatImageUpload')) {
        regClickEvent('gatImageUpload', function (e) {
            gatTrack(gatUser, "Add_img", "Editing_tools");
        });
    }
    if (document.getElementById('gatWPUpload')) {
        regClickEvent('gatWPUpload', function (e) {
            gatTrack(gatUser, "Upload_img", "Editing_tools");
        });
    }
    if (document.getElementById('gatVideoImport')) {
        regClickEvent('gatVideoImport', function (e) {
            gatTrack(gatUser, "Choose_video", "Editing_tools");
        });
    }
    if (document.getElementById('gatVideoImportIt')) {
        regClickEvent('gatVideoImportIt', function (e) {
            gatTrack(gatUser, "Import_video", "Editing_tools");
        });
    }
    if (document.getElementById('gatVideoImportEdit')) {
        regClickEvent('gatVideoImportEdit', function (e) {
            gatTrack(gatUser, "Choose_video", "Editing_page");
        });
    }
    if (document.getElementById('gatVideoImportItFormEdit')) {
        regClickEvent('gatVideoImportItFormEdit', 'submit', function (e) {
            gatTrack("Registered_Editing", "Import_video", "Editing_page");
        });
    }
    if (document.getElementById('gatCreateArticle')) {
        regClickEvent('gatCreateArticle', function (e) {
            gatTrack(gatUser, "Create_request");
        });
    }
    if (document.getElementById('gatWidgetBottom')) {
        regClickEvent('gatWidgetBottom', function (e) {
            gatTrack("Accounts", "Create_account", "RC_widget");
        });
    }
    if (document.getElementById('rcElement_list')) {
        regClickEvent('rcElement_list', function (e) {
            gatTrack("Browsing", "Widget_click");
        });
    }
    if (document.getElementById("gatSharingEmail")) {
        regClickEvent('gatSharingEmail', function (e) {
            gatTrack("Sharing", "Share_article", "Email");
        });
    }
    if (document.getElementById("gatSharingFacebook")) {
        regClickEvent('gatSharingFacebook', function (e) {
            gatTrack("Sharing", "Share_article", "Facebook");
        });
    }
    if (document.getElementById("gatSharingTwitter")) {
        regClickEvent('gatSharingTwitter', function (e) {
            gatTrack("Sharing", "Share_article", "Twitter");
        });
    }
    if (document.getElementById("gatSharingStumbleupon")) {
        regClickEvent('gatSharingStumbleupon', function (e) {
            gatTrack("Sharing", "Share_article", "Stumbleupon");
        });
    }
    if (document.getElementById("gatSharingDigg")) {
        regClickEvent('gatSharingDigg', function (e) {
            gatTrack("Sharing", "Share_article", "Digg");
        });
    }
    if (document.getElementById("gatSharingBlogger")) {
        regClickEvent('gatSharingBlogger', function (e) {
            gatTrack("Sharing", "Share_article", "Blogger");
        });
    }
    if (document.getElementById("gatSharingDelicious")) {
        regClickEvent('gatSharingDelicious', function (e) {
            gatTrack("Sharing", "Share_article", "Delicious");
        });
    }
    if (document.getElementById("gatSharingGoogleBookmarks")) {
        regClickEvent('gatSharingGoogleBookmarks', function (e) {
            gatTrack("Sharing", "Share_article", "Google_bookmarks");
        });
    }
    if (document.getElementById("gatSharingEmbedding")) {
        regClickEvent('gatSharingEmbedding', function (e) {
            gatTrack("Sharing", "Embedding", "Embed_footer");
        });
    }
    if (document.getElementById("gatPrintView")) {
        regClickEvent('gatPrintView', function (e) {
            gatTrack("Using", "Print_article", "Footer");
        });
    }
    if (document.getElementById("gatThankAuthors")) {
        regClickEvent('gatThankAuthors', function (e) {
            gatTrack("Article_response", "Kudos", "Thank_authors");
        });
    }
    if (document.getElementById("gatAccuracyYes")) {
        regClickEvent('gatAccuracyYes', function (e) {
            gatTrack("Article_response", "Accuracy", "Accurate");
        });
    }
    if (document.getElementById("gatAccuracyNo")) {
        regClickEvent('gatAccuracyNo', function (e) {
            gatTrack("Article_response", "Accuracy", "Not_accurate");
        });
    }
    if (document.getElementById("gatIphoneNotice")) {
        regClickEvent('gatIphoneNotice', function (e) {
            gatTrack("Mobile_use", "iPhone_download", "iPhone_download");
        });
    }
    if (document.getElementById("gatIphoneNoticeHide")) {
        regClickEvent('gatIphoneNoticeHide', function (e) {
            gatTrack("Mobile_use", "Hide_iPhone_DL", "Hide_iPhone_DL");
        });
    }
    if (document.getElementById("gatAvatarImageSubmit")) {
        regClickEvent('gatAvatarImageSubmit', function (e) {
            gatTrack("Profile", "Select_avatar_image", "Select_avatar_image");
        });
    }
    if (document.getElementById("gatAvatarCropAndSave")) {
        regClickEvent('gatAvatarCropAndSave', function (e) {
            gatTrack("Profile", "Save_avatar_image", "Save_avatar_image");
        });
    }
    if (document.getElementById("gatProfileCreateButton")) {
        regClickEvent('gatProfileCreateButton', function (e) {
            gatTrack("Profile", "Begin_profile", "Begin_profile");
        });
    }
    if (document.getElementById("gatProfileSaveButton")) {
        regClickEvent('gatProfileSaveButton', function (e) {
            gatTrack("Profile", "Save_profile", "Save_profile");
        });
    }
    if (document.getElementById("gatProfileEditButton")) {
        regClickEvent('gatProfileEditButton', function (e) {
            gatTrack("Profile", "Edit_profile", "Edit_profile");
        });
    }
    if (document.getElementById("gatFBCLogin")) {
        regClickEvent('gatFBCLogin', function (e) {
            gatTrack("Accounts", "Login", "FB_connect_login");
        });
    }
    if (document.getElementById("gatFBCHeader")) {
        regClickEvent('gatFBCHeader', function (e) {
            gatTrack("Accounts", "Login", "FB_connect_login");
        });
    }
    if (document.getElementById("gatFBCProfileSave")) {
        regClickEvent('gatFBCProfileSave', function (e) {
            gatTrack("Accounts", "Create_account", "FB_connect");
        });
    }
    if (document.getElementById("gatRandom")) {
        regClickEvent('gatRandom', function (e) {
            gatTrack("Browsing", "Random_article", "Random_article");
        });
    }
    if (document.getElementById("gatBreadCrumb")) {
        regClickEvent('gatBreadCrumb', function (e) {
            gatTrack("Browsing", "Category_browsing", "Bread_crumb");
        });
    }
    if (document.getElementById("method_toc")) {
        regClickEvent('method_toc', function (e) {
            gatTrack("Browsing", "Method_browsing", "alt_method");
        });
    }
    if (document.getElementById("gatFooterCategories")) {
        regClickEvent('gatFooterCategories', function (e) {
            gatTrack("Browsing", "Category_browsing", "Footer_categories");
        });
    }
    if (document.getElementById("gatFollowFacebook")) {
        regClickEvent('gatFollowFacebook', function (e) {
            gatTrack("Followers", "FB_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowTwitter")) {
        regClickEvent('gatFollowTwitter', function (e) {
            gatTrack("Followers", "Twitter_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowGoogle")) {
        regClickEvent('gatFollowGoogle', function (e) {
            gatTrack("Followers", "iGoogle_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowRss")) {
        regClickEvent('gatFollowRss', function (e) {
            gatTrack("Followers", "RSS_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowBuzz")) {
        regClickEvent('gatFollowBuzz', function (e) {
            gatTrack("Followers", "Buzz_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowEmail")) {
        regClickEvent('gatFollowEmail', function (e) {
            gatTrack("Followers", "Email_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowApp")) {
        regClickEvent('gatFollowApp', function (e) {
            gatTrack("Followers", "App_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowYahoo")) {
        regClickEvent('gatFollowYahoo', function (e) {
            gatTrack("Followers", "Yahoo_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowPinterest")) {
        regClickEvent('gatFollowPinterest', function (e) {
            gatTrack("Followers", "Pinterest_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowAndroid")) {
        regClickEvent('gatFollowAndroid', function (e) {
            gatTrack("Followers", "Android_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowTumblr")) {
        regClickEvent('gatFollowTumblr', function (e) {
            gatTrack("Followers", "Tumblr_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowPlus")) {
        regClickEvent('gatFollowPlus', function (e) {
            gatTrack("Followers", "Plus_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatFollowStumbleupon")) {
        regClickEvent('gatFollowStumbleupon', function (e) {
            gatTrack("Followers", "Stumbleupon_follow", "Follow_wgt");
        });
    }
    if (document.getElementById("gatSamplePdf1")) {
        regClickEvent('gatSamplePdf1', function (e) {
            gatTrack("Samples", "Pdf_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSamplePdf2")) {
        regClickEvent('gatSamplePdf2', function (e) {
            gatTrack("Samples", "Pdf_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSamplePdf3")) {
        regClickEvent('gatSamplePdf3', function (e) {
            gatTrack("Samples", "Pdf_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleWord1")) {
        regClickEvent('gatSampleWord1', function (e) {
            gatTrack("Samples", "Word_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleWord2")) {
        regClickEvent('gatSampleWord2', function (e) {
            gatTrack("Samples", "Word_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleWord3")) {
        regClickEvent('gatSampleWord3', function (e) {
            gatTrack("Samples", "Word_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleTxt1")) {
        regClickEvent('gatSampleTxt1', function (e) {
            gatTrack("Samples", "Txt_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleTxt2")) {
        regClickEvent('gatSampleTxt2', function (e) {
            gatTrack("Samples", "Txt_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleTxt3")) {
        regClickEvent('gatSampleTxt3', function (e) {
            gatTrack("Samples", "Txt_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleGdoc1")) {
        regClickEvent('gatSampleGdoc1', function (e) {
            gatTrack("Samples", "Gdoc_open", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleGdoc2")) {
        regClickEvent('gatSampleGdoc2', function (e) {
            gatTrack("Samples", "Gdoc_open", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleGdoc3")) {
        regClickEvent('gatSampleGdoc3', function (e) {
            gatTrack("Samples", "Gdoc_open", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleXls1")) {
        regClickEvent('gatSampleXls1', function (e) {
            gatTrack("Samples", "Excel_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleXls2")) {
        regClickEvent('gatSampleXls2', function (e) {
            gatTrack("Samples", "Excel_download", "Sample_Page");
        });
    }
    if (document.getElementById("gatSampleXls3")) {
        regClickEvent('gatSampleXls3', function (e) {
            gatTrack("Samples", "Excel_download", "Sample_Page");
        });
    }
}
function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return""; else
        return results[1];
};
(function ($) {
    $(document).ready(function () {
        $('#ccsfg_btn').click(function () {
            var url = "/extensions/wikihow/common/jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.min.js";
            $.getScript(url, function () {
                jQuery('#dialog-box').load('/Special:FollowWidget?getEmailForm=1', function () {
                    var _dialog = $('#ccsfg');
                    var _title = _dialog.find('h4').html();
                    _dialog.attr('title', _title);
                    _dialog.find('h4').hide();
                    var _action = _dialog.attr('action');
                    var _submitBtn = _dialog.find('#signup');
                    var _submitBtnText = _submitBtn.val();
                    _submitBtn.remove();
                    var dialog_buttons = {};
                    dialog_buttons[_submitBtnText] = function () {
                        query = $(_dialog).serializeArray()
                        json = {};
                        for (i in query) {
                            json[query[i].name] = query[i].value
                        }
                        json['RequestType'] = 'ajax';
                        $(".waiting").show();
                        $('.ui-dialog-buttonpane button').attr('disabled', 'disabled');
                        $.get(_action, json, function (data) {
                            tmp = $('<div id="tmp"></div>');
                            $(tmp).html(data);
                            code = $(tmp).find('#code').attr('title');
                            if (code == 201) {
                                if (json['SuccessURL']) {
                                    window.location = json['SuccessURL'];
                                }
                            }
                            else {
                                if (json['FailureURL']) {
                                    window.location = json['FailureURL'];
                                }
                            }
                            $('#ccsfg').html(data);
                            $('#close').click(function () {
                                $('#ccsfg').dialog('close');
                                return false;
                            });
                            _btnPane = $('.ui-dialog-buttonpane');
                            _btnPane.remove();
                        });
                    };
                    _dialog.dialog({autoOpen: false, resizable: false, draggable: false, width: 500, buttons: dialog_buttons, modal: true, closeText: 'Close'});
                    _dialog.dialog('open');
                    $('.ui-close').click(function () {
                        $('#ccsfg').dialog('close');
                    });
                });
            });
        });
    });
})(jQuery);
;
var focusElement = "";
jQuery(document).ready(function () {
    jQuery(".input_med").focus(function () {
        id = $(this).attr("id");
        focusElement = id;
        if ($("#" + id + "_mark").is(":visible")) {
            $("#" + id + "_error").show();
        }
        else {
            $("#" + id + "_info").show();
        }
    });
    jQuery(".input_med").blur(function () {
        id = $(this).attr("id");
        if (focusElement == id)
            focusElement = "";
        $("#" + id + "_error").hide();
        if ($("#" + id + "_showhide").val() != 1)
            $("#" + id + "_info").hide();
    });
    jQuery(".mw-info").hover(function () {
        idInfo = $(this).attr("id");
        id = idInfo.substring(0, idInfo.length - 5);
        $("#" + id + "_showhide").val(1);
    }, function () {
        idInfo = $(this).attr("id");
        id = idInfo.substring(0, idInfo.length - 5);
        $("#" + id + "_showhide").val(0);
        if (id != focusElement)
            $(this).hide();
    });
    jQuery("#wpUseRealNameAsDisplay").change(function () {
        if (jQuery("#wpUseRealNameAsDisplay").is(':checked')) {
            $("#real_name_row").show();
        } else {
            $("#real_name_row").hide();
            $("#wpRealName").val('');
        }
    });
    if (jQuery("#wpUseRealNameAsDisplay").is(':checked')) {
        $("#real_name_row").show();
    }
    jQuery("#userloginForm #wpName, #userloginForm #wpName2").blur(function () {
        checkName(jQuery(this).val());
    })
    jQuery("#userloginForm #wpPassword2").blur(function () {
        pass1 = jQuery(this).val();
        if (pass1.length < 4 && pass1.length > 0) {
            jQuery("#wpPassword2_error div").html('pwd too $hort');
            jQuery("#wpPassword2_mark").show();
        }
        else {
            jQuery("#wpPassword2_mark").hide();
        }
    });
    jQuery("#userloginForm #wpRetype").blur(function () {
        pass1 = jQuery("#userloginForm #wpPassword2").val();
        pass2 = jQuery("#userloginForm #wpRetype").val();
        if (pass1 != pass2) {
            jQuery("#wpRetype_error div").html(unescape('bad retype'));
            jQuery("#wpRetype_mark").show();
        }
        else {
            jQuery("#wpRetype_mark").hide();
        }
    });
    jQuery(".wpMark").click(function () {
        idInfo = $(this).attr("id");
        id = idInfo.substring(0, idInfo.length - 5);
        jQuery("#" + id + "_error").show();
        jQuery("#" + id).focus();
    });
});
function checkName(username) {
    var params = 'username=' + encodeURIComponent(username);
    var that = this;
    var url = '/Special:LoginCheck?' + params;
    jQuery.get(url, function (json) {
        if (json) {
            data = jQuery.parseJSON(json);
            if (data.error) {
                jQuery("#wpName2_error div").html(data.error);
                jQuery("#wpName2_mark").show();
            }
            else {
                jQuery("#wpName2_mark").hide();
            }
        } else {
            jQuery("#wpName2_mark").hide();
        }
    });
}
var whWasPasswordReset = false;
function getPassword(username) {
    var url = "/extensions/wikihow/common/jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.min.js";
    $.getScript(url, function () {
        jQuery('#dialog-box').html('');
        url = "/Special:LoginReminder?name=" + username;
        jQuery('#dialog-box').load(url, function () {
            whWasPasswordReset = false;
            jQuery('#dialog-box').dialog({width: 650, modal: true, title: 'Password Reset', closeText: 'Close', close: function () {
                if (whWasPasswordReset) {
                    jQuery('#password-reset-dialog').dialog({width: 250, modal: true});
                    jQuery('#password-reset-ok').click(function () {
                        jQuery('#password-reset-dialog').dialog('close');
                        return false;
                    });
                }
            }});
        });
    });
}
function checkSubmit(name, captchaWord, captchaId) {
    var params = 'submit=true&name=' + encodeURIComponent(jQuery("#" + name).val()) + '&wpCaptchaId=' + jQuery("#" + captchaId).val() + '&wpCaptchaWord=' + jQuery("#" + captchaWord).val();
    var that = this;
    var url = '/Special:LoginReminder?' + params;
    jQuery.get(url, function (json) {
        if (json) {
            data = jQuery.parseJSON(json);
            jQuery(".mw-error").hide();
            if (data.success) {
                whWasPasswordReset = true;
                jQuery('#form_message').html(data.success);
                jQuery('#dialog-box').dialog('close');
            }
            else {
                if (data.error_username) {
                    jQuery('#wpName2_error div').html(data.error_username);
                    jQuery('#wpName2_error').show();
                }
                if (data.error_captcha) {
                    jQuery('#wpCaptchaWord_error div').html(data.error_captcha);
                    jQuery('#wpCaptchaWord_error').show();
                    jQuery('.captcha').html(decodeURI(data.newCaptcha));
                }
                if (data.error_general) {
                    jQuery('#wpName2_error div').html(data.error_general);
                    jQuery('#wpName2_error').show();
                }
            }
        } else {
        }
    });
    return false;
};
;
(function ($) {
    $.fn.menuAim = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });
        return this;
    };
    function init(opts) {
        var $menu = $(this), activeRow = null, mouseLocs = [], lastDelayLoc = null, timeoutId = null, options = $.extend({rowSelector: "> li", submenuSelector: "*", submenuDirection: "right", tolerance: 75, enter: $.noop, exit: $.noop, activate: $.noop, deactivate: $.noop, exitMenu: $.noop}, opts);
        var MOUSE_LOCS_TRACKED = 3, DELAY = 300;
        var mousemoveDocument = function (e) {
            mouseLocs.push({x: e.pageX, y: e.pageY});
            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };
        var mouseleaveMenu = function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }
                activeRow = null;
            }
        };
        var mouseenterRow = function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            options.enter(this);
            possiblyActivate(this);
        }, mouseleaveRow = function () {
            options.exit(this);
        };
        var clickRow = function () {
            activate(this);
        };
        var activate = function (row) {
            if (row == activeRow) {
                return;
            }
            if (activeRow) {
                options.deactivate(activeRow);
            }
            options.activate(row);
            activeRow = row;
        };
        var possiblyActivate = function (row) {
            var delay = activationDelay();
            if (delay) {
                timeoutId = setTimeout(function () {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };
        var activationDelay = function () {
            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                return 0;
            }
            var offset = $menu.offset(), upperLeft = {x: offset.left, y: offset.top - options.tolerance}, upperRight = {x: offset.left + $menu.outerWidth(), y: upperLeft.y}, lowerLeft = {x: offset.left, y: offset.top + $menu.outerHeight() + options.tolerance}, lowerRight = {x: offset.left + $menu.outerWidth(), y: lowerLeft.y}, loc = mouseLocs[mouseLocs.length - 1], prevLoc = mouseLocs[0];
            if (!loc) {
                return 0;
            }
            if (!prevLoc) {
                prevLoc = loc;
            }
            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                return 0;
            }
            if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                return 0;
            }
            function slope(a, b) {
                return(b.y - a.y) / (b.x - a.x);
            };
            var decreasingCorner = upperRight, increasingCorner = lowerRight;
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }
            var decreasingSlope = slope(loc, decreasingCorner), increasingSlope = slope(loc, increasingCorner), prevDecreasingSlope = slope(prevLoc, decreasingCorner), prevIncreasingSlope = slope(prevLoc, increasingCorner);
            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                lastDelayLoc = loc;
                return DELAY;
            }
            lastDelayLoc = null;
            return 0;
        };
        $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
        $(document).mousemove(mousemoveDocument);
    };
})(jQuery);
;
var STU_BUILD = "4";
var WH = WH || {};
WH.ExitTimer = (function ($) {
    var LOGGER_ENABLE = (wgNamespaceNumber == 0 && wgAction == "view");
    var startTime = false;
    var duration = 0;
    var DEFAULT_PRIORITY = 0;
    var fromGoogle = false;

    function getTime() {
        return(new Date()).getTime();
    }

    function pingSend(priority, domain, message, doAsync) {
        var loggerUrl = '/Special:BounceTimeLogger?v=6';
        if (priority != DEFAULT_PRIORITY) {
            loggerUrl += '&_priority=' + priority;
        }
        loggerUrl += '&_domain=' + domain;
        loggerUrl += '&_message=' + encodeURI(message);
        loggerUrl += '&_build=' + STU_BUILD;
        $.ajax({url: loggerUrl, async: doAsync});
    }

    function getDomain() {
        if (fromGoogle) {
            var isMobile = !!(location.href.match(/\bm\./i));
            if (isMobile) {
                return'vm';
            } else {
                return'vw';
            }
        } else {
            return'pv';
        }
    }

    function sendExitTime() {
        if (startTime) {
            var viewTime = (getTime() - startTime);
            duration = duration + viewTime;
        }
        startTime = false;
        var message = wgPageName + " btraw " + (duration / 1000);
        var domain = getDomain();
        if ($.browser.msie && $.browser.version < 7) {
            return;
        }
        pingSend(DEFAULT_PRIORITY, domain, message, false);
    }

    function onUnload() {
        sendExitTime();
    }

    function onBlur() {
        var viewTime = getTime() - startTime;
        duration += viewTime;
        startTime = false;
    }

    function onFocus() {
        startTime = getTime();
    }

    function checkFromGoogle() {
        var ref = typeof document.referrer === 'string' ? document.referrer : '';
        var googsrc = !!(ref.match(/^[a-z]*:\/\/[^\/]*google/i));
        return googsrc;
    }

    function start() {
        if (LOGGER_ENABLE) {
            fromGoogle = checkFromGoogle();
            if (typeof WH.exitTimerStartTime == 'number' && WH.exitTimerStartTime > 0) {
                startTime = WH.exitTimerStartTime;
                WH.exitTimerStartTime = 0;
            } else {
                startTime = getTime();
            }
            $(window).unload(function (e) {
                if (!(typeof(e) !== undefined && typeof(e.target) !== undefined && $(e.target).attr('id') !== undefined && $(e.target).attr('id').indexOf('whvid-player'))) {
                    onUnload();
                }
            });
            $(window).focus(onFocus);
            $(window).blur(onBlur);
        }
    }

    return{'start': start};
})(jQuery);
;
var overrideWinpopFuncs = {'replaceLinks': null, 'resizeModal': null, 'closeModal': null};
function FollowWidget() {
}
FollowWidget.prototype.doFollowModal = function () {
    jQuery('#dialog-box').html('');
    url = '/Special:FollowWidget?article-title=' + encodeURIComponent(wgTitle);
    jQuery('#dialog-box').load(url, function () {
        jQuery('#dialog-box').dialog({width: 450, modal: true, title: 'Email List'});
    });
};
FollowWidget.prototype.displayError = function (msgID) {
    jQuery('#eiu-error-message').css('display', 'block');
    var msg = wfMsg(msgID);
    msg = (msg != '' ? msg : msgID);
    jQuery('#eiu-error-message').html(msg);
};
FollowWidget.prototype.resetError = function () {
    var errDiv = jQuery('#eiu-error-message');
    if (errDiv.length) {
        errDiv.css('display', 'none');
    }
};
FollowWidget.prototype.submitEmail = function (email) {
    var params = 'email=' + email;
    var that = this;
    jQuery.getJSON('/Special:SubmitEmail', {newEmail: email}, function (data) {
        if (data.success) {
            alert(data.message);
            jQuery('#dialog-box').dialog('close');
        }
        else {
            alert(data.message);
        }
    });
};
FollowWidget.prototype.htmlBusyWheel = function () {
    var html = '<img src="/extensions/wikihow/rotate.gif" alt="" />';
    return html;
};
var followWidget = new FollowWidget();
;
function Slider() {
    this.m_link = '/Special:StarterTool';
    this.test_on = true;
}
Slider.prototype.init = function () {
    if (!slider.test_on) {
        return;
    }
    $('#sliderbox').animate({right: '+=500', bottom: '+=300'}, function () {
        slider.buttonize();
    });
}
Slider.prototype.buttonize = function () {
    $('#slider_close_button').click(function () {
        var exdate = new Date();
        var expiredays = 365;
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = "sliderbox=3;expires=" + exdate.toGMTString();
        slider.closeSlider();
        return false;
    });
    $('#slider_edit_button').click(function (e) {
        e.preventDefault();
        document.location.href = '/' + mw.config.get('wgPageName') + '?action=edit&tour=fe';
        return false;
    });
}
Slider.prototype.closeSlider = function () {
    $('#sliderbox').animate({right: '-500px', bottom: '-310px'});
}
Slider.prototype.log = function (action) {
    var url = '/Special:Slider?action=' + action;
    $.get(url);
}
var slider = new Slider();
;
WH = WH || {};
WH.ThumbsUp = WH.ThumbsUp || {};
WH.ThumbsUp = (function ($) {
    function assignHandlers() {
        $('.th_close').click(function () {
            var revId = $(this).attr('id');
            var giverIds = $('#th_msg_' + revId).find('.th_giver_ids').html();
            var url = '/Special:ThumbsNotifications?rev=' + revId + '&givers=' + giverIds;
            $.get(url, function (data) {
            });
            $('#th_msg_' + revId).hide();
        });
        $('.th_avimg').hover(function () {
            getToolTip(this, true);
        }, function () {
            getToolTip(this, false);
        });
        $('.th_twitter').click(function () {
            tn_share(this, 'twitter');
        });
        $('.th_facebook').click(function () {
            tn_share(this, 'facebook');
        });
    }

    function tn_share(context, outlet) {
        var url = $(context).parent().parent().find('.th_t_url:first').attr('href');
        url = 'http://www.wikihow.com' + url;
        switch (outlet) {
            case'facebook':
                url = url + '?fb=t';
                tn_share_facebook(url);
                break;
            case'twitter':
                tn_share_twitter(url);
                break;
        }
    }

    function tn_share_twitter(url) {
        status = "Awesome! I just received a thumbs up on @wikihow for my edit on";
        window.open('https://twitter.com/intent/tweet?text=' + status + ' ' + url);
        return false;
    }

    function tn_share_facebook(url, msg) {
        var d = document, f = 'http://www.facebook.com/share', l = d.location, e = encodeURIComponent, p = '.php?src=bm&v=4&i=1178291210&u=' + e(url);
        try {
            if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host))
                throw(0);
        } catch (z) {
            var a = function () {
                if (!window.open(f + 'r' + p, 'sharer', 'toolbar=0,status=0,resizable=0,width=626,height=436'))
                    l.href = f + p
            };
            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(a, 0);
            } else {
                a()
            }
        }
        void(0);
    }

    return{'assignHandlers': assignHandlers};
})(jQuery);
;
var toolURL = "/Special:AltMethodAdder";
var defaultSteps = "Add your steps using an ordered list. For example:\n1. Step one\n2. Step two\n3. Step three";
var defaultMethod = "Name your method";
$(document).on("keyup", "#altsteps", function (e) {
    if (e.keyCode == 13) {
        oldText = $('#altsteps').val();
        steps = oldText.split("\n");
        var stepCount = 1;
        for (var i = 0; i < steps.length; i++) {
            step = steps[i].trim();
            if (step != "")
                stepCount++;
        }
        $('#altsteps').val(oldText + stepCount + ". ");
    }
});
$(document).on("keypress", "#altmethod", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});
(function ($) {
    var clicked = [];
    $(document).on('click', '#addalt', function (e) {
        window.oTrackUserAction();
        e.preventDefault();
        $(this).hide();
        $('.alt_waiting').show();
        newMethod = $('#altmethod').val();
        newSteps = $('#altsteps').val();
        if (newMethod == "") {
            alert("You must give your method a title.");
            $(this).show();
            $('.alt_waiting').show();
        }
        else if (newSteps == "1." || newSteps == defaultSteps) {
            alert("You have not entered any steps.");
            $(this).show();
            $('.alt_waiting').show();
        }
        else {
            var reg = /^ +/mg;
            var alteredSteps = newSteps.replace(reg, "");
            reg = /^[0-9]*\./mg;
            alteredSteps = alteredSteps.replace(reg, "#");
            var data = {'aid': wgArticleId, 'altMethod': newMethod, 'altSteps': alteredSteps};
            $.get(toolURL, data, function (result) {
                newHtml = $('<div></div>').html(result.html);
                var section = $("#newaltmethod").parent();
                section.removeClass('altadder_section').addClass('steps sticky').prepend($(newHtml).find("#steps").html())
                $("#newaltmethod").remove();
                $('#altheader').remove();
            }, "json");
        }
    });
    $("#altsteps").val(defaultSteps);
    $("#altmethod").val(defaultMethod);
    $("#altsteps").focus(function () {
        if ($("#altsteps").val() == defaultSteps) {
            $("#altsteps").val("1. ");
            $("#altsteps").addClass("active");
            $("#altsteps").removeClass("inactive");
        }
    });
    $("#altsteps").blur(function () {
        newSteps = $.trim($("#altsteps").val());
        if (newSteps == "1.") {
            $("#altsteps").val(defaultSteps);
            $("#altsteps").addClass("inactive");
            $("#altsteps").removeClass("active");
        }
    });
    $("#altmethod").focus(function () {
        if ($("#altmethod").val() == defaultMethod) {
            $("#altmethod").val("");
            $("#altmethod").addClass("active");
            $("#altmethod").removeClass("inactive");
        }
    });
    $("#altmethod").blur(function () {
        if ($("#altmethod").val() == "") {
            $("#altmethod").val(defaultMethod);
            $("#altmethod").addClass("inactive");
            $("#altmethod").removeClass("active");
        }
    });
})(jQuery);
;
(function ($) {
    var tipsDisplayed = null;
    var numTips = null;
    $(document).ready(function () {
        var tips = getTips();
        numTips = tips.size();
        if (numTips > 10) {
            tipsDisplayed = numTips < 10 ? numTips : 10;
            var ul = $(tips).parent();
            $("<div id='show_tips_container'><div id='tip_expander' class='drop-heading-expander tip_expander'/><a id='tip_more' href='#'>Show More Tips</a></div>").insertAfter(ul);
            reorderTips();
            displayTips();
            $(document).on('click', '#show_tips_container', function (e) {
                e.preventDefault();
                tipsDisplayed = tipsDisplayed == 10 ? numTips : numTips < 10 ? numTips : 10;
                displayTips();
            });
        }
    });
    function reorderTips() {
        var tips = getTips();
        if ($(tips).size() > 10) {
            var refTips = [];
            var noVotes = [];
            var numNoVotes = 0;
            var noVotesMax = 2;
            tips.each(function (i, li) {
                if ($(li).find('sup.reference').size() > 0) {
                    refTips.push(li);
                    return;
                }
                var numVotes = 0;
                if (numNoVotes <= noVotesMax) {
                    $(li).find('.tr_vote').each(function (j, span) {
                        numVotes += parseInt($(span).html());
                    });
                    if (numVotes == 0) {
                        numNoVotes++;
                        noVotes.push(li);
                        return;
                    }
                }
            });
            while (refTips.length > 0) {
                var li = refTips.shift();
                $(li).prependTo($(li).parent());
            }
            while (noVotes.length > 0) {
                var li = noVotes.shift();
                var ul = $(li).parent();
                $(li).insertAfter($(ul).children('li').get(8));
            }
        }
    }

    function getTips() {
        var tips = $('#tips ul');
        if (tips.size() > 1) {
            tips = $($(tips).get(0)).children('li');
        } else {
            tips = $(tips).children('li');
        }
        return tips;
    }

    function displayTips() {
        var tips = getTips();
        tips.each(function (i, li) {
            if (i < tipsDisplayed) {
                $(li).fadeIn();
            } else {
                $(li).hide();
            }
        });
        updateTipExpander(numTips - tipsDisplayed);
    }

    function updateTipExpander(tipsRemaining) {
        s = tipsRemaining == 1 ? '' : 's';
        if (tipsRemaining > 0) {
            $('#tip_more').html('Show ' + tipsRemaining + ' more tip' + s);
            $('#tip_expander').removeClass('d-h-show');
        } else {
            $('#tip_more').html('Show fewer tips');
            $('#tip_expander').addClass('d-h-show');
        }
    }
})(jQuery);