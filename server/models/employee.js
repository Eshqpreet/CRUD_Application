import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"], 
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        trim: true, 
        lowercase: true,
    },
    department: {
        type: String,
    },
    position: {
        type: String,
    },
    salary: {
        type: Number,
    },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

export default EmployeeModel;
