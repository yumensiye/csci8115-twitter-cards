var socket = io.connect();
var favor = {};
var like = {};

$(function() {

  $('.faved_area')
    // .mouseover(function() {
    //   $(this).find('#faved_img').attr('src', '/imgs/faved.png');
    //   $(this).find('#faved_count').attr('class', 'bottom-text-faved');
    // })
    // .mouseout(function() {
    //   $(this).find('#faved_img').attr('src', '/imgs/unfaved.png');
    //   $(this).find('#faved_count').attr('class', 'bottom-text');
    // })
    .click(function(event) {
      clickID = $(this).closest('.faved_area').attr('id');
      if (!(clickID in favor)) {
        socket.emit('clickFavor', {'id': clickID});
        favor[clickID] = false;
      }

      favor[clickID] = !favor[clickID];
      if (favor[clickID]) {
        $(this).find('#faved_img').attr('src', '/imgs/faved.png');
        $(this).find('#faved_count').attr('class', 'bottom-text-faved');
      } else {
        $(this).find('#faved_img').attr('src', '/imgs/unfaved.png');
        $(this).find('#faved_count').attr('class', 'bottom-text');
      }
    });

  $('.like_area')
    // .mouseover(function() {
    //   $(this).find('#faved_img').attr('src', '/imgs/faved.png');
    //   $(this).find('#faved_count').attr('class', 'bottom-text-faved');
    // })
    // .mouseout(function() {
    //   $(this).find('#faved_img').attr('src', '/imgs/unfaved.png');
    //   $(this).find('#faved_count').attr('class', 'bottom-text');
    // })
    .click(function(event) {
      clickID = $(this).closest('.like_area').attr('id');
      if (!(clickID in like)) {
        socket.emit('clickLike', {'id': clickID});
        like[clickID] = false;
      }

      like[clickID] = !like[clickID];
      if (like[clickID]) {
        $(this).find('#like_img').attr('src', '/imgs/liked.png');
        $(this).find('#like_count').attr('class', 'bottom-text-liked');
      } else {
        $(this).find('#like_img').attr('src', '/imgs/unliked.png');
        $(this).find('#like_count').attr('class', 'bottom-text');
      }
    });
})
