import * as api from "./api.js";

function formatStatus(status) {
  const statusMap = {
    pending: "Pendente",
    in_progress: "Em andamento",
    completed: "Concluída",
  };
  return statusMap[status] || status;
}

export function renderTasks(tasks) {
  const tbody = document.querySelector("#tasksTable tbody");
  tbody.innerHTML = "";
  tasks.forEach((task) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${formatStatus(
        task.status
      )}</td> <!-- Aplica a função formatStatus -->
      <td class="d-flex flex-wrap justify-content-center">
          <button class="btn btn-sm btn-warning col-12 col-md-auto m-1" onclick="editTask(${
            task.id
          })">Editar</button>
          <button class="btn btn-sm btn-danger col-12 col-md-auto m-1" onclick="deleteTask(${
            task.id
          })">Excluir</button>
          <button class="btn btn-sm btn-success col-12 col-md-auto m-1" onclick="updateStatus(${
            task.id
          }, 'completed')">Concluir</button>
          <button class="btn btn-sm btn-info col-12 col-md-auto m-1" onclick="updateStatus(${
            task.id
          }, 'pending')">Reabrir</button>
      </td>

    `;
    tbody.appendChild(tr);
  });
}

export async function loadTasks() {
  const tasks = await api.getTasks();
  renderTasks(tasks);
}

async function updateStatus(id, newStatus) {
  const task = await api.getTask(id);
  if (!task) {
    alert("Tarefa não encontrada!");
    return;
  }

  const updatedTask = {
    title: task.title,
    description: task.description,
    status: newStatus,
  };

  const response = await api.updateTask(id, updatedTask);
  if (response.message) {
    loadTasks();
  } else {
    alert("Erro ao atualizar o status.");
  }
}

window.updateStatus = updateStatus;

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
