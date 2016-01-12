function traer(){
  $.get( "https://api.themoviedb.org/3/movie/top_rated?api_key=300d2fb47e3f5f8d5e569ce27884acdc", function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      $( "#lista" ).append( "<li style='list-style: none;'>" + data.results[i].original_title + "</li>" );
    };
  });
  peliculas('popular', 0);
}

function peliculas(pelicula, sw){
  $.get( "https://api.themoviedb.org/3/movie/" + pelicula + "?api_key=300d2fb47e3f5f8d5e569ce27884acdc", function( data ) {
    console.log( data );
    for (var i = 0; i < data.results.length; i++) {
      $("#" + pelicula).append("<img class='images-peliculas' src='http://image.tmdb.org/t/p/w300/" + data.results[i].poster_path + "'/>");
    };
  });
  if(sw == 0) peliculas('top_rated', 1);
  else if(sw == 1) peliculas('upcoming', 2);
}