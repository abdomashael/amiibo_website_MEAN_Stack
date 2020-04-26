const AmiiboaModel = require("../models/amiiboa")

let getMaxSize = async() => {
    let count  = await AmiiboaModel.estimatedDocumentCount().exec()
    return count
}

module.exports = {
    getMaxSize
}