var books = [];

$(document).ready(function () {
  getBooks(1);
  $("#grid").kendoGrid({
    editable: "popup",
    pageable: true,
    dataSource: {
      data: books,
      schema: {
        model: {
          id: "BookID",
          fields: {
            Title: {
              type: "string",
            },
            PublishedDate: {
              type: "date",
            },
            Thumbnail: {
              type: "string",
            },
            Category: {
              type: "string",
            },
          },
        },
      },
      pageSize: 10,
    },
    toolbar: ["create", "search"],
    columns: [
      {
        selectable: true,
        width: 20,
        attributes: {
          class: "checkbox-align",
        },
        headerAttributes: {
          class: "checkbox-align",
        },
      },
      {
        field: "Title",
        title: "Title",
        width: 100,
        attributes: { style: "text-align: center" },
        headerAttributes: {
          style: "text-align: center; justify-content: center",
        },
      },
      {
        field: "PublishedDate",
        title: "Published Date",
        template: `<input class="dateinput published-date" title="please enter date"/>`,
        width: 60,
        attributes: { style: "text-align: center" },
        headerAttributes: {
          style: "text-align: center; justify-content: center",
        },
      },
      {
        field: "Thumbnail",
        title: "Thumbnail",
        template: `<img src="#:Thumbnail#"/>`,
        width: 60,
        attributes: { style: "text-align: center" },
        headerAttributes: {
          style: "text-align: center; justify-content: center",
        },
      },
      {
        field: "Category",
        title: "Category",
        editor: clientCategoryEditor,
        width: 40,
        attributes: { style: "text-align: center" },
        headerAttributes: {
          style: "text-align: center; justify-content: center",
        },
      },
      { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" },
    ],
  });

  $(".dateinput").each(function (index) {
    $(this).kendoDateInput({
      format: "dd/MM/yyyy",
      value: new Date(books[index].PublishedDate),
    });
  });
});

function getBooks(page) {
  return $.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10&inc=kind%2Cid%2Cetag%2CvolumeInfo`,
    success: function (data) {
      data.data.data.map((item) => {
        var book = {
          Title: item.volumeInfo.title,
          PublishedDate: kendo.parseDate(item.volumeInfo.publishedDate, [
            "yyyy-MM-dd",
            "yyyy",
          ]),
          Category: item.volumeInfo.categories,
          Thumbnail: item.volumeInfo.imageLinks.smallThumbnail,
        };
        books.push(book);
      });
    },
    error: function (xhr, status, error) {
      $(".container").replaceWith("<p>No result..</p>");
    },
  });
}

function clientCategoryEditor(container, options) {
  $('<input required name="Category">')
    .appendTo(container)
    .kendoDropDownList({
      autoBind: false,
      dataTextField: "CategoryName",
      dataValueField: "CategoryName",
      dataSource: {
        data: categories,
      },
    });
}

var categories = [
  {
    CategoryID: 1,
    CategoryName: "Romantic",
  },
  {
    CategoryID: 2,
    CategoryName: "Technology",
  },
  {
    CategoryID: 3,
    CategoryName: "Novel",
  },
  {
    CategoryID: 4,
    CategoryName: "Detective",
  },
  {
    CategoryID: 5,
    CategoryName: "Biology",
  },
  {
    CategoryID: 6,
    CategoryName: "Adventure",
  },
  {
    CategoryID: 7,
    CategoryName: "Action",
  },
  {
    CategoryID: 8,
    CategoryName: "Poem",
  },
];
