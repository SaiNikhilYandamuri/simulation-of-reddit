const pool = require("./mysqlConnection");
const Community = require("../model/Community");
const paginate = require("../../server/utils/pagination");

async function handle_request(msg, callback) {
  // Need to implement images later
  const searchString = msg.searchString;
  console.log(searchString);
  console.log("Hello");
  const search = "%" + searchString + "%";
  console.log(search);
  // const sortExpression = msg.sort;

  const searchQuery = "select name, email from User where name like ?";
  pool.query(searchQuery, [search], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      callback(null, result);
    }
  });
}

exports.handle_request = handle_request;
