import express from "express";
import { listUsers, getUser, editUser, editUserAttribute, deleteUser } from "../../controllers/usersController";

const router = express.Router();

router.get('/', listUsers);

router.get('/:index', getUser);

router.put('/:index', editUser);

router.patch('/:index', editUserAttribute);

router.delete('/:index', deleteUser)


export default router;