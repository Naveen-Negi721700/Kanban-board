let taskData = {};
const todo = document.querySelector("#todo");
const Progress = document.querySelector("#Progress");
const done = document.querySelector("#done");
const columns = [todo, Progress, done]
let dragElement = null;


if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {

            const div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable", "true");

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
            `;

            column.appendChild(div);

            div.addEventListener("dragstart", () => {
                dragElement = div;
            });

            const deleteBtn = div.querySelector("button");
            deleteBtn.addEventListener("click", () => {
                div.remove();
                updateTaskCount();
            });
        });

        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerHTML = tasks.length;
    }
}







function addDrageEventOnColumn(column) {

    column.addEventListener("dragenter", () => {
        column.classList.add("hover-over")
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over")
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

       
        updateTaskCount();
    });
}

addDrageEventOnColumn(todo);
addDrageEventOnColumn(Progress);
addDrageEventOnColumn(done);



const toggleModalButton = document.querySelector("#toggle-modal");
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalbg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button>Delete</button>
    `;

    todo.appendChild(div);


    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    modal.classList.remove("active");

    updateTaskCount();
});



function updateTaskCount() {

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));

        count.innerHTML = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}
