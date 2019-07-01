const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating User Schema
const ExpenseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    types: {
        type: String,
        required: true
    }
});
module.exports = Expense = mongoose.model('expense', ExpenseSchema, 'expenses');