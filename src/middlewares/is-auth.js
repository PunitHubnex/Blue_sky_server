const basicAuth = require("basic-auth");
/**
 * @openapi
 * components:
 *    schemas:
 *       Error401:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */
module.exports = (req, res, next) => {
    try {
        const credentials = basicAuth(req);
        console.log(credentials);
        if (
            !credentials ||
            credentials.name !== "Bluesky" ||
            credentials.pass !== "BlueSky@123"
        ) {
            res.setHeader(
                "WWW-Authenticate",
                'Basic realm="Enter your credentials to access this resource."'
            );
            res.status(401).send("Access denied");
            return
        }
        next();
    } catch (error) {
        next(error);
    }

}
