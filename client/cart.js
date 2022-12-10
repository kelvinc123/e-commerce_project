const body = document.body
const cartProducts = JSON.parse(localStorage.getItem("cartProducts"))

const isLoggedIn =
  localStorage.getItem("access_token") && localStorage.getItem("username")

if (!isLoggedIn) {
  window.location.href = "http://localhost:5500/client/index.html"
}

const buyProducts = async (creditCardNumber) => {
  const res = await fetch("http://localhost:3000/api/purchase", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      products: cartProducts.map((el) => {
        return {
          id: el._id,
          quantity: el.purchaseQuantity,
        }
      }),
      cardNumber: creditCardNumber,
    }),
  })
  const data = await res.json()

  if (data.message !== "Successfully purchased the product") {
    throw new Error(data.message)
  }
  return data
}

const createDOMElements = (cartProductsData) => {
  cartProductsData?.map((prod) => {
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

    const purchaseQuantity = document.createElement("p")
    purchaseQuantity.classList.add("purchase_count")
    purchaseQuantity.textContent = `Purchase Quantity - ${prod.purchaseQuantity}`

    // Add remove button
    const removeFromCartButton = document.createElement("input")
    removeFromCartButton.classList.add("remove-from-cart-button")
    removeFromCartButton.type = "submit"
    removeFromCartButton.value = "Remove from cart"
    removeFromCartButton.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(prod._id)
      const newCartProducts = cartProducts.filter((el) => {
        return el._id !== prod._id
      })
      localStorage.setItem("cartProducts", JSON.stringify(newCartProducts))
      window.location.href = "http://localhost:5500/client/cart.html"
    })

    productDiv.append(
      productTitle,
      productId,
      productDescription,
      productCategory,
      productImage,
      productPrice,
      productQuantity,
      purchaseQuantity,
      removeFromCartButton
    )

    body.append(productDiv)
  })
}

createDOMElements(cartProducts)

// credit card input
const creditCardInput = document.createElement("input")
creditCardInput.classList.add("credit-card-input")
creditCardInput.type = "text"
creditCardInput.placeholder = "Enter Credit Card Number..."
creditCardInput.maxLength = 16

//  purchase button
const purchaseButton = document.createElement("input")
purchaseButton.classList.add("purchase-button")
purchaseButton.type = "submit"
purchaseButton.value = "Purchase"
purchaseButton.addEventListener("click", () => {
  if (creditCardInput.value.length !== 16) {
    alert("credit card number length must be 16 numbers")
    return
  }
  buyProducts(creditCardInput.value)
    .then((response) => {
      console.log(
        `${response.message}\n$${JSON.stringify(
          response.purchaseData.totalAmount
        )} charged\n${JSON.stringify(response.purchaseData.products)}`
      )
      alert(
        `${response.message}\n$${JSON.stringify(
          response.purchaseData.totalAmount
        )} charged\n${JSON.stringify(response.purchaseData.products)}`
      )
      localStorage.removeItem("cartProducts")
      window.location.href = "http://localhost:5500/client/index.html"
    })
    .catch((error) => {
      console.log("error when buying products: " + error)
      alert("error when buying products: " + error)
    })
})

cartProducts?.length > 0 && body.append(creditCardInput, purchaseButton)
