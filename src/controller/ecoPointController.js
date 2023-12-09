const EcoPointModel = require("../model/ecoPointModel");
const UserModel = require("../model/userModel");
const mongoose = require('mongoose');
const { Types } = mongoose;

const getPoints = async (req, res) => {
    try {
        const ecoPoints = await EcoPointModel.find();
        res.status(200).json({ecoPoints});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server side error ocurred" }); 
    }
}

const createPoint = async (req, res) => {
    try {
        const { name, latitude, longitude, user } = req.body;
    
        if (!name || !latitude || !longitude || !user)
            return res.status(400).json({ message: "Fields missing" });

        if (!Types.ObjectId.isValid(user)) 
            return res.status(422).json({ message: "Invalid user ID" });

        const userExist = await UserModel.findOne({_id:user});
        if (!userExist) return res.status(422).json({ message: "User Does not Exist" });        
        
        const ecoPoint = await EcoPointModel.create({ name, latitude, longitude, user });
        
        // Atualiza o usuário com o ID do novo ponto ecológico
        const updatedUser = await UserModel.findByIdAndUpdate(
            user,
            { $push: { ecopoints: ecoPoint._id } },
            { new: true }
        );

        res.status(201).json({ message: "Eco Point successfully registered", ecoPoint });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server side error occurred" });
    }
};

const getPoint = async (req, res) => {
    try {
        if (!Types.ObjectId.isValid(req.params.ecoPointID)) return res.status(422).json({ message: "Invalid Eco Point ID" });
        if (!await EcoPointModel.findById(req.params.ecoPointID)) return res.status(422).json({ message: "Eco Point does not exist" });
        const ecoPoint = await EcoPointModel.findById(req.params.ecoPointID);
        res.status(200).json({ecoPoint});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server side error ocurred" }); 
    }
}

const getUserPoints = async (req, res) => {
    try {        
        if (!Types.ObjectId.isValid(req.params.userID)) return res.status(422).json({ message: "Invalid User ID" });
        if (!await UserModel.findById(req.params.userID)) return res.status(422).json({ message: "User does not exist" });
        const userEcoPoints = await UserModel.findById(req.params.userID).populate('ecopoints');
        res.status(200).json({userEcoPoints});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server side error ocurred" }); 
    }
}

const updatePoint = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Fields missing" });

        await EcoPointModel.findByIdAndUpdate(req.params.ecoPointID, req.body);

        const ecoPointUpdated = await EcoPointModel.findById(req.params.ecoPointID,);
        res.status(200).json({ message: "Eco Point successfully updated", ecoPointUpdated });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server side error ocurred" }); 
    }
}

const deletePoint = async (req, res) => {
    try {
      const point = await EcoPointModel.findById(req.params.ecoPointID);
      if (!point) return res.status(404).json({ message: "Eco Point not found" });
      await EcoPointModel.findByIdAndDelete(req.params.ecoPointID);
      res.status(200).json({ message: "Eco Point successfully deleted", point });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server side error ocurred" });
    }
};

module.exports = {
    getPoints,
    createPoint,
    getPoint,
    getUserPoints,
    updatePoint,
    deletePoint,
}