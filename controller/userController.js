import User from "../model/userModel.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

//register user
export const create = async (req, res,)=>{

    const {name, email, address, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
        name,
        email,
        address,
        password: hashedPassword
    })
    const token = jwt.sign(
        {user_id:user._id},
        process.env.JWT_SECRET,
        {
            expiresIn: "5h",
        }
    )
    res.status(201).json({
        status: 'success',
        token,
        user
    })

    }


//login user

export const login = async(req, res)=>{

    const {email, password} = req.body
    const user = await User.findOne({ email })
    if(!user){
        return res.status(404).json({ message: "User does not exist"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(404).json({ message: "Invalid"})
    }
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
    });
    res.status(200).json({
        status: 'success',
        token,
        user,
      })
}

//verified user

export const verified = async(req, res)=>{
    try {
        const verifiedUser = await User.find()
        if(!verified){
            return res.status(404).json({ message: "User not found"})
        }
        res.status(200).json(verifiedUser)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
   
}

//get all users
export const getAll = async (req, res) =>{
    try {
        const users = await User.find()
        if(users.length === 0){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(users)
        console.log(users)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
   
};
//update user
export const update = async (req, res)=>{
    try {
        const id = req.params.id
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}
// delete user
export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
        await User.findByIdAndDelete(id)
        res.status(201).json({message: "User deleted!"})
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}

 
