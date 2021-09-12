//@ts-check

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.get("/api/customers", cors(), (req, res) => {
    const customers = [
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Brad", lastName: "Traversy" },
        { id: 3, firstName: "Mary", lastName: "Swanson" },
    ];

    res.json(customers);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
