const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../model/userModel");

const findall = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({users});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" }); 
  }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Fields missing" });
  
    const user = await UserModel.findOne({ email: email });
    
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ message: "Password is incorrect" });
  
    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 2592000,
      });
      const userID = user._id;
      res
        .status(200)
        .json({
          message: "Authentication performed successfully",
          token,
          userData: {
            id: user._id,
            username: user.userName,
            email: user.email,
            avatar: user.avatar
          }
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server side error ocurred" });
    }
};

const signin = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;
    if (!userName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "Fields missing" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });
  
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) return res.status(422).json({ message: "User already registered, try using another email" });
    
    const userNameExist = await UserModel.findOne({ userName });
    if (userNameExist) return res.status(422).json({ message: "User already registered, try using another user name" });
  
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SECRET)
    );
  
    try {
      await UserModel.create({
        userName,
        email,
        password: hashedPassword,
        avatar: "default.png",
      });
      const user = await UserModel.findOne({ email: email }, { password: 0 });
      res.status(201).json({ message: "User successfully registered", user });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server side error ocurred" });
    }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password, confirmPassword } = req.body;
    if (!userName || !password || !confirmPassword)
      return res.status(400).json({ message: "Fields missing" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SECRET)
    );

    await UserModel.findByIdAndUpdate(req.params.userID, {
      userName,
      password: hashedPassword,
    });

    if (req.file) {
      await UserModel.findByIdAndUpdate(req.params.userID, {
        avatar: req.file.filename,
      });
    }

    const userUpdated = await UserModel.findById(req.params.userID, {
      password: 0,
    });
    res.status(200).json({ message: "User successfully updated", userUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const user = await UserModel.findById(req.params.userID, { userName: 1, avatar: 1 });
    if (!password || !confirmPassword)
      return res.status(400).json({ message: "Fields missing" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });
    
    const userWillDelete = await UserModel.findById(req.params.userID);
    const passMatch = await bcrypt.compare(password, userWillDelete.password);

    if (!passMatch)
      return res.status(400).json({ message: "Wrong password" });
    else
      await UserModel.findByIdAndDelete(userWillDelete.id);
    res.status(201).json({ message: "User successfully deleted" });
  } catch (error) {
    console.log(error.message);
      res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
    login,
    signin,
    updateUser,
    deleteUser,
    findall,
};