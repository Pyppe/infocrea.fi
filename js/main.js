'use strict';

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
  };
}
if (typeof String.prototype.contains != 'function') {
  String.prototype.contains = function (str) {
    return this.indexOf(str) !== -1;
  };
}

// Mock console.log if not exist
if (!window.console) {
  window.console = {
    log: $.noop
  };
}

(function(moment) {
  var STRINGS = {
    nodiff: '',
    year: 'v',
    years: 'v',
    month: 'kk',
    months: 'kk',
    day: 'pv',
    days: 'pv',
    hour: 'h',
    hours: 'h',
    minute: 'min',
    minutes: 'min',
    second: 's',
    seconds: 's',
    delimiter: ' '
  };
  moment.fn.smartDiff = function(d2) {
    return moment.smartDiff(this, d2);
  };
  moment.smartDiff = function(d1, d2) {
    var m1 = moment(d1), m2 = moment(d2);
    if (m1.isSame(m2)) {
      return STRINGS.nodiff;
    }
    if (m1.isAfter(m2)) {
      var tmp = m1;
      m1 = m2;
      m2 = tmp;
    }
    var yDiff = m2.year() - m1.year();
    var mDiff = m2.month() - m1.month();
    var dDiff = m2.date() - m1.date();
    var hourDiff = m2.hour() - m1.hour();
    var minDiff = m2.minute() - m1.minute();
    var secDiff = m2.second() - m1.second();
    if (secDiff < 0) {
      secDiff = 60 + secDiff;
      minDiff--;
    }
    if (minDiff < 0) {
      minDiff = 60 + minDiff;
      hourDiff--;
    }
    if (hourDiff < 0) {
      hourDiff = 24 + hourDiff;
      dDiff--;
    }
    if (dDiff < 0) {
      var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM").subtract('months', 1).daysInMonth();
      if (daysInLastFullMonth < m1.date()) { // 31/01 -> 2/03
        dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
      } else {
        dDiff = daysInLastFullMonth + dDiff;
      }
      mDiff--;
    }
    if (mDiff < 0) {
      mDiff = 12 + mDiff;
      yDiff--;
    }
    function pluralize(num, word) {
      return num + ' ' + STRINGS[word + (num === 1 ? '' : 's')];
    }
    var result = [];
    if (yDiff) {
      result.push(pluralize(yDiff, 'year'));
    }
    if (mDiff) {
      result.push(pluralize(mDiff, 'month'));
    }
    if (dDiff) {
      result.push(pluralize(dDiff, 'day'));
    }
    if (hourDiff) {
      result.push(pluralize(hourDiff, 'hour'));
    }
    if (minDiff) {
      result.push(pluralize(minDiff, 'minute'));
    }
    if (secDiff) {
      result.push(pluralize(secDiff, 'second'));
    }
    if (result.length > 1) {
      result = [result[0], result[1]];
    }
    return result.join(STRINGS.delimiter).replace(/(\d) (\w)/g, '$1$2');
  };
})(moment);

