const DataUriParser = require("datauri/parser.js");

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.orignalName).toString()
    console.log(extName)
    return parser.format(extName, file.buffer)
};
module.exports = getDataUri