const bcrypt = require('bcrypt');
const saltRounds = 7;

const hashPassword = async (password) =>  await bcrypt.hash(password, saltRounds);

const checkPassword = async (enteredPassword,savedPassword) => {
    const match = await bcrypt.compare(enteredPassword,savedPassword);
    return match ? true : false;
}


module.exports = {hashPassword , checkPassword}