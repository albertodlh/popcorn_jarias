var apiBaseUrl = 'https://api.themoviedb.org/3/movie/';
var apiKeyString = '?api_key=300d2fb47e3f5f8d5e569ce27884acdc';
var movieDetailsTemplate = Handlebars.compile($("#movie-template").html());
var cardsTemplate = Handlebars.compile($('#cards-template').html());

function listado(){
  $.get(apiBaseUrl + "top_rated" + apiKeyString, function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      $( "#lista" ).append( "<li style='list-style: none;'>" + data.results[i].original_title + "</li>" );
    };
  });
}

function information(id) {
  $.get(apiBaseUrl + id + apiKeyString, function(data){
    var compiledHtml = movieDetailsTemplate(data);
    $("#container-information").html(compiledHtml);
  });
}

function peliculas(tipo){
  var compileCards, item;
  $.get(apiBaseUrl + tipo + apiKeyString, function(data){
    for (var i = 0; i < data.results.length; i++) {
      item = data.results[i];
      compileCards = cardsTemplate(item);
      $('#' + tipo).append(compileCards);
    };
  });
}

function favorites(poster, id){
  var isActive = $('.js-movie-' + id).data('status');
  var movieList = $('.js-movie-' + id);

  if(!isActive){
    movieList.addClass('is-active');
    movieList.data('status', true);
    $(".text-in-favorites").remove();
    $(".js-botones-" + id).addClass("no-favorite").val("NO FAVORITE");

    var $imgFa = $('<img/>')
      .addClass('images-peliculas')
      .addClass('js-favorite-' + id)
      .attr('src', 'http://image.tmdb.org/t/p/w300/' + poster)
      .appendTo('#favorites');
  }else{
    $(".js-botones-" + id).removeClass("no-favorite").val("Favorite");
    movieList.removeClass('is-active');
    movieList.data('status', false);
    $('.js-favorite-' + id).remove();
    if ($('#favorites').find('img').length == 0) {
      $("#favorites").html("<p class='text-in-favorites'>You haven't favorited any movies yet</p>");
      $('#container-information').html("");
    };
  }
}

$(function(){
  $('.js-movie-container').each(function(inx){
    peliculas(this.id);
  });
});


