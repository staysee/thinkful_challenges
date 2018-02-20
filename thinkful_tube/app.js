const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCLeJQoGA1Zn8dKKofZo41swOloXIcUefg';




//pass following in the params object:
// - part: 'snippet'
// - key: your API key as a string
// - q: your search term as a string

//find thumbnail image URL
// hint: items.snippet.thumbnails.medium.url
//


//requirements: accept a user search term
// get JSNO from youtube API based on search term
// display thumbnail image of the returned videos

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
  console.log('result');
}

function displayYouTubeSearchData(data){
  const results = data.items;
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
