
const APP_ID = config.APP_ID;
const API_KEY = config.API_KEY;
const URL = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/UA/2008/arr/2018/03/13?appId=' + APP_ID + '&appKey=' + API_KEY + '&utc=false'

function getDataFromApi (searchTerm, callback){
  const query = {
    ident: `${searchTerm}`,
    howMany: 2,
    offset: 0
  }

  function make_base_auth(username, API_KEY){
    var tok = username + ":" + API_KEY;
    var hash = Base64.encode(tok);
    return "Basic" + hash;
  }
  $.ajax({
    url: FLIGHT_AWARE_URL + 'FlightInfoStatus',
    data: query,
    method: 'GET',
    dataType: 'jsonp',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + API_KEY));
    },
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
