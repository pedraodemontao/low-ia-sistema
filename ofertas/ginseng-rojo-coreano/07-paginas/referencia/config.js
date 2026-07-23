/* ============================================================
   CONFIG v2 — QUIZ COLA DE ARROZ ROXO COREANO (BR / PT-BR)
   Tradução natural do funil US. Mesma estrutura/IDs/assets.
   ============================================================ */

var RESULTS_URL = 'results.html';
var SECTIONS = ['Sua Pele', 'Sua História', 'O Segredo Coreano', 'Suas Emoções', 'Seus Resultados'];

/* ============================================================
   DEPOIMENTOS PERSONALIZADOS POR MÉTODO (frustração → cola)
   ============================================================ */
var TESTIMONIALS_BY_METHOD = {
  creams: [
    { q:'Eu tinha uma gaveta cheia de cremes de R$300 que prometiam tudo. Minha pele bebia eles antes do meio-dia e continuava seca. Três semanas com a cola e minha pele segura a hidratação sozinha — não comprei mais um pote sequer.', n:'Diane, 58', before:'assets/p1-01-diane-before.jpg', after:'assets/p1-01-diane-after.jpg' },
    { q:'Vinte anos comprando sérum. Cada um “funcionava” por um mês, depois nada. A cola foi a primeira vez que a minha pele de fato MUDOU em vez de só ficar oleosa.', n:'Patricia, 62', before:'assets/p1-02-patricia-before.jpg', after:'assets/p1-02-patricia-after.jpg' },
    { q:'Meu banheiro parecia um cemitério de cremes. Fiz o ritual de 2 minutos por 21 noites — minha filha perguntou em qual dermatologista eu estava indo.', n:'Carol, 54', before:'assets/p1-03-carol-before.jpg', after:'assets/p1-03-carol-after.jpg' } ],
  retinol: [
    { q:'O retinol deixou meu rosto vermelho e descascando por meses — “piora antes de melhorar”, diziam. Nunca melhorou. A cola me deu a renovação sem a queimação.', n:'Janet, 56', before:'assets/p1-04-janet-before.jpg', after:'assets/p1-04-janet-after.jpg' },
    { q:'Eu tinha medo de pegar sol por causa do retinol. Agora faço um ritual coreano de 2 minutos à noite e minha pele se renova sozinha — sem descamar, sem me esconder.', n:'Paula, 61', before:'assets/p1-05-paula-before.jpg', after:'assets/p1-05-paula-after.jpg' },
    { q:'Minha dermatologista só aumentava a dose de retinol. Minhas rugas continuavam; minha irritação crescia. Três semanas com a cola de arroz roxo fizeram o que dois anos de tretinoína não fizeram.', n:'Margaret, 65', before:'assets/p1-06-margaret-before.jpg', after:'assets/p1-06-margaret-after.jpg' } ],
  collagen: [
    { q:'Tomei cápsulas de colágeno toda manhã por 3 anos. R$160 por mês e meu contorno continuava caindo. Descobri que o colágeno que a gente engole não escolhe o rosto. A cola funciona ONDE eu passo.', n:'Nancy, 59', before:'assets/p1-07-nancy-before.jpg', after:'assets/p1-07-nancy-after.jpg' },
    { q:'Pó no café, balinha, cápsula… meu pescoço não ligava. Duas semanas no ritual da cola e a pele fininha do pescoço começou a alisar.', n:'Barbara, 67', before:'assets/p1-08-barbara-before.jpg', after:'assets/p1-08-barbara-after.jpg' },
    { q:'Meu médico me disse que a maior parte do colágeno é digerida antes de fazer qualquer coisa. Ninguém me falou isso ANTES de eu gastar uma fortuna em cápsula. A cola custa menos que um mês delas.', n:'Joyce, 63', before:'assets/p1-09-joyce-before.jpg', after:'assets/p1-09-joyce-after.jpg' } ],
  peptides: [
    { q:'Paguei caro no “sérum de peptídeo viral”. Ficou ótimo por um mês — aí parei, e minhas rugas voltaram mais fundas. A cola é a primeira coisa que continuou funcionando DEPOIS que pulei uma noite.', n:'Denise, 57', before:'assets/p1-10-denise-before.jpg', after:'assets/p1-10-denise-after.jpg' },
    { q:'Matrixyl, Argireline, peptídeos de cobre — testei o alfabeto inteiro. Eles ALUGAM resultado. A cola coreana foi a primeira coisa que minha pele de fato manteve.', n:'Donna, 60', before:'assets/p1-11-donna-before.jpg', after:'assets/p1-11-donna-after.jpg' },
    { q:'O sérum de peptídeo travou um pouco minha expressão — eu parecia descansada, mas artificial. Com a cola meu rosto se move… e ainda parece anos mais novo.', n:'Sondra, 55', before:'assets/p1-12-sondra-before.jpg', after:'assets/p1-12-sondra-after.jpg' } ],
  botox: [
    { q:'Tenho pavor de agulha, então botox era sempre “pra emergência”. A massagem de 3 dedos com a cola ativou o que minha dermatologista chamou de efeito botox natural. Sem consulta. Sem roxo.', n:'Kathleen, 69', before:'assets/p1-15-kathleen-before.jpg', after:'assets/p1-15-kathleen-after.jpg' } ]
};

