const body = document.body
const loginAndSignup = document.querySelector(".loginAndSignup")
const logout = document.querySelector(".logout")
const isLoggedIn =
  localStorage.getItem("access_token") && localStorage.getItem("username")

logout.addEventListener("click", () => {
  localStorage.clear()
  window.location.href = "http://localhost:5500/client/index.html"
})

if (isLoggedIn) {
  loginAndSignup.style.display = "none"
  logout.style.display = "block"
}

const fetchProducts = async () => {
  const productResult = await fetch("http://localhost:3000/api/products") // make sure port is correct
  const productData = await productResult.json()
  console.log(productData)
  return productData
}

const fetchProductRatings = async () => {
  const ratingResult = await fetch("http://localhost:3000/api/ratings") // make sure port is correct
  const ratingData = await ratingResult.json()
  console.log(ratingData)

  let ratingsByProduct = {}
  ratingData.forEach((element) => {
    if (ratingsByProduct[element.product]) {
      ratingsByProduct[element.product] = {
        count: (ratingsByProduct[element.product].count += 1),
        average_rating:
          (ratingsByProduct[element.product].average_rating *
            (ratingsByProduct[element.product].count - 1) +
            element.rating) /
          ratingsByProduct[element.product].count,
      }
    } else {
      ratingsByProduct[element.product] = {
        count: 1,
        average_rating: element.rating / 1,
      }
    }
  })
  console.log(ratingsByProduct)
  return ratingsByProduct
}

const addProductRating = async (productId, rating) => {
  const res = await fetch("http://localhost:3000/api/ratings", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      productId: productId,
      rating: rating,
    }),
  })
  const data = await res.json()
  console.log(data)
  return data
}

const createDOMElements = (productData, ratingsByProduct) => {
  productData.map((prod) => {
    const productDiv = document.createElement("div")
    productDiv.classList.add("products")

    const productTitle = document.createElement("h1")
    productTitle.classList.add("product_title")
    productTitle.textContent = prod.title

    const productId = document.createElement("h4")
    productId.classList.add("product_id")
    productId.textContent = prod._id

    const productDescription = document.createElement("p")
    productDescription.classList.add("product_description")
    productDescription.textContent = `Description: ${prod.description}`

    const productCategory = document.createElement("p")
    productCategory.classList.add("product_category")
    productCategory.textContent = `Category: ${prod.category}`

    const productImage = document.createElement("img")
    productImage.classList.add("product_image")
    productImage.setAttribute("alt", "happy face emoji")
    productImage.setAttribute("width", "50")
    productImage.src = prod.image

    const productPrice = document.createElement("p")
    productPrice.classList.add("product_price")
    productPrice.textContent = `Price: $${prod.price}`

    const productQuantity = document.createElement("p")
    productQuantity.classList.add("product_count")
    productQuantity.textContent = `Quantity - ${prod.quantity}`

    const productRating = document.createElement("p")
    productRating.classList.add("product_rating")
    productRating.textContent = `Average Rating: ${
      ratingsByProduct[productId.textContent]?.average_rating
        ? ratingsByProduct[productId.textContent].average_rating
        : 0
    } (${
      ratingsByProduct[productId.textContent]?.count
        ? ratingsByProduct[productId.textContent].count
        : 0
    }) `

    // Create array of options to be added
    const ratingOptions = ["--Choose Rating--", "1", "2", "3", "4", "5"]

    // Create and append select list
    const ratingSelectList = document.createElement("select")
    ratingSelectList.classList.add("rating-selectList")

    // Create and append the options
    for (let i = 0; i < ratingOptions.length; i++) {
      const option = document.createElement("option")
      option.value = ratingOptions[i]
      option.text = ratingOptions[i]
      ratingSelectList.appendChild(option)
    }

    // Create input tag
    const ratingSelectSubmitButton = document.createElement("input")
    ratingSelectSubmitButton.classList.add("submit-button")
    ratingSelectSubmitButton.type = "submit"
    ratingSelectSubmitButton.value = "submit rating"
    ratingSelectSubmitButton.addEventListener("click", (event) => {
      event.preventDefault()
      if (ratingSelectList.value === "--Choose Rating--") {
        return
      }
      console.log(ratingSelectList.value)
      addProductRating(prod._id, ratingSelectList.value)
        .then(
          () =>
            (window.location.href = "http://localhost:5500/client/index.html")
        )
        .catch(() =>
          console.log("something went wrong when adding product rating")
        )
    })

    // Create form tag
    const ratingsForm = document.createElement("form")
    ratingsForm.classList.add("ratings-form")
    ratingsForm.appendChild(ratingSelectList)
    ratingsForm.appendChild(ratingSelectSubmitButton)
    if (!isLoggedIn) {
      ratingsForm.style.display = "none"
    }

    productDiv.append(
      productTitle,
      productId,
      productDescription,
      productCategory,
      productImage,
      productPrice,
      productQuantity,
      productRating,
      ratingsForm
    )

    body.append(productDiv)
  })
}

const getBoth = async () => {
  const data = await Promise.all([fetchProducts(), fetchProductRatings()])
  createDOMElements(data[0], data[1])
}

getBoth()
