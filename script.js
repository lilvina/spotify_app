$(function() {

  var $searchTrack = $('#spotify-search');

  var $playTrack = $('#track');
  
  var $results = $('#results');

  
  var trackTemplate = _.template($('#track-template').html());

  
  $searchTrack.on('submit', function(event) {
    event.preventDefault();

    
    $results.empty();

    
    var playTrack = $playTrack.val();

    
    var $newTrack = 'https://api.spotify.com/v1/search?type=track&q=' + playTrack;

    
    $.get($newTrack, function(data) {
      var resultsTrack = data.tracks.items;
      console.log(resultsTrack);

      if (resultsTrack.length > 0) {

        
        _.each(resultsTrack, function(result, index) {
          
          var templateInfo = {
            albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
            artist: result.artists[0].name,
            name: result.name,
            previewUrl: result.preview_url
          };

          var $resultsTrack = $(trackTemplate(templateInfo));
          $results.append($resultsTrack);
        });

      } else {
        $results.append('No results.');
      }
    });

    $searchTrack[0].reset();
    $playTrack.focus();
  });

});