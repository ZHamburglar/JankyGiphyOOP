$(document).ready(function() {
  $('#refresh, #btn-search, #btn-trending').on('click', checkValue)
});

function checkValue(e){
  e.preventDefault()
  var numberofpics = $('select').val()
  console.log("Number of Pics to display: ",numberofpics);
  var searchValue = $('#search').val();
  if ($(this).attr("id") == "btn-search"){
    searchGiphy(searchValue, numberofpics)
  } else if ($(this).attr("id") == "refresh"){
    randomGiphy(e)
  } else {
    trendingGiphy(numberofpics)
  }
}

function randomGiphy(e){
  e.preventDefault();
  console.log('User has submitted the form');
  var request = $.ajax({
    url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
    method: 'GET'
  });

  request.done(function(data){
    console.log('Response data: ', data);
    var gifgif = data.data;
    console.log("Search Results", gifgif);
    var imgoriginal = gifgif.image_original_url
    console.log("URL FOR IMAGE: ", imgoriginal);
    $('#randomgif').attr('src',imgoriginal)
  });

  request.fail(function(xhrObject, textStatus, errorThrown){
    console.log('There was an error: ', textStatus, errorThrown);
  });
}

// Section for the Search variable to be created

//Search variable is passed into the function and then the API
function searchGiphy(searchValue, numberofpics) {
  console.log('User has submitted the form');
  var request = $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC',
    method: 'GET',
    data: {
      q: searchValue
    }
  });

  request.done(function(data){
    $('#imglist').empty();
    console.log('Search data: ', data);
    var gifgif = data.data;
    console.log("Search Results", gifgif);
    for (var i=0, x= numberofpics; i<x; i++){
      var bloobloo = gifgif[i].images.original.url;
      var picstodisplay = '<img src="'+ bloobloo +'" alt="" class="picasso col-lg-4"/>'
      console.log("Url for Searched: ", picstodisplay);

      $('#imglist').append(picstodisplay);
    }
  });

  request.fail(function(xhrObject, textStatus, errorThrown){
    console.log('There was an error: ', textStatus, errorThrown);
  });
}
// THIS IS THE TRENDING PART
function trendingGiphy(numberofpics) {
  console.log('User has submitted the form');
  var request = $.ajax({
    url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    method: 'GET',
    data: {
    }
  });

  request.done(function(data){
    $('#imglist').empty();
    console.log('Search data: ', data);
    var gifgif = data.data;
    console.log("Search Results", gifgif);
    for (var i=0, x= numberofpics; i<x; i++){
      var bloobloo = gifgif[i].images.original.url;
      var picstodisplay = '<img src="'+ bloobloo +'" alt="" class="picasso col-lg-4"/>'
      console.log("Url for Searched: ", picstodisplay);
      $('#imglist').append(picstodisplay);
    }
  });

  request.fail(function(xhrObject, textStatus, errorThrown){
    console.log('There was an error: ', textStatus, errorThrown);
  });
}
