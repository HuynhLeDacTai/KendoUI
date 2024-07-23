$(document).ready(function () {
  var validationSuccess = $("#validation-success");

  $("#loginForm").kendoForm({
    orientation: "vertical",
    formData: {
      Email: "john.doe@email.com",
      Password: "",
    },
    items: [
      {
        type: "group",
        label: "Login Form",
        items: [
          {
            field: "Email",
            label: "Email:",
            validation: { email: true, required: true },
          },
          {
            field: "Password",
            label: "Password:",
            validation: { required: true },
            hint: "Hint: enter alphanumeric characters only.",
            editor: function (container, options) {
              $(
                '<input type="password" id="Password" name="' +
                  options.field +
                  '" title="Password" required="required" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>'
              )
                .appendTo(container)
                .kendoTextBox();
            },
          },
        ],
      },
    ],
    validateField: function (e) {
      validationSuccess.html("");
    },
    submit: function (e) {
      const loginForm = $("#loginForm");
      const email = $("#Email").val();
      const password = $("#Password").val();
      console.log("Email:", email);
      console.log("Password:", password);
      if (email === "john.doe@email.com" && password === "123") {
        console.log("Login successfuly");
        window.location.href = "../Home/index.html";
      } else {
        console.log("Login failed");
      }
      e.preventDefault();

      validationSuccess.html(
        "<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>"
      );
    },
    clear: function (ev) {
      validationSuccess.html("");
    },
  });
});
