const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 5000
const ratingRoutes = require("./routes/ratingRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const app = express()
app.use(cors())
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/ratings", ratingRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
