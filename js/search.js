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
            $('#searchResults').show();
            $('#searchResults .result').remove();
            var $firstColumn = $('#searchResults div.columns:first');
            var $secondColumn = $('#searchResults div.columns:last');
            $.each(response.hits, function(idx, hit) {
              var $container = (idx % 2 === 0) ? $firstColumn : $secondColumn;
              var title = hit.highlight.title ? hit.highlight.title[0] : hit.title;
              var $a = $('<a></a>').attr('href', hit.url).attr('class', 'result')
              var $title = $('<h3></h3>').addClass('title').html(title).appendTo($a);
              $('<small></small>').text(' ' + hit.time).appendTo($title);
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
  });


})(infocrea.search = {});
