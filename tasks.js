
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

let tasks = [{ taskName: 'study', done: true },
{ taskName: 'practice', done: true },
{ taskName: 'code', done: false }];

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else
    if ((text.slice(0, 5) === 'hello')) {
      hello(text.slice(5));
    }

    else if (text === 'help\n') {
      help();
    }
    else if (text === 'list\n') {
      list();
    }
    else if ((text.slice(0, 3) === 'add')) {
      add(text);
    }
    else if (((text.slice(0, 6) === 'remove'))) {
      remove(text);
    }
    else if (((text.slice(0, 4) === 'edit'))) {
      edit(text)
    }
    else if (((text.slice(0, 5) === 'check'))) {
      check(text)
    }
    else if (((text.slice(0, 7) === 'uncheck'))) {
      uncheck(text)
    }
    else {
      unknownCommand(text);
    }
}



/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @param {string} x
 * @returns {void}
 */
function hello(x) {
  if (x.length < 5) {
    console.log('hello!')
  }
  else {
    let tr = x.trim();
    console.log('hello ' + tr.replace("\n", "") + '!')
  }
}
/**add tasks
 *
 * @param {string} x
 * @returns {void}
 */
function add(x) {

  if (x.slice(3).trim() == "") {
    console.log('error you must add a task')
  }
  else {
    tasks.push({ taskName: x.slice(3).trim(), done: false })
    list();
  }
}
/**edit tasks
 *
 * @param {string} x
 * @returns {void}
 */
function edit(x) {

  if (x.trim().slice(4) == "")
    console.log('error');
  else {
    let arr = x.split(" ")

    for (let i = 0; i < tasks.length + 1; i++) {
      if (arr[1] == i) {
        let newarray = { taskName: arr.splice(2).join(' ').trim(), done: false };
        tasks.splice(i - 1, 1, newarray)
      }

    }

  }
  if (isNaN(x.split(" ")[1])) {
    tasks[tasks.length - 1] = { taskName: (x.slice(5)), done: false };
  }

}

/**remove tasks
 *
 * @param {string} x
 * @returns {void}
 */
function remove(x) {
  if (x.slice(6).trim() == "") {
    console.log("the last task is removed :" + tasks.pop() + "\ntype list to see the new list");
  }
  else {
    let arr = x.split(" ");
    if (arr[1] > tasks.length) {
      console.log('task not found')
    }
    else {
      for (let i = 0; i < tasks.length; i++) {
        if ((i + 1) == arr[1] + '\n') {
          tasks.splice(i, 1)
          console.log('you removed the task ' + (i + 1));
        }
      }
    }
  }
}







/**
 * list all the tasks
 *
 * @returns {void}
 */
function list() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      console.log('[✓]' + " : " + tasks[i].taskName);
    }
    else
      console.log('[ ]' + " : " + tasks[i].taskName);

  }
}

/**
* check tasks
*
* @returns {void}
*/
function check(x) {
  if (x.slice(5).trim() == "") {
    console.log("error");
  }
  else {
    let arr = x.split(" ");
    for (let i = 0; i < tasks.length + 1; i++) {
      if (arr[1] == i + 1) {
        { tasks[i].done = true };
        list();
      }

    }
  }
}
/**
 /**
 * uncheck tasks
 *
 * @returns {void}
 */
function uncheck(x) {
  if (x.slice(7).trim() == "") {
    console.log("error");
  }
  else {
    let arr = x.split(" ");
    for (let i = 0; i < tasks.length + 1; i++) {
      if (arr[1] == i + 1) {
        { tasks[i].done = false };
        list();
      }

    }
  }
}
/**
 




/**
* Exits the application
*
* @returns {void}
*/
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * help 
 * this function lists all the possible commands
 * @returns {void}
 */
function help() {
  console.log('hello : this command greeting you for example if you wirte hello rima the answer would be hello rima!\nquit or exit : to exit\nhelp : show all the command\nlist : list all the tasks\nadd : add tasks1 to add the tasks one to the list of tasks\nremove : to remove the last task for example\n(remove 1 : to remove the first task\n remove n : to remove the n task)\nedit : to edit tasks if you did not define the tasks number last task will delete\ncheck : to change the task to done\nuncheck : does the opposite of check ')
}
// The following line starts the application
startApp("Rima Assaad")
