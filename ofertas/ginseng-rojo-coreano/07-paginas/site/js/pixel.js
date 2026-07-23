/* Meta Pixel — Ritual Seúl 50+
   Carregado antes de config.js/engine.js. Define window.track() de verdade
   (o index tinha um stub vazio: os 12 track() do engine caíam no nada).

   Eventos padrão do Meta vão como fbq('track', ...); o resto vai como
   trackCustom, senão o Meta ignora. Cada evento leva um eventID para
   deduplicar quando o CAPI server-side entrar. */

(function () {
  var PIXEL_ID = '1543617480743468';

  /* snippet oficial */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  /* Eventos padrão do Meta — o resto é custom. */
  var PADRAO = {
    PageView: 1, ViewContent: 1, Lead: 1, CompleteRegistration: 1,
    InitiateCheckout: 1, AddToCart: 1, AddPaymentInfo: 1, Purchase: 1,
    Search: 1, Contact: 1, Subscribe: 1, StartTrial: 1
  };

  /* O engine só emite eventos custom, e o Meta otimiza pelos padrão.
     Aqui cada marco do funil também dispara o evento padrão correspondente,
     sem precisar tocar no engine. */
  var ESPELHO = {
    QuizComplete:   'Lead',           // terminou o test = lead qualificado
    SalesPageView:  'ViewContent',    // viu a oferta
    SectionResults: 'ViewContent'
  };

  /* Dispara só uma vez por carregamento, senão infla a contagem. */
  var jaEnviado = {};

  /* id único por evento, para dedupe com o CAPI depois */
  function eventID() {
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  window.track = function (name, params) {
    if (!name) return;
    var p = params || {};
    try {
      if (PADRAO[name]) fbq('track', name, p, { eventID: eventID() });
      else fbq('trackCustom', name, p, { eventID: eventID() });

      var padrao = ESPELHO[name];
      if (padrao && !jaEnviado[padrao]) {
        jaEnviado[padrao] = true;
        fbq('track', padrao, p, { eventID: eventID() });
      }
    } catch (e) {
      /* bloqueador de anúncio: o quiz não pode quebrar por causa do tracking */
    }
  };

  /* Preserva as UTMs ao mandar a pessoa para o checkout. */
  window.getUTMQuery = function () {
    try {
      var q = new URLSearchParams(window.location.search);
      var out = new URLSearchParams();
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term',
       'fbclid','ttclid','gclid'].forEach(function (k) {
        var v = q.get(k);
        if (v) out.set(k, v);
      });
      var s = out.toString();
      return s ? '&' + s : '';
    } catch (e) { return ''; }
  };

  /* Cola as UTMs no link de checkout respeitando se ele já tem query string.
     Sem isso o '&' de getUTMQuery entra no path e a Hotmart responde
     "Offer not found" (erro 008) — mata todo clique de tráfego pago. */
  window.appendUTM = function (url) {
    var q = window.getUTMQuery();
    if (!q) return url;
    return url + (url.indexOf('?') === -1 ? '?' + q.slice(1) : q);
  };
})();
