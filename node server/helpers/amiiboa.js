const AmiiboaModel = require("../models/amiiboa")

//Count of amiiboas in Database
let getMaxSize = async() => {
    let count  = await AmiiboaModel.estimatedDocumentCount().exec()
    return count
}

module.exports = {
    getMaxSize
}