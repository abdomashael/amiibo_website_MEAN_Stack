const got = require("got")

let AmiiboaModel = require("../models/amiiboa")
let {
    getMaxSize
} = require("./amiiboa")

let load = async () => {
    try {
        const response = await got('https://www.amiiboapi.com/api/amiibo/');
        const arr = JSON.parse(response.body).amiibo
        const maxCards = await getMaxSize()

        if (maxCards !== arr.length) {
            AmiiboaModel.insertMany(arr, function (error, docs) {
                console.log(error ? error : docs);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    load
}