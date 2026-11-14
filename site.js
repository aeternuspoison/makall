
// Site de download do Makall: mostra a versão atual.
(function () {
  fetch('version.json?t=' + Date.now(), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) {
        throw new Error('Não foi possível carregar version.json');
      }
      return r.json();
    })
    .then(function (v) {
      document.getElementById('ver').textContent = 'versão ' + v.version;
      document.getElementById('ver2').textContent = v.version;

      var ul = document.getElementById('notas');
      ul.textContent = '';

      (v.notas || []).forEach(function (n) {
        var li = document.createElement('li');
        li.textContent = n;
        ul.appendChild(li);
      });

      if (v.sha256) {
        document.getElementById('sha').textContent = v.sha256;
      }

      if (v.apkBytes) {
        document.getElementById('apksize').textContent =
          '· ' + (v.apkBytes / 1048576).toFixed(1).replace('.', ',') + ' MB';
      }

      if (v.data) {
        document.getElementById('quando').textContent =
          'Publicada em ' + new Date(v.data).toLocaleString('pt-BR', {
            dateStyle: 'long',
            timeStyle: 'short'
          });
      }

      // Linux
      var deb = document.getElementById('deb');

      if (v.deb) {
        deb.href = v.deb + '?v=' + encodeURIComponent(v.version);

        if (v.debBytes) {
          document.getElementById('debsize').textContent =
            '· ' + (v.debBytes / 1048576).toFixed(0) + ' MB';
        }

        if (v.debSha256) {
          document.getElementById('debsha').textContent = v.debSha256;
          document.getElementById('debshaw').hidden = false;
        }
      } else {
        deb.textContent = 'Linux: disponível em breve';
        deb.classList.add('off');
        deb.removeAttribute('href');
      }

      // Android
      // Mantém o link definido no HTML quando v.apk não estiver disponível.
      var apk = document.getElementById('apk');

      if (v.apk) {
        apk.href = v.apk;
        apk.classList.remove('off');
        apk.removeAttribute('aria-disabled');
      }

    })
    .catch(function () {
      document.getElementById('notas').innerHTML =
        '<li>Não consegui carregar as novidades agora.</li>';
    });
})();
