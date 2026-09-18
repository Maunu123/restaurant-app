import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode)

        let userData = await userModel.findById(token_decode.id);
        if(userData == null){
            return res.json({success: false, message:"user not exist"})
        }
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error?.message || "Error" })

    }

}

export default authMiddleware;