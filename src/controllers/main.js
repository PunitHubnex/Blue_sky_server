const Papa = require('papaparse');
const GreenHouseEmissions = require('../models/ghg-emissions');
const validParams = ["CO2", "NO2", "SO2"];
const fs = require('fs');

// ##################redis setup###############################//
// const redis = require('redis')
// let redisClient;
// (async () => {
//   redisClient = redis.createClient({
//     legacyMode: true,
//     url: 'redis://redis:6379',
//   });
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));
//   await redisClient.connect();
// })();




/**
 * @openapi
 * components:
 *    schemas:
 *       GHGEResponse200:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error400:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error500:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *
 */
exports.getGhgEmissions = async (req, res, next) => {
  try {
    const { start_year, end_year, parameter } = req.query;
    const { country } = req.params;



    if (!country) {
      const error = new Error("`country` parameter  is required.");
      error.statusCode = 400;
      throw error;
    }
    if (!start_year) {
      const error = new Error("`start_year` query is required.");
      error.statusCode = 400;
      throw error;
    }
    if (!end_year) {
      const error = new Error("`end_year` query is required.");
      error.statusCode = 400;
      throw error;
    }

    if (parameter) {
      if (!validParams.includes(parameter)) {
        const error = new Error(
          "The parameter field can only accept values of SO2, CO2, or NO2"
        );
        error.statusCode = 400;
        throw error;
      }
    }
    let query;
    if (parameter) {
      query = {
        country: country,
        parameter: parameter,
        year: { $gte: start_year, $lte: end_year },
      };
    } else {
      query = {
        country: country,
        year: { $gte: start_year, $lte: end_year },
      };
    }

    const data = await GreenHouseEmissions.find(query)

    if (data.length == 0) {
      const error = new Error("Currently there is No data");
      error.statusCode = 200;
      throw error;
    }

    // #####################Set data in redis#############################
    // await redisClient.set("getData",6000 ,JSON.stringify(data), (error, result) => {
    //   if (error) {
    //     console.error('Error setting value in Redis', error);
    //   } else {
    //     console.log('Value set in Redis', result);
    //   }
    // })

    res.status(200).json({ message: "Successfully found", data });
  } catch (error) {
    next(error)
  }
};

// ####################To get redis Data ###########################//
// exports.getDataFromRedis = (req, res, next) => {
//   client.get("getData", (err, data) => {
//     if (err) throw err;
//     if (data) {
//       res.status(200).json(JSON.parse(data));
//     } else {
//       next();
//     }
//   });
// };



/**
 * @openapi
 * components:
 *    schemas:
 *       GHGEResponse201:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *                description: Data added successfully.
 *
 */

exports.addGhgEmissions = async (req, res, next) => {
  try {

    if (!req.file) {
      if (Array.isArray(req.body)) {

        const DATA = [...(req.body)]
        DATA.forEach(async ({ country_or_area, year, value, parameter }) => {
          const Value = +value
          if (!country_or_area) {
            const error = new Error("`country` is required.");
            error.statusCode = 400;
            throw error;
          }
          if (!year) {
            const error = new Error("`year` is required.");
            error.statusCode = 400;
            throw error;
          }
          if (!Value) {
            const error = new Error("`value` is required.");
            error.statusCode = 400;
            throw error;
          }
          if (!parameter) {
            const error = new Error("`parameter` is required.");
            error.statusCode = 400;
            throw error;
          }
          if (typeof country_or_area != 'string') {
            const error = new Error("`country` must be string.");
            error.statusCode = 400;
            throw error;
          }
          if (typeof year != "string") {
            const error = new Error("`year `must be string.");
            error.statusCode = 400;
            throw error;
          }
          if (typeof Value != "number") {
            const error = new Error("`value` must be number.");
            error.statusCode = 400;
            throw error;
          }
          if (typeof parameter != 'string') {
            const error = new Error("`parameter` must be string.");
            error.statusCode = 400;
            throw error;
          }
          if (!validParams.includes(parameter)) {
            const error = new Error("The `parameter` field can only accept values of SO2, CO2, or NO2");
            error.statusCode = 400;
            throw error;
          }

          const post = new GreenHouseEmissions({ country: country_or_area, year: new Date(year), value: Value, parameter });
          const data = await post.save();
          if (!data) {
            throw new Error("Something went wrong.");
          }
        })

      } else {
        const { country, year, value, parameter } = req.body;
        console.log(req.body);
        const Value = +value
        if (!country) {
          const error = new Error("`country` is required.");
          error.statusCode = 400;
          throw error;
        }
        if (!year) {
          const error = new Error("`year` is required.");
          error.statusCode = 400;
          throw error;
        }
        if (!Value) {
          const error = new Error("`value` is required.");
          error.statusCode = 400;
          throw error;
        }
        if (!parameter) {
          const error = new Error("`parameter` is required.");
          error.statusCode = 400;
          throw error;
        }
        if (typeof country != 'string') {
          const error = new Error("`country` must be string.");
          error.statusCode = 400;
          throw error;
        }
        if (typeof year != "string") {
          const error = new Error("`year `must be string.");
          error.statusCode = 400;
          throw error;
        }
        if (typeof Value != "number") {
          const error = new Error("`value` must be number.");
          error.statusCode = 400;
          throw error;
        }
        if (typeof parameter != 'string') {
          const error = new Error("`parameter` must be string.");
          error.statusCode = 400;
          throw error;
        }
        if (!validParams.includes(parameter)) {
          const error = new Error("The `parameter` field can only accept values of SO2, CO2, or NO2");
          error.statusCode = 400;
          throw error;
        }

        const post = new GreenHouseEmissions({ country: country, year: new Date(year), value: Value, parameter });
        const data = await post.save();
        if (!data) {
          throw new Error("Something went wrong.");
        }

      }
    } else {
      const file = JSON.stringify(req.file)
      const file2 = JSON.parse(file)
      const filePath = file2.path;

      const fileContent = fs.readFileSync(filePath, 'utf8');

      const { data } = Papa.parse(fileContent, { header: true });
      const validParams = ["SO2", "CO2", "NO2"];

      const parsedData = data.map(({ country_or_area, year, value, parameter }) => {
        const Value = +value;
        if (!country_or_area || !year || !Value || !parameter) {
          const error = new Error("All fields are required.");
          error.statusCode = 400;
          throw error;
        }
        if (typeof country_or_area != 'string' || typeof year != 'string' || typeof parameter != 'string' || typeof Value != 'number') {
          const error = new Error("Invalid data type.");
          error.statusCode = 400;
          throw error;
        }
        if (!validParams.includes(parameter)) {
          const error = new Error("The `parameter` field can only accept values of SO2, CO2, or NO2");
          error.statusCode = 400;
          throw error;
        }
        return { country: country_or_area, year: new Date(year), value: Value, parameter };
      });


      const insertedData = await GreenHouseEmissions.insertMany(parsedData);

    }


    res.status(201).json({ message: "Data inserted successfully" });

  } catch (error) {
    next(error)
  }
};