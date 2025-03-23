import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { Admin } from "../models/Admin.js";
import { Sales } from "../models/Sales.js";
import { Contactus } from "../models/Contactus.js";

const router = express.Router();

// ✅ Signup
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.json({ message: "User already exists" });

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();
        return res.json({ status: true, message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

// ✅ Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not registered" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ message: "Incorrect password" });

    const token = jwt.sign({ name: user.name, email: user.email }, process.env.KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, maxAge: 10800000 });
    return res.json({ status: true, message: "Login successful" });
});


router.post('/Contactus',async(req,res)=>{
    const{name,email,message} =req.body;
     try{
        const newContactus =new Contactus({
          name,
          email,
          message,
      })
      await newContactus.save()
    }
    catch(err)
      {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error while" });
      }
  
    return res.json({status:true ,message :"record"})
    
  })


// ✅ Forget Password
router.post("/forget", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not registered" });

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "5m" });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "hamzamirzaop786@gmail.com", pass: "nhaj ddyh frgh iitj" },
    });

    const mailOptions = {
        from: "hamzamirzaop786@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `http://localhost:5173/reset/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.json({ message: "Error sending email" });
        return res.json({ status: true, message: "Email sent: " + info.response });
    });
});

// ✅ Reset Password
router.post("/reset/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: decoded.id }, { password: hashPassword });
        return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        return res.json({ message: "Invalid token" });
    }
});

// ✅ Middleware for verifying token
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ status: false, message: "No token" });

        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json(err);
    }
};

// ✅ Verify user
router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "Authorized", email: req.user.email });
});

// ✅ Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ status: true });
});

// ✅ Display all products
router.get("/displaypro", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// ✅ Add product to cart
router.post("/cart/add-to-cart", verifyUser, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { productId, quantity } = req.body;

        if (!productId || quantity < 1) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 🔴 Check if stock is available
        if (product.stock <= 0) {
            return res.status(400).json({ message: `Product "${product.name}" is out of stock` });
        }

        let cart = await Cart.findOne({ userEmail });
        if (!cart) cart = new Cart({ userEmail, products: [], totalPrice: 0 });

        const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));

        if (existingProductIndex !== -1) {
            const newQuantity = cart.products[existingProductIndex].quantity + quantity;

            // 🔴 Prevent adding more than available stock
            if (newQuantity > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} units of "${product.name}" are available.` });
            }

            cart.products[existingProductIndex].quantity = newQuantity;
        } else {
            // 🔴 Prevent adding more than available stock
            if (quantity > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} units of "${product.name}" are available.` });
            }

            cart.products.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
                imageUrl: product.imageUrl,
            });
        }

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        return res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Server error", error });
    }
});


router.get("/cart/view", verifyUser, async (req, res) => {
  try {
      const userEmail = req.user.email;
      const cart = await Cart.findOne({ userEmail });

      if (!cart || cart.products.length === 0) {
          return res.status(404).json({ message: "Your cart is empty" });
      }

      return res.status(200).json(cart);
  } catch (error) {
      return res.status(500).json({ message: "Error fetching cart", error });
  }
});

// ✅ Remove Item from Cart
router.post("/cart/remove", verifyUser, async (req, res) => {
  try {
      const userEmail = req.user.email;
      const { productId } = req.body;

      let cart = await Cart.findOne({ userEmail });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.products = cart.products.filter(item => !item.productId.equals(productId));
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

      await cart.save();
      return res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
      return res.status(500).json({ message: "Error removing item", error });
  }
});



router.post("/order/place", verifyUser, async (req, res) => {
    try {
      const userEmail = req.user.email;
      const { paymentMethod, shippingAddress } = req.body;
  
      const cart = await Cart.findOne({ userEmail });
  
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
  
      if (!paymentMethod || !shippingAddress) {
        return res.status(400).json({ message: "Payment method and shipping address are required" });
      }
  
      // Check stock before creating order
      for (let item of cart.products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.name} not found` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Not enough stock for ${product.name}` });
        }
      }
  
      // Decrease stock
      for (let item of cart.products) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }, // Decrease stock
          { new: true }
        );
      }
  
      const newOrder = new Order({
        userEmail,
        products: cart.products,
        totalPrice: cart.totalPrice,
        paymentMethod,
        shippingAddress,
      });
  
      await newOrder.save();
      await Cart.findOneAndDelete({ userEmail });
  
      return res.status(201).json({ message: "Order placed successfully, stock updated, and cart cleared!", order: newOrder });
    } catch (error) {
      console.error("Order placement error:", error);
      return res.status(500).json({ message: "Failed to place order", error });
    }
  });

