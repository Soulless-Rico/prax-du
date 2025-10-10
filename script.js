var tasks = [

];

var taskElements = [

];

const toDoList = 
    document.querySelector('.not-completed-tasks .task-list');

const doneList = 
    document.querySelector('.completed-tasks .task-list');

// --- indexed DB --- //

let db;
const request = indexedDB.open("TasksText", 1);

request.onerror = (event) => {
    console.error('Indexed DB ran into a problem | error : ' + event.target.error);
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("DB is ready");

    indexedDBLoad();
    setInterval(indexedDBSave, 5000);
};

request.onupgradeneeded = (event) => {

    db = event.target.result;
    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true});
}

function indexedDBSave() {   
    if (!db) {console.warn("DB not yet ready"); return};

    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');

    taskElements = [];

    tasks.forEach(task => {
        taskElements.push(task.text);
    });

    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
        tasks.forEach(task => {
            store.add({text: task.text});
        });
    };

    tx.onsuccess = () => console.log("successfull save")
};

function indexedDBLoad() {
    if (!db) {console.warn("DB not yet ready"); return};

    const tx = db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        const savedTasks = getAll.result

            savedTasks.forEach(task => {
        task = {
            id: crypto.randomUUID(),
            text: task.text,
            completed: false
        };

        tasks.push(task);
        createTaskElement(task);
    });

    render()
    console.log('Successfull load')
    };
}

// --- Local Storage --- //

function localStorageSave() {   
    taskElements = [];

    tasks.forEach(task => {
        taskElements.push(task.text);
    });

    localStorage.clear();
    let elementNumber = 1;

    taskElements.forEach(element => {

        localStorage.setItem(JSON.stringify(elementNumber), element);
        elementNumber++;
    });
};

function loadLocalStorage() {

    var moreSavedData = true
    var dataNumber = 1

    while(moreSavedData) {

        currentData = localStorage.getItem(JSON.stringify(dataNumber)) 
        console.log(JSON.stringify(currentData));


        if (currentData === null) {
            moreSavedData = false
            break
        };

            let task = {
            id: crypto.randomUUID(),
            text: currentData,
            completed: false
            };

        tasks.push(task);
        createTaskElement(task);


        dataNumber++;
    }
};


function render() {

    toDoList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach((task) => {
        if (task.completed) {

            doneList.appendChild(
                createTaskElement(task)
            )
        }
        else {

            toDoList.appendChild(
            createTaskElement(task)
            )
        }
    })

    console.log('Rendering done list: ' + doneList.childElementCount +
                '\nRendering to do list: ' + toDoList.childElementCount
    );
}

const newTaskInput = document.querySelector('#new-task-input')  

function addTask(event) {

    event.preventDefault();

    const taskText = newTaskInput.value.trim();

    tasks.push({
        id: crypto.randomUUID(),
        text: taskText,
        completed: false,
    });

    render();
}

function createTaskElement(task) {

    const template = document.querySelector('.templates .task');
    const taskElement = template.cloneNode(true);

    taskElement.querySelector('p').innerText = task.text;

    taskElement.dataset.id = task.id;

    return taskElement;
}


newTaskInput.value = '';
newTaskInput.focus();

function deleteTask(event) {
    
    const taskElement =
        event.target.closest('.task');

    const taskId = taskElement.dataset.id;
    
    tasks = tasks.filter((task) => {
        return task.id !== taskId;
    })

    render()
} 

function completeTask(event) {
    
    const taskElement =
        event.target.closest('.task');

    const taskId = taskElement.dataset.id;
    
    const completedTask = tasks.find((task) => {
        return task.id === taskId;
    })

    completedTask.completed = true;

    render()
} 

function restoreTask(event) {
    
    const taskElement =
        event.target.closest('.task');

    const taskId = taskElement.dataset.id;
    
    const completedTask = tasks.find((task) => {
        return task.id === taskId;
    })

    completedTask.completed = false;

    render()
} 





