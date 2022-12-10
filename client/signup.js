const usernameInput = document.querySelector(".username-input")
const passwordInput = document.querySelector(".password-input")
const firstNameInput = document.querySelector(".firstName-input")
const lastNameInput = document.querySelector(".lastName-input")
const addressInput = document.querySelector(".address-input")
const submitButton = document.querySelector(".submit-button")

const signup = async (event) => {
  event.preventDefault()

  if (
    usernameInput.value === "" ||
    passwordInput.value === "" ||
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    addressInput.value === ""
  ) {
    alert("username/password/firstName/lastName/address cannot be empty")
    return
  }

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      address: addressInput.value,
    }),
  })

  const data = await res.json()
  console.log(data)

  if (data.message && data.username) {
    window.location.href = "http://localhost:5500/client/login.html"
  } else {
    alert(data.message)
  }
}

submitButton.addEventListener("click", signup)
