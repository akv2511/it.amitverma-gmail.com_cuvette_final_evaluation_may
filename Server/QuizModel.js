const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    text: { type: String },
    url: { type: String },
});
const questionSchema = new mongoose.Schema({
    questionName: { type: String, unique: true },
    optionType: { type: String }, // You might want to validate the optionType against specific values
    options: [optionSchema],
    answer: { type: String },
});
const QuizSchema = new mongoose.Schema(
    {
        quizName: { type: String },
        quizType: { type: String }, 
        questions: [questionSchema],
        email : {type : String},
        timer: { type: Number, default: null },
        createdAt: {type: Date},
    },
    {
        collection: "quizs",
    });
QuizSchema.index({quizName:1,quizType:1,email:1, "question.questionName":1})
// 
const quizModel = mongoose.model("quizs", QuizSchema);
module.exports= quizModel;
