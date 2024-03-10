const userModel = require("../models/user");
const { string } = require("yup");
module.exports = {
  index: async (req, res, next) => {
    try {
      const { status, keyword } = req.query;
      const users = await userModel.all(status, keyword);
      res.render("users/index", { users });
    } catch (e) {
      return next(e);
    }
  },
  add: (req, res) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      status: string().test(
        "check-status",
        "Trạng thái không hợp lệ",
        (value) => {
          // return true ==> pass
          value += value;
        }
      ),
    });
    return res.redirect("/users/add");
  },
};
