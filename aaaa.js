// Configurar el evento de clic para el botón de cerrar sesión
document.getElementById('logoutButton').addEventListener('click', () => {
  logout();
});

// Configurar el evento de clic para el botón de perfil
document.getElementById('profileButton').addEventListener('click', () => {
  window.location.href = 'profile.html';
});
});

// Función para redirigir al usuario a la página de inicio de sesión
const redirectToLogin = () => {
window.location.href = 'login.html';
};

// Función para cerrar sesión
const logout = () => {
// Eliminar el token de las cookies
document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// Redirigir al usuario a la página de inicio de sesión
redirectToLogin();
};