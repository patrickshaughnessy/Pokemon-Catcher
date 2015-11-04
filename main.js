(function($){
'use strict'

  $(document).ready(init);

  let allThePokemon;
  let caughtPokemon = localStorage.caughtPokemon ? JSON.parse(localStorage.caughtPokemon) : [];
  console.log(caughtPokemon);

  updateLocalStorage();

  function init(){
    console.log('ok!');

    $('#get').click(getClicked);

    $.ajax('http://pokeapi.co/api/v1/pokedex/1/', {
      success: function(data){
        allThePokemon = data;
        console.log(allThePokemon);
        populatePokeDex();
      }
    });
  }


  function getClicked() {

    let pokemonToCatch = $('input').val();

    caughtPokemon.push(pokemonToCatch);

    updateLocalStorage();
    populatePokeDex();
  }

  function populatePokeDex() {

    $('#pokemonContainer').empty();

    caughtPokemon.forEach(function(pokemonName){

      let $pokemonName = $('<h4>').text(pokemonName);

      let pokemonResourceObject = allThePokemon.pokemon.filter(function(pokeBalls){
        return pokeBalls.name === pokemonName;
      });

      let pokemonData = 'http://pokeapi.co/' + pokemonResourceObject[0].resource_uri;


      $.get(pokemonData)
        .done(function(data){

          let $attack = $('<p>').text('Attack Power: ' + data.attack);
          let $defense = $('<p>').text('Defense Power: ' + data.defense);
          let $hp = $('<p>').text('HP: ' + data.hp);

          let pokemonSprite = 'http://pokeapi.co/' + data.sprites[0].resource_uri;

            $.get(pokemonSprite)
              .done(function(data){
                let pokemonImage = 'http://pokeapi.co/' + data.image;
                let $pic = $('<img>').attr('src', pokemonImage);

                let $newPokemon = $('<div>').addClass('pokemon');
                $newPokemon.append($pokemonName, $pic, $hp, $attack, $defense);
                $('#pokemonContainer').append($newPokemon);

                // caughtPokemon.push(pokemonName);

                updateLocalStorage();

              }).fail(function(error){
                console.log('Failed at sprite retrieval. Error: ', error);
              });

          })
          .fail(function(){
            console.log('Failed at pokemon retrieval. Error: ', error);
          });

      });

  }

  function updateLocalStorage() {

    localStorage.caughtPokemon = JSON.stringify(caughtPokemon);

  }

  // function getClicked(){
  //
  //   let pokemonToCatch = $('input').val();
  //
  //   let pokemonResourceObject = allThePokemon.pokemon.filter(function(pokeBalls, i, arr){
  //     return pokeBalls.name === pokemonToCatch;
  //   });
  //
  //   let pokemonData = 'http://pokeapi.co/' + pokemonResourceObject[0].resource_uri;
  //
  //   $.ajax(pokemonData, {
  //     success: function(data){
  //       console.log(data);
  //
  //       let $attack = $('<p>').text('Attack Power: ' + data.attack);
  //       let $defense = $('<p>').text('Defense Power: ' + data.defense);
  //       let $hp = $('<p>').text('HP: ' + data.hp);
  //
  //       let pokemonSprite = 'http://pokeapi.co/' + data.sprites[0].resource_uri;
  //
  //         $.ajax(pokemonSprite, {
  //           success: function(data){
  //             let pokemonImage = 'http://pokeapi.co/' + data.image;
  //             let $pic = $('<img>').attr('src', pokemonImage);
  //
  //             let $newPokemon = $('<div>').addClass('pokemon');
  //             $newPokemon.append($pic, $hp, $attack, $defense);
  //             $('#pokemonContainer').append($newPokemon);
  //           }
  //         });
  //       }
  //   });
  //
  //   // updateLocalStorage();
  //
  // }



})(jQuery);