/* Carrossel do loading T6 — reusa depoimentos REAIS (transformação mais forte primeiro) */
var LOADING_QUOTES = [
  TESTIMONIALS_BY_METHOD.retinol[0],    // Janet
  TESTIMONIALS_BY_METHOD.creams[0],     // Diane
  TESTIMONIALS_BY_METHOD.collagen[0]    // Nancy
];

/* Carrossel de antes/depois do loading T19 */
var BA_CAROUSEL = [
  { before:'assets/t19-karen-before.jpg', after:'assets/t19-karen-after.jpg', name:'Karen, 57',
    q:'Fiz o ritual de 2 minutos toda noite por 3 semanas. Meu contorno levantou, minha pele brilha — meu marido notou antes de eu falar qualquer coisa.' },
  { before:'assets/t27-susan-before.jpg', after:'assets/t27-susan-after.jpg', name:'Susan, 47',
    q:'Joguei fora o corretivo. As linhas fundas em volta da boca sumiram na segunda semana.' },
  { before:'assets/t27-linda-before.jpg', after:'assets/t27-linda-after.jpg', name:'Linda, 54',
    q:'Minha filha perguntou se eu tinha feito “harmonização”. Mostrei a tigela de arroz roxo na minha geladeira.' } ];

/* T27 — depoimentos finais */
var PROOF_FINAL = [
  { claim:'Parece 8 anos mais nova aos 49', name:'Gloria, 49', before:'assets/t27-gloria-before.jpg', after:'assets/t27-gloria-after.jpg',
    q:'Oito anos a menos no rosto em três semanas. Minha irmã ainda acha que estou mentindo que não fiz procedimento.' },
  { claim:'Firmeza de volta aos 75', name:'Helen, 75', before:'assets/t27-helen-before.jpg', after:'assets/t27-helen-after.jpg',
    q:'Minha vizinha me pediu o “segredo”. Nunca é tarde demais — eu sou a prova.' },
  { claim:'Brilho de volta aos 61', name:'Martha, 61', before:'assets/t27-martha-before.jpg', after:'assets/t27-martha-after.jpg',
    q:'O brilho voltou na primeira semana. Minha pele bebe a cola toda noite.' } ];

/* T16 — cards-inimigos condicionais */
var ENEMY_CARDS = [
  { keys:['creams'], icon:'🧴', title:'Cremes & séruns caros',
    body:'Eles hidratam por <b>FORA</b> de uma pele que parou de se hidratar sozinha. A água evapora em horas — e amanhã você começa do zero. <b>Tratam a superfície. Nunca a causa.</b>' },
  { keys:['botox','peptides'], icon:'💉', title:'Botox & Argireline',
    body:'Eles <b>CONGELAM</b> o músculo temporariamente. Nada se renova por baixo — e quando você para, as rugas voltam, muitas vezes mais fundas. <b>É o efeito rebote.</b>' },
  { keys:['peptides','retinol'], icon:'🧪', title:'Matrixyl & retinol',
    body:'Eles forçam uma <b>renovação ARTIFICIAL</b> por fora. No momento em que você para de pagar, o resultado some — porque sua pele nunca reaprendeu a se renovar.' },
  { keys:['collagen'], icon:'💊', title:'Suplemento de colágeno',
    body:'O colágeno engolido é <b>digerido</b> como qualquer proteína — e o que sobra não escolhe o seu rosto. Seu contorno nunca viu uma fração dessas cápsulas.' } ];

/* ============================================================
   AS TELAS (mesma ordem v2)
   ============================================================ */
