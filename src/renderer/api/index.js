const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { fsExistsSync } = require('./fs')
const fs = require('fs')
const pathToDb = require('os').homedir() + '/.db'

if (!fsExistsSync(pathToDb, fs)) {
  try {
    fs.writeFileSync(pathToDb, null)
  } catch (e) {
    console.log('could not create file')
  }
}

const adapter = new FileSync('db.json')
const db = low(adapter)
/* Set some defaults if your JSON file is empty
  the expected shape of each task is like so
  {
    id,
    title,
    description,
    status,
    deadline,
    created
  }
*/
db.defaults({ tasks: [] })
  .write()

function createTask (task) {
  // Add a post
  db.get('tasks')
    .push(task)
    .write()
}

function removeTask (id) {
  db.get('tasks')
    .remove({ id })
    .write()
}

function getTasks () {
  return db.get('tasks')
    .value()
}

function startTask (id) {
  db.get('tasks')
    .find({ id })
    .assign({ status: 'in_progress' })
    .write()
}

function finishTask (id) {
  db.get('tasks')
    .find({ id })
    .assign({ status: 'done' })
    .write()
}
export default {
  createTask,
  getTasks,
  removeTask,
  startTask,
  finishTask
}
