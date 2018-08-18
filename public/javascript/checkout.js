Stripe.setPublishableKey('pk_test_udMPHTl9duE7CWs1dH9XF8LH');

var $form = $('#checkout-form');

$form.submit(function(event){
    $form.find('button').prop('disabled',true);
    
    Stripe.card.createToken({
      number: $('#card-number').val(),
      cvc: $('#card-cvc').val(),
      exp_month: $('#card-expiry-month').val(),
      exp_year: $('#card-expiry-year').val(),
      name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;       //since validation is yet to be done, we dont allow stripe to send submit request to server
});

function stripeResponseHandler(status,response){
    if (response.error) { // Problem!

    // Show the errors on the form
    $('#charge-error').text(response.error.message);
    // $form.find('#charge-error').prop('visibility','visible');
    $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}