(function(exports, undefined) {

  $(function() {
    var $form = $('#search');
    var $input = $form.find('[name=q]');
    var $spinner = $form.find('.fa-spin');
    var timeoutId;
    var ajaxReq;

    $input.on('keyup input', function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (ajaxReq) {
        ajaxReq.abort();
      }
      var query = $input.val();
      if (query) {
        $spinner.show();
        timeoutId = setTimeout(function() {
          ajaxReq = $.get('/api/search?q=' + encodeURIComponent(query)).success(function(response) {
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, document.title, window.location.pathname + '?q=' + encodeURIComponent(query));
            }
            $('#searchResults').show();
            $('#searchResults .result').remove();
            $('#searchResults [count]').html('Hakutermille <b>'+query+'</b> löytyi kirjoituksia: <b>' + response.total + ' kpl</b>');
            var $firstColumn = $('#searchResults div.columns:first');
            var $secondColumn = $('#searchResults div.columns:last');
            $.each(response.hits, function(idx, hit) {
              var $container = (idx % 2 === 0) ? $firstColumn : $secondColumn;
              var title = hit.highlight.title ? hit.highlight.title[0] : hit.title;
              var $a = $('<a></a>').attr('href', hit.url).attr('class', 'result')
              var $title = $('<h3></h3>').addClass('title').html(title).appendTo($a);
              var time = moment(hit.time, 'YYYY-MM-DD[T]HH:mm:ssZ').format('LL');
              $('<small class="time"></small>').html('&nbsp;&nbsp; ' + time).appendTo($title);
              if (hit.highlight.content) {
                $.each(hit.highlight.content, function (idx, text) {
                  var $p = $('<p class="excerpt"></p>').
                      html(text).appendTo($a);
                  $('<i class="fa fa-quote-left fa-lg"></i>').prependTo($p);
                  $('<i class="fa fa-quote-right fa-lg"></i>').appendTo($p);
                });
              }
              $a.appendTo($container);
            });
            $spinner.hide();
          });
        }, 400);
      } else {
        $spinner.hide();
      }
    });

    (function() {
      var q = infocrea.util.parseQueryParams().q;
      if (q) {
        $input.val(q).trigger('input');
      }
    })();

  });



})(infocrea.search = {});
