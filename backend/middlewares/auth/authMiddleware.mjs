import { isValidJWT } from "../../utils/auth.mjs";

const checkUser = (req, res, next) => {
    try {
        const decoded = isValidJWT(req.cookies.jwt);
        res.locals.user = decoded;
    } catch (error) {
        res.locals.user = null;
    } finally {
        next();
    }
};

// Protect routes
const requireAuth = (req, res, next) => {
    try {
        isValidJWT(req.cookies.jwt);
        next();
    } catch (error) {
        res.json({ redirect: "/user/login" });
    }
};

export { checkUser, requireAuth };
