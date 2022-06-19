const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');


/*les routes d'authentification*/

router.post('/signup', userCtrl.signup);/*s'inscrire*/
router.post('/login', userCtrl.login);/*se connecter*/
router.get('/user/:id', auth, multer, userCtrl.getProfile);/*récupérer un profile*/
router.get('/users', auth, userCtrl.getAllProfiles);/*récupérer les profiles*/


/*exporter le router*/
module.exports = router;