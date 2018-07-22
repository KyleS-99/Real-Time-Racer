const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passageSchema = new Schema({
    passage: String
});

passageSchema.statics.random = async function () {
    const count = await this.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomDoc = await this.findOne().skip(rand);
    return randomDoc;
}

// Create model
const Passage = mongoose.model('passage', passageSchema);

// Export model
module.exports = Passage;