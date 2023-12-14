import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import EmployeeModel from "./models/employee.js"

dotenv.config();
const port = process.env.PORT || 3001;


const app = express();
app.use(cors());
app.use(express.json());


//Database Connection
mongoose.set("strictQuery", false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB database is connected!");
    } catch (err) {
        console.error("MongoDB connection failed: ", err.message);
    }
};

//New Record API
app.post("/create", async (req, res) => {
    try {
        const { name, dob, age, gender, email, department, position, salary } = req.body;
        if (!name || !dob || !age || !gender || !email || !department || !position || !salary) {
            return res.status(400).json({ error: "Incomplete data. Please provide all required fields." });
        }

        // Create a new employee
        const newEmployee = await EmployeeModel.create(req.body);

        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//API for Get
app.get("/", async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//API for Update
app.get("/getUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EmployeeModel.findById({_id:id});
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EmployeeModel.findByIdAndUpdate({_id:id}, {
            name: req.body.name,
            dob: req.body.dob,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            department: req.body.department,
            position: req.body.position,
            salary: req.body.salary
        }, { new: true }); // { new: true } returns the updated document

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//API for delete
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EmployeeModel.findByIdAndDelete({_id:id});
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//To obtain the Id of the specific Employee
app.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EmployeeModel.findById({_id:id});
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    connectDB();
    console.log("Server is Running!");
})