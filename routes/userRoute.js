import express from "express"
import { create, deleteUser, getAll, login, update, verified } from "../Controller/userController.js"
import protect from '../middleware/auth.js'


const route = express.Router();


route.get("/verified", protect, verified)
route.post("/create",create)
route.post("/login", login)
route.get("/getAll",getAll)
route.put("/update/:id",update)
route.delete("/delete/:id",deleteUser)

export default route;