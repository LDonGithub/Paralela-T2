const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({"Tittle":"Hello World"});
});

router.get('/id/', (req, res) =>{

});

module.exports = router;