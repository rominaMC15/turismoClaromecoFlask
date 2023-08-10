// window.onload = function() {
	
//     var nombre = document.getElementById('txtNombre');
//     nombre.addEventListener("input", campoNombre);
	
//     var correo = document.getElementById('txtPrecio');
//     correo.addEventListener("input", campoCorreo);

//     var mensaje = document.getElementById('txtStock');
//     mensaje.addEventListener("input", campoMensaje);
	
// }

function campoNombref() {
    let usuarioNombre = document.getElementById('txtNombre').value;

    if (usuarioNombre) {
        document.getElementById('nombre_error').innerHTML = " ";
        document.getElementById('txtNombre').style.outline = "1px solid #000";
    }
}

function campoCorreof() {
    let usuarioCorreo = document.getElementById('txtPrecio').value;
	
    if (usuarioCorreo) {
        document.getElementById('correo_error').innerHTML = " ";
        document.getElementById('txtPrecio').style.outline = "1px solid #000";
    }
}

function campoMensajef() {
    let usuarioMensaje = document.getElementById('txtStock').value;
	
    if (usuarioMensaje) {
        document.getElementById('mensaje_error').innerHTML = " ";
        document.getElementById('txtStock').style.outline = "1px solid #000";
    }
}

function borrando() {
	document.location.reload(true);
}

document.getElementById("formContacto").addEventListener("submit", function(event) {
    if (!validacion()) {
      event.preventDefault(); // Previene el envío del formulario si la validación falla
    }
  });

function validacion() {
    let expUsuario = /[a-zA-Z]{2,30}[0-9]{0}/;
    let expCorreo = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    let usuarioNombre = document.getElementById('txtNombre').value;
    let usuarioCorreo = document.getElementById('txtPrecio').value;
    let usuarioMensaje = document.getElementById('txtStock').value;
    let nombreError = document.getElementById('nombre_error');
    let correoError = document.getElementById('correo_error');
    let mensajeError = document.getElementById('mensaje_error');
    let campoNombre = document.getElementById('txtNombre');
    let campoCorreo = document.getElementById('txtPrecio');
    let campoMensaje = document.getElementById('txtStock');

    if (!usuarioNombre) {
    	let mensajeErrorNombre = "Su nombre es obligatorio!";
        nombreError.innerHTML = mensajeErrorNombre;
        campoNombre.style.outline = "2px solid #0f0";
        return false;
    } else if (!expUsuario.test(usuarioNombre)) {
        let mensajeInvalidoNombre = "Su nombre completo es invalido!";
        nombreError.innerHTML = mensajeInvalidoNombre;
        campoNombre.style.outline = "2px solid #f00";
        return false;
    }
	
    if (!usuarioCorreo) {
    	let mensajeErrorCorreo = "Su correo electrónico es obligatorio!";
    	correoError.innerHTML = mensajeErrorCorreo;
    	campoCorreo.style.outline = "2px solid #0f0";
    	return false;
    } else if (!expCorreo.test(usuarioCorreo)) {
    	let mensajeInvalidoCorreo = "correo inválido!(Sin mayúsculas ni espacios)";
    	correoError.innerHTML = mensajeInvalidoCorreo;
    	campoCorreo.style.outline = "2px solid #f00";
    	return false;
    }
	
    if (!usuarioMensaje) {
    	let mensajeErrorMensaje = "Por favor, escriba su mensaje!";
    	mensajeError.innerHTML = mensajeErrorMensaje;
    	campoMensaje.style.outline = "2px solid #0f0";
    	return false;
    } else if (usuarioMensaje.length >= 255) {
    	mensajeLargo = "Su mensaje es demasiado largo!";
    	mensajeError.innerHTML = mensajeLargo;
    	campoMensaje.style.outline = "2px solid #f00";
    	return false;
    } 
    campoNombref();
    campoCorreof();
    campoMensajef();
    guardar();
}

function guardar() {
 
    let n = document.getElementById("txtNombre").value
    let p = document.getElementById("txtPrecio").value
    let s = document.getElementById("txtStock").value
 
    let producto = {
        nombre: n,
        mail: p,
        mensaje: s
    }
    //let url = "http://localhost:5000/mensajes"
    let url = "https://turismoclaromeco.onrender.com/mensajes"
    let options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            // console.log("creado")
            location.href='enviado.html';
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Ocurrió un error al guardar" )
            console.error(err);
        })
        // windows.location.replace('back.html');
}

// function login() {
//     let acceso = document.getElementsByClassName('btnAcceso')[0];
    
//     acceso.addEventListener("click", function() {
//         alert("hola");
//     });
// }

// login();

document.addEventListener("DOMContentLoaded", function() {
    const accesoBtn = document.querySelector('.btnAcceso');
    const loginContainer = document.getElementById('loginContainer');
    const cancelBtn = document.querySelector('.cancel-btn');
    const loginForm = document.querySelector('.login-form');
  
    accesoBtn.addEventListener("click", function() {
      loginContainer.classList.toggle('active');
    });
  
    cancelBtn.addEventListener("click", function() {
      loginContainer.classList.remove('active');
    });
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita el envío del formulario
  
      const usuarioInput = loginForm.querySelector('input[type="text"]');
      const contraseñaInput = loginForm.querySelector('input[type="password"]');
  
      const usuario = usuarioInput.value;
      const contraseña = contraseñaInput.value;
  
      if (usuario === "admin" && contraseña === "1234") {
        window.location.href = "back.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  });
  

