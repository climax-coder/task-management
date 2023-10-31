import { Router } from "express"
import * as TaskController from "../controllers/task.controller"

const router = Router()

router.get("/tasks", TaskController.fetchAllTasks)

router.post("/tasks", TaskController.createTask)

router.put("/tasks/:id", TaskController.updateTask)

router.delete("/tasks/:id", TaskController.deleteTask)

export default router
