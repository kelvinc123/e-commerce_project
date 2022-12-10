const body = document.body
const loginAndSignup = document.querySelector(".loginAndSignup")
const cart = document.querySelector(".cart")
const logout = document.querySelector(".logout")
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

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

if (!isLoggedIn) {
  cart.style.display = "none"
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
    productQuantity.textContent = `Available Quantity - ${prod.quantity}`

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

    // Create rating form, select element & options, and submit button
    const ratingSelectList = document.createElement("select")
    ratingSelectList.classList.add("rating-selectList")
    const ratingOptions = ["--Choose Rating--", "1", "2", "3", "4", "5"]
    for (let i = 0; i < ratingOptions.length; i++) {
      const option = document.createElement("option")
      option.value = ratingOptions[i]
      option.text = ratingOptions[i]
      ratingSelectList.appendChild(option)
    }

    const ratingSelectSubmitButton = document.createElement("input")
    ratingSelectSubmitButton.classList.add("rating-submit-button")
    ratingSelectSubmitButton.type = "submit"
    ratingSelectSubmitButton.value = "Submit Rating"
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
    const ratingsForm = document.createElement("form")
    ratingsForm.classList.add("ratings-form")
    ratingsForm.appendChild(ratingSelectList)
    ratingsForm.appendChild(ratingSelectSubmitButton)

    // Create Add to Cart form, input box, and submit button
    const addToCartQuantityInput = document.createElement("input")
    addToCartQuantityInput.classList.add("addToCart-quantity-input")
    addToCartQuantityInput.type = "text"
    addToCartQuantityInput.placeholder = "Enter Quantity"
    const addToCartQuantitySubmitButton = document.createElement("input")
    addToCartQuantitySubmitButton.classList.add("addToCart-submit-button")
    addToCartQuantitySubmitButton.type = "submit"
    addToCartQuantitySubmitButton.value = "Add to Cart"
    addToCartQuantitySubmitButton.addEventListener("click", (e) => {
      e.preventDefault()
      if (typeof addToCartQuantityInput.value !== "string") {
        return
      }

      const num = Number(addToCartQuantityInput.value)
      if (Number.isInteger(num) && num > 0) {
        const withoutLeading0 = parseInt(num, 10)
        console.log("passed: ", withoutLeading0)

        if (cartProducts.length <= 0) {
          console.log("should be a new product and first product in the cart")
          cartProducts.push({ ...prod, purchaseQuantity: withoutLeading0 })
        } else {
          let exists = false
          cartProducts.forEach((value) => {
            if (prod._id === value._id) {
              console.log(`adding ${withoutLeading0}`)
              value.purchaseQuantity += withoutLeading0
              exists = true
              return
            }
          })
          if (!exists) {
            console.log("should be a new product")
            cartProducts.push({ ...prod, purchaseQuantity: withoutLeading0 })
            exists = false
          }
        }

        console.log("here is the cart products")
        console.log(cartProducts)
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
      }
    })
    const addtoCartForm = document.createElement("form")
    addtoCartForm.classList.add("addToCart-form")
    addtoCartForm.appendChild(addToCartQuantityInput)
    addtoCartForm.appendChild(addToCartQuantitySubmitButton)

    if (!isLoggedIn) {
      ratingsForm.style.display = "none"
      addtoCartForm.style.display = "none"
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
      ratingsForm,
      addtoCartForm
    )

    body.append(productDiv)
  })
}

// ================================================================================================================== //

const getBoth = async () => {
  const data = await Promise.all([fetchProducts(), fetchProductRatings()])
  createDOMElements(data[0], data[1])
}

getBoth()