var STEPS = [

  /* T1 — LANDING */
  { id:'T1', type:'landing', section:0, progress:false,
    heroImg:'assets/t01-hero.webp',
    sub:'Faça o <b>teste de pele grátis de 1 minuto da Dra. Yuna Mun</b> e descubra se a Cola de Arroz Roxo Coreano pode rejuvenescer a sua pele — e <b>libere</b> a sua receita da cola coreana personalizada.',
    nob:'Sem botox · Sem Matrixyl ou Argireline · Sem cremes caros',
    bullets:[
      'Responda para descobrir se essa <b>Cola Coreana</b> tem um efeito <b>3x mais forte que Matrixyl, Argireline e retinol</b> no seu rosto',
      'O <b>“ritual da maçã”</b> que pode te ajudar a suavizar as rugas em casa',
      'E o <b>tai chi facial coreano</b> — uma massagem de 3 dedos que, junto com a Cola de Arroz Roxo Coreano, pode ativar um <b>efeito botox natural em 7 a 10 dias</b>' ],
    cta:'DESCOBRIR SE FUNCIONA PRA MIM',
    micro:'✓ Teste grátis de 1 min   ✓ 100% natural   🔒 Privado',
    urg:'⚠️ A Dra. Yuna analisa um número limitado de testes por dia',
    baStrip:[
      { before:'assets/thumb-karen-b.jpg', after:'assets/thumb-karen-a.jpg', name:'Karen, 57' },
      { before:'assets/thumb-susan-b.jpg', after:'assets/thumb-susan-a.jpg', name:'Susan, 47' },
      { before:'assets/thumb-linda-b.jpg', after:'assets/thumb-linda-a.jpg', name:'Linda, 54' } ],
    chip:{ img:'assets/avatar-dryuna.jpg', name:'Dra. Yuna Mun', cred:'Maior dermatologista natural da Coreia · 27 anos · Prêmio da Universidade Nacional de Seul' } },

  /* T2 — META */
  { id:'T2', type:'single', section:1, varName:'goal',
    title:'Qual é o seu maior objetivo?',
    options:[
      { e:'〰️', t:'Eliminar as linhas de expressão no rosto', v:'wrinkles' },
      { e:'🔥', t:'Firmar e levantar a pele flácida', v:'firm' },
      { e:'✨', t:'Voltar a ter brilho — sem maquiagem', v:'glow' },
      { e:'🌟', t:'Todas as alternativas anteriores', v:'all' } ] },

  /* T2B — VENDA DA BIG IDEA */
  { id:'T2B', type:'bigidea', section:1, progress:false, varName:'big_idea_aware', event:'BigIdeaView',
    title:'Você já ouviu falar da Cola de Arroz Roxo Coreano que estrelas de Hollywood alérgicas a botox estão usando?',
    cards:[
      { img:'assets/t2b-celebrity.jpg',
        cap:'“Depois que descobri que era <b>alérgica a botox</b>, essa cola de arroz roxo coreano salvou a minha carreira de atriz depois dos 50… parece que eu <b>voltei no tempo</b>.”' },
      { img:'assets/t2b-doctor.jpg', pos:'center 12%',
        cap:'“Essa cola coreana caseira que você passa antes de dormir combate as <b>“toxinas do envelhecimento”</b> — e pode fazer as células da sua pele rejuvenescerem <b>em questão de semanas</b>.”' } ],
    yes:'Sim, já ouvi falar', no:'Não — me conta mais' },

  /* T3 — IDADE */
  { id:'T3', type:'single', section:1, varName:'age_bucket',
    title:'Quantos anos você tem?',
    options:[
      { e:'🌺', t:'45–54', v:'45-54' },
      { e:'🌻', t:'55–64', v:'55-64' },
      { e:'🌷', t:'65–74', v:'65-74' },
      { e:'💐', t:'75+', v:'75+' } ] },

  /* T4 — DORES (multi) */
  { id:'T4', type:'multi', section:1, varName:'pains',
    title:'O que mais te incomoda na sua pele?',
    sub:'Toque em tudo que se aplica',
    options:[
      { e:'〰️', t:'Rugas fundas na boca e nos olhos', v:'wrinkles' },
      { e:'😞', t:'Pele flácida e caída', v:'sagging' },
      { e:'🦢', t:'Pescoço e papada moles', v:'neck' },
      { e:'👁️', t:'Pés de galinha', v:'crowsfeet' },
      { e:'😣', t:'Bigode chinês (linhas de marionete)', v:'marionette' },
      { e:'📉', t:'Perda de firmeza no geral', v:'firmness' } ] },

  /* T5 — ZONAS */
  { id:'T5', type:'zones', section:1, varName:'zones',
    title:'Quais áreas você quer levantar primeiro?',
    sub:'Toque em tudo que se aplica',
    options:[
      { img:'assets/t05-zone-eyes.png',        t:'Olhos', v:'eyes', label:'área dos olhos' },
      { img:'assets/t05-zone-jawline.png',     t:'Contorno & papada', v:'jawline', label:'contorno do rosto' },
      { img:'assets/t05-zone-neck.png',        t:'Pescoço', v:'neck', label:'pescoço' },
      { img:'assets/t05-zone-mouth.png',       t:'Área da boca', v:'mouth', label:'área da boca' },
      { img:'assets/t05-zone-forehead.png',    t:'Testa', v:'forehead', label:'testa' },
      { img:'assets/t05-zone-decolletage.png', t:'Colo', v:'decolletage', label:'colo' } ] },

  /* T6L — LOADING + CARROSSEL */
  { id:'T6L', type:'loading', section:1, progress:false, noBack:true, event:'FirstAnalysisView',
    title:'Analisando suas primeiras respostas...',
    items:[ 'Mapeando o seu perfil de pele', 'Comparando com mais de 37 mil mulheres testadas', 'Preparando suas próximas perguntas' ],
    carousel:LOADING_QUOTES,
    itemMs:1500 },

  /* T7 — NOME */
  { id:'T7', type:'name', section:1, varName:'name',
    title:'Qual é o seu primeiro nome?',
    sub:'Pra Dra. Yuna personalizar os seus resultados',
    cta:'Continuar' },

  /* T9 — DOR DIMENSIONAL PELE */
  { id:'T9', type:'multi', section:2, varName:'dimensional', event:'SectionStory',
    title:'Quais são os maiores problemas da sua pele hoje?',
    sub:'Toque em tudo que se aplica',
    options:[
      { e:'🏜️', t:'Está sempre seca — não importa quanto creme eu use', v:'dry' },
      { e:'〰️', t:'Minhas rugas são tão fundas que preciso de maquiagem pra camuflar', v:'deep_wrinkles' },
      { e:'📉', t:'Perdeu firmeza — meu contorno está começando a cair', v:'lost_firmness' },
      { e:'😶', t:'Parece opaca e cansada, mesmo depois de uma noite inteira de sono', v:'dull' },
      { e:'🍂', t:'Está fina e enrugadinha — principalmente pescoço, braços e colo', v:'crepey' } ] },

  /* T8 — DOR DIMENSIONAL VIDA */
  { id:'T8', type:'single', section:2, varName:'life_impact',
    title:'{name}, como a sua pele afeta a sua vida?',
    options:[
      { e:'💔', t:'Minha autoestima — eu evito espelhos e fotos', v:'selfesteem' },
      { e:'🪞', t:'Não consigo mais sair de casa sem maquiagem', v:'makeup' },
      { e:'👥', t:'Me sinto invisível — as pessoas não me olham como antes', v:'invisible' },
      { e:'💍', t:'Meu marido não me elogia como antes', v:'husband' } ] },

  /* T11 — O QUE JÁ TENTOU */
  { id:'T11', type:'multi', section:2, varName:'tried',
    title:'O que você já tentou?',
    sub:'Toque em tudo que se aplica',
    options:[
      { e:'🧴', t:'Cremes e séruns caros', v:'creams' },
      { e:'🔬', t:'Retinol', v:'retinol' },
      { e:'💊', t:'Suplemento de colágeno', v:'collagen' },
      { e:'🧪', t:'Peptídeos virais (Matrixyl, Argireline)', v:'peptides' },
      { e:'💉', t:'Botox ou preenchimento', v:'botox' },
      { e:'🚫', t:'Ainda não tentei nada', v:'nothing', exclusive:true } ] },

  /* T12 — GASTO MENSAL */
  { id:'T12', type:'single', section:2, varName:'spend',
    title:'Quanto você gasta com skincare por mês?',
    options:[
      { e:'💵', t:'Menos de R$50', v:'under30' },
      { e:'💰', t:'R$50–R$150', v:'30_80' },
      { e:'💳', t:'R$150–R$400', v:'80_200' },
      { e:'💎', t:'Mais de R$400 (com procedimentos)', v:'over200' } ] },

  /* T10 — CONFISSÃO */
  { id:'T10', type:'single', section:2, varName:'happy',
    title:'Seja sincera com você mesma: você está feliz com a sua pele hoje?',
    options:[
      { e:'🥺', t:'Não, fico triste quando me olho no espelho', v:'sad' },
      { e:'😐', t:'Poderia estar muito melhor', v:'better' },
      { e:'💪', t:'Estou tentando, mas nada se mantém', v:'nothing_sticks' } ] },

  /* TBRK — BREAK PERSONALIZADO */
  { id:'TBRK', type:'break', section:2, progress:false, event:'BreakProofView',
    cta:'Continuar →' },

  /* T13 — CALIBRAGEM */
  { id:'T13', type:'single', section:2, varName:'awareness',
    title:'Você já ouviu falar POR QUE as coreanas mantêm a pele jovem depois dos 50?',
    options:[
      { e:'🤔', t:'Não — mas sempre me perguntei', v:'no' },
      { e:'👂', t:'Já ouvi algo sobre o skincare delas', v:'something' },
      { e:'💡', t:'Sim, eu sei o segredo', v:'yes' } ] },

  /* T14L — LOADING + CREDENCIAIS */
  { id:'T14L', type:'loading', section:3, progress:false, noBack:true, event:'SectionSecret',
    title:'Analisando suas respostas pelo método clínico da Dra. Yuna...',
    items:[ 'Cruzando o seu perfil de pele', 'Identificando por que os métodos anteriores falharam', 'Comparando o seu caso com os arquivos clínicos dela' ],
    credentials:{
      img:'assets/t14-dryuna-authority.jpg',
      name:'Dra. Yuna Mun', check:true,
      items:[ '27 anos em dermatologia natural coreana', 'Prêmio Descoberta do Ano — Universidade Nacional de Seul (2012)', 'Autora do best-seller “O Segredo da Pele Coreana”', 'Já apareceu na BBC' ] },
    itemMs:1500 },

  /* T16 — DIAGNÓSTICO DAS FALHAS */
  { id:'T16', type:'interstitial', section:3, progress:false, event:'FailureDiagnosisView',
    cta:'Então qual é a causa real? →',
    html: function(){
      var tried = (QuizState.get('tried') || []).filter(function(t){ return t !== 'nothing'; });
      var cards = ENEMY_CARDS.filter(function(c){
        if (!tried.length) return true;
        return c.keys.some(function(k){ return tried.indexOf(k) !== -1; });
      });
      var cardsHtml = cards.map(function(c){
        return '<div class="enemy-v2"><div class="ev-bg"><span>' + c.icon + '</span></div>'
          + '<div class="ev-tx"><div class="ev-t">' + c.icon + ' ' + c.title + '</div><div class="ev-b">' + c.body + '</div></div></div>';
      }).join('');
      return ''+
      '<span class="kicker-tag red">⚠ Identificamos o seu problema</span>'+
      '<h2>Por que nada que você tentou durou:</h2>'+
      '<div class="voice-chip"><img src="assets/avatar-dryuna.jpg" alt=""><div><div class="vn">Dra. Yuna Mun <span>✔</span></div><div class="vr">analisou ' + (tried.length ? 'o que você tentou' : 'os métodos mais comuns') + ':</div></div></div>'+
      cardsHtml +
      '<p class="absolve">Cada um deles <u>mascara</u> o sintoma.<br>Então não — nunca foi você. <b>Foi o método.</b></p>'+
      '<p class="body" style="text-align:center">Tem uma coisa que nenhum deles nunca tocou — o verdadeiro motivo da sua pele ter parado de se renovar. As dermatologistas coreanas conhecem ele há séculos…</p>'; } },

  /* T15 — MECANISMO */
  { id:'T15', type:'interstitial', section:3, progress:false, event:'MechanismAccepted', eventOnCta:true,
    cta:'Entendi! →',
    html: function(){ return ''+
      '<div class="voice-chip"><img src="assets/avatar-dryuna.jpg" alt=""><div><div class="vn">Dra. Yuna Mun <span>✔</span></div><div class="vr">revela a causa real:</div></div></div>'+
      '<h2>Sua pele tem um ESCUDO natural. Foi isso que aconteceu com ele:</h2>'+
      '<div class="shield-grid">'+
        '<div class="shield-card"><span class="sc-n">1</span><img src="assets/t15-shield-1.png" alt=""><div class="sc-cap"><b>Pele jovem</b><span>Seu escudo hidrata, protege e se renova sozinho.</span></div></div>'+
        '<div class="shield-card"><span class="sc-n">2</span><img src="assets/t15-shield-2.png" alt=""><div class="sc-cap"><b>Depois dos 40</b><span>O escudo enfraquece e se desliga.</span></div></div>'+
        '<div class="shield-card"><span class="sc-n">3</span><img src="assets/t15-shield-3.png" alt=""><div class="sc-cap"><b>Radicais livres</b><span>Toxinas começam a “enferrujar” o seu colágeno, dia após dia.</span></div></div>'+
        '<div class="shield-card hero-step"><span class="sc-n">4</span><img src="assets/t15-shield-4.png" alt=""><div class="sc-cap"><b>A Cola de Arroz Roxo Coreano</b><span>Religa o seu escudo — e a pele volta a se renovar.</span></div></div>'+
      '</div>'+
      '<div class="demo-box"><img class="apple43" src="assets/t15-apple-demo.jpg" alt="Demonstração da maçã">'+
        '<div class="cap">É isso que os radicais livres estão fazendo com o seu colágeno <b>agora</b>. A metade tratada com o antioxidante roxo coreano não envelheceu. <b>Mesma maçã. Escudo diferente.</b></div>'+
      '</div>'+
      '<div class="study-line">Um estudo da Universidade Nacional de Seul com <b>4.500 mulheres</b> descobriu que a única diferença entre uma pele envelhecida e uma jovem era se esse escudo estava LIGADO ou DESLIGADO. É por isso que o ritual coreano é até <b>8x mais eficaz</b> que cremes, peptídeos ou botox — <b>é o único que vai na causa.</b></div>'; } },

  /* T17 — TOXINAS */
  { id:'T17', type:'single', section:3, varName:'toxin_env',
    title:'Onde você passa a maior parte dos seus dias?',
    options:[
      { e:'🏙️', t:'Na cidade (trânsito, poluição)', v:'city' },
      { e:'☀️', t:'Ao ar livre, no sol', v:'sun' },
      { e:'🏠', t:'Mais dentro de casa (ar-condicionado)', v:'indoors' },
      { e:'🚗', t:'Um pouco de tudo', v:'mix' } ] },

  /* T18 — SONO */
  { id:'T18', type:'single', section:3, varName:'sleep',
    title:'Quantas horas você dorme?',
    sub:'Sua pele renova o colágeno à noite — é quando o ritual coreano age.',
    options:[
      { e:'😴', t:'Menos de 5', v:'<5' },
      { e:'🛌', t:'5–7', v:'5-7' },
      { e:'😌', t:'7–9', v:'7-9' },
      { e:'💤', t:'9+', v:'9+' } ] },

  /* T19L — LOADING + CARROSSEL ANTES/DEPOIS */
  { id:'T19L', type:'loading', section:4, progress:false, noBack:true, event:'SectionEmotions',
    title:'Mulheres como você já estão fazendo o ritual',
    items:[ 'Processando o seu perfil de pele', 'Procurando mulheres com o SEU perfil exato', 'Carregando os resultados delas' ],
    baCarousel:BA_CAROUSEL,
    itemMs:2300 },

  /* T20-22 — EMOCIONAIS */
  { id:'T20', type:'emotional', section:4, varName:'emo_photos',
    img:'assets/t27-susan-before.jpg', img2:'assets/t27-susan-after.jpg',
    quote:'“Eu evito fotos por causa da minha pele”',
    options:[
      { e:'🙋‍♀️', t:'Me identifico', v:'yes' },
      { e:'🙅‍♀️', t:'Nem tanto', v:'no' },
      { e:'⏭️', t:'Prefiro pular etapa', v:'skip' } ] },

  { id:'T21', type:'emotional', section:4, varName:'emo_botox',
    img:'assets/t27-linda-before.jpg', img2:'assets/t27-linda-after.jpg',
    caption:'Sem botox. Sem preenchimento. 21 dias do ritual coreano.',
    quote:'“Na minha idade, só botox ou um lifting resolveria o meu rosto”',
    options:[
      { e:'🥺', t:'Às vezes penso isso...', v:'believe' },
      { e:'🤔', t:'Tomara que não seja verdade', v:'hope' },
      { e:'⏭️', t:'Prefiro pular etapa', v:'skip' } ] },

  { id:'T22', type:'emotional', section:4, varName:'emo_fear',
    img:'assets/t22-mirror.jpg',
    quote:'“Tenho medo de nunca mais me sentir bonita ao me olhar no espelho”',
    options:[
      { e:'🙋‍♀️', t:'Me identifico', v:'yes' },
      { e:'🙅‍♀️', t:'Não, nada disso', v:'no' },
      { e:'🤐', t:'Prefiro não responder', v:'skip' } ] },

  /* T23 — META */
  { id:'T23', type:'goal', section:5, varName:'goal_years', event:'SectionResults',
    title:'Quantos anos mais nova você quer que a sua pele pareça?',
    options:[
      { e:'🌟', t:'5 anos mais nova', v:'5' },
      { e:'✨', t:'10 anos mais nova', v:'10' },
      { e:'💫', t:'15 anos mais nova', v:'15' },
      { e:'🎁', t:'Me surpreenda', v:'surprise' } ],
    badge: function(v){ return 'Meta: ' + (v==='surprise' ? 'máximo rejuvenescimento' : v + ' anos mais nova') + ' 🎯'; },
    validation: function(){ return '<b>É uma meta realista, {name}.</b> Com a proporção certa do ritual, a maioria das mulheres nota a primeira diferença <b>em poucos dias</b> — vamos conferir o seu perfil de pele.'; },
    cta:'Continuar →' },

  /* T24 — LOADING-ANÁLISE */
  { id:'T24', type:'loading', section:5, progress:false, noBack:true, event:'AnalysisStart',
    title:'Analisando as suas respostas, {name}...',
    items:[ 'Perfil de pele mapeado', 'Medindo o seu Escudo da Pele', 'Calculando a exposição a radicais livres', 'Calibrando a proporção da sua cola de arroz roxo' ],
    carousel:[
      TESTIMONIALS_BY_METHOD.collagen[1],  // Joyce
      TESTIMONIALS_BY_METHOD.peptides[0],  // Sondra
      TESTIMONIALS_BY_METHOD.retinol[2]    // Margaret
    ],
    social:'mais de 37 mil mulheres testadas',
    itemMs:1500 },

  /* T25 — DIAGNÓSTICO */
  { id:'T25', type:'diagnosis', section:5, progress:false, noBack:true, event:'DiagnosisView',
    cta:'Ver o meu ritual personalizado →' },

  /* T25B — FUTURE PACING */
  { id:'T25B', type:'futurepacing', section:5, progress:false, noBack:true, event:'FuturePacingView',
    cta:'Eu quero isso →' },

  /* T26 — COMPROMISSO */
  { id:'T26', type:'single', section:5, varName:'commit', noBack:true, commitEvent:true,
    lockBanner:'🔒 <b>Antes da Dra. Yuna liberar a sua receita, ela precisa saber:</b>',
    title:'Você se compromete com o ritual de 2 minutos toda noite por 21 dias?',
    options:[
      { e:'🤩', t:'Sim, estou comprometida!', v:'committed' },
      { e:'😎', t:'Quero começar hoje à noite', v:'tonight' },
      { e:'🤔', t:'Não tenho certeza...', v:'notsure' } ] },

  /* T27 — PROVA FINAL */
  { id:'T27', type:'interstitial', section:5, progress:false, noBack:true, event:'ProofSegmentedView',
    cta:'Quero o MEU ritual ✨', ctaClass:'green',
    html: function(){
      var cards = PROOF_FINAL.map(function(p){
        var media = (p.before && p.after)
          ? '<div class="ba-pair"><div class="half"><span class="ba-tag">Antes</span><img src="' + p.before + '" alt="" loading="lazy"></div>'
            + '<div class="half"><span class="ba-tag after">Depois</span><img src="' + p.after + '" alt="" loading="lazy"></div></div>'
          : '<div class="pg-ph">' + p.ph + '</div>';
        return '<div class="ba-card">' + media
          + '<div class="ba-meta"><div class="ba-claim">' + p.claim + '</div><div class="stars">★★★★★</div>'
          + '<div class="ba-name">' + p.name + '</div><div class="ba-quote">“' + p.q + '”</div></div></div>';
      }).join('');
      return ''+
      '<span class="kicker-tag">Resultados reais</span>'+
      '<h2>Mulheres reais. Escudos religados de verdade.</h2>'+
      '<div class="proof-col">' + cards + '</div>'; } },

  /* T28 — LOADING FINAL */
  { id:'T28', type:'loading', section:5, progress:false, noBack:true, event:'QuizComplete',
    title:'Finalizando o seu ritual, {name}...',
    items:[ 'Proporção da cola de arroz roxo calibrada', 'Protocolo de 21 dias montado', 'Bônus selecionados', 'Oferta especial preparada' ],
    itemMs:1300,
    redirect:true }
];

/* ============================================================
   SKIN SHIELD SCORE — interno (define a ZONA qualitativa)
   ============================================================ */
function computeShieldScore(a){
  var s = 52;
  s -= Math.min(((a.pains||[]).length) * 4, 16);
  s -= Math.min(((a.dimensional||[]).length) * 3, 9);
  if (a.toxin_env === 'city' || a.toxin_env === 'sun') s -= 4;
  if (a.sleep === '<5' || a.sleep === '5-7') s -= 3;
  var tried = (a.tried||[]).filter(function(t){ return t !== 'nothing'; });
  s -= Math.min(tried.length * 2, 6);
  return Math.max(22, Math.min(46, s));
}
function shieldStatus(a){
  var s = computeShieldScore(a);
  if (s <= 30) return { label:'DESLIGADO', zone:0 };
  if (s <= 38) return { label:'MUITO ENFRAQUECIDO', zone:0 };
  return { label:'ENFRAQUECIDO', zone:1 };
}

/* ---- Achados personalizados (espelhamento das respostas) ---- */
var DIAG_MAPS = {
  dimensional: {
    dry:            'Sua pele não se hidrata mais sozinha — <i>você disse que ela fica seca não importa o creme</i>',
    deep_wrinkles:  'Quebra de colágeno ativa — <i>você disse que suas rugas são tão fundas que precisa de maquiagem pra camuflar</i>',
    lost_firmness:  'Perda estrutural de colágeno — <i>você disse que o seu contorno está começando a cair</i>',
    dull:           'Ciclo de renovação travado — <i>você disse que sua pele parece cansada mesmo depois de dormir bem</i>',
    crepey:         'Derme afinando — <i>você disse que sua pele está ficando fina e enrugadinha</i>'
  },
  toxin: {
    city:    'Alta exposição a radicais livres — a <i>poluição da cidade</i> está “enferrujando” o seu colágeno todo dia',
    sun:     'Alta exposição a radicais livres — o <i>dano do sol</i> está “enferrujando” o seu colágeno todo dia',
    indoors: 'Ambiente que rouba umidade — o <i>ar-condicionado/aquecedor</i> está desidratando a sua pele todo dia',
    mix:     'Exposição diária a radicais livres — toxinas do ambiente estão “enferrujando” o seu colágeno'
  },
  sleepLabels: { '<5':'menos de 5 horas', '5-7':'5 a 7 horas' }
};
function triedLabel(tried){
  var lab = { creams:'cremes', retinol:'retinol', collagen:'cápsulas de colágeno', peptides:'peptídeos', botox:'botox' };
  return tried.slice(0,3).map(function(t){ return lab[t] || t; }).join(', ');
}
function zoneLabels(zones){
  var out = [];
  STEPS.forEach(function(st){ if (st.id==='T5') st.options.forEach(function(o){
    if ((zones||[]).indexOf(o.v) !== -1) out.push(o.label);
  }); });
  return out;
}
function buildDiagnosis(a){
  var st = shieldStatus(a);
  var findings = [];
  (a.dimensional||[]).slice(0,3).forEach(function(d){ if (DIAG_MAPS.dimensional[d]) findings.push(DIAG_MAPS.dimensional[d]); });
  if (a.toxin_env && DIAG_MAPS.toxin[a.toxin_env]) findings.push(DIAG_MAPS.toxin[a.toxin_env]);
  if (DIAG_MAPS.sleepLabels[a.sleep]) findings.push('Déficit de renovação noturna — você dorme <i>' + DIAG_MAPS.sleepLabels[a.sleep] + '</i>, mas o colágeno só se reconstrói no sono profundo');
  var tried = (a.tried||[]).filter(function(t){ return t !== 'nothing'; });
  if (tried.length) findings.push('Dependência de renovação artificial — os <i>' + triedLabel(tried) + '</i> que você tentou trataram o sintoma, nunca o escudo');
  else findings.push('Escudo desprotegido — sua pele vem lutando contra os radicais livres sem nenhum apoio');
  var zl = zoneLabels(a.zones);
  if (zl.length) findings.push('Dano concentrado exatamente onde você marcou — <i>' + zl.slice(0,3).join(', ') + '</i>');
  if (findings.length < 3) findings.push('Desaceleração de renovação típica da sua faixa de idade — o escudo se desliga em silêncio');
  findings = findings.slice(0,6);

  var goalTxt = { wrinkles:'suavizar as linhas de expressão', firm:'pele firme e levantada', glow:'brilho sem maquiagem', all:'rejuvenescimento completo' }[a.goal] || 'pele mais jovem';
  var benefits = [
    { i:'🎯', t:'Levanta o <b>' + (zl[0] || 'contorno') + '</b> que você marcou primeiro' },
    { i:'〰️', t:'Suaviza rugas fundas — <b>sem maquiagem</b>' },
    { i:'✨', t:'Brilho de volta na primeira semana — sua meta: <b>' + goalTxt + '</b>' },
    { i:'🌙', t:'<b>2 minutos por noite</b> — sem rotina de 10 passos' } ];
  return { status: st, findings: findings, benefits: benefits };
}

/* ---- Future pacing (T25B) ---- */
function buildFuturePacing(a){
  return {
    title:'O que acontece se você usar a Cola de Arroz Roxo Coreano em 21 dias?',
    items:[
      { wk:'Noite 1', tx:'Você usa a sua <b>Cola de Arroz Roxo Coreano</b> caseira 2 minutos antes de dormir e, ao lavar o rosto, já percebe a sua pele hidratada e macia.' },
      { wk:'Semana 1', tx:'A hidratação e o <b>brilho</b> são a primeira coisa que as mulheres notam — geralmente no dia 4 ou 5. E no dia 7 você já percebe que o pé de galinha e as linhas da testa começam a suavizar.' },
      { wk:'Semana 2', tx:'As linhas finas suavizam e o <b>contorno do rosto</b> que você marcou começa a levantar, conforme a renovação de colágeno reinicia por baixo. A flacidez começa a diminuir visivelmente.' },
      { wk:'Semana 3', tx:'As linhas de expressão e rugas que te incomodavam já estão quase imperceptíveis, e você volta a ter a confiança de sair de casa <b>sem precisar de maquiagem</b>.', gold:true },
      { wk:'Semana 4', tx:'Você compara as fotos de 4 semanas atrás com a sua pele agora e percebe que ela está <b>renovada e firme</b>, como na sua juventude.', gold:true } ],
    proof: TESTIMONIALS_BY_METHOD.collagen[2]   // Joyce, 63 — depoimento expressivo (foto real)
  };
}
