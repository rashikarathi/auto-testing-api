const router = require('express').Router();


const {
    userLoginValidator,
    userAddValidator,
    userUpdateValidator,
    userDeleteValidator,
    userDeleteByIdValidator
} = require("../validations/user.validation");

const {
    userLogin,
    userAdd,
    userUpdate,
    userDelete,
    userDeleteById,
    userList
} = require("../controllers/user.controller");
const logger = require('../lib/logger').API;

const { expressjwt } = require('express-jwt');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');
//const logger = require('../lib/logger').API;

const generateToken = (payload, type) => {
    logger.info('The generateToken started');
    if (type === 'AccessToken') {
        return jwt.sign(payload, secret, {expiresIn: "600s"});
    } else {
        return jwt.sign(payload, secret, {expiresIn: "24h"});
    }
}


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *          type: Object
 *          required:
 *              -username
 *              -password
 *              -clientID
 *          properties:
 *              id:
 *                 type: string
 *                 description: The auto-generated id of the book
 *              username:
 *                 type: string
 *                 description: the username of the user
 *              password:
 *                 type: string
 *                 description: the password of the user
 *              phone:
 *                 type: string
 *                 description: the phone details of the user
 *              email:
 *                 type: string
 *                 description: email address of the user
 *              clientID:
 *                 type: string
 *                 description: clientID related to the user
 *
 */
/**
  * @swagger
  * tags:
  *   name: User
  *   description: Users managing API
  */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login the present user 
 *     tags: [User]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The password of the user
 *       - in: formData
 *         name: clientID
 *         schema:
 *           type: string
 *         required: true
 *         description: The clientID associated with the user
 *     responses:
 *       200:
 *         description: The user is logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post('/login',userLoginValidator,userLogin);

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: add a new user 
 *     tags: [User]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The password of the user
 *       - in: formData
 *         name: clientID
 *         schema:
 *           type: string
 *         required: true
 *         description: The clientID associated with the user
 *       - in: formData
 *         name: phone
 *         schema:
 *           type: string
 *         description: The phone details associated with the user
 *       - in: formData
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address associated with the user
 *     responses:
 *       200:
 *         description: The user is added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/add', userAddValidator, userAdd);

/**
 * @swagger
 * /api/users/update:
 *   post:
 *     summary: update a user 
 *     tags: [User]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The password of the user
 *       - in: formData
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id associated with the user
 *       - in: formData
 *         name: phone
 *         schema:
 *           type: string
 *         description: The phone details associated with the user
 *       - in: formData
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address associated with the user
 *     responses:
 *       200:
 *         description: The user is added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/update', userUpdateValidator, userUpdate);

/**
 * @swagger
 * /api/users/delete:
 *   post:
 *     summary: delete a user
 *     tags: [User]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id of the user
 *     responses:
 *       200:
 *         description: The user is added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/delete', userDeleteValidator, userDelete);

/**
 * @swagger
 * /api/users/deleteById:
 *   post:
 *     summary: delete a user
 *     tags: [User]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: client Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id of the user
 *     responses:
 *       200:
 *         description: The user is added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/deleteById', userDeleteByIdValidator, userDeleteById);

/**
 * @swagger
 * /api/users/list:
 *   get:
 *     summary: get the list of all users in the database
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user is added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/list', userList);

module.exports = router;