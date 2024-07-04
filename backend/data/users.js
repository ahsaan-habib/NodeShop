const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Elon Musk',
    email: 'elon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jeff Bezos',
    email: 'jeff@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users
