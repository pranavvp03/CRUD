// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId:{ type: String, required: true},
    name: { type: String, required: true },
    number: { type: String, required: true },
    position: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
