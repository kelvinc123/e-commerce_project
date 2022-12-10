const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
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

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`Ratings started on port ${port}`))
