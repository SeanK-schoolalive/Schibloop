const defaultBackendUrl = "https://hermes-api.up.railway.app";

const backendInput = document.getElementById("backend-url");
const resultBox = document.getElementById("result");
const loadButton = document.getElementById("load-hermes");

if (backendInput) {
  backendInput.value = defaultBackendUrl;
}

async function callHermes() {
  const backendUrl = (backendInput?.value || defaultBackendUrl).trim();
  const endpoint = `${backendUrl.replace(/\/$/, "")}/chat`;

  resultBox.textContent = `Calling Hermes backend: ${endpoint}\n`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Hello Hermes",
        context: "GitHub Pages frontend",
      }),
    });

    const data = await response.json();

    resultBox.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultBox.textContent = `Hermes backend request failed.\n${error.message}\n\nUpdate the backend URL to your Railway service URL.`;
  }
}

if (loadButton) {
  loadButton.addEventListener("click", callHermes);
}
