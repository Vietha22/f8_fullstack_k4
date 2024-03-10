//Tư duy model:
//- Mỗi model sẽ tương ứng với 1 table
//- 1 controller có thể có nhiều model
const sql = require("../utils/db");
module.exports = {
  all: (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;
    if (status === "active" || status === "inactive") {
      filter = sql`${filter} AND status=${status === "active" ? true : false}`;
    }
    if (keyword) {
      filter = sql`${filter} AND (name ILIKE ${
        "%" + keyword + "%"
      } OR email ILIKE ${"%" + keyword + "%"})`;
    }
    return sql`SELECT * FROM users ${filter} ORDER BY id DESC`;
  },
};

/*
1. Không lọc
SELECT * FROM users ORDER BY id DESC

2. Lọc status
SELECT * FROM users WHERE status=${status} ORDER BY id DESC

3. Lọc keyword
SELECT * FROM users WHERE name LIKE '%keyword%' OR email LIKE '%keyword%' ORDER BY id DESC

4. Lọc cả status và keyword
SELECT * FROM users WHERE status=${status} AND  (name LIKE '%keyword%' OR email LIKE '%keyword%') ORDER BY id DESC
*/
