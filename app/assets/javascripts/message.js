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
    var image = (message.image) ? `<img class="message__text__image" src="${message.image}">` : ""
    var html = `
    <div class="message" data-id=${message.id}>
    <div class="upper-info">
    <p class="upper-info__user">
    ${message.name}
    </p>
    <p class="upper-info__date">
    ${message.date}
    </p>
    </div>
    <p class="message__text">
    ${message.content}
    ${image}
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

    
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var latest = $('.message:last');
    last_message_id = latest.data('id');
    var url = $(location).attr('pathname').replace("/message","/api/message");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        buildHTML(message);
        // $('.messages').animate({
        //   scrollTop: $('.messages').get(0).scrollHeight
        // },100);
        // return false;
      });
    })
    .fail(function() {
      alert("エラーです");
    });
  };
  setInterval(reloadMessages, 5000);
});

