const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *    schemas:
 *       GHGRequestBody:
 *          type: object
 *          required:
 *             - country
 *             - year
 *             - value
 *             - parameter
 *          properties:
 *             country:
 *                type: string
 *                example: India
 *             year:
 *                type: string
 *                example: 2023
 *             value:
 *                type: number
 *                example: 45.23
 *             parameter:
 *                type: string
 *                enum:
 *                   - SO2
 *                   - NO2
 *                   - CO2
 *                example: SO2
 *
 */

const postSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  value: { type: Number, required: true },
  parameter: { type: String, enum: ["CO2", "NO2", "SO2"], required: true }
});

module.exports = mongoose.model('ghg-emissions', postSchema);
