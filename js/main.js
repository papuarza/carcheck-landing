(function () {
  // Menú mobile
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Buscador: lleva a la plataforma (app.carcheck.com.py/buscar) con el VIN, chapa o chapa CADAM.
  var APP_URL = 'https://app.carcheck.com.py';
  ['vin-form', 'vin-form-2'].forEach(function (id) {
    var f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = (f.querySelector('input[name="vin"]').value || '').replace(/[\s.-]/g, '').toUpperCase();
      window.location.href = APP_URL + '/buscar' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  });

  // Formulario de contacto (Web3Forms, envío por fetch)
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var key = form.querySelector('input[name="access_key"]').value;
      var btn = form.querySelector('button[type="submit"]');
      status.className = 'form__status';
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!key || key.indexOf('REEMPLAZAR') === 0) {
        // Sin access key todavía: fallback a mailto para no perder el contacto.
        var body = 'Nombre: ' + form.name.value + '\nEmpresa: ' + form.company.value + '\nEmail: ' + form.email.value +
          (contactVin && contactVin.value ? '\nVIN: ' + contactVin.value : '') + '\n\n' + form.message.value;
        window.location.href = 'mailto:info@carcheck.com.py?subject=' + encodeURIComponent('Contacto desde carcheck.com.py') + '&body=' + encodeURIComponent(body);
        return;
      }
      btn.disabled = true; btn.textContent = 'Enviando…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) { status.textContent = '¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.'; status.classList.add('is-ok'); form.reset(); }
          else { throw new Error(d.message || 'error'); }
        })
        .catch(function () { status.textContent = 'No pudimos enviar el mensaje. Escribinos a info@carcheck.com.py.'; status.classList.add('is-err'); })
        .finally(function () { btn.disabled = false; btn.innerHTML = 'Enviar mensaje <svg><use href="#i-arrow"/></svg>'; });
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('is-visible'); }); }

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
