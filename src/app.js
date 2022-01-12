const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode  = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Express config
const directory = express.static(path.join(__dirname, "../public/"))
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Handlebars config
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(directory)

app.get("", (req, res) => {
    res.render("index", {
        title: "Home Page!",
        splash: "amazing. 10/10"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        splash: "You think I know what this is?"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page™",
        splash: "You think you're the only one that needs help here?"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {lat, long, name} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(lat, long, (error, {disc, temp, feel} = {}) => {
            if(error){
                return res.send({error})
            }
                    
            res.send({
                search: req.query.address,
                location: name,
                disc: disc,
                temp: "Currently " + temp + " degrees",
                feel: "Feels like " + feel,
            })     
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "That help article doesn't exist.",
        splash: "Perhaps try one that does?"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "That page doesnt exist.",
        splash: "Perhaps try one that does?"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})