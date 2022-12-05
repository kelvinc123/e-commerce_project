const usernameInput = document.querySelector(".username-input")
const passwordInput = document.querySelector(".password-input")
const submitButton = document.querySelector(".submit-button")

const login = async (event) => {
  event.preventDefault()

  if (usernameInput.value === "" || passwordInput.value === "") {
    alert("username and password cannot be empty")
    return
  }

  const res = await fetch("http://localhost:4373/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
  })

  const data = await res.json()
  console.log(data)

  if (data.access_token && data.username) {
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("username", data.username)
    window.location.href = "http://localhost:5500/client/index.html"
  } else {
    alert(data.message)
  }
}

submitButton.addEventListener("click", login)

// username: "JoDo@gmail.com",
// password: "1234567",
