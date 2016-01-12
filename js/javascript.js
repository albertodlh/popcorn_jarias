var apiBaseUrl = 'https://api.themoviedb.org/3/movie/';
var apiKeyString = '?api_key=300d2fb47e3f5f8d5e569ce27884acdc';

function listado(){
  $.get(apiBaseUrl + "top_rated" + apiKeyString, function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      $( "#lista" ).append( "<li style='list-style: none;'>" + data.results[i].original_title + "</li>" );
    };
  });
  // peliculas('popular', 0);
}

function information() {
  var id = $(this).data('movieId');
  $.get(apiBaseUrl + id + apiKeyString, function(data){
    console.log(data);
    $("#container-information").html("");
    $("#container-information").append("<h1 class='sub-title'>Information</h1>");
    $("#container-information").append("<div id='cont-image-infor'></div>");
    //$("#container-information").append("<div id='cont-data-infor'></div>");
    $("#container-information").append("<div id='cont-description-infor'></div>");
    $("#cont-image-infor").append("<img  class='backdrop_path' src='http://image.tmdb.org/t/p/w300/" + data.backdrop_path + "' />");
    $("#cont-image-infor").append("<div class='cont-data-infor'><p><span class='title-data'>Title: </span>" + data.original_title + "</p><p><span class='title-data'>Tagline: </span>" + data.tagline + "</p><p><span class='title-data'>Revenue: </span>" + data.revenue + "</p><div/>");
    $("#cont-description-infor").append("<p>" + data.overview + "<p/>");
    //$("#cont-data-infor").append("<p>" + data.overview + "<p/>");
  });
}

function peliculas(tipo){
  var $imgEl, imgSrc;
  $.get(apiBaseUrl + tipo + apiKeyString, function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      imgSrc = 'http://image.tmdb.org/t/p/w300/' + data.results[i].poster_path;
      $imgEl = $('<img/>')
        .addClass('images-peliculas')
        .attr('src', imgSrc)
        .data('movieId', data.results[i].id);
      $imgEl.on('click', information);
      $("#" + tipo).append($imgEl);
    };
  });
}

$(function(){

  $('.js-movie-container').each(function(inx){
    peliculas(this.id);
  });

});


