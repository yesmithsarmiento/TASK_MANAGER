const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Contadores
const total = document.getElementById("total");
const completed = document.getElementById("completed");


let tasks = [];

addBtn.addEventListener("click", addTask);


function addTask() {
  
    const text = taskInput.value;

    // Validar que el usuario escriba algo
    if (text === "") {
        alert("Ingrese una tarea");
        return;
    }

    // Crear objeto tarea
    const task = {
        id: Date.now(),
        text: text, 
        category: category.value,
        urgent: false 
    };
    
    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.className =
            `bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3
            ${task.urgent ? "urgent" : ""}`;

        div.innerHTML = `
            <div class="${task.done ? "completed" : ""}">
                ${task.category} - ${task.text}
            </div>

            <div class="flex gap-2">

                <!-- Botón para marcar como completada -->
                <button
                    onclick="toggleDone(${task.id})"
                    class="bg-green-500 text-white px-3 py-1 rounded"
                >
                    ✓
                </button>

                <!-- Botón para marcar como urgente -->
                <button
                    onclick="toggleUrgent(${task.id})"
                    class="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                    !
                </button>

                
                <button
                    onclick="deleteTask(${task.id})"
                    class="bg-red-500 text-white px-3 py-1 rounded"
                >
                    🗑
                </button>

            </div>
        `;

        taskList.appendChild(div);
    });

    updateCounter();
}

function toggleDone(id) {

    // Buscar la tarea y cambiar su estado
    tasks = tasks.map(task => {

        if (task.id === id) {
            task.done = !task.done;
        }

        return task;
    });

    renderTasks();
}


function toggleUrgent(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.urgent = !task.urgent;
        }

        return task;
    });


    renderTasks();
}

function deleteTask(id) {

    // Confirmar eliminación
    const confirmDelete = confirm(
        "¿Desea eliminar esta tarea?"
    );

    if (!confirmDelete) return;

    //Filtramos toda las tareas menos la seleccionadas
    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
}


function updateCounter() {

    // Total de tareas
    total.textContent = tasks.length;

    const completedTasks = tasks.filter(
        task => task.done
    ).length;

    completed.textContent = completedTasks;

}