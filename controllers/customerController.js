const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { signToken } = require("../util/token");
const router = require("../routes/userRoute");

// creating a customer
const saveCustomer = async (req, res, next) => {
  let { fullName, password, email } = req.body;
  try {
    //cheeking if customer has already registered
    const existCustomer = await prisma.customer.findFirst({
      where: { email: email },
    });
    if (existCustomer) {
      res.status(409).json({ message: "The Customer has already registered" });
    }
    // hashing the password
    const hashingPassword = await bcrypt.hash(password, 10);
    if (hashingPassword) {
      const signUpCustomer = await prisma.customer.create({
        data: {
          fullName,
          password: hashingPassword,
          email,
        },
      });

      res.status(200).json({
        signUpCustomer,
        message: "Customer succesfully created",
        customer: signUpCustomer,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//logging in a customer
const customerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.customer.findFirst({
      where: {
        email,
      },
    });
    if (!customer) {
      res.status(422).json({
        message: "customer not found",
      });
    } else {
      const samePassword = await bcrypt.compare(password, customer.password);
      if (!samePassword) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      } else {
        const token = signToken(customer.id);
        return res.status(200).json({
          customer,
          token,
          message: "Login successful",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Getting a single customer
const getSingleCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });
    if (!customer) {
      return res.status(404).json({ meesage: "customer not found!" });
    }
    delete customer.password;
    res.status(200).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Deleting a customer
const deleteCustomerByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await prisma.customer.delete({
      where: {
        id,
      },
    });
    res
      .status(404)
      .json({ deleteCustomer, message: "Customer has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Updating a Customer
const updateCustomerByid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateCusterom = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({ updateCusterom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Getting all Customer
const getAllCustomers = async (req, res, next) => {
  try {
    const getAllCustomers = await prisma.customer.findMany();
    res.status(200).json({ getAllCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal server error" });
  }
};

module.exports = {
  saveCustomer,
  customerLogin,
  getSingleCustomerById,
  deleteCustomerByid,
  updateCustomerByid,
  getAllCustomers,
};
