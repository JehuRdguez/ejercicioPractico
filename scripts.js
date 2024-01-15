document.addEventListener('DOMContentLoaded', function () {
    var nombreInput = document.getElementById('nombre');
    var emailInput = document.getElementById('email');
    var comentariosInput = document.getElementById('comentarios');
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
      var valido = true;

      // Campo de nombre
      var nombreValue = nombreInput.value.trim();
      var soloLetras = nombreValue.replace(/[^a-zA-Z\s]/g, '');
      if (nombreValue !== soloLetras) {
        alert('El campo "Nombre" solo debe contener caracteres alfabéticos. Ej. "Jehú Rodríguez"');
        nombreInput.value = soloLetras;
        valido = false;
      }

      // Campo de email
      var emailValue = emailInput.value.trim();
      var dominiosValidos = ["hotmail.com", "gmail.com", "utem.edu.mx"];
      var atIndex = emailValue.indexOf('@');
      if (atIndex !== -1) {
        var domain = emailValue.substring(atIndex + 1);
        if (!dominiosValidos.includes(domain)) {
          alert('El dominio del correo electrónico debe ser "hotmail.com", "gmail.com" o "utem.edu.mx". Ej. "jehu.gmail.com"');
          emailInput.value = emailValue.substring(0, atIndex + 1);
          valido = false;
        }
      }

      // Campo de comentarios
      var comentariosValue = comentariosInput.value;
      var sanitizedValue = sanitizeHTML(comentariosValue);
      if (comentariosValue !== sanitizedValue) {
        alert('El campo "Comentarios" no debe contener código malicioso. Ej. "Soy un comentario sin intención maliciosa"');
        comentariosInput.value = sanitizedValue;
        valido = false;
      }

      if (!valido) {
        alert('Hubo un error de formato con alguno de los campos, realiza las correcciones antes de enviar el formulario.');
        event.preventDefault();
      } else {
        alert('Enviando el formulario...');
          if (nombreValue.toLowerCase() == 'admin' && emailValue == 'admin@gmail.com') {
            window.location.href = 'inicioAdmin.html';
            alert('Bienvenido administrador');
        } else {
            window.location.href = 'inicioUsuario.html';
            alert('Bienvenido usuario');
        }
      }
    });

    

    form.addEventListener('paste', function (event) {
      event.preventDefault();
    });

    function sanitizeHTML(input) {
      var doc = new DOMParser().parseFromString(input, 'text/html');
      return doc.body.textContent || "";
    }
  });