const insertUserData = {
  params: [
    { name: 'nickName', type: 'string' },
    { name: 'phoneNumber', type: 'string' }
  ],
  sql: 'insert into user (nick_name, phone_number) values (?, ?)'
}

const getUserData = {
  params: [
    { name: 'id', type: 'number' }
  ],
  sql: 'select * from user where id=?'
}

const deleteUserDataById = {
  params: [
    { name: 'id', type: 'number' }
  ],
  sql: 'delete from user where id=?'
}

export { 
  insertUserData,
  getUserData,
  deleteUserDataById,
}