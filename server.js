const express = require('express')

const app = express();
const port = 3100;

const mainapi = require("./service/mainapi");
app.use(mainapi);

const googleapi = require("./service/googleapi");
app.use(googleapi);

app.use('/', express.static('www'))

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});