const express = require('express'),
    router = express.Router()

const service = require('../services/user.service')

//http://localhost:2000/api/users/
router.get('/', async (req, res) => {
    const users = await service.getAllUsers()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await service.getUserById(req.params.id);
    if (user == undefined) {
        res.status(404).json('No record with given ID: ' + req.params.id);
    } else {
        res.send(user);
    }
});


router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteUser(req.params.id);
    if (affectedRows == 0) {
        res.status(404).json('No record with given ID: ' + req.params.id);
    } else {
        res.send('Deleted successfully.');
    }
});


router.post('/', async (req, res) => {
    await service.addOrEditUser(req.body);
    res.status(201).send('Created successfully.');
});


router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditUser(req.body, req.params.id);
    if (affectedRows == 0) {
        res.status(404).json('No record with given ID: ' + req.params.id);
    } else {
        res.send('Updated successfully.');
    }
});



module.exports = router;


