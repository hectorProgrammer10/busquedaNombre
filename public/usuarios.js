async function validar(usuario, pass) {
  try {
    // Obtener todos los usuarios de la API
    const usuarios = await obtenerUsuarios();

    if (!usuarios) {
      console.log("Error al obtener los usuarios");
      return;
    }

    // Verificar si algún usuario coincide con el usuario y pass proporcionados
    const usuarioEncontrado = usuarios.find(
      (u) => u.username === usuario && u.pass === pass
    );

    if (usuarioEncontrado) {
      console.log(
        "Inicio de sesión exitoso para el usuario:",
        usuarioEncontrado.username
      );
      let canva = document.getElementById("canva");
      canva.innerHTML = `<div class="mensaje">
        Has iniciado sesión correctamente!
        <button onclick="imprimir('${usuarioEncontrado.username}')">Continuar</button>
      </div>`;
    } else {
      console.log("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function inicio(accion) {
  let usuario = document.querySelector("#usuario").value;
  let pass = document.querySelector("#pass").value;
  console.log(`${usuario} usuario, ${pass} pass`);
  switch (accion) {
    case 1:
      console.log("---inicio sesión");
      validar(usuario, pass);
      break;
    case 2:
      console.log("---registro");
      const resultado = verificarPass(pass);

      if (resultado === true) {
        console.log("La contraseña cumple con todos los requisitos");
        alert("usuario creado sin contra tiempos, click en iniciar sesión");
        crearUsuario(usuario, pass);
      } else {
        console.log("Error:", resultado);
        alert(resultado);
      }
      break;
  }
}

function verificarPass(pass) {
  const regexLength = /^.{8,15}$/; // Mínimo 8 caracteres y máximo 15
  const regexUppercase = /[A-Z]/; // Al menos una letra mayúscula
  const regexLowercase = /[a-z]/; // Al menos una letra minúscula
  const regexDigit = /\d/; // Al menos un dígito
  const regexWhitespace = /\s/; // No espacios en blanco
  const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // Al menos un carácter especial

  if (!regexLength.test(pass)) {
    return "La contraseña debe tener entre 8 y 15 caracteres";
  }
  if (!regexUppercase.test(pass)) {
    return "La contraseña debe contener al menos una letra mayúscula";
  }
  if (!regexLowercase.test(pass)) {
    return "La contraseña debe contener al menos una letra minúscula";
  }
  if (!regexDigit.test(pass)) {
    return "La contraseña debe contener al menos un dígito";
  }
  if (regexWhitespace.test(pass)) {
    return "La contraseña no puede contener espacios en blanco";
  }
  if (!regexSpecialChar.test(pass)) {
    return "La contraseña debe contener al menos un carácter especial";
  }

  // Si la contraseña cumple con todos los requisitos, retorna true
  return true;
}

function crearUsuario(username, pass) {
  const datosUsuario = {
    username: username,
    pass: pass,
  };

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  };

  const url = "http://localhost:3002/user";

  fetch(url, opciones)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }
      return response.text();
    })
    .then((texto) => {
      console.log("Respuesta del servidor:", texto);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function obtenerUsuarios() {
  try {
    const url = "http://localhost:3002/user";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const usuarios = await response.json();

    return usuarios.map((usuario) => ({
      username: usuario.username,
      pass: usuario.pass,
    }));
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//contraseña:
//*Aa123456
