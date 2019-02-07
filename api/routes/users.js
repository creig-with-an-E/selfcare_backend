const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Handing GET requests to /users'
   });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handing POST requests to /users'
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special'){
        res.status(200).json({
            message: 'you discovered the special id',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'you passed an id'
        });
    }
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated user!'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted user!'
    });
});

module.exports = router;