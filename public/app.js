function buscar() {
  const searchText = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const apiUrl = "http://localhost:3002/datos";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const resultados = data.filter((item) => {
        const nombreCompleto = item["Nombre Contacto"].toLowerCase();
        return nombreCompleto.includes(searchText);
      });

      mostrarResultados(resultados);
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

function mostrarResultados(resultados) {
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  if (resultados.length === 0) {
    resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const listaResultados = document.createElement("ul");
  resultados.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Clave cliente: ${item["Clave cliente"]}, Nombre Contacto: ${item["Nombre Contacto"]}, Correo: ${item["Correo"]}, Teléfono Contacto: ${item["Teléfono Contacto"]}`;
    listaResultados.appendChild(listItem);
  });

  resultadosDiv.appendChild(listaResultados);
}

function imprimir(usuario) {
  let canva = document.getElementById("canva");
  canva.innerHTML = `
  <h1>Hola ${usuario}</h1>
  <h1>Buscador de Registros</h1>
  <label for="searchInput">Ingrese el nombre a buscar:</label>
  <input type="text" id="searchInput" />
  <button onclick="buscar()">Buscar</button>
  <div id="resultados"></div>`;
}