(function(exports, undefined) {

  // Facebook posts
  (function() {
    var $posts = $('.fb-post');
    $posts.attr('data-width', $posts.width());
  })();

  // quoted
  (function() {
    var $quotes = $('blockquote.quoted');
    if ($quotes.length > 0) {
      $('<i class="fa fa-quote-left"></i>').prependTo($quotes);
      $('<i class="fa fa-quote-right"></i>').appendTo($quotes);
    }
  })();

  // Localization
  (function() {
    var settings = {
      '/': { nav: 'home' },
      'english': { nav: 'english' },
      'haku': { nav: 'search' },
      'yhteystiedot': { nav: 'contact' },
      'palvelut': { nav: 'services' },
      'blog': { nav: 'blog' },
      'blogi': { nav: 'blog' }
    };
    var path = window.location.pathname.split('/')[1] || '/';
    if (path === 'blog') $('html').addClass('en');
    if (path === 'blogi') $('html').addClass('fi');
    var current = settings[path];
    if (!current) return;
    if (current.nav) {
      $('#topbar .'+current.nav).addClass('active');
    }
    $('#topbar .change-lang').attr('href', current.otherLanguage);
    moment.lang($('html').hasClass('fi') ? 'fi' : 'en');
    if ($('html').hasClass('en')) {
      $('#header a[href]').attr('href', '/home/');
    }
  })();

  // Date-times / localization
  (function() {
    function formatTime($elements) {
      $elements.each(function() {
        var $el = $(this);
        var time = $el.text();
        var postMoment = moment(time, 'YYYY-MM-DD[T]HH:mm:ssZ');
        $el.text(postMoment.format('LL'));
        $el.attr('title', postMoment.format('LL[, klo ]HH:mm')).
            attr('data-tooltip', '');
      });
    }
    formatTime($('#title .timeTitle'));
    formatTime($('.post .timeTitle'));
  })();

  // Sharing
  (function() {
    var $share = $('#share');
    if ($share.length === 0) return;
    var t = encodeURIComponent($.trim($('meta[property="og:title"]').attr('content')) || document.title);
    var u = encodeURIComponent(location.protocol + '//' + location.host + location.pathname);
    $share.find('[data-media]').each(function() {
      var $el = $(this);
      var media = $el.attr('data-media');
      var tooltip;
      var link;
      if (media === 'facebook') {
        link = 'https://www.facebook.com/sharer/sharer.php?t='+t+'&u='+u;
        tooltip = 'Jaa Facebookissa';
      } else if (media === 'twitter') {
        link = 'http://twitter.com/share?text='+t+'&url='+u;
        tooltip = 'Jaa Twitterissä';
      } else if (media === 'google-plus') {
        link = 'https://plus.google.com/share?url='+u+'&title='+t;
        tooltip = 'Jaa Google-plussassa';
      }
      if (link && tooltip) {
        $el.attr('title', tooltip).attr('data-tooltip', '').attr('data-options', 'disable_for_touch:true');
        $el.click(function () {
          window.open(link, '_blank');
        });
      }
    });
  })();

  // Link to posts
  (function() {
    function localizeBlogLink() {
      var $a = $(this);
      var link = $a.attr('href').replace(/^\/blog\//, '/blogi/');
      $a.attr('href', link);
    }

    if (window.location.pathname.startsWith('/blogi/')) {
      $('.post a[href]').each(localizeBlogLink);
      $('#post a[href]').each(localizeBlogLink);
    }
  })();

  // Comment counts
  (function() {
    var $commentCounts = $('.commentCount');
    if ($commentCounts.length === 0) return;
    var startTime = (new Date()).getTime();
    var ready = false;
    function isStop() {
      return ready || ((new Date()).getTime() - startTime) > 5000;
    }
    var intervalId = setInterval(function() {
      $commentCounts.each(function() {
        var $el = $(this);
        var count = $el.text().replace(/[^\d]/g, '');
        if (count !== NaN && count > 0) {
          ready = true;
          $el.addClass('shown').text('');
          $('<i class="fa fa-comment"></i>').appendTo($el);
          $('<small>'+count+'</small>').appendTo($el);
          $el.hide().fadeIn(800);
        }
      });
      if (isStop()) {
        clearInterval(intervalId);
      }
    }, 250);

  })();

  function bindCoverTitleScrolling() {
    var $title = $('#title');
    if ($title.length === 0) {
      return;
    }
    function setY($elem, value) {
      var translate = 'translateY('+value+'px)';
      $elem.css({
        "-webkit-transform": translate,
        "-a-transform": translate,
        "-ms-transform": translate,
        "-moz-transform": translate,
        "transform": translate
      });
    }

    $(window).scroll(function() {
      var fromTop = $(window).scrollTop();
      var height = $(window).height();

      var titleBottom = $title.position().top + $title.height();
      if (fromTop > titleBottom) {
        return;
      }

      var offset = 50 - (fromTop / height) * 100;
      $title.css("background-position", "center " + offset + "%");
      setY($('#title h1'), +fromTop/2);
      setY($('#title h2'), +fromTop/2.4);
      setY($('#title h4'), +fromTop/2.5);
    });
    $(window).scroll();
  }

  function createFancyboxImages() {
    $(".imageCollage a").fancybox({
      type: 'image',
      beforeLoad: function() {
        var title = $(this.element).find('.title').text();
        if (title) {
          this.title = title;
        }
      },
      helpers: {
        overlay: {
          locked: false
        },
        title: {
          type: 'inside'
        }
      }
    });
  }

  $(function() {
    bindCoverTitleScrolling();
    createFancyboxImages();
    futureLivestreamEvents();

    $('#index div.example').velocity("transition.expandIn", {stagger: 175});
    $('#topbar .toggle-topbar a').click(function() {
      $(this).blur();
      var $topbar = $('#topbar');
      var $menu = $topbar.find('.top-bar-section');
      if ($topbar.hasClass('expanded')) {
        $menu.velocity("transition.slideRightOut", 300, function() {
          $topbar.removeClass('expanded');
          $menu.show();
        });
      } else {
        $topbar.addClass('expanded');
        $menu.velocity("transition.slideRightIn");
      }
      return false;
    });

  });

  function futureLivestreamEvents() {
    var $container = $('#futureLivestreams');
    if ($container.length === 0) return;

    function timeDiff(eventTime) {
      var now = moment();
      return eventTime.isBefore(now) ? 'Juuri nyt' : moment.smartDiff(now, eventTime);
    }

    $.get('/api/livestream', function(events) {
      if (events.length === 0) return;
      var $ul = $container.find('ul');
      $.each(events, function(idx, event) {
        var $li = $([
          '<li>',
          '  <div class="panel">',
          '    <img src="#" />',
          '    <h5><a href="">Otsikko</a></h5>',
          '    <div class="time" style="font-size: 90%;"></div>',
          '    <span class="label secondary"></span>',
          '  </div>',
          '</li>',
        ].join(' '));
        var eventTime = moment(event.time);
        $li.find('img').attr('src', event.image);
        $li.find('a').attr('href', event.url).text(event.name);
        $li.find('.time').html(eventTime.format('dd l [<i class="fa fa-clock-o"></i>] HH:mm'));
        $li.find('.label').
            text(timeDiff(eventTime)).
            data('eventTime', eventTime);

        $li.appendTo($ul);
      });
      setInterval(function() {
        $ul.find('li .label').each(function() {
          var $el = $(this);
          $el.text(timeDiff($el.data('eventTime')));
        });
      }, 1*1000);
      $container.show();
    });
  }

})(infocrea.main = {});

(function(exports) {
  function parseQueryParams() {
    var qs = window.location.search;
    var params = {};
    if (qs) {
      for (var ps = qs.substring(1).split("&"); ps[0]; ps.shift()) {
        var p = ps[0].replace(/\+/g, " ").split("=");
        params[decodeURIComponent(p[0])] = p.length > 1 ? decodeURIComponent(p[1]) : true;
      }
    }
    return params;
  }

  function parseMultiQueryParams() {
    var qs = window.location.search;
    var params = {};
    if (qs) {
      for (var ps = qs.substring(1).split("&"); ps[0]; ps.shift()) {
        var p = ps[0].replace(/\+/g, " ").split("=");
        var key = decodeURIComponent(p[0]);
        var value = p.length > 1 ? decodeURIComponent(p[1]) : true;
        if (params[key] === undefined) {
          params[key] = [];
        }
        params[key].push(value);
      }
    }
    return params;
  }

  exports.parseQueryParams = parseQueryParams;
  exports.parseMultiQueryParams = parseMultiQueryParams;

})(infocrea.util = {});


$(document).foundation();
