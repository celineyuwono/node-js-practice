let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },

})

let ArticleCollection = module.exports = mongoose.model('Article', articleSchema); // Article is the name of the model