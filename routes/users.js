
import { Router } from "express";
import userController from "../controller/userController.js";


const router = Router();

router.get("/login", (req, res) => {
  userController.login(req, res);
});

router.get("/register", (req, res) => {
  userController.registerForm(req, res);
});

router.post("/register", (req, res) => {
  userController.create(req,res);
});

router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

router.get("/edit/:id", (req, res) => {
  userController.updateForm(req,res);
});



export default router; 
