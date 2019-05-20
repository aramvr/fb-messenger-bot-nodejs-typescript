"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes"));
var config_1 = require("./config");
var verifyRequestSignature_1 = require("app/utils/verifyRequestSignature");
// Create a new express application instance
var app = express_1.default();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(body_parser_1.default.json({ verify: verifyRequestSignature_1.verifyRequestSignature }));
app.use(express_1.default.static('public'));
if (!(config_1.APP_SECRET && config_1.VALIDATION_TOKEN && config_1.PAGE_ACCESS_TOKEN && config_1.SERVER_URL)) {
    console.error('Missing config values');
    process.exit(1);
}
// Use routes
routes_1.default(app);
// Start server
// Webhooks must be available via SSL with a certificate signed by a valid
// certificate authority.
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
exports.default = app;
