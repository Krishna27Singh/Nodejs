const express = require('express');
const router = express.Router(); //asume kiya h ki ye router sirf user ke liye hai isliye users ko hata diya hai path se 

const { handleGetAllUsers, 
        handlegetUserById, 
        handleUpdateUserById, 
        handleDeleteUserById, 
        handleCreateNewUser } = require('../controllers/user');

router.route('/').get(handleGetAllUsers).post(handleCreateNewUser);

router
.route("/:id")
.get(handlegetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);
//get patch vagera handlers hai jinhe controller kehte hai so ye vaha jaega 

module.exports = router;