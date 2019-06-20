$(function() {
  // $('.new-message').on('submit', function(e) {
  //   e.preventDefault();
  //   message = $('.new-message__box__text').val();
  //   console.log(message);
  // });

  function buildHTML(message) {
    // create html
    // append html

    // var html = <div class='message'></div>
    // var myObj = $(".message");
    var html = `
    <div class="message">
    <div class="upper-info">
    <p class="upper-info__user">
    ${message.name}
    </p>
    <p class="upper-info__date">
    ${message.data}
    </p>
    </div>
    <p class="message__text">
    ${message.content}    
    </p>
    </div>
    `
    $(".messages").append(html);
  };

  $('#new_message').on('submit', function(e) {
    // debugger;
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr("action");
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      buildHTML(data);
      $('.new-message__box__text').val('');
      $('.messages').animate({
        scrollTop: $('.messages').get(0).scrollHeight
      },100);
      return false;
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.new-message__submit').prop('disabled', false);
    })
  })
});