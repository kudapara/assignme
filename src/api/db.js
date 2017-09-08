/**
 * establish connection with the database file.
 */
export default function initDb (dbPath) {
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync(dbPath)
  const db = low(adapter)

  // Set some defaults if your JSON file is empty
  // the expected shape of each task is like so
  //  {
  //    id,title,description,status,deadline,created,createdBy
  //  }
  db.defaults({
    tasks: [],
    user: {
      username: '',
      password: '',
      name: ''
    }}).write()

  return db
}
