/* ============================================================
   TRACKING — PostHog (todas as telas) + Meta Pixel (marcos)
   Preencha as 2 chaves abaixo antes de publicar.
   Sem chave => modo dev: eventos vão para o console.
   ============================================================ */
var TRACKING_CONFIG = {
  POSTHOG_KEY: 'phc_kQTj4uCW8H3eMUSoNrx4S6tddqWhWZPndPbZwYmJ6oEv',  // Project token (US Cloud)
  POSTHOG_HOST: 'https://us.i.posthog.com',
  META_PIXEL_ID: '1353864836619578'             // Pixel ativo
};

(function initTracking(){
  // --- PostHog ---
  if (TRACKING_CONFIG.POSTHOG_KEY) {
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init(TRACKING_CONFIG.POSTHOG_KEY, { api_host: TRACKING_CONFIG.POSTHOG_HOST, person_profiles: 'identified_only',
      loaded: function(ph){ try { window.KBM_DID = ph.get_distinct_id(); } catch(e){} } });
    // Marca todos os eventos desta variação como BR (separa do funil US no mesmo projeto)
    posthog.register({ variant: 'BR', locale: 'pt-BR', currency: 'BRL' });
  }
  // --- Meta Pixel ---
  if (TRACKING_CONFIG.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', TRACKING_CONFIG.META_PIXEL_ID);
    fbq('track', 'PageView');
  }
})();

/* UTMs: captura no load e persiste (atribuição por criativo até o checkout) */
(function persistUTM(){
  try {
    var p = new URLSearchParams(location.search), utm = {}, found = false;
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(function(k){
      if (p.get(k)) { utm[k] = p.get(k); found = true; }
    });
    if (found) localStorage.setItem('kbm_utm', JSON.stringify(utm));
  } catch(e){}
})();

function getUTMQuery(){
  try {
    var utm = JSON.parse(localStorage.getItem('kbm_utm') || '{}');
    var q = new URLSearchParams(utm).toString();
    return q ? ('?' + q) : '';
  } catch(e){ return ''; }
}

/* track(): PostHog recebe TUDO; Pixel só os marcos (não estourar eventos custom) */
var PIXEL_MILESTONES = ['QuizStart','SectionStory','SectionSecret','SectionEmotions','SectionResults',
                        'MechanismAccepted','CommitYes','DiagnosisView','QuizComplete','InitiateCheckout'];

/* Nossos eventos custom que TAMBÉM disparam um evento PADRÃO do Meta
   (são os que o AEM/otimização de campanha entende) */
var PIXEL_STANDARD = {
  'SalesPageView': 'ViewContent',   // chegou na página de oferta
  'QuizComplete':  'Lead'           // terminou o quiz (lead qualificado)
};

/* ===== did próprio (ponte 100%): fallback quando o PostHog é bloqueado (navegador in-app) =====
   KBM_getDid(): 1) id já usado num checkout (kbm_did_used) 2) distinct_id do PostHog 3) kbm_did2 (gerado local).
   KBM_markDidUsed(): congela o id no 1º clique de checkout — upsells/beacons usam o MESMO id dali em diante. */
(function(){ try { if (!localStorage.getItem('kbm_did2')) localStorage.setItem('kbm_did2', 'd2-' + Date.now().toString(36) + Math.random().toString(36).slice(2,10)); } catch(e){} })();
window.KBM_getDid = function(){
  try { var u = localStorage.getItem('kbm_did_used'); if (u) return u; } catch(e){}
  var d = '';
  try { d = window.KBM_DID || (window.posthog && posthog.get_distinct_id && posthog.get_distinct_id()) || ''; } catch(e){}
  if (!d) { try { d = localStorage.getItem('kbm_did2') || ''; } catch(e){} }
  return d;
};
window.KBM_markDidUsed = function(d){ try { if (d && !localStorage.getItem('kbm_did_used')) localStorage.setItem('kbm_did_used', d); } catch(e){} };

/* ===== PADRÃO A/B: registra a atribuição no ledger canônico do Worker (denominador preciso) =====
   Todo teste A/B de funil chama KBM_abAssign(exp, arm) quando sorteia o braço. Usa o MESMO did do
   checkout (KBM_getDid) → o Worker junta assign↔venda por did. 1× por (exp), espera o did carregar. */
window.KBM_abAssign = function(exp, arm){
  if (!exp || !arm) return;
  var flag = 'kbm_abx_' + exp;
  try { if (localStorage.getItem(flag) === arm) return; } catch(e){}
  var tries = 0;
  (function fire(){
    // ⚠️ NÃO usar KBM_getDid aqui direto: o kbm_did2 local sempre existe e "ganha" antes do
    // PostHog carregar → did fantasma que nunca casa com a venda (bug de 10-11/07/2026).
    // Espera o distinct_id do PostHog (ou o did congelado do checkout); só cai pro d2 no fim.
    var did = '';
    try { did = localStorage.getItem('kbm_did_used') || ''; } catch(e){}
    if (!did) { try { did = window.KBM_DID || (window.posthog && posthog.get_distinct_id && posthog.get_distinct_id()) || ''; } catch(e){} }
    if (!did && tries++ < 20) return setTimeout(fire, 500);   // o distinct_id do PostHog carrega async
    if (!did) { try { did = localStorage.getItem('kbm_did2') || ''; } catch(e){} }  // último recurso (PostHog bloqueado)
    if (did && did.length >= 6){
      try { localStorage.setItem(flag, arm); } catch(e){}
      try { fetch('https://hooks.koreanskinapp.site/ab/assign?exp=' + encodeURIComponent(exp) + '&arm=' + encodeURIComponent(arm) + '&did=' + encodeURIComponent(did), { method:'POST', keepalive:true }).catch(function(){}); } catch(e){}
    }
  })();
};

function track(event, props){
  props = props || {};
  if (window.posthog && TRACKING_CONFIG.POSTHOG_KEY) posthog.capture(event, props);
  if (window.fbq && TRACKING_CONFIG.META_PIXEL_ID) {
    var _v = (window.KBMExp && KBMExp.frontCfg) ? KBMExp.frontCfg.price : 27;   // valor = preço do bucket de front (não chumbar 27)
    var _cell = (window.KBMExp && KBMExp.cell) || null;                          // carimba a célula no Pixel
    if (event === 'InitiateCheckout') {
      fbq('track', 'InitiateCheckout', { value: _v, currency: 'BRL', content_name: 'Cola de Arroz Roxo Coreano', exp_cell: _cell });
    } else if (PIXEL_STANDARD[event]) {
      var std = PIXEL_STANDARD[event];
      if (std === 'ViewContent') fbq('track', 'ViewContent', { value: _v, currency: 'BRL', content_name: 'Cola de Arroz Roxo Coreano', exp_cell: _cell });
      else fbq('track', std);
      fbq('trackCustom', event, props);            // mantém o custom pro funil detalhado
    } else if (PIXEL_MILESTONES.indexOf(event) !== -1) {
      fbq('trackCustom', event, props);
    }
  }
  if (!TRACKING_CONFIG.POSTHOG_KEY) console.log('[track:dev]', event, props);
}
