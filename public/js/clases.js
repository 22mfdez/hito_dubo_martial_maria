function matricularse(clase) {


    // Obtener el array de clases de la cookie (si existe)
    var clasesArray = JSON.parse(getCookie('clases')) || [];

    // Agregar el elemento de Judo al array de clases
    clasesArray.push( clase);

    // Convertir el array a formato JSON y guardar en la cookie
    setCookie('clases', JSON.stringify(clasesArray), 10);

    alert('¡Te has matriculado en la clase!');
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }