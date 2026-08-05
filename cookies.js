(function () {
  var KEY = 'balancio-cookie-consent';
  var stored = localStorage.getItem(KEY);
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (stored) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem(KEY, 'accepted');
    banner.hidden = true;
  });

  rejectBtn.addEventListener('click', function () {
    localStorage.setItem(KEY, 'rejected');
    banner.hidden = true;
  });
})();
