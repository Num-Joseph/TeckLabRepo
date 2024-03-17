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

module.exports = {
  saveCustomer,
  customerLogin,
};
