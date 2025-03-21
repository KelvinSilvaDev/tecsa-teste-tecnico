import * as api from "./api.js";
import * as dom from "./dom.js";

async function loadTasks() {
  const tasks = await api.getTasks();
  dom.renderTasks(tasks);
}

window.editTask = async function (id) {
  const task = await api.getTask(id);
  dom.fillForm(task);
};

window.deleteTask = async function (id) {
  if (confirm("Deseja realmente excluir esta tarefa?")) {
    await api.deleteTask(id);
    loadTasks();
  }
};

document
  .getElementById("taskForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const id = document.getElementById("taskId").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    if (!title) {
      alert("O título é obrigatório!");
      return;
    }
    if (!description) {
      alert("A descrição é obrigatória!");
      return;
    }

    const taskData = { title, description, status };
    if (id) {
      await api.updateTask(id, taskData);
    } else {
      await api.createTask(taskData);
    }
    dom.resetForm();
    loadTasks();
  });

window.onload = loadTasks;
