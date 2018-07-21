const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: String
});

// Create model
const Text = mongoose.model('text', textSchema);

// Export model
module.exports = Text;