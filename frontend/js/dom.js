export function renderTasks(tasks) {
  const tbody = document.querySelector("#tasksTable tbody");
  tbody.innerHTML = "";
  tasks.forEach((task) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editTask(${task.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

export function resetForm() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskId").value = "";
}

export function fillForm(task) {
  document.getElementById("taskId").value = task.id;
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("status").value = task.status;
}
