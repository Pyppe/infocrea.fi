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
      '/': { otherLanguage: '/frontpage/' },
      'frontpage': { otherLanguage: '/' },
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
    formatTime($('#title h3'));
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
    if ($('#title.cover').length === 0) {
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

      var $bg = $('#title');
      var offset = 50 - (fromTop / height) * 100;
      $bg.css("background-position", "center " + offset + "%");
      setY($('#title h1'), +fromTop/2);
      setY($('#title h3'), +fromTop/2.4);
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

  function bindBlogPostsPage() {
    var $asideImages = $('.post .aside');
    if ($asideImages.length === 0) {
      return;
    }
    adjustSideImages();
    var interval = setTimeout(adjustSideImages, 1500);

    function adjustSideImages() {
      $asideImages.each(function() {
        var $aside = $(this).css('margin-top', '0');
        var $post = $aside.closest('.post');
        var $right = $post.find('.rightColumn');
        var $left = $post.find('.leftColumn');
        var diff = Math.floor($left.height() - $right.height()) - 11;
        if (diff > 0) {
          $aside.css('margin-top', diff + 'px');
        }
      });
    }

    $(window).resize(adjustSideImages);
  }

  $(function() {
    bindCoverTitleScrolling();
    createFancyboxImages();
    bindBlogPostsPage();

    // Life-story page
    $("#showMoreNostalgia").prop('disabled', false).click(function() {
      $(this).off("click").prop('disabled', true);
      $("#moreNostalgia").slideDown();
      $('html, body').animate({scrollTop: $('#moreNostalgia').offset().top}, 400);
    });
  });

})(pyppe.main = {});

$(document).foundation();
