import { v4 as uuidv4 } from 'uuid';
import { container } from "../config/database.js";

const createUser = async(req,res)=>{
    const uuid = uuidv4();
    const new_id = uuid.replace(/-/g, '');
    const {username, password } = req.body;
    const user = {id:new_id, username, password, createdBy:username+password, creatures:[],loginNumber:1};
    let userExists;
    try{
        const querySpec = {
            query: "SELECT * FROM c WHERE c.username = @username",
            parameters: [
                { name: "@username", value: username }
            ]
        };
        let {resources: items} = await container.items.query(querySpec).fetchAll();
        userExists = items.length > 0;
    }
    catch(err){
        res.send(err)
        return;
    }
    if(userExists){
        res.status(400).send({message:"User already exists"})
        return;
    }
    else{
        try{
            const {resource: createdItem} = await container.items.create(user);
            res.status(201).send(createdItem);
            return;
        }
        catch(err){
            res.status(500).send(err)
        }
    }
}

const loginUser = async(req,res)=>{
    const {createdBy} = req.body;
    try{
        const querySpec = {
            query: "SELECT * FROM c WHERE c.createdBy = @createdBy",
            parameters: [
                { name: "@createdBy", value: createdBy }
            ]
        };
        let {resources: items} = await container.items.query(querySpec).fetchAll();
        if(items.length === 0){
            res.status(404).send({message:"User not found"});
            return;
        }
        const user = items[0];
        user.loginNumber += 1;
        res.status(200).send(user);
        return;
    }
    catch(err){
        res.status(500).send(err);
        return;
    }
}

const addCreatureToUser = async(req,res)=>{
    const {createdBy} = req.body;
    const {features, attributes} = req.body;
    try{
        const querySpec = {
            query: "SELECT * FROM c WHERE c.createdBy = @createdBy",
            parameters: [
                { name: "@createdBy", value: createdBy }
            ]
        };
        let {resources: items} = await container.items.query(querySpec).fetchAll();
        if(items.length === 0){
            res.status(404).send({message:"User not found"});
            return;
        }
        const user = items[0];
        const newCreatures = user.creatures || [];
        newCreatures.push({features, attributes});
        user.creatures = newCreatures;
        const {resource: updatedItem} = await container.item(user.id, user.id).replace(user);
        res.status(200).send(updatedItem);
        return;
    }
    catch(err){
        res.status(500).send(err);
        return;
    }
}

export {createUser, loginUser, addCreatureToUser};
