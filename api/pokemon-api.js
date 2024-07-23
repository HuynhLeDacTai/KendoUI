export function getPokemons(offset) {
  return $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`,
    success: function (data) {},
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}

export function getImagePokemon(url) {
  return $.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    success: function (data) {
      return data.sprites.front_default;
    },
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}

export function getDetailsPokemon(id) {
  return $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    success: function (data) {},
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}
