const db = require('../db')

module.exports.getAllUsers = async () => {
    const [records] = await db.query("SELECT * FROM users");
    return records;
}


module.exports.getUserById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return record;
}


module.exports.deleteUser = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return affectedRows;
}


module.exports.addOrEditUser = async (obj, id = 0) => {
    const [[{ affectedRows }]] = await db.query(
        "CALL usp_user_add_or_edit(?,?,?,?,?,?,?)",
        [id, obj.name, obj.email, obj.password, obj.contacts, obj.age, obj.isActive]
    );
    return affectedRows;
}
