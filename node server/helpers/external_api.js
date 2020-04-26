const got = require("got")

let AmiiboaModel = require("../models/amiiboa")

let load = async () => {
    try {
        const response = await got('https://www.amiiboapi.com/api/amiibo/');
        const arr = JSON.parse(response.body).amiibo
        AmiiboaModel.insertMany(arr, function (error, docs) {
            console.log(error ? error : docs);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    load
}