const body = document.body
const loginAndSignup = document.querySelector(".loginAndSignup")
const isLoggedIn =
  localStorage.getItem("access_token") && localStorage.getItem("username")

if (isLoggedIn) {
  loginAndSignup.style.display = "none"
}

const ratingData = [
  {
    _id: "mongoId_123",
    product: "638a8c40dee05a998fc7285b",
    user: "userId_123",
    rating: 1,
  },
  {
    _id: "mongoId_456",
    product: "638a8c40dee05a998fc7285c",
    user: "userId_456",
    rating: 2,
  },
  {
    _id: "mongoId_xxx",
    product: "638a8c40dee05a998fc72858",
    user: "userId_xxx",
    rating: 3,
  },
  {
    _id: "mongoId_yyy",
    product: "638a8c40dee05a998fc72858",
    user: "userId_yyy",
    rating: 5,
  },
  {
    _id: "mongoId_zzz",
    product: "638a8c40dee05a998fc72858",
    user: "userId_zzz",
    rating: 4,
  },
]

const fetchProducts = async () => {
  const productResult = await fetch("http://localhost:8000/api/products") // make sure port is correct
  const productData = await productResult.json()
  console.log(productData)
  return productData
}

const fetchProductRatings = async () => {
  // const ratingResult = await fetch("http://localhost:7000/api/ratings") // make sure port is correct
  // const ratingData = await ratingResult.json()
  // console.log(ratingData)

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

    // make it a dropdown and submit button instead, get from todolist or yelp or other projects?
    const productAddRatingButton = document.createElement("button")
    productAddRatingButton.classList.add("product_add_rating")
    productAddRatingButton.textContent = "Add Rating"
    productAddRatingButton.addEventListener("click", () => {
      console.log("clicked productAddRatingButton")
    })

    if (!isLoggedIn) {
      productAddRatingButton.style.display = "none"
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
      productAddRatingButton
    )

    body.append(productDiv)
  })
}

const getBoth = async () => {
  const data = await Promise.all([fetchProducts(), fetchProductRatings()])
  createDOMElements(data[0], data[1])
}

getBoth()
