const queryString = window.location.search; // Contains "?id=<The Given ID>"
const params = new URLSearchParams(queryString); // Converts the query string to javascript object
const param = params.get("id") || params.get("name");
var pokemon;

const colorTypes = [
  { name: "bug", color: "#94BC4A" },
  { name: "dark", color: "#736C75" },
  { name: "dragon", color: "#6A7BAF" },
  { name: "electric", color: "#E5C531" },
  { name: "fairy", color: "#E397D1" },
  { name: "fighting", color: "#CB5F48" },
  { name: "fire", color: "#EA7A3C" },
  { name: "flying", color: "#7DA6DE" },
  { name: "ghost", color: "#846AB6" },
  { name: "grass", color: "#71C558" },
  { name: "ground", color: "#CC9F4F" },
  { name: "ice", color: "#70CBD4" },
  { name: "poison", color: "#B468B7" },
  { name: "psychic", color: "#E5709B" },
  { name: "rock", color: "#B2A061" },
  { name: "steel", color: "#89A1B0" },
  { name: "water", color: "#539AE2" },
];

$(window).on("load", function () {
  getDetailsPokemon(param)
    .then((response) => {
      pokemon = { ...response };
      $(".k-card-media").attr("src", response.sprites.front_default);
      $(".pokemon-name").text(response.name);

      response.types.map((item, index) => {
        $(".pokemon-type").append(
          `<p class="pokemon-type-name-${index}">${item.type.name}</p>`
        );
        const bgcolor = colorTypes.find((e) => e.name === item.type.name);
        $(`.pokemon-type-name-${index}`).css({
          display: "inline-block",
          backgroundColor: bgcolor.color,
          padding: "8px",
          borderRadius: "16px",
          minWidth: "40px",
        });
      });

      $("#pokemon-moves").kendoChipList({
        items: response.moves.slice(0, 4).map((item) => {
          return { label: item.move.name };
        }),
        themeColor: "red",
      });

      var progressbars = [];
      $(".stats-list div").each(function (index) {
        var pb = $(this)
          .kendoProgressBar({
            min: 0,
            max: 200,
            showStatus: false,
            value: response.stats[index].base_stat,
            ariaRole: true,
            animation: {
              duration: 600,
            },
          })
          .data("kendoProgressBar");
        progressbars.push(pb);
      });

      $(".stats-list h4").each(function (index) {
        $(this).append(`<p >${response.stats[index].base_stat}</p>`);
      });
    })
    .fail(function () {
      console.log("Fail");
    });
});

$(document).ready(function () {
  $("#nextButton").on("click", function () {
    window.location.href = `../details/index.html?id=${parseInt(id, 10) + 1}`;
  });

  $(".search-bar").on("keypress", function (e) {
    if (e.which == 13) {
      window.location.href = `../details/index.html?name=${$(
        ".search-bar"
      ).val()}`;
    }
  });
});

function getDetailsPokemon(param) {
  return $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/pokemon/${param}/`,
    success: function (data) {},
    error: function (xhr, status, error) {
      $(".container").replaceWith("<p>No result..</p>");
    },
  });
}
