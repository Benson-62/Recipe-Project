const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const app = express();

require('./connection');

const UserModel = require('./model/user');

// Middleware
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        const { firstName, lastName, email, password,isAdmin} = req.body;

       
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          isAdmin: isAdmin
        });
        await newUser.save();

        
        res.status(201).json({ status: 'ok', message: 'New user created' });
    } catch (error) {
        console.error(error);


        if (error.code === 11000) { //duplicate key error in MongoDB
            res.status(409).json({ message: 'Email already existsp' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
  
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
  

    const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin}, 'recipee_website', { expiresIn: '1h' });
    res.status(200).json({ message:"login succesfull",token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/view', async (req, res) => {
  try {
      const users = await UserModel.find();
      res.send(users);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen('3010', () => {
    console.log("port is up and running");
});
