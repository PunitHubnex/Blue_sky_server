const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');
const mainControllers = require('../controllers/main');
const uplode = require('../scripts/multer')

/**
 * @openapi
 * components:
 *    securitySchemes:
 *       basicAuth:
 *          type: http
 *          scheme: basic
 */

/**
 * @openapi 
 * /api/v1/main/ghg-emissions/{country}:
 *  get:
 *    tags:
 *       - Get Green House Emissions information
 *    description: This api is for fetching Green House Gas Emmisions
 *    security:
 *       - basicAuth: []
 *    parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *            type: string
 *         description: Country's name
 *       - in: query
 *         name: start_year
 *         required: true
 *         schema:
 *            type: string
 *         description: Signifies the time range for which the data is required.   
 *       - in: query
 *         name: end_year
 *         required: true
 *         schema:
 *            type: string
 *         description: Signifies the time range for which the data is required.  
 *       - in: query
 *         name: parameter
 *         schema:
 *            type: string
 *            enum:
 *               - SO2
 *               - CO2
 *               - NO2
 *         description: parameter Values can only be CO2 ,NO2 or SO2. 
 *    responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/GHGEResponse200'
 *       400:
 *          description: Bad Request
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error400'
 *       500:
 *          description: Internal Server Error
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error500'
 *    
 */

router.get('/ghg-emissions/:country', isAuth, mainControllers.getGhgEmissions);

/**
 * @openapi 
 * /api/v1/main/ghg-emissions:
 *  post:
 *    tags:
 *       - Add Green House  Emissions
 *    description: This api is for adding green house gas emissions
 *    security:
 *       - basicAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema: 
 *                $ref: '#components/schemas/GHGRequestBody'
 *    responses:
 *       201:
 *          description: Success
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/GHGEResponse201'
 *       400:
 *          description: Bad Request
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error400'
 *       401:
 *          description: Unauthorized
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error401'
 *       500:
 *          description: Internal Server Error
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error500'
 *    
 */


router.post('/ghg-emissions', isAuth, uplode.single('csvFile'), mainControllers.addGhgEmissions);

module.exports = router;