const pool = require("../../db");
exports.home = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(
      "select * from user where status='active'",
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows: rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.findBySearch = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    let searchText = req.body.search;
    connection.query(
      "select * from user where first_name like ? or  last_name like ? or  email like? or phone like ?",
      [
        "%" + searchText + "%",
        "%" + searchText + "%",
        "%" + searchText + "%",
        "%" + searchText + "%",
      ],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows: rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};
exports.getUserForm = (req, res) => {
  res.render("addUser");
};

exports.addUser = (req, res) => {
  const { first_name, last_name, email, password, phone, comment } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "insert into user set first_name = ? ,last_name=?,email=?,phone=?,comments=?",
      [first_name, last_name, email, phone, comment],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("addUser", { success: "User Successfully Added" });
        } else {
          console.log(err);
        }
      }
    );
  });
};
exports.getEditUserForm = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(
      "SELECT * FROM user WHERE id=?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          console.log("yo");
          res.render("editUser", { rows });
        }
      }
    );
  });
};

exports.editUser = (req, res) => {
  const { first_name, last_name, email, password, phone, comment } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(
      "Update user set first_name = ? ,last_name=?,email=?,phone=?,comments=? where id= ?",
      [first_name, last_name, email, phone, comment, req.params.id],
      (err, rows) => {
        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) {
              throw err;
            }
            connection.query(
              "SELECT * FROM user WHERE id=?",
              [req.params.id],
              (err, rows) => {
                if (!err) {
                  console.log("yo");
                  res.render("editUser", {
                    rows,
                    success: "User Updated Successfully.",
                  });
                }
              }
            );
          });
        }
      }
    );
  });
};

exports.deleteUser = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(
      "delete from user where id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.viewUser = (req, res) => {
  const id = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query("select * from user where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("viewUser", { rows });
      }
    });
  });
};
