import config from "./utils/config.js";
import app from "./app.js";

// Starting Server

app.listen(config.PORT, () =>
    console.log("your server is running on port:" + config.PORT)
);
