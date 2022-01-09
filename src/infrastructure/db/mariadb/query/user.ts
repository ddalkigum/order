export const getUserDataById = {
  params: [
    { name: 'id', type: 'number' }
  ],
  query: 'SELECT * FROM user WHERE id = ?;'
}

export const inserUserData = {
  params: [
    { name: 'nickname', type: 'string' },
    { name: 'phoneNumber', type: 'string'}
  ],
  query: 'INSERT INTO user (nickname, phone_number) VALUES (?, ?);' 
}

export const deleteUserDataById = {
  params: [
    { name: 'id', type: 'number' }
  ],
  query: 'DELETE FROM user WHERE id = ?;'
}