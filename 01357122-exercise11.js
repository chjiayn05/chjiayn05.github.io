const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

mongoose.connect('mongodb+srv://chjiayn05:C05j12y01@cheyne.kj4gfpj.mongodb.net/?appName=cheyne')
    .then(() => console.log('MongoDB 連線成功'))
    .catch((err) => console.error('MongoDB 連線失敗', err));

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    grade: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/students', async (req, res) =>{
    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade
    });
    try {
        const saveStudent = await newStudent.save();
        res.status(201).json(saveStudent);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

app.put('/students/:id', async (req, res) => {
    try {
        const newStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(newStudent);
    } catch (error) {
        res.status(500).json({message: "update student failed!!"});
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({message: "delete student successfully!"});
    } catch (error) {
        res.status(500).json({message: "delete student failed!!"});
    }
});

app.listen(port, () => {
    console.log(`伺服器正在執行中： http://localhost:${port}`);
});