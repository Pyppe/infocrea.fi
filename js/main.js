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

(function(exports, undefined) {

  // Localization
  (function() {
    var settings = {
      '/': { otherLanguage: '/home/', nav: 'home' },
      'home': { otherLanguage: '/', nav: 'home' },
      'elamantarina': { otherLanguage: '/life-story/', nav: 'lifeStory' },
      'life-story': { otherLanguage: '/elamantarina/', nav: 'lifeStory' },
      'blog': { otherLanguage: window.location.pathname.replace('/blog/', '/blogi/'), nav: 'blog' },
      'blogi': { otherLanguage: window.location.pathname.replace('/blogi/', '/blog/'), nav: 'blog' }
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
        $el.text(moment(time, 'YYYY-MM-DD[T]HH:mm:ssZ').format('LL'));
      });
    }
    formatTime($('#title .timeTitle'));
    formatTime($('.post .timeTitle'));
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

})(infocrea.main = {});

$(document).foundation();
