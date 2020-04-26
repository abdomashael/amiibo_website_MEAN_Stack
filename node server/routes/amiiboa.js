const express = require("express")
let router = express.Router()

let AmiiboaModel = require("../models/amiiboa")
let {
    getMaxSize
} = require("../helpers/amiiboa")

const resPerPage = 12; // results per page

router.get("/max/pages", async (req, res) => {
    let maxPages = await getMaxPages()
    res.json(maxPages)
})

router.get("/max/cards", async (req, res) => {
    try {
        let cardsCount = await getMaxSize();
        res.json(cardsCount)
    } catch (error) {
        res.json(error)
    }
})

router.get("/search", async (req, res) => {
    const searchName = req.query.name;
    const result = await AmiiboaModel.find({
        name: {
            $regex: searchName,
            $options: 'i'
        }
    }).exec()

    res.json(result)
})

router.get("/:page", async (req, res) => {
    const page = req.params.page > 1 ? req.params.page : 1; // Page 

    let maxPages = await getMaxPages()


    if (page > maxPages) {
        res.json(404, `Max page Size ${maxPages}`)
    } else {
        const skipPages = (resPerPage * page) - resPerPage
        try {
            result = await AmiiboaModel.find().skip(skipPages).limit(resPerPage).sort('name')
            res.json(result)
        } catch (error) {
            console.log(error);
            res.sendStatus(404)
        }
    }
})

let getMaxPages = async () => {
    let maxPages = parseInt(await getMaxSize() / resPerPage)

    if (maxPages < (await getMaxSize() / resPerPage))
        maxPages = maxPages + 1

    return maxPages
}

module.exports = router