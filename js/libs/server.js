define([
  'jquery',
  'solipsis'
  ], function($, Solipsis){
  var Server = function(){
    var $F = Solipsis.Factory;

    //Example of model factory
    var PostFactory = $F({
        url: "http://www.google.com",
        title: "Algo de prueba",
        desc: $F.string_random_paragraph(40, 6),
        id: $F.int_sequence(),
        votes: 34
      });
  }
  return Server;
});
