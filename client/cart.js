const fetchProducts = async () => {
  const res = await fetch("http://localhost:6100/api/products")
  const data = await res.json()
  console.log(data)
}

fetchProducts()
