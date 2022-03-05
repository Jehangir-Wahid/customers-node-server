const Customers = require("../Database");
const { NotFoundError } = require("../customerErrors");

/**
 * Controller Action
 * Get All Customers
 *
 * @param {http GET request} req
 * @param {JSON} res
 * @returns
 */
exports.get_all_customers = async (req, res) => {
    try {
        const customers = Customers.all_customers;
        if (!customers) {
            throw new NotFoundError("No customers found.");
        }

        res.status(200).json(customers);
    } catch (error) {
        let message = error.message;
        logger.error(error.stack);

        if (error instanceof NotFoundError) {
            res.status(404);
        } else {
            res.status(500);
            message = "Internal server error, please try again later.";
        }

        return res.json({ message });
    }
};

/**
 * Controller Action
 * Get Customer
 *
 * @param {http GET request} req
 * @param {JSON} res
 * @returns
 */
exports.get_customer = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        const customer = Customers.all_customers.filter(
            (customer) => customer.id == customerId
        );
        if (!customer[0]) {
            throw new NotFoundError("customer not found.");
        }

        res.status(200).json(customer[0]);
    } catch (error) {
        let message = error.message;
        console.error(error.stack);

        if (error instanceof NotFoundError) {
            res.status(404);
        } else {
            res.status(500);
            message = "Internal server error, please try again later.";
        }

        return res.json({ message });
    }
};
