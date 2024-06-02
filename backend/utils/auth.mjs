import jwt from "jsonwebtoken";

const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

const isValidJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export { createJWT, isValidJWT };