// ✅ Get all user orders
router.get("/order/history", verifyUser, async (req, res) => {
  try {
      const userEmail = req.user.email;
      const orders = await Order.find({ userEmail }).sort({ createdAt: -1 });

      if (!orders.length) {
          return res.status(404).json({ message: "No orders found" });
      }

      return res.status(200).json(orders);
  } catch (error) {
      return res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

router.post('/admin', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const user = await Admin.findOne({ name });
  
      if (!user) {
        return res.json({ message: "User is not registered" });
      }
  
      if (user.password !== password) {
        return res.json({ message: "Password is incorrect" });
      }
  
      const token = jwt.sign({ name: user.name }, process.env.KEY, { expiresIn: '1h' });
  
      res.cookie('token', token, { httpOnly: true, maxAge: 10800000 });
  
      return res.json({ status: true, message: "Admin login successful" });
  
    } catch (error) {
      console.error("Error in admin login:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    req.user1 = decoded; 
    next();
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

router.get('/verifyadmin',verifyAdmin,(req,res)=>{
  const Adminname = req.user1.name;
    return res.json({status:true ,message:"authorized",name:Adminname})
})

router.get('/adminlogout',(req,res)=>{
  res.clearCookie('token')
  return res.json({status:true}) 
})
  
router.get("/disporder", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order datas", error });
    }
});

router.delete("/deleteorder/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Move order to Sales collection
        const newSale = new Sales({
            userEmail: order.userEmail,
            products: order.products,
            totalPrice: order.totalPrice,
            paymentMethod: order.paymentMethod,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
        });

        await newSale.save();

        // Delete order from Orders collection
        await Order.findByIdAndDelete(id);

        res.status(200).json({ message: "Order moved to sales and deleted successfully" });
    } catch (error) {
        console.error("Error in deleteorder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/disuser", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order datas", error });
    }
});

router.put("/updatetotalsales", async (req, res) => {
    try {
        const orders = await Order.find(); // Get all orders
        let totalRevenue = 0, totalOrders = 0, totalProductsSold = 0;

        orders.forEach(order => {
            totalRevenue += order.totalPrice;
            totalOrders += 1;
            totalProductsSold += order.items ? order.items.length : 0;
        });

        // Find or create Total Sales record
        let salesRecord = await Sales.findOne();
        if (!salesRecord) {
            salesRecord = new Sales({ totalRevenue, totalOrders, totalProductsSold });
        } else {
            salesRecord.totalRevenue = totalRevenue;
            salesRecord.totalOrders = totalOrders;
            salesRecord.totalProductsSold = totalProductsSold;
        }

        await salesRecord.save();
        res.json({ message: "Total Sales updated successfully", salesRecord });
    } catch (error) {
        console.error("Error updating total sales:", error);
        res.status(500).json({ message: "Error updating total sales", error });
    }
});


router.put("/updateorder/:id", async (req, res) => {
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
});

// Function to create or return the existing Total Sales record
const findOrCreateSalesRecord = async () => {
    let sale = await Sales.findOne();
    if (!sale) {
        sale = new Sales({
            totalRevenue: 0,
            totalOrders: 0,
            totalProductsSold: 0,
        });
        await sale.save();
    }
    return sale;
};

router.get("/getsales", async (req, res) => {
    try {
        const dailySales = await Sales.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { "_id": 1 } }
        ]);

        const monthlySales = await Sales.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({
            dailySales: dailySales.map(item => ({ date: item._id, totalRevenue: item.totalRevenue })),
            monthlySales: monthlySales.map(item => ({ month: item._id, totalRevenue: item.totalRevenue })),
        });
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ Route to Insert a New TotalSales Record (If Not Exists)
router.post("/inserttotalsales", async (req, res) => {
    try {
        const { totalRevenue, totalOrders, totalProductsSold } = req.body;

        // Check if a TotalSales record already exists
        let existingSales = await Sales.findOne();
        if (existingSales) {
            return res.status(400).json({ message: "TotalSales record already exists." });
        }

        // Create new TotalSales record
        const newSales = new Sales({
            totalRevenue: totalRevenue || 0,
            totalOrders: totalOrders || 0,
            totalProductsSold: totalProductsSold || 0,
        });

        await newSales.save();
        res.status(201).json({ message: "Total Sales record inserted successfully", totalSales: newSales });
    } catch (error) {
        console.error("Error inserting total sales:", error);
        res.status(500).json({ message: "Error inserting total sales", error });
    }
});

// ✅ Route to Delete an Order and Update Total Sales

router.get("/dissale", async (req, res) => {
    try {
        const sale = await Sales.find();
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order datas", error });
    }
});


export { router as UserRouter };
