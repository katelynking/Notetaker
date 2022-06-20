const express = require('express');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

var app = express();

var PORT = process.env.PORT || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});