const queryString = window.location.search; // Contains "?id=<The Given ID>"
const params = new URLSearchParams(queryString); // Converts the query string to javascript object
const param = params.get("id") || params.get("name");
var pokemon;

$(window).on("load", function () {
  getDetailsPokemon(param)
    .then((response) => {
      pokemon = { ...response };
      $(".k-card-media").attr("src", response.sprites.front_default);
      $(".pokemon-name").text(response.name);

      response.types.map((item) => {
        $(".pokemon-type").append(
          `<p class="pokemon-type-name">${item.type.name}</p>`
        );
        $(".pokemon-type-name").css({
          display: "inline-block",
          border: "2px solid #ccc",
          padding: "8px",
          borderRadius: "16px",
          minWidth: "40px",
        });
      });

      $("#pokemon-moves").kendoChipList({
        items: response.moves.slice(0, 4).map((item) => {
          return { label: item.move.name };
        }),
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
