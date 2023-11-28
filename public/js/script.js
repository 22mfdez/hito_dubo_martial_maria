// funciones para index.html
function updateUI() {
  const logoutButton = document.getElementById('logoutButton');
  const profileButton = document.getElementById('profileButton');

  // Imprime todas las cookies para depuración
  console.log('Cookies:', document.cookie);

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log('Token:', token);

  if (token) {
    logoutButton.style.display = 'block';
    profileButton.style.display = 'block';
  } else {
    logoutButton.style.display = 'none';
    profileButton.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  updateUI();

  // Configurar el evento de clic para el botón de cerrar sesión
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    logout();
  });

  // Configurar el evento de clic para el botón de perfil
  const profileButton = document.getElementById('profileButton');
  profileButton.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  // Otro código de inicialización si es necesario.
});

function logout() {
  // Eliminar el token de las cookies
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // Redirigir al usuario a la página de inicio
  window.location.href = 'index.html';
}

//funciones para register.html
$(document).ready(function(){
$('#registroForm').submit(function(e){
  e.preventDefault();

  const username = $('#username').val();
  const nombre = $('#nombre').val();
  const apellido = $('#apellido').val();
  const email = $('#email').val();
  const password = $('#password').val();

  // Enviar solicitud de registro al nuevo endpoint
  $.ajax({
    type: 'POST',
    url: '/register',
    data: {
      username,
      nombre,
      apellido,
      email,
      password,
    },
    success: function(response) {
      // Mostrar mensaje de éxito
      mostrarMensajeExito(response);
    },
    error: function(error) {
      // Manejar errores (puedes mostrar mensajes específicos según el error)
      console.error(error.responseText);
    }
  });
});

function mostrarMensajeExito(mensaje) {
  // Mostrar una alerta de éxito
  alert(mensaje);

  // Redirigir a la página de inicio de sesión después de un breve retraso
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 2000);  // Redirigir después de 2 segundos (2000 milisegundos)
}
});


