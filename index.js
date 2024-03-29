const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());
const User = require("./users");
const Quiz = require("./QuizModel")
const isLoggedIn = (req, res, next) => {
  try {
    const jwtToken = req.header.token
    const user = jwt.verify(jwtToken, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    res.json({
      status: 'Failed',
      message: 'Please login first'
    })
  }
}
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10)
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.json({
        error: "User Exits",
        message: 'User Already Exist',
      });
    } else {
      const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 1800 })
      await User.create({
        name, email, password: encryptedpassword,
      });
      res.json({
        status: "SUCCESS",
        message: 'User Signed up sucessfully',
        jwtToken
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong',
      error
    });
  }
});



app.post('/api/loginUser', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(500).json({
        status: 'FAILED',
        message: 'Invalid credentials!'
      })
    }
    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!passwordMatched) {
      return res.status(500).json({
        status: 'FAILED',
        message: 'Invalid credentials!'
      })
    } else {
      const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 1800 })
      res.json({
        status: 'SUCCESS',
        message: `${user.name} signed in successfully!`,
        email,
        jwtToken
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})
app.post('/api/createQuiz', async (req, res) => {
  try {
    const createdQuiz = await Quiz.create(req.body);

    res.json({
      status: 'SUCCESS',
      message: `Quiz with ID ${createdQuiz._id} created successfully`,
      quizId: createdQuiz._id, // Include the ID in the response
    });
  } catch (error) {
    console.error('Error in server', error);
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong',
      error,
    });
  }
});


// app.post('/api/createQuiz', async (req, res) => {
//   // console.log("quiz data", req.body)
//   try {
//     await Quiz.create(
//       req.body
//     );
//     res.json({
//       status: "SUCCESS",
//       message: `${Quiz._id}Data upload sucessfully`,
      
//     });
//   } catch (error) {
//     console.log("error in server", error);
//     res.status(500).json({
//       status: 'FAILED',
//       message: 'Something went wrong',
//       error
//     });
//   }
// });



app.get('/api/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.find({ email: req.query?.email });
    // console.log("items", quiz);
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/quiz/:id', async (req, res) => {
  const quizId = req.params.id;
  console.log("id",quizId)
  try {
    // Use findById to retrieve a document by its ID
    const quiz = await Quiz.findById(quizId);

    if (quiz) {
      // If a quiz is found, send it in the response
      res.json(quiz);
    } else {
      // If no quiz is found, send a 404 Not Found response
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error retrieving quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/quiz/:quizId', async (req, res) => {
  console.log("ondelete",req.params?.quizId)
  const {quizId} = req.params;
  try {
    // Using findByIdAndDelete
    const result = await Quiz.findByIdAndDelete(req.params?.quizId);
    console.log("after delete",result);
    if (result) {
      res.json(`Quiz with _id ${quizId} successfully deleted.`)
      console.log(`Quiz with _id ${quizId} successfully deleted.`);
    } else {
      res.json(`No quiz found with _id ${quizId}. Nothing deleted.`);
      console.log(`No quiz found with _id ${quizId}. Nothing deleted.`);
    }
  } catch (error) {
    res.json('Error deleting quiz:', error);
  }
  
});



app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DBURL)
    .then(() => console.log(`app listening on port http://localhost:${process.env.PORT}`))
    .catch(() => console.log(error))
})