//@ts-check

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.get("/api/message", (req, res) => {
    res.send("Message from server: If you are seeing this message, then it means the app is deployed successfully");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
