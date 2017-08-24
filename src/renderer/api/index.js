const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
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
db.defaults({
  tasks: [],
  user: {
    username: '',
    password: '',
    name: ''
  }})
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
    .cloneDeep()
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

function editTask (task) {
  db.get('tasks')
    .find({ id: task.id })
    .assign(task)
    .write()
}

function signIn (user) {
  const dbUser = {}
  Object.assign(dbUser, db.get('user')
    .value())

  if (user.username === dbUser.username && user.password === dbUser.password) return true
  return false
}

export default {
  createTask,
  getTasks,
  removeTask,
  startTask,
  finishTask,
  editTask,
  signIn
}
