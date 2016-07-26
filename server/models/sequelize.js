var Sequelize = require('sequelize');
var db;
// require('pg').types.setTypeParser(1114, function(stringValue) {
//     return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + 'Z');
// });

require('pg').types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue + "+0000");
  // e.g., UTC offset. Use any offset that you would like.
});

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);

} else {
  db = new Sequelize('postgres://tqebzqljbxlyrh:_m6qstNbYBzqmGlcwjXkkFlvt0@ec2-54-163-239-12.compute-1.amazonaws.com:5432/d5gsf521cnq0ri', 'tqebzqljbxlyrh', '_m6qstNbYBzqmGlcwjXkkFlvt0');
}

module.exports = db;
