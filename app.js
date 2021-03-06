var LIBRARY = [
  {title: 'C Major Scale', notes: 'A B C D E F G' },
  {title: 'Chromatic Scale', notes: 'A A# B C C# D D# E F F# G G#' },
  {title: 'Random Song', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Adup Licate', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Yankee Doodle', notes: 'C F*4 C F*4 B C D A*2 B*2 A B*2 C' },
  {title: 'Descending Notes', notes: 'G F E D C B A G F E D C B A' }
];

var BPM = 600;

// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};


// Add all LIBRARY songs to the library.
var initializeLibrary = function() {
  for(var i=0; i < LIBRARY.length; i+=1) {
    addSongToLibrary(LIBRARY[i].title, LIBRARY[i].notes);
  }
};


// Play all songs in the playlist.
var playAll = function() {

  // Grab the top song in the queue, parse its notes and play them.
  // Then recurse until there are no more songs left in the queue.
  //
  var playNext = function() {
    var songItem = $('#playlist-list li:first-child');

    if (songItem.length == 0) {
      // No more songs.
      //Make the dancing stop!
      $(".page-header").css("animation","");
      // Re-enable the play button.
      $('#play-button').attr('disabled', false).text('Play All');

      // Fade out the message.
      $('#message').fadeOut();
      return;
    }

    var title = songItem.find('.title').text();
    var notes = songItem.find('.notes').text();
    var song = parseSong(notes);

    $('#message').html("Now playing: <strong>" + title + "</strong>").show();

    playSong(song, BPM, function() {
      songItem.remove();
      $('#library-list').append(songItem);
      playNext();
    });
  };

  // Disable the play button to start.
  $('#play-button').attr('disabled', true).text('Playing');

  playNext();
}


$(document).ready(function() {
  // Initialize the library with some songs.
  initializeLibrary();

  // Play all songs in the playlist when the "play" button is clicked.
  $('#play-button').on('click', playAll);

  // Add Your Code Here.
  //Slideup song when it's clicked, then remove it
  $("#library-list").on('click',"li .fa-trash", function() {
    $(this).parent().eq(0).addClass("temp");
	// looking for index where the title co-respond to the 
	var index = 0;
    	for (var i =0; i<$("#library-list li").length;i++){
	if($("#library-list li .title").eq(i).html() == $(this).siblings().eq(1).html()){
		index = i;}
	}
	$(this).parent().eq(0).fadeOut(500);
	setTimeout(function() {$(".temp").remove();}, 500);

  });
	//have an array, each time an operation occure, operate on that array. Then render the array again
  //This won't work b/c the <li> element is generated on-the-fly. Need bubbing
  //$(".fa_trash").on('click', function() {
  //  $(this).parent().slideUp(500);
  //  setTimeout(function() {
  //    $(this).parent().remove();
  //  },500);
  //});  

  //Hide songs by default
  $(".notes").hide();
  //On doubleclick of title, slideDown the notes
  $("#library-list").on('dblclick',"li", function() {
    $(this).find(".notes").slideDown(300);
  });
  $("#playlist-list").on('dblclick',"li", function() {
    $(this).find(".notes").slideDown(300);
  });


  //When initial page load, fade message in over 800ms
  //Hide after 3s
  $("#message").fadeIn(800);
  setTimeout(function(){
    $("#message").fadeOut(800);
  }, 3000);

  //Set initial opacity of song's trash to 0.3
  $(".fa-trash").css("opacity","0.3");
  //$("li").on('hover',function(){
  //                     $(this).find(".fa-trash").css("animation","fade-in 3s");},
  //                   function(){
  //                     $(this).find(".fa-trash").css("opacity","0.3");});
  $("li").on('mouseenter',function(){
                       $(this).find(".fa-trash").css("opacity","1");
  });
  $("li").on('mouseleave',function(){
                       $(this).find(".fa-trash").css("opacity","0.3");
  });

  //PART TWO========================================
  $("#library-list, #playlist-list").sortable({connectWith: "#library-list, #playlist-list"}).disableSelection();

  //PART THREE======================================
  // Read the filter box
  $("#filter-library").on("keydown", function(e) {
    //Read the entire field
    var fieldVal = $(this).val();
    var numLibrarySongs = $("#library-list").children().length;
    //Update the library list to display all that match
    for (var idx=0; idx<numLibrarySongs; idx++) {
      //$("#library-list").children().eq(5).children().filter("span:contains('C')").length
      if ( $("#library-list").children().eq(idx).children().filter("span:contains(" + fieldVal + ")").length === 0 ) {
        $("#library-list").children().eq(idx).hide();
      } else {
        $("#library-list").children().eq(idx).show();
      }; 
    };
  });
  //PART FOUR=======================================
  $("#play-button").on('click',function(e){
    //Check if playlist is not empty
    if ( $("#playlist-list").children().length===0) {
      console.log($("#play-list").children());
	e.preventDefault();
	$(this).removeClass("shaker");
	setTimeout(function() {$('#play-button').addClass("shaker");}, 1);
	
      
    } else {
      $(".page-header").css("animation","dance 4s infinite");
    };
  });



});
