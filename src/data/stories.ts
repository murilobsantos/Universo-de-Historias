import { Story } from '../types/story';

export const mockStories: Story[] = [
  {
    id: 1,
    title: "A Ascensão do Herói Perdido",
    description: "Em um mundo esquecido, um guerreiro acorda sem memória, mas com um destino maior que ele mesmo. Nesta jornada épica, ele descobre poderes ocultos e enfrenta inimigos lendários para salvar seu reino.",
    image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=60",
    author: "João Silva",
    date: "2023-05-15",
    chapters: [
      { id: 1, title: "O Despertar", content: "Era uma vez, em um mundo esquecido pelas estrelas, um guerreiro acordou sem memória. Ele olhou ao redor e viu ruínas antigas cobertas de musgo. 'Quem sou eu?', murmurou para si mesmo. Enquanto explorava, encontrou uma espada antiga cravada em uma pedra. Ao tocá-la, visões do passado inundaram sua mente. Lembrou-se de batalhas épicas, de um reino próspero e de uma traição que o levou àquele estado. Seu nome era Elandor, o guardião da luz. Mas agora, tudo estava perdido. Ele precisava encontrar respostas. Caminhando pelas ruínas, encontrou sinais de uma civilização antiga. Pedras com inscrições em uma língua esquecida. Ele sentiu uma energia pulsante na espada, como se ela estivesse viva. Decidiu levá-la consigo. Enquanto caminhava, o sol nascia no horizonte, iluminando um caminho através da floresta densa. Animais estranhos observavam-no, alguns curiosos, outros hostis. Elandor sentiu que sua jornada apenas começava. Ele precisava de aliados, de conhecimento. A espada o guiaria. No fundo da floresta, encontrou uma vila abandonada. Casas vazias, mas sinais de vida recente. Talvez houvesse sobreviventes. Ele entrou em uma casa e encontrou um mapa antigo. Mostrava um castelo nas montanhas. Talvez lá encontrasse respostas. Com a espada na mão, partiu para as montanhas. O caminho era íngreme, cheio de perigos. Lobos uivavam à noite, e tempestades caíam sem aviso. Mas Elandor era determinado. Ele sentia que seu destino estava ligado àquele castelo. Após dias de jornada, chegou ao pé da montanha. O castelo se erguia imponente, com torres altas e muralhas grossas. Guardas patrulhavam os muros. Como entrar? Ele precisava de um plano. Usando sua habilidade, escalou a muralha à noite. Dentro, encontrou salas vazias, mas cheias de artefatos antigos. Em uma sala, um trono vazio. Quem governava ali? De repente, ouviu passos. Escondeu-se atrás de uma coluna. Um homem velho entrou, com uma coroa na cabeça. 'Você veio', disse o rei. 'Eu esperei por você.' Elandor revelou-se. O rei contou a história da traição, de como o reino caiu. Elandor era o herdeiro perdido. Agora, precisava reconquistar o trono. Mas inimigos poderosos o aguardavam. A jornada de Elandor apenas começava, cheia de desafios e descobertas.", comments: [{ id: 1, author: "Reader1", text: "Incredible start!", date: "2023-05-16" }] },
      { id: 2, title: "O Primeiro Encontro", content: "O guerreiro, agora chamado de Elandor, encontrou um velho sábio na floresta. 'Você é o escolhido', disse o sábio. 'Mas primeiro, deve provar seu valor.' Elandor partiu em uma jornada para derrotar um dragão menor que aterrorizava uma vila próxima. O sábio, chamado Mestre Thorne, era um eremita que vivia nas profundezas da floresta encantada. Ele tinha cabelos brancos como neve e olhos que pareciam ver através da alma. 'A espada que você carrega é a Espada da Luz', explicou. 'Ela foi forjada pelos antigos deuses para proteger o reino. Mas foi perdida na Grande Guerra.' Elandor ouviu fascinado. Thorne contou histórias de batalhas lendárias, de heróis caídos e de profecias antigas. Uma profecia falava de um guerreiro sem memória que salvaria o mundo. Era Elandor. Mas para despertar seu verdadeiro poder, precisava provar-se. O dragão, chamado Vermithrax, era uma criatura pequena, mas feroz. Viviam nas cavernas próximas à vila de Eldoria. Os moradores viviam em terror, pagando tributos em ouro e gado. Elandor decidiu ajudar. Equipado com a espada, partiu para as cavernas. O ar era quente e úmido, cheirando a enxofre. Ele ouviu o rugido do dragão ecoando pelas paredes. Avançando cautelosamente, encontrou o covil. Vermithrax era verde escamoso, com olhos vermelhos brilhantes. Cuspiu fogo, mas Elandor desviou. A batalha foi intensa. Elandor usou sua agilidade, golpeando as asas do dragão. Vermithrax contra-atacou, arranhando seu braço. Sangue escorreu, mas Elandor não desistiu. Com um golpe final, cravou a espada no coração da besta. O dragão caiu, morto. Elandor voltou à vila como herói. Os moradores o celebraram, oferecendo comida e abrigo. Mas ele sabia que era apenas o começo. Thorne apareceu novamente. 'Você provou seu valor', disse. 'Agora, prepare-se para desafios maiores.' Elandor sentiu uma nova força dentro de si. Sua jornada continuava, com aliados e inimigos à espera.", comments: [{ id: 2, author: "Reader2", text: "Loved the dragon fight!", date: "2023-05-20" }] }
    ],
    genres: ["Fantasia", "Aventura"],
    tags: ["épico", "guerreiro", "magia", "reino"],
    ratings: { average: 4.5, count: 25 },
    comments: [
      { id: 1, author: "Reader1", text: "Amazing story!", date: "2023-06-01" },
      { id: 2, author: "Reader2", text: "Loved the plot twists.", date: "2023-06-05" }
    ],
    popularity: 150
  },
  {
    id: 2,
    title: "O Último Planeta",
    description: "Humanos buscam refúgio após o colapso da Terra — mas o novo lar guarda segredos sombrios. Uma aventura espacial cheia de mistérios e descobertas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    author: "Maria Santos",
    date: "2023-07-22",
    chapters: [
      { id: 1, title: "A Fuga da Terra", content: "A nave Ark partiu da Terra moribunda com os últimos humanos. Capitã Elena olhou pela janela enquanto o planeta azul se tornava uma memória distante. O motor da nave zumbia suavemente, um som reconfortante em meio ao silêncio opressivo do espaço. Ela lembrou das últimas imagens da Terra: cidades em chamas, oceanos evaporados, e a humanidade reduzida a poucos milhares de sobreviventes. 'Foi por pouco', pensou ela, apertando os controles com força. A tripulação estava tensa, mas esperançosa. Tinham descoberto um planeta habitável através de telescópios antigos, um mundo chamado Nova Esperança. A viagem levaria décadas, mas com a tecnologia de hibernação, muitos dormiriam o caminho todo. Elena, no entanto, decidiu ficar acordada, vigiando o progresso da nave. Dias se transformaram em semanas, e semanas em meses. O espaço era vasto e vazio, pontilhado apenas por estrelas distantes. Às vezes, ela conversava com a IA da nave, chamada Aurora, que mantinha a sanidade da capitã. 'Conte-me uma história', pedia Elena. E Aurora narrava lendas antigas da Terra, mantendo viva a memória da humanidade. Um dia, alarmes soaram. Um asteroide se aproximava perigosamente. Elena manobrou a nave com habilidade, desviando do perigo. Foi então que ela percebeu que o verdadeiro desafio não era o espaço, mas manter a unidade entre os humanos. Conflitos começaram a surgir entre os acordados. Recursos eram escassos, e a tensão aumentava. Elena teve que mediar disputas, lembrando a todos do objetivo comum: sobreviver e prosperar em Nova Esperança. Finalmente, após anos de viagem, o planeta apareceu no horizonte. Era azul e verde, como a Terra antiga. Mas ao se aproximarem, scanners detectaram sinais de vida inteligente. Não estavam sozinhos. A aventura estava apenas começava, e Elena sabia que a humanidade precisaria de toda sua coragem para enfrentar o desconhecido.", comments: [] }
    ],
    genres: ["Ficção Científica", "Aventura"],
    tags: ["espaço", "sobrevivência", "exploração", "alienígenas"],
    ratings: { average: 4.2, count: 18 },
    comments: [
      { id: 3, author: "SciFiFan", text: "Great sci-fi elements.", date: "2023-08-01" }
    ],
    popularity: 120
  },
  {
    id: 3,
    title: "Crônicas do Tempo",
    description: "Um artefato capaz de manipular o tempo cai nas mãos erradas. O equilíbrio da galáxia está em risco. Uma história de ficção científica com viagens no tempo.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60",
    author: "Pedro Oliveira",
    date: "2023-09-10",
    chapters: [{ id: 1, title: "O Artefato", content: "Em uma galáxia distante, o artefato Cronos foi descoberto por uma equipe de arqueólogos interestelares. O artefato, uma esfera cristalina pulsando com energia temporal, tinha o poder de manipular o tempo. Quem o encontrasse poderia viajar para o passado ou futuro, alterar eventos ou até mesmo parar o tempo. Mas o equilíbrio da galáxia dependia de que ninguém abusasse desse poder. A equipe, liderada pelo Dr. Elara Voss, estava explorando as ruínas de uma civilização antiga chamada os Temporais. Eles acreditavam que os Temporais haviam dominado o tempo, mas desapareceram misteriosamente. Ao escavar, encontraram a esfera enterrada em uma câmara subterrânea. Quando Elara tocou nela, visões do futuro inundaram sua mente. Viu guerras devastadoras, planetas destruídos e uma galáxia em caos. Mas também viu esperança, se o artefato fosse usado corretamente. No entanto, a equipe não estava sozinha. Um caçador de tesouros, chamado Zane Korr, os seguia. Zane era um mercenário sem escrúpulos, interessado apenas em lucro. Ele invadiu a câmara e roubou a esfera. Elara tentou impedi-lo, mas Zane ativou o artefato, causando uma distorção temporal. A câmara começou a tremer, e linhas do tempo se entrelaçaram. Elara e sua equipe foram transportados para diferentes eras. Zane, com a esfera, fugiu para o futuro, onde planejava vender o artefato para o maior licitante. Mas o uso do artefato atraiu a atenção de guardiões temporais, seres etéreos que protegiam o equilíbrio. Eles enviaram agentes para recuperar a esfera. Elara, agora no passado, precisava encontrar uma maneira de voltar e impedir Zane. Sua jornada começou, cheia de paradoxos e perigos. Ela aprendeu que o tempo era frágil, e uma mudança poderia destruir tudo. Com aliados improváveis, ela perseguiu Zane através das eras, determinada a restaurar o equilíbrio.", comments: [] }],
    genres: ["Ficção Científica", "Aventura"],
    tags: ["viagem no tempo", "artefato", "galáxia", "equilíbrio"],
    ratings: { average: 4.7, count: 30 },
    comments: [],
    popularity: 200
  },
  {
    id: 4,
    title: "O Segredo da Floresta Encantada",
    description: "Uma jovem aventureira descobre uma floresta mágica cheia de criaturas míticas. Ela deve resolver enigmas antigos para salvar seu vilarejo de uma maldição.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    author: "Ana Costa",
    date: "2023-10-05",
    chapters: [{ id: 1, title: "A Descoberta", content: "Lara, uma jovem aventureira de 18 anos, vivia no vilarejo de Eldridge, cercado por florestas densas e misteriosas. O vilarejo sofria com uma maldição antiga: colheitas murchavam, animais adoeciam, e moradores desapareciam. Os anciãos contavam histórias de uma floresta encantada, lar de criaturas míticas e guardiã de segredos antigos. Lara, corajosa e curiosa, decidiu investigar. Ela entrou na floresta encantada sem saber o que encontraria. As árvores eram altas, com folhas que sussurravam segredos. Caminhos se entrelaçavam, e Lara seguiu um riacho cristalino. De repente, ouviu um rugido baixo. Escondeu-se atrás de um arbusto. Uma criatura apareceu: um unicórnio, com chifres brilhantes e olhos gentis. Mas não era amigável. O unicórnio guardava a entrada para o coração da floresta. Lara precisava provar seu valor. Enigmas antigos estavam gravados em pedras. 'O que é invisível, mas pode ser sentido?' Lara pensou: o vento. Respondeu corretamente, e o unicórnio permitiu passagem. Mais fundo, encontrou fadas dançando em clareiras iluminadas por luzes etéreas. Elas contaram a história da maldição: um feiticeiro maligno havia roubado o Coração da Floresta, um cristal mágico. Sem ele, a floresta murchava, afetando o vilarejo. Lara prometeu ajudar. Mas desafios aguardavam. Criaturas sombrias, lobos encantados e armadilhas mágicas. Lara usou sua inteligência e coragem. Encontrou aliados: um elfo arqueiro e uma dríade guardiã. Juntos, enfrentaram o feiticeiro em sua torre escura. A batalha foi épica, com magia e espadas. Lara recuperou o cristal, quebrando a maldição. O vilarejo floresceu novamente, e Lara tornou-se lenda. Mas sua aventura apenas começava, pois a floresta guardava mais segredos.", comments: [] }],
    genres: ["Fantasia", "Aventura"],
    tags: ["floresta", "magia", "criaturas míticas", "enigmas"],
    ratings: { average: 4.0, count: 12 },
    comments: [],
    popularity: 90
  },
  {
    id: 5,
    title: "Código Perdido",
    description: "Um hacker descobre um código antigo que pode controlar a internet mundial. Ele precisa decidir se usa para o bem ou para o mal em uma corrida contra o tempo.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=60",
    author: "Carlos Ferreira",
    date: "2023-11-12",
    chapters: [{ id: 1, title: "O Código", content: "Alex, um hacker talentoso de 25 anos, passava noites em claro explorando a dark web. Ele era conhecido como ShadowByte, um justiceiro digital que expunha corrupções. Um dia, em um fórum obscuro, encontrou um post anônimo sobre um código antigo. O código, chamado Nexus, era um algoritmo perdido da era pré-internet. Quem o possuísse poderia controlar toda a rede mundial. Alex baixou o arquivo, intrigado. Ao executá-lo em seu computador, o código se espalhou como um vírus, mas sob seu controle. Ele viu feeds de câmeras de segurança, bancos de dados governamentais e até comunicações privadas. O poder era imenso. Mas logo, agências de inteligência notaram anomalias. Alex recebeu ameaças. Ele precisava decidir: usar o código para expor segredos globais e salvar vidas, ou vendê-lo para criminosos. A corrida contra o tempo começou. Hackers rivais o caçavam, governos o perseguiam. Alex formou alianças com outros hackers, criando um grupo chamado Os Guardiões. Eles usaram o código para derrubar ditadores digitais, mas o equilíbrio era frágil. Uma decisão errada poderia causar caos global. Alex enfrentou dilemas morais: salvar um amigo ou proteger milhões? No clímax, ele teve que escolher entre destruir o código ou usá-lo para um bem maior. Sua jornada o transformou, mostrando que o verdadeiro poder vem da responsabilidade.", comments: [] }],
    genres: ["Ficção Científica", "Suspense"],
    tags: ["hacker", "código", "internet", "decisão moral"],
    ratings: { average: 4.3, count: 20 },
    comments: [],
    popularity: 110
  },
  {
    id: 6,
    title: "A Sombra do Dragão",
    description: "Em um reino medieval, um cavaleiro deve enfrentar um dragão lendário que ameaça destruir tudo. Uma jornada de coragem, amizade e magia.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    author: "Luisa Pereira",
    date: "2023-12-01",
    chapters: [{ id: 1, title: "O Chamado", content: "Em um reino medieval chamado Eldoria, o rei convocou Sir Galen para uma missão impossível. Galen, um cavaleiro valente de 30 anos, servia o rei há uma década. Mas agora, o reino enfrentava sua maior ameaça: um dragão lendário chamado Pyrothrax. O dragão, com escamas negras e olhos flamejantes, devastava vilas, queimando campos e aterrorizando o povo. O rei, velho e doente, implorou a Galen: 'Você é nosso último esperança. Mate o dragão e salve o reino.' Galen aceitou, sabendo que poderia morrer. Ele partiu em sua armadura brilhante, montado em seu cavalo fiel, Storm. A jornada foi longa, através de florestas densas e montanhas íngremes. No caminho, encontrou aliados: uma feiticeira chamada Mira, que ofereceu poções mágicas, e um ladrão chamado Finn, com habilidades de furtividade. Juntos, formaram um grupo improvável. Chegando à montanha do dragão, encontraram o covil. Pyrothrax era colossal, com asas que bloqueavam o sol. A batalha foi feroz. Galen usou sua espada encantada, Mira lançou feitiços, Finn distraiu o dragão. Mas Pyrothrax era poderoso, cuspindo fogo e golpeando com cauda. Galen foi ferido, mas não desistiu. Com um golpe final, cravou a espada no coração do dragão. Pyrothrax caiu, morto. O reino celebrou Galen como herói. Mas ele aprendeu que a verdadeira coragem vem da amizade e lealdade. Sua jornada o transformou, tornando-o um lenda viva.", comments: [] }],
    genres: ["Fantasia", "Aventura"],
    tags: ["dragão", "cavaleiro", "reino medieval", "magia"],
    ratings: { average: 4.6, count: 22 },
    comments: [],
    popularity: 180
  },
  {
    id: 7,
    title: "Viagem ao Centro da Terra",
    description: "Exploradores modernos descobrem uma passagem subterrânea que leva a mundos desconhecidos. Aventura, ciência e perigos aguardam.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
    author: "João Silva",
    date: "2024-01-20",
    chapters: [{ id: 1, title: "A Expedição", content: "Em uma ilha remota do Pacífico, uma equipe de cientistas liderada pelo Dr. Elias Thorne descobriu uma cratera vulcânica inativa. Sondas revelaram uma caverna subterrânea profunda, com ecos de vida antiga. Elias, um geólogo de 45 anos, convenceu sua equipe a explorar. Eles desceram pela cratera vulcânica, equipados com trajes pressurizados e lanternas LED. O ar era quente e úmido, cheirando a enxofre. As paredes eram cobertas de cristais brilhantes, refletindo luzes estranhas. De repente, o chão tremeu. Uma avalanche de pedras bloqueou a saída. Presos, eles avançaram. Encontraram rios subterrâneos com água cristalina, habitados por peixes bioluminescentes. Mais fundo, cavernas gigantescas com estalactites enormes. Mas perigos aguardavam: gases tóxicos, terremotos e criaturas desconhecidas. Uma aranha gigante atacou, mas eles a repeliram com lasers. Descobriram ruínas antigas, de uma civilização subterrânea. Artefatos indicavam que seres inteligentes viveram lá milhões de anos atrás. Elias encontrou um mapa estelar, mostrando o centro da Terra como um núcleo de energia. Eles enfrentaram dilemas: continuar e arriscar tudo, ou voltar? No clímax, ativaram um portal antigo, transportando-os para o centro. Era um mundo de fogo e luz, com seres de energia pura. Aprenderam que a Terra era viva, e humanos eram visitantes. Retornaram com conhecimento, mas mudados. A expedição revelou segredos da Terra, mas também perigos de explorar o desconhecido.", comments: [] }],
    genres: ["Aventura", "Ficção Científica"],
    tags: ["exploração", "subterrâneo", "ciência", "perigos"],
    ratings: { average: 4.1, count: 15 },
    comments: [],
    popularity: 100
  },
  {
    id: 8,
    title: "O Tesouro Esquecido",
    description: "Piratas modernos buscam um tesouro perdido em ilhas remotas. Traições, tempestades e enigmas testam sua lealdade.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
    author: "Maria Santos",
    date: "2024-02-15",
    chapters: [{ id: 1, title: "O Mapa", content: "Em um porto movimentado de Miami, o capitão Jack Harlan, um pirata moderno de 40 anos, encontrou um mapa antigo em um baú velho. O mapa mostrava ilhas remotas no Caribe, marcando um tesouro perdido de um pirata lendário. Jack, com sua tripulação leal, decidiu buscar o tesouro. Eles zarparam em seu barco, o Sea Serpent, enfrentando tempestades furiosas. No caminho, traições surgiram. Um membro da tripulação, Rico, planejava roubar o tesouro. Tempestades testaram sua lealdade, e enigmas no mapa os desafiaram. Chegando à ilha, encontraram ruínas antigas e armadilhas. Jack resolveu enigmas, revelando o tesouro: ouro, joias e artefatos históricos. Mas Rico traiu, tentando matar Jack. Uma batalha ocorreu, e Jack venceu, mas aprendeu sobre amizade verdadeira. Eles dividiram o tesouro, mas Jack percebeu que a verdadeira riqueza era a lealdade. Sua aventura o transformou, mostrando que tesouros materiais são efêmeros, mas laços duram para sempre.", comments: [] }],
    genres: ["Aventura", "Mistério"],
    tags: ["piratas", "tesouro", "traição", "tempestade"],
    ratings: { average: 3.9, count: 10 },
    comments: [],
    popularity: 80
  }
];
