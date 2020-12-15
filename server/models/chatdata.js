const mongoose =require('mongoose');

const dataSchema = new mongoose.Schema({
    id: Number,
    name: String,
    chats: String
});

module.exports = mongoose.model('Data', dataSchema);