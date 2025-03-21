async function login(username, password) {
  const response = await fetch("http://localhost:9000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok && data.token) {
    localStorage.setItem("jwtToken", data.token);
    return { success: true, message: "Login bem-sucedido!" };
  } else {
    return { success: false, message: data.error || "Erro no login" };
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const result = await login(username, password);

    const messageElement = document.getElementById("message");
    messageElement.innerHTML = `
  <div class="alert ${
    result.success ? "alert-success" : "alert-danger"
  }" role="alert">
    ${result.message || "Usuário ou senha inválidos."}
  </div>
`;

    if (result.success) {
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1000);
    }
  });

async function fetchData() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.log("Token não encontrado. Faça login primeiro.");
    return;
  }

  const response = await fetch("http://localhost:9000/api/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}
