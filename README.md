# assignme

![image](screenshots/list_of_tasks.png) 

I am tired of forgetting to complete and submit my assignments in time. So i have created this project to help me remember the assignments I have been given.

Of course there are better apps out there but this one is **mine** and suits my needs. Its free and open source (MIT licenced), so you are free to use it however you want.

If you have any coding skills be sure to open up some useful pull requests. And if you are non technical but you feel like you have bright ideas, throw them up in the issues section.

[more screenshots](screenshots/readme.md)

### Milestones
- [x] Adding new task

- [x] Deleting a task

- [x] Editing a task

- [x] Starting and finishing a task

- [ ] Sorting tasks in order of deadlines

- [ ] Markdown support to allow us to write comprehensive descriptions

- [ ] Native notifications for tasks that are almost due

- [ ] Authentication

- [ ] Sync

### For those who want to engineer this app with me

Make sure you have [nodejs](http://nodejs.org) and [npm](npmjs) installed on your machine.

```bash
# clone the repository on to your local machine
git clone https://github.com/kudapara/assignme.git

# git will create a folder 'assignme'
# change your working directory to that folder
cd assignme

# install dependancies
npm install
```

When you have completed the above go ahead and follow the build setup below. Happy hacking.

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[e04a5b5](https://github.com/SimulatedGREG/electron-vue/tree/e04a5b5f09f63265939e00c9dc59a612d9da5bc8) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
