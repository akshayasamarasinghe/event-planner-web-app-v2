import {Router} from "express";
import {
    findOneUserController,
    findUsersController,
    updateUserController,
    userLoginController, userLogoutController,
    userRegisterController
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.get("/logout", userLogoutController);
userRouter.put("/:id", updateUserController);
userRouter.post("/get-one", findOneUserController);
userRouter.post("/get-all", findUsersController);

export default userRouter;
