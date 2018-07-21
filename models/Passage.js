const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passageSchema = new Schema({
    passage: String
});

passageSchema.statics.random = function () {
    this.countDocuments({}, function (err, count) {
        const random = Math.floor(Math.random() * count);

        Passage.findOne()
            .skip(random)
            .then((passage) => {
                return passage;
            });
    });
}

// Create model
const Passage = mongoose.model('passage', passageSchema);

// Export model
module.exports = Passage;