    const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, registerUser, loginUser, employeData,getEmployee,authenticateToken,editEmployee, deleteEmployee} = require("../controller/authController")

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
);
router.get("/", test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/employee', authenticateToken, employeData)
router.get('/getEmployee', authenticateToken, getEmployee)
router.put('/updateEmployee/:id', authenticateToken, editEmployee)
router.delete('/deleteEmployee/:id', authenticateToken, deleteEmployee)


module.exports = router