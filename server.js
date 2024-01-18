import express from "express"
import { connect } from "mongoose"
import route from "./Routes.js"
import cors from 'cors'

let app = express()
let mongoUrl = "mongodb+srv://dsouzalynn007:dsouzalynn007@basic-projects.n17xlrw.mongodb.net/";
let Port=8888

let mongoConnection=()=> {
    try {
        connect(mongoUrl);
        console.log("mongo db connected")
    } catch (error) {
        console.log(error)
    }
}
mongoConnection()

app.get("/", (req,res) => {
    try {
        res.send({
            status: 200,
            msg:"welcome to car App"
        })
    } catch (error) {
        console.log(error)
    }
})
.use(cors())
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(route)
.listen(Port, () => {
    console.log(`server started At port ${Port}`)
})