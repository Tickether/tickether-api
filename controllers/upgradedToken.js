import UpgradedToken from "../models/UpgradedToken.js";

export const createUpgradedToken = async (req, res, next) => {
    
    const newUpgradedToken = new UpgradedToken(req.body)

    try{
        const savedUpgradedToken = await newUpgradedToken.save();
        res.status(200).json(savedUpgradedToken)
    } catch(err) {
        next(err);
    }
};

export const updateUpgradedToken = async (req, res, next) => {
    try{
        const updateUpgradedToken = await UpgradedToken.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateUpgradedToken);
    } catch(err) {
        next(err);
    }
}

export const getUpgradedTokens = async (req, res, next) => {
    try{
        const upgradedTokens = await UpgradedToken.find();
        res.status(200).json(upgradedTokens);
    } catch(err) {
        next(err);
    }
}