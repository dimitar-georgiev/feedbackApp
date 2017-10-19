/**
 * Created by Mitaka on 18-Oct-17.
 */
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);