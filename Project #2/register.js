function validateEmail(email) {
  const re = /(-)\1+/;

  if (re.test(email)) {
    return false;;
  }
  else {
    const re = /^[a-zA-Z0-9.+_]+(([-](\1)+[a-zA-Z0-9.+_])?)+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    if (re.test(email)){
      return true;
    }
    else {
      return false;
    }
  }
}

function validatePwd(password) {
  const re = /[A-Za-z0-9@$%^&+=]{8,}/;
  return re.test(password);
}

const togglePwd = document.querySelector('#togglePwd');
const togglePwd2 = document.querySelector('#togglePwd2');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

togglePwd.addEventListener('click', function (e) {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('bi-eye');
});

togglePwd2.addEventListener('click', function (e) {
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    this.classList.toggle('bi-eye');
});

function submitToAPI(e) {
  e.preventDefault();
  var username_gw = $("#username").val();
  var password_gw = $("#password").val();
  var recheck = $("#password2").val();

  if (username_gw == "") {
    alert("Please enter your email.");
    return;
  }
  else if (!validateEmail(username_gw)) {
    alert("Please enter your email correctly.");
    return;
  }

  if (password_gw == "") {
    alert("Please enter your password.");
    return;
  }
  else if (!validatePwd(password_gw)) {
    alert("Invalid password format.");
    return;
  }

  if (recheck == "") {
    alert("Please confirm your password.");
    return;
  }

  if (password_gw != recheck) {
    alert("Passwords do not match.")
    return;
  }

  var data = {
    name: username_gw,
    password: password_gw,
    password2: recheck
  };

  $.ajax({
    type: "POST",
    url: "<<URL HERE>>",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data)
  })
    .done((res) => {
      if (res) {
        var response_in = JSON.stringify(res);
        var response_out = JSON.parse(response_in);

        if (response_out.status == "success") {
          alert("Successfully registered");
          setTimeout(function () { window.location.href = "login.html" });
        }
        else {
          alert(response_out.error);
          return;
        }
      }
    })
}