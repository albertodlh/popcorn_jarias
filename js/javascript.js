var apiBaseUrl = 'https://api.themoviedb.org/3/movie/';
var apiKeyString = '?api_key=300d2fb47e3f5f8d5e569ce27884acdc';
var movieDetailsTemplate = Handlebars.compile($("#movie-template").html());

function listado(){
  $.get(apiBaseUrl + "top_rated" + apiKeyString, function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      $( "#lista" ).append( "<li style='list-style: none;'>" + data.results[i].original_title + "</li>" );
    };
  });
}

function information() {
  var id = $(this).data('movieId');
  $.get(apiBaseUrl + id + apiKeyString, function(data){
    var compiledHtml = movieDetailsTemplate(data);
    $("#container-information").html(compiledHtml);
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
        .addClass('Inactivo')
        .attr('id', data.results[i].id)
        .attr('src', imgSrc)
        .data('movieId', data.results[i].id)
        .data('imageId', imgSrc)
        .data('identificador', (i + 1))
        .on('click', favorites);
      $("#" + tipo).append($imgEl);
    };
  });
}

function favorites(){
  var url = $(this).data('imageId');
  var id = $(this).data('movieId');
  var identificador = $(this).data('identificador');
  if($('#' + id).hasClass('Inactivo')){
    $('#' + id).removeClass('Inactivo');
    $('#' + id).addClass('Activo');

      var $imgFa = $('<img/>')
      .addClass('images-peliculas')
      .attr('id', identificador)
      .attr('src', url)
      .data('movieId', $(this).data('movieId'))
      .on('click', information);
      $('#favorites').append($imgFa);
  }else if($('#' + id).hasClass('Activo')){
    $('#' + id).removeClass('Activo');
    $('#' + id).addClass('Inactivo');

    $('#' + identificador).remove();
    $('#container-information').html("");
  }

  //if ($(".Activo").length > 0) {
    
  //}else {
    //alert('entro al no  ' + id.length(2);
    
}

$(function(){

  $('.js-movie-container').each(function(inx){
    peliculas(this.id);
  });

});


