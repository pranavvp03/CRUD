const User = require("../models/user")
const { hashPassword, comparePassword } = require("../helpers/auth")
const jwt = require("jsonwebtoken")
const Employe = require('../models/employe')
const dotenv =  require("dotenv").config()
const test = (req,res)=>{
    res.json("test is working")
};
 //user register
const  registerUser = async (req,res)=>{
  try {
    const {name,email,password,iaSperAdmin} = req.body
    //name is entered
    if (!name) {
      return res.json({
        error: "name is required"
      })
    };
    //check password is good 
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be at least 6 character long"
      })
    }
    //check email 
    const exist = await User.findOne({email})
    if (exist) {
      return res.json({
        error: "email is taken already"
      })
    };

    const hashedPassword = await hashPassword(password)
    //create user database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isSperAdmin
     
    });
    console.log("User created:", user);

    return res.json(user)
  } catch (error) {
    console.log(error);
    
  }
}

const loginUser = async (req,res)=>{
  try {
    const {email,password} = req.body
    
    //check if user exists
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).send({
        error: "no user found"
      })
    }

    const match = await comparePassword(password, user.password)
    if (match) {
      jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.jwt_SECRET,{},(error, token)=>{
        if(error) throw error 
        res.status(200).send({user,token})
      });
    }
    if (!match) {
      return res.status(400).send({
        error: "Password do not match"
      })
    }
  } catch (error) {
    console.log(error);
    
  }
}

const employeData = async (req,res)=>{

   
  try {
    const {name,number,position} = req.body
    const userId=req.userId;
    
    const newEmployee = new Employe({userId, name, number, position });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', data: newEmployee });

  } catch (error) {
     console.error('Error saving employee data:', error);
        res.status(500).json({ error: 'Error saving employee data' });
  }
    
    
}
const getEmployee = async (req, res) => {
  
  try {
    userId=req.userId;//pranav
      // Fetch all employees from the database
      const employees = await Employe.find({userId:userId});
    console.log(employees);   

    
      // If no employees found, send an appropriate response
      if (employees.length === 0) {
          return res.status(404).json({ message: 'No employees found' });
      }

      // Send the list of employees as a JSON response
      res.status(200).json({ message: 'Employees retrieved successfully', data: employees });
      
  } catch (error) {
      console.error('Error retrieving employee data:', error);
      res.status(500).json({ error: 'Error retrieving employee data' });
  }
};

const authenticateToken = async (req,res,next)=>{
  
  const token = req.headers["authorization"]?.split(' ')[1];


  
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }

        // Access the userId from the decoded token
        const userId = decoded.id; // Adjust according to your token payload
        // console.log(userId, 'asfukdeksur');
        req.userId = userId; // Store userId in the request object for later use
        next();
    });
} else {
    return res.status(401).send('Unauthorized');
}
  
}

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateEmployee = await Employe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Employee updated successfully', data: updateEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Error updating employee' });
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employe.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee data:', error);
    res.status(500).json({ error: 'Error deleting employee data' });
  }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    employeData,
    getEmployee,
    authenticateToken,
    editEmployee,
    deleteEmployee
}