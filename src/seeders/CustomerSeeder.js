require("../models/Customer");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Customer = mongoose.model("Customer");
const DotEnv = require("dotenv");

DotEnv.config();

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("connected", () => {
    console.log("connected to mongodb instance");
});

db.collection("customers").drop();

const seedCustomers = async () => {
    for (i = 0; i < 10; i++) {
        const customerData = {
            name: faker.name.findName(),
            username: faker.internet.userName().toLowerCase(),
            age: faker.datatype.number(100),
            gender: faker.name.gender(),
            address: faker.address.streetAddress(true),
            contact: faker.phone.phoneNumber("+971 50 ### ####"),
            avatar: faker.image.avatar(),
        };
        customerData.email = faker.internet.email(customerData.name);

        const customer = new Customer(customerData);

        await customer.save();
    }
};

seedCustomers();
