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
  return `
    <div>
      <h2>${result.snippet.title}</h2>
      <img src="${result.snippet.thumbnails.medium.url}">
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
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    console.log(query);

    queryTarget.val("");  //clear input
    getDataFromApi(query, displayYouTubeSearchData)

  })
}

$(watchSubmit);
