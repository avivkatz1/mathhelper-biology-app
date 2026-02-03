import {createUser, loginUser,addCreatureToUser} from "../controllers/userControllers.js"

export const biologyUserRoutes = (app)=>{
    app.post("/biology/register",createUser);

    app.post("/biology/login",loginUser);

    app.post("/biology/creature",addCreatureToUser);
       

}
