const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const app = express();
const RecipeModel=require("./model/recipe")

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




app.get('/viewuser', async (req, res) => {
  try {
      const users = await UserModel.find();
      res.send(users);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/viewuser/:id', async (req, res) => {
    try {
      const userId = req.params.id; 
      const user = await UserModel.findById(userId); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.send(user); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
  app.delete('/removeuser/:a',async(req,res)=>{   
    var user_id=req.params.a
    console.log(user_id)
    try {
        await UserModel.findByIdAndDelete(user_id)
        res.send({message:'recipie deleted  succesfully'})
    } catch (error) {
        console.log(error)
    }
})

app.put('/edituser/:b', async (req, res) => {
    const user_id = req.params.b;
    console.log(user_id);

    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
        }

        // Update the user
        const updatedUser = await UserModel.findByIdAndUpdate(user_id, req.body, { new: true });

        res.send({ message: 'Updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while updating the user' });
    }
});
  
// recipie api 


app.post("/addrec", async (req, res) => {
    try {

        const { title, description, image, category, createdBy ,ingredients} = req.body;

        if (!title || !description || !image || !category || !createdBy || !ingredients) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newRecipe = new RecipeModel({
            title,
            ingredients,
            description,
            image,
            category,
            createdBy
        });

        const savedRecipe = await newRecipe.save();

        res.status(201).json({ message: 'Recipe added successfully', recipe: savedRecipe });
    } catch (error) {
  
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/viewrec', async (req, res) => {
    try {
        const recipies = await  RecipeModel.find().populate('createdBy', 'firstName lastName');;
        res.send(recipies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });




  app.delete('/removerec/:a',async(req,res)=>{   
    var rec_id=req.params.a
    console.log(rec_id)
    try {
        await RecipeModel.findByIdAndDelete(rec_id)
        res.send({message:'recipie deleted  succesfully'})
    } catch (error) {
        console.log(error)
    }
})



app.put('/editrec/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      delete updateData.createdBy;
  
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, updateData, { new: true });
      res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

app.get('/userrec/:id', async (req, res) => {
    try {
      const userId = req.params.id; 
    
      const recipes = await RecipeModel.find({ createdBy: userId });
      
      if (recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found for this user' });
      }
      
      res.json(recipes); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/catrec/:type', async (req, res) => {
    try {
      const { type } = req.params; 
      
      const recipes = await RecipeModel.find({ category: type }); 
      
      if (recipes.length === 0) {
        return res.status(404).json({ message: `No recipes found for category: ${type}` });
      }
      
      res.json(recipes); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.get('/detailrec/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





app.listen('3010', () => {
    console.log("port is up and running");
});
