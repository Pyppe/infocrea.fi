(function(exports, undefined) {

  $(function() {
    var $form = $('#feedback');
    $form.parent().css('min-height');
    var $email = $form.find('[name=email]');
    var $message = $form.find('[name=message]');
    var $submit = $form.find('button');

    $email.on('keyup input', onFormChange);
    $message.on('keyup input', onFormChange);
    $email.focus(function() {
      showEmailError(false);
    });
    $email.blur(maybeShowEmailError);
    $form.submit(function(ev) {
      ev.preventDefault();
      var $container = $submit.parent();
      $submit.prop('disabled', true);
      var $spin = $('<i class="fa fa-spin fa-spinner fa-2x" style="vertical-align: middle;"></i>').appendTo($container);
      $.post($form.attr('action'), $form.serialize()).
          done(function() {
            $submit.hide();
            $form.find('.alert-box').show().velocity('transition.shrinkIn');
          }).
          fail(function(error) {
            if (error.status === 403) {
              alert(error.statusText);
            } else {
              alert('Virhe :(');
            }
          }).
          always(function() {
            $submit.prop('disabled', false);
            $spin.remove();
          });
    });

    function onFormChange() {
      var messageOk = $.trim($message.val()).length > 0;
      enableSubmit(messageOk && isEmailOk());
    }

    function isEmailOk() {
      var email = emailValue();
      return email.length === 0 || isValidEmail(email);
    }

    function enableSubmit(enabled) {
      return $submit.prop('disabled', !enabled);
    }

    function showEmailError(show) {
      var $label = $email.closest('label');
      var $error = $label.find('+ small.error');
      if (show) {
        $label.addClass('error');
        $error.show();
      } else {
        $label.removeClass('error');
        $error.hide();
      }
    }

    function maybeShowEmailError() {
      showEmailError(!isEmailOk());
    }

    function emailValue() {
      return $.trim($email.val());
    }
  });

  function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

})(infocrea.feedback = {});
