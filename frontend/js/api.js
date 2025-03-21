export const API_URL = "http://localhost:9000/api/tasks";

export async function getTasks() {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getTask(id) {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function createTask(taskData) {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function updateTask(id, taskData) {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  try {
    return await response.json();
  } catch (error) {
    console.error("Erro ao converter resposta para JSON:", error);
    console.error("Resposta recebida:", await response.text());
    throw error;
  }
}

export async function deleteTask(id) {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
