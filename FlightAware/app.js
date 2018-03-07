const username = 'scs849'
const API_KEY = '661803bbd7d78893324ae35d3049a82f2ff6168b';
const FLIGHT_AWARE_URL = 'https://' + username + ':' + API_KEY + '@flightxml.flightaware.com/json/FlightXML3/';

function getDataFromApi (searchTerm, callback){
  const query = {
    ident: `${searchTerm}`,
    howMany: 2,
    offset: 0
  }

  $.ajax({
    url: FLIGHT_AWARE_URL + 'FlightInfoStatus',
    data: query,
    method: 'GET',
    dataType: 'jsonp',
    success: function (data, txtStatus, xhr){
      if (data.error) {
        alert('Failed to fetch flight: ' + data.error);
        return;
      }
      console.log(data);
    },
    error: function(data, text){
      alert('Failed to decode route: ' + data);
    }
  })
}



function renderResult(result) {
  const videoID = result.id.videoId;
  const channelID = result.snippet.channelId;

  return `
    <div class="search-item">
        <a class="video lightbox" href="https://youtube.com/watch?v=${videoID}" data-videoid=${videoID} onclick="createlightbox(); console.log(\'helloworld\'); return false"><img src="${result.snippet.thumbnails.medium.url}"></a>
        <div class="video-title">${result.snippet.title}</div>
        <div class="video-description">${result.snippet.description}</div>
        <div class="channel-title">View more by <a href="https://youtube.com/channel/${channelID}" target="_blank">${result.snippet.channelTitle}</a></div>
    </div>
  `
}

function displayYouTubeSearchData(data){
  const results = $.map(data.items, function(item, index) {
    return renderResult(item)
  })
  $('.js-search-results').html(results);
  // $('.total-results').html(data.pageInfo.totalResults);
  console.log(data.nextPageToken);
  console.log(data.prevPageToken);
}


function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    //console.log(query);

    queryTarget.val("");  //clear input
    getDataFromApi(query, displayYouTubeSearchData)
  })
}

$(watchSubmit);