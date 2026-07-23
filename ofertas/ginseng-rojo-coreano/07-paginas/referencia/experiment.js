/* roteamento de bucket + tag de celula; estado em localStorage. */
(function(){
  var KEY = 'kbm_exp_v1';
  var FRONT_ON  = true;
  var UPSELL_ON = true;

  var FRONT = {
    f27: { price:27, checkout:'https://pay.kiwify.com.br/nLrzJs8', off:'https://pay.kiwify.com.br/2ale1uf' },
    f37: { price:37, checkout:'https://pay.kiwify.com.br/H3IU315', off:'https://pay.kiwify.com.br/ytTC4om' },
    f47: { price:47, checkout:'https://pay.kiwify.com.br/oj5kTcp', off:'https://pay.kiwify.com.br/G0m7SoB' }
  };
  var U57_PLAYER = { id:'vid-6a346c0b8a324fd18f7db228', src:'https://scripts.converteai.net/95ab197a-e8a0-43ac-a7d0-1d3ba949b6fd/players/6a346c0b8a324fd18f7db228/v4/player.js' };
  var U127_A = { id:'vid-6a370774daaab420ed290500', src:'https://scripts.converteai.net/95ab197a-e8a0-43ac-a7d0-1d3ba949b6fd/players/6a370774daaab420ed290500/v4/player.js' };
  var U127_B = { id:'vid-6a3c20b073ede67f65d889f0', src:'https://scripts.converteai.net/95ab197a-e8a0-43ac-a7d0-1d3ba949b6fd/players/6a3c20b073ede67f65d889f0/v4/player.js' };
  var UV_W   = [['B',100]];   // 10/07: VSL A/B ENCERRADO — travado 100% B (A×B empate, B levemente à frente; A serve p/ re-bucketar quem estava em A)
  var PARC_W = [['1',100]];   // 10/07: parcelamento PIX SHIPADO 100% p1 (mostra "12x" ao comprador PIX; +~12% take/receita, sem downside — one-click nao cobra PIX)
  var UPSELL = {
    u57:  { price:57,  oferta:'https://pay.kiwify.com.br/DDQO6ek', oneId:'DDQO6ek',  player:U57_PLAYER },
    u97:  { price:97,  oferta:'https://pay.kiwify.com.br/XH8HU13', oneId:'XH8HU13',
            player:{ id:'vid-6a3707449190883898e43db6', src:'https://scripts.converteai.net/95ab197a-e8a0-43ac-a7d0-1d3ba949b6fd/players/6a3707449190883898e43db6/v4/player.js' } },
    u127: { price:127, oferta:'https://pay.kiwify.com.br/aQEmriD', oneId:'aQEmriD', player:U127_A }
  };

  // A/B QUIZSCAN: etapa de analise facial antes da Avaliacao da Dra. Yuna (b.html). 10% do trafego.
  var QUIZSCAN_W = [['a',90],['b',10]];   // 13/07: A volta a 90% (maturado pró-A); B roda a 10% até o veredito no fim da semana
  var FRONT_W  = [['f37',100]];                  // f47 NAO entra no trafego geral
  var ROLL_W   = [['ctrl',100]];                 // teste f47 encerrado 06/07: f37 venceu (12,38%x8,60%, receita/atr R$4,58xR$4,04)
  var HIGH_SPEND = ['80_200','over200'];         // T12 spend: R$150-400 e >R$400 (unicas faixas que veem o R$47)
  var UPSELL_W = [['u127',100]];
  // A/B DE CHECKOUT: Kiwify (atual) vs Payt (taxa menor). INERTE agora (Payt 0%) ate os redirects da Payt estarem setados; depois vira [['kiwify',65],['payt',35]].
  var CHECKOUT_W = [['payt',35],['kiwify',65]];   // 13/07: Payt 5→35% (CAPI confirmado na Meta, conv clique→venda empatada 34,2%×34,1%)
  var PAYT = {
    front:     'https://checkout.payt.com.br/65e5721ac899c73c2befc838a8c6e417',  // R$37 (checkout novo 02/07)
    front_off: 'https://checkout.payt.com.br/33d9f73b57cb91606e34cfde953b16fd',  // R$29 (roleta / back-redirect, novo 02/07)
    up1_obj:'LGG56L-4ZK3J7', up2_obj:'45BEJR-LXM3GZ',
    script:'https://checkout.payt.com.br/multiple-oneclickbuyscript/RK33OB.js'
  };
  function wpick(w){ var t=0,i; for(i=0;i<w.length;i++) t+=w[i][1]; var r=Math.random()*t, a=0; for(i=0;i<w.length;i++){ a+=w[i][1]; if(r<a) return w[i][0]; } return w[w.length-1][0]; }
  function inW(w,k){ for(var i=0;i<w.length;i++) if(w[i][0]===k) return true; return false; }
  function param(n){ try { return new URLSearchParams(location.search).get(n); } catch(e){ return null; } }

  var st = null, ovr = param('exp');
  if (ovr && /^f\d+_u\d+$/.test(ovr)){ var pp = ovr.split('_'); if (FRONT[pp[0]] && UPSELL[pp[1]]) st = { front:pp[0], upsell:pp[1], ts:0 }; }
  if (!st){ try { st = JSON.parse(localStorage.getItem(KEY)); } catch(e){} }
  if (!st) st = {};
  if (!FRONT[st.front]   || !inW(FRONT_W,  st.front))  st.front  = wpick(FRONT_W);
  if (!UPSELL[st.upsell] || !inW(UPSELL_W, st.upsell)) st.upsell = wpick(UPSELL_W);
  if (!st.uv || !inW(UV_W, st.uv)) st.uv = wpick(UV_W);
  if (!st.parc || !inW(PARC_W, st.parc)) st.parc = wpick(PARC_W);
  if (!st.frontRoll || !inW(ROLL_W, st.frontRoll)) st.frontRoll = wpick(ROLL_W);
  // quizscan: sticky; quem ja esta no MEIO do quiz A (kbm_quiz_v1.step>0) nao muda de braco
  var scanNew = false;
  if (!st.quizscan || !inW(QUIZSCAN_W, st.quizscan)) {
    var midQuiz = false;
    try { var _mq = JSON.parse(localStorage.getItem('kbm_quiz_v1')||'{}'); midQuiz = (_mq.step||0) > 0; } catch(e){}
    st.quizscan = midQuiz ? 'a' : wpick(QUIZSCAN_W);
    scanNew = true;
  }
  var scanOvr = param('scan');                   // QA manual: ?scan=a / ?scan=b força o braço (fica sticky)
  if (scanOvr === 'a' || scanOvr === 'b') st.quizscan = scanOvr;
  // paginas pos-compra (aula1) setam KBM_NO_CK_ROLL: quem comprou ANTES do split nao tem checkout salvo
  // e NAO pode ser sorteado pro Payt (o cartao dele esta na Kiwify) -> assume kiwify
  if (!st.checkout || !inW(CHECKOUT_W, st.checkout)) st.checkout = window.KBM_NO_CK_ROLL ? 'kiwify' : wpick(CHECKOUT_W);
  if (!st.ts) st.ts = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){}
  UPSELL.u127.player = (st.uv === 'B') ? U127_B : U127_A;

  // roteamento quizscan A<->B: so nas paginas do quiz, preservando UTMs (location.search)
  try {
    var _pth = location.pathname;
    if (st.quizscan === 'b' && /^\/(index\.html)?$/.test(_pth)) location.replace('/b.html' + location.search);
    else if (st.quizscan === 'a' && /^\/b(\.html)?$/.test(_pth)) location.replace('/' + location.search);
  } catch(e){}

  // TESTE DE TICKET DIRECIONADO: o f47 (R$47) so aparece p/ quem respondeu gasto alto no T12
  // (R$150-400 ou >R$400, lido do kbm_quiz_v1) E caiu no braco de teste (30%). Resto = f37 sempre.
  var spendHigh = false;
  try { var _q = JSON.parse(localStorage.getItem('kbm_quiz_v1')||'{}'); spendHigh = (HIGH_SPEND.indexOf((_q.answers && _q.answers.spend) || '') >= 0); } catch(e){}
  var effFront = (st.frontRoll === 'test' && spendHigh && FRONT['f47']) ? 'f47' : st.front;

  var frontKey  = FRONT_ON  ? effFront : 'f27';
  var upsellKey = UPSELL_ON ? st.upsell : 'u57';
  if (UPSELL_ON && !UPSELL[upsellKey].player) upsellKey = 'u57';

  var cell = effFront + '_' + st.upsell;

  window.KBMExp = {
    raw: st, cell: cell,
    front: frontKey,  frontCfg: FRONT[frontKey],
    checkout: st.checkout, payt: PAYT,
    frontUrl:    (st.checkout==='payt') ? PAYT.front     : FRONT[frontKey].checkout,
    frontOffUrl: (st.checkout==='payt') ? PAYT.front_off : FRONT[frontKey].off,
    upsell: upsellKey, upsellCfg: UPSELL[upsellKey], u127v: st.uv, parc: st.parc, quizscan: st.quizscan,
    frontActive: FRONT_ON, upsellActive: UPSELL_ON && !!UPSELL[upsellKey].player,
    tag: function(url){ if(!url) return url; return url + (url.indexOf('?')===-1?'?':'&') + 'utm_term=' + encodeURIComponent(cell + '_v' + (st.uv||'A') + '_p' + (st.parc||'0')); },
    mountUpsellVideo: function(elId){
      var pl = (KBMExp.upsellCfg && KBMExp.upsellCfg.player) || U57_PLAYER;
      var el = document.getElementById(elId); if(!el) return;
      el.innerHTML = '<vturb-smartplayer id="'+pl.id+'" style="display:block;margin:0 auto;width:100%;"></vturb-smartplayer>';
      var s = document.createElement('script'); s.src = pl.src; s.async = true; document.head.appendChild(s);
    }
  };

  try {
    if (window.posthog){
      posthog.register({ exp_cell: cell, exp_front_price: FRONT[effFront].price, exp_upsell_price: UPSELL[st.upsell].price, exp_u127v: st.uv, exp_parc: st.parc, exp_checkout: st.checkout, exp_quizscan: st.quizscan });
      posthog.capture('experiment_assigned', { cell: cell, front_price: FRONT[effFront].price, upsell_price: UPSELL[st.upsell].price, u127_vsl: st.uv, front_active: FRONT_ON, upsell_active: UPSELL_ON, checkout: st.checkout });
      if (scanNew) posthog.capture('quizscan_assigned', { arm: st.quizscan });
    }
  } catch(e){}
  // ledger A/B canônico: registra a atribuição do quizscan pra TODOS (dedup por localStorage no helper)
  try { if (window.KBM_abAssign && st.quizscan) window.KBM_abAssign('quizscan', st.quizscan); } catch(e){}
})();
