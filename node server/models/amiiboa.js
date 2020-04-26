const {Schema:mongooseSchema , model} = require("mongoose")

let amiiboaSchema = new mongooseSchema({
    amiiboaSeries:{type:String},
    character:{type:String},
    gameSeries:{type:String},
    head:{type:String},
    image:{type:String},
    name:{type:String},
    release:{type:Object},
    tail:{type:String},
    type:{type:String},
})

let AmiiboaModel = model('amiiboa',amiiboaSchema)
module.exports = AmiiboaModel
