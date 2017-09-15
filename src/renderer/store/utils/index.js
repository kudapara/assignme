import moment from 'moment'

export const sort = {
  byDeadline (unsortedTasks) {
    let sortedTasks = []
    Object.assign(sortedTasks, unsortedTasks)

    sortedTasks.sort((a, b) => {
      if (moment(a.deadline).isBefore(b.deadline)) return -1
      if (moment(a.deadline).isAfter(b.deadline)) return 1
      // if deadlines are equal
      return 0
    })

    return sortedTasks
  }
}
