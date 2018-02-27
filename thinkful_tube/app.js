const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCLeJQoGA1Zn8dKKofZo41swOloXIcUefg';

function getDataFromApi (searchTerm, callback){
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: searchTerm,
    per_page: 5,
    type: 'video'
  }

  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  console.log($.getJSON(YOUTUBE_SEARCH_URL, query, callback))
}

function renderResult(result) {
  const videoPreURL = 'https://youtube.com/watch?v=';
  const videoID = result.id.videoId;
  const videoURL = videoPreURL + videoID;
  const channelPreURL = 'https://youtube.com/channel/';
  const channelID = result.snippet.channelId;
  const channelURL = channelPreURL + channelID;

  return `
    <div class="search-item">
      <a href="${videoURL}" class="lightbox-trigger"><img class="video-thumbnail" src="${result.snippet.thumbnails.medium.url}"></a>
      <h3 class="video-title">${result.snippet.title} by <a href="${channelURL}" target="_blank">${result.snippet.channelTitle}</a><h3>
      <p class="video-description">${result.snippet.description}</p>
    </div>
  `
}

function displayYouTubeSearchData(data){
  const results = $.map(data.items, function(item, index) {
    return renderResult(item)
  })
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);

    queryTarget.val("");  //clear input
    getDataFromApi(query, displayYouTubeSearchData)

  })
}

function handleLightBox() {
  $('.js-search-results').on('click', '.lightbox-trigger', function(event){
    event.preventDefault()
    var video_src = $(this).attr("href");

    if ($('#lightbox').length > 0) {
      $('.video-container').html('<iframe src="' + video_src +'""></iframe>')
      $('#lightbox').show();
    }
    else {
      var lightbox = `
        <div id="lightbox">
          <p>Click to close</p>
          <div id="video-container">
            <iframe src="${video_src}"></iframe>
          </div>
        </div>
      `
      $('body').append(lightbox);
    }

  })
}

$(watchSubmit);
$(handleLightBox);
