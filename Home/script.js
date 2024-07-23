import { getImagePokemon, getPokemons } from "../api/pokemon-api";

var limit = 20;
var offset = 0;
var pokemons = [];
$(window).on("load", function () {
  getPokemons(0).then(function (response) {
    response.results.map((item, index) => {
      var pokemon = { ...item, index: index + 1 };
      getImagePokemon(item.url).then((response) => {
        pokemon = { ...pokemon, image: response.sprites.front_default };
        pokemons.push(pokemon);
      });
    });
    offset = offset + limit;
  });
});

$(document).ready(function () {
  var loadMoreBtn = $("#loadMoreBtn");
  var pokemonItem = $(".pokemonItem");
  var dataSource = new kendo.data.DataSource({
    data: pokemons,
  });

  $("#listView").kendoListView({
    dataSource: dataSource,
    template: kendo.template($("#template").html()),
    pageable: false,
    selectable: true,
    change: function () {
      var data = this.dataSource.view(),
        selected = $.map(this.select(), function (item) {
          return data[$(item).index()].index;
        });
      window.location.href = `../details/index.html?id=${selected}`;
    },
  });
  $("#myMenu").kendoMenu();
  loadMoreBtn.kendoButton({
    themeColor: "primary",
  });

  loadMoreBtn.on("click", function () {
    let listView = $("#listView").data("kendoListView");
    try {
      getPokemons(offset).then(function (response) {
        response.results.map((item, index) => {
          var pokemon = { ...item, index: index + 1 + (offset - limit) };
          getImagePokemon(item.url).then((response) => {
            pokemon = { ...item, image: response.sprites.front_default };
            pokemons.push(pokemon);
          });
        });
        var dataSourceListView = new kendo.data.DataSource({
          data: pokemons,
        });
        listView.setDataSource(dataSourceListView);
      });
    } catch (error) {
      console.log(error);
    }
    offset = offset + limit;
  });
});
