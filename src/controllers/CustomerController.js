const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
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
        const customers = await Customer.find().all();
        if (!customers) {
            throw new NotFoundError("No customers found.");
        }

        res.status(200).json(customers);
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

        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new NotFoundError("customer not found.");
        }

        res.status(200).json(customer);
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
