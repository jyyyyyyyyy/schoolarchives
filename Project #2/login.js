const togglePwd = document.querySelector('#togglePwd');
const password = document.querySelector('#password');

togglePwd.addEventListener('click', function (e) {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('bi-eye');
});

function submitToAPI(e) {
  e.preventDefault();
  var username_gw = $("#username").val();
  var password_gw = $("#password").val();

  if (username_gw =="") {
    alert ("Please enter your email.");
    return;
  }
  
  if (password_gw=="") {
    alert ("Please enter your password.");
    return;
  }

  var data = {
    name : username_gw,
    password : password_gw
  };

  $.ajax({
    type: "POST",
    url : "<<URL HERE>>",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data)
  })
  .done((res) => {
    if (res) {
      var response_in = JSON.stringify(res);
      var response_out = JSON.parse(response_in);

      if (response_out.status == "success") {
        setTimeout(function () { window.location.href = "main.html" });
        sessionStorage.setItem("authenticatedUser", username_gw);
        sessionStorage.setItem('access', 'allowed');
      }
      else {
        alert("Error logging in, please try again or register.");
        setTimeout(function () { window.location.href = "index.html" });
      }
    }
  })
}
