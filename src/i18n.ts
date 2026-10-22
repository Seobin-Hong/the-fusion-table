import { cultures } from './recommendation';
import type { CultureId, Kind } from './recommendation';

export const languages = [
  { id: 'ko', name: '한국어' },
  { id: 'en', name: 'English' },
  { id: 'ja', name: '日本語' },
  { id: 'zh', name: '中文' },
  { id: 'fr', name: 'Français' },
  { id: 'es', name: 'Español' },
  { id: 'it', name: 'Italiano' },
  { id: 'sv', name: 'Svenska' },
  { id: 'ta', name: 'தமிழ்' },
  { id: 'am', name: 'አማርኛ' },
  { id: 'fil', name: 'Filipino' },
  { id: 'ar', name: 'العربية' },
  { id: 'ka', name: 'ქართული' },
  { id: 'eu', name: 'Euskara' },
] as const;

export type LanguageId = (typeof languages)[number]['id'];

const cultureIds = cultures.map(({ id }) => id) as CultureId[];
const describe = (...values: string[]): Record<CultureId, string> =>
  Object.fromEntries(cultureIds.map((id, index) => [id, values[index]])) as Record<CultureId, string>;
const makeCultureTips = (...values: string[]): Record<CultureId, string> =>
  Object.fromEntries(cultureIds.map((id, index) => [id, values[index]])) as Record<CultureId, string>;
const kindIds: Kind[] = ['fork', 'knife', 'plate', 'bowl', 'cup', 'spoon', 'chopsticks', 'napkin', 'tray', 'hotpot', 'leaf', 'side-dish', 'shared-round', 'platter', 'buffet', 'tiered-stand'];
const nameObjects = (...values: string[]): Record<Kind, string> =>
  Object.fromEntries(kindIds.map((kind, index) => [kind, values[index]])) as Record<Kind, string>;

type Translation = {
  culture: string;
  language: string;
  culturePrompt: string;
  searchPlaceholder: string;
  selectedCultures: string;
  noCultureResults: string;
  round: string;
  square: string;
  rectangle: string;
  guestCount: string;
  addGuest: string;
  removeGuest: string;
  objectNames: Record<Kind, string>;
  tableTips: string;
  tipEmpty: string;
  tipDisclaimer: string;
  cultureTips: Record<CultureId, string>;
  descriptions: Record<CultureId, string>;
};

export const translations: Record<LanguageId, Translation> = {
  ko: {
    culture: '문화권', language: '언어', culturePrompt: '오늘은 어떤 국가의 손님이 오시나요?', searchPlaceholder: '국가명 검색', selectedCultures: '선택한 문화권', noCultureResults: '검색 결과가 없습니다.', tableTips: '배치 팁', tipEmpty: '문화권을 선택하면 식기 배치 아이디어가 여기에 표시돼요.', tipDisclaimer: '문화와 개인에 따라 다를 수 있는 참고 아이디어예요.', round: '원형', square: '정사각형', rectangle: '직사각형', guestCount: '인원', addGuest: '인원 늘리기', removeGuest: '인원 줄이기',
    objectNames: nameObjects('포크', '나이프', '접시', '그릇', '컵', '숟가락', '젓가락', '냅킨', '쟁반', '훠궈 냄비', '잎 접시', '반찬 접시', '공유 접시', '모둠 접시', '뷔페 트레이', '다층 스탠드'),
    cultureTips: makeCultureTips(
      '접시를 중심에 두고 포크와 나이프를 양옆에 놓으면 좌우 구성이 또렷해요.', '작은 그릇을 트레이에 모으고 젓가락을 놓을 여백을 남겨보세요.', '개인 밥·국 그릇은 각 자리 가까이, 공유 반찬은 중앙에 두어 보세요.', '공유 냄비 주변에 개인 그릇을 두고 서로 손이 닿을 공간을 남겨보세요.',
      '잎이나 큰 접시에 음식을 구획해 놓을 자리를 먼저 잡아보세요.', '공유 접시를 중앙에 두고 여러 자리에서 닿기 쉽도록 배치해보세요.', '공유 음식은 테이블을 따라 길게 놓아 여러 자리에서 닿게 해보세요.', '큰 공유 접시를 중심에 두고 개인 접시를 둘 여백을 남겨보세요.',
      '공유 요리를 대칭으로 배열하고 개인 접시와의 간격도 살펴보세요.', '개인 접시를 놓고 순서대로 나올 코스를 위한 여백을 남겨보세요.', '작은 공유 접시를 곳곳에 나누어 놓고 모두 손이 닿는지 확인해보세요.', '공유 플래터는 중앙, 개인 접시는 각 자리 앞에 두어 보세요.',
      '뷔페 영역과 앉는 자리를 분리해 음식을 놓을 공간을 확보해보세요.', '공유 요리가 많다면 중앙을 넉넉히 비우고 작은 접시는 주변에 놓아보세요.', '작은 한입 요리를 길게 배열하고 고를 수 있는 여백을 남겨보세요.', '티어드 스탠드는 중앙에, 컵과 개인 접시는 각 자리 가까이에 놓아보세요.',
    ),
    descriptions: describe(
      '좌우 배열 · 개인 접시 중심', '모듈 배열 · 1인 상차림', '개인 밥·국 + 공유 반찬', '중앙 집중 · 공동 조리',
      '잎을 구획해 음식 배치', '원형 공유 · 함께 나눔', '선형 공유 · 길게 잇는 식사', '단일 중심 · 큰 접시 공유',
      '여러 요리를 대칭적으로 공유', '개인 식기 중심 · 순차 제공', '작은 공유 접시를 곳곳에 배치', '중앙 요리를 개인 접시에 덜어 먹기',
      '뷔페와 식사 공간을 나누어 구성', '긴 식탁에 풍성한 공유 음식', '작은 음식을 진열대에서 선택', '티어 스탠드에 음식을 층별로 배치',
    ),
  },
  en: {
    culture: 'CULTURE', language: 'Language', culturePrompt: 'Which countries are your guests from today?', searchPlaceholder: 'Search by country name', selectedCultures: 'Selected cultures', noCultureResults: 'No results found.', tableTips: 'SETTING TIPS', tipEmpty: 'Choose a culture to see a tableware arrangement idea here.', tipDisclaimer: 'These are prompts for exploration, not universal rules.', round: 'Round', square: 'Square', rectangle: 'Rectangle', guestCount: 'guests', addGuest: 'Add guest', removeGuest: 'Remove guest',
    objectNames: nameObjects('Fork', 'Knife', 'Plate', 'Bowl', 'Cup', 'Spoon', 'Chopsticks', 'Napkin', 'Tray', 'Hotpot', 'Leaf plate', 'Side dish', 'Shared dish', 'Platter', 'Buffet tray', 'Tiered stand'),
    cultureTips: makeCultureTips(
      'Centre the plate and place the fork and knife on either side for a clear left–right setting.', 'Group small dishes on a tray and leave a little space for chopsticks.', 'Keep personal rice and soup bowls near each place; leave shared side dishes in the centre.', 'Place personal bowls around the shared pot and leave room for everyone to reach.',
      'Plan sections on the leaf or plate before arranging the food.', 'Keep the shared platter central and within reach of each place.', 'Arrange shared dishes along the table so guests at different seats can reach them.', 'Centre a large shared platter and leave room for personal plates around it.',
      'Arrange shared dishes symmetrically and leave space for each guest’s plate.', 'Set out personal plates with room for courses to arrive in sequence.', 'Spread small shared plates around the table so everyone can reach a choice.', 'Place shared platters in the centre and personal plates at each place.',
      'Separate the buffet area from the seated places to keep serving space clear.', 'Leave generous central space for shared dishes and place smaller plates around them.', 'Line up small bites with enough room for guests to choose and pick them up.', 'Place the tiered stand centrally, with cups and personal plates near each guest.',
    ),
    descriptions: describe(
      'Individual place setting · fork and knife', 'Modular setting · individual portions', 'Individual rice and soup · shared sides', 'Shared cooking · hotpot at the centre',
      'Food arranged in sections on a leaf', 'Round platter · shared together', 'Linear sharing · dishes along the table', 'One centrepiece · a large shared plate',
      'Several dishes served together, symmetrically', 'Individual settings · courses served in sequence', 'Small shared plates spread across the table', 'Shared centre dishes served onto personal plates',
      'Buffet area separated from dining space', 'A generous spread of shared dishes', 'Small bites displayed for guests to choose', 'Food arranged in tiers on a stand',
    ),
  },
  ja: {
    culture: '食文化', language: '言語', culturePrompt: '今日はどの国からゲストが来ますか？', searchPlaceholder: '国名で検索', selectedCultures: '選択した食文化', noCultureResults: '検索結果がありません。', tableTips: '配置のヒント', tipEmpty: '食文化を選ぶと、食器の配置アイデアがここに表示されます。', tipDisclaimer: '文化や個人によって異なるため、参考アイデアとしてご覧ください。', round: '円形', square: '正方形', rectangle: '長方形', guestCount: '人数', addGuest: '人数を増やす', removeGuest: '人数を減らす',
    objectNames: nameObjects('フォーク', 'ナイフ', '皿', 'ボウル', 'カップ', 'スプーン', '箸', 'ナプキン', 'お盆', '火鍋', '葉皿', '小皿', '共有皿', '大皿', 'ビュッフェトレイ', 'ケーキスタンド'),
    cultureTips: makeCultureTips(
      '皿を中央に置き、フォークとナイフを左右に配置すると構成が見やすくなります。', '小さな器を盆にまとめ、箸を置く余白を残してみましょう。', 'ご飯と汁物の器は各席の近くに、共有のおかずは中央に置いてみましょう。', '共有鍋の周りに個人の器を置き、手が届く空間を残しましょう。',
      '葉や大皿の上に、料理を分けて置く場所を先に作りましょう。', '共有皿を中央に置き、どの席からも手が届くようにしましょう。', '共有料理をテーブルに沿って並べ、複数の席から届くようにしましょう。', '大きな共有皿を中央に置き、個人皿のための余白を残しましょう。',
      '共有料理を対称に並べ、各自の皿を置く空間も確保しましょう。', '個人皿を置き、順番に運ばれる料理のための余白を残しましょう。', '小皿をテーブルの各所に置き、みんなが選びやすい配置にしましょう。', '共有皿を中央に、個人皿を各席の前に置いてみましょう。',
      'ビュッフェと着席スペースを分け、料理を置く場所を確保しましょう。', '共有料理が多いときは中央に余白を作り、小皿を周囲に置きましょう。', '小さな料理を一列に並べ、選びやすい余白を残しましょう。', 'スタンドを中央に置き、カップと個人皿は各席の近くに置きましょう。',
    ),
    descriptions: describe(
      '個人用の配膳 · ナイフとフォーク', '小皿を組み合わせた一人膳', 'ご飯と汁物は個人用 · おかずは共有', '中央の鍋を囲んで共同調理',
      '葉の上に区画して盛り付け', '丸い大皿を囲んで共有', '料理を横一列に並べて共有', '中央の大皿をみんなで分ける',
      '複数の料理を対称に並べて提供', '個人用の食器 · コースごとに提供', '小皿料理をテーブルに散りばめる', '中央の料理を個人皿に取り分ける',
      '食事スペースとビュッフェを分ける', '長い食卓にたくさんの共有料理', '小さな料理を並べて選ぶ', 'スタンドに料理を段々に盛り付け',
    ),
  },
  zh: {
    culture: '饮食文化', language: '语言', culturePrompt: '今天有哪些国家的客人？', searchPlaceholder: '按国家名称搜索', selectedCultures: '已选饮食文化', noCultureResults: '没有搜索结果。', tableTips: '摆放提示', tipEmpty: '选择一种饮食文化后，这里会显示餐具摆放灵感。', tipDisclaimer: '这些是供探索的参考，不代表所有人的习惯。', round: '圆桌', square: '正方形', rectangle: '长方形', guestCount: '人数', addGuest: '增加人数', removeGuest: '减少人数',
    objectNames: nameObjects('叉子', '餐刀', '盘子', '碗', '杯子', '勺子', '筷子', '餐巾', '托盘', '火锅', '叶盘', '小菜碟', '共享餐盘', '拼盘', '自助餐托盘', '多层点心架'),
    cultureTips: makeCultureTips(
      '把餐盘放在中间、叉子和刀分置两侧，让左右布局清晰。', '将小碗放在托盘上，并为筷子留出位置。', '个人的米饭和汤碗靠近座位，共享小菜放在桌子中央。', '在共享火锅周围摆放个人碗，并留出方便取用的空间。',
      '先为叶子或大盘上的分区留出位置，再摆放食物。', '把共享餐盘放在中央，让每个座位都容易取到。', '沿着桌子排放共享菜肴，让不同座位的客人都能取用。', '将大号共享盘放在中央，并为个人餐盘留出空间。',
      '对称摆放共享菜肴，同时为每位客人的餐盘留出位置。', '摆好个人餐盘，并为按顺序上桌的菜肴留出空间。', '把小份共享菜分散摆放，让每个人都方便选择。', '共享拼盘放在中央，个人餐盘放在各自座位前。',
      '将自助取餐区与座位分开，为摆放食物留出空间。', '共享菜肴较多时，中央留宽敞一些，小盘放在周围。', '把小食排成一列，并留出方便挑选的位置。', '多层架放在中央，杯子和个人餐盘放在座位附近。',
    ),
    descriptions: describe(
      '个人餐具 · 刀叉摆放', '组合式餐具 · 一人一份', '个人米饭和汤 · 共享小菜', '围绕中央火锅共同烹煮',
      '在叶面上分区摆放食物', '围绕圆盘共同分享', '共享菜肴沿桌面排开', '中央大盘供大家分享',
      '多道菜对称摆放，同时上桌', '个人餐具 · 按顺序上菜', '小份共享菜分散摆放', '从中央菜肴分到个人餐盘',
      '分开自助取餐区和用餐区', '长桌上摆放丰富的共享菜肴', '陈列小食供宾客挑选', '点心分层摆放在架子上',
    ),
  },
  fr: {
    culture: 'CULTURE', language: 'Langue', culturePrompt: 'De quels pays viennent vos invités aujourd’hui ?', searchPlaceholder: 'Rechercher par pays', selectedCultures: 'Cultures sélectionnées', noCultureResults: 'Aucun résultat.', tableTips: 'CONSEILS DE DRESSAGE', tipEmpty: 'Choisissez une culture pour voir une idée de dressage.', tipDisclaimer: 'Des pistes d’exploration, pas des règles universelles.', round: 'Ronde', square: 'Carrée', rectangle: 'Rectangulaire', guestCount: 'personnes', addGuest: 'Ajouter', removeGuest: 'Retirer',
    objectNames: nameObjects('Fourchette', 'Couteau', 'Assiette', 'Bol', 'Tasse', 'Cuillère', 'Baguettes', 'Serviette', 'Plateau', 'Marmite à hotpot', 'Assiette en feuille', 'Coupelle', 'Plat à partager', 'Grand plat', 'Plateau de buffet', 'Présentoir à étages'),
    cultureTips: makeCultureTips(
      'Centrez l’assiette et placez la fourchette et le couteau de chaque côté pour clarifier la disposition.', 'Regroupez les petits bols sur un plateau et gardez un espace pour les baguettes.', 'Placez les bols individuels de riz et de soupe près de chaque convive, et les accompagnements au centre.', 'Disposez les bols individuels autour du pot partagé en laissant chacun y accéder facilement.',
      'Prévoyez d’abord des zones pour les aliments sur la feuille ou le grand plat.', 'Placez le plat partagé au centre, à portée de chaque convive.', 'Alignez les plats partagés le long de la table pour que plusieurs places puissent les atteindre.', 'Centrez le grand plat à partager et gardez de la place pour les assiettes individuelles.',
      'Disposez les plats partagés de façon symétrique et gardez une place pour chaque assiette.', 'Prévoyez les assiettes individuelles et de l’espace pour servir les plats successivement.', 'Répartissez les petits plats sur la table pour que chacun puisse choisir.', 'Placez les plats à partager au centre et les assiettes individuelles devant chaque convive.',
      'Séparez l’espace buffet des places assises pour garder un espace de service dégagé.', 'Laissez le centre libre pour les plats à partager et placez les petites assiettes autour.', 'Alignez les petites bouchées en laissant de la place pour les choisir.', 'Placez le présentoir au centre et les tasses et assiettes individuelles près des convives.',
    ),
    descriptions: describe(
      'Service individuel · couteau et fourchette', 'Vaisselle modulaire · portion individuelle', 'Riz et soupe individuels · accompagnements partagés', 'Cuisson commune autour du plat central',
      'Aliments disposés par zones sur une feuille', 'Grand plat rond à partager', 'Plats partagés alignés sur la table', 'Un grand plat central à partager',
      'Plusieurs plats servis ensemble et en symétrie', 'Service individuel · plats servis successivement', 'Petites assiettes partagées sur la table', 'Plats centraux servis dans les assiettes individuelles',
      'Buffet séparé de l’espace repas', 'Nombreux plats à partager sur une longue table', 'Petites bouchées présentées au choix', 'Mets disposés en étages sur un présentoir',
    ),
  },
  es: {
    culture: 'CULTURA', language: 'Idioma', culturePrompt: '¿De qué países vienen tus invitados hoy?', searchPlaceholder: 'Buscar por país', selectedCultures: 'Culturas seleccionadas', noCultureResults: 'No se encontraron resultados.', tableTips: 'IDEAS PARA LA MESA', tipEmpty: 'Elige una cultura para ver una idea de disposición.', tipDisclaimer: 'Son ideas para explorar, no reglas universales.', round: 'Redonda', square: 'Cuadrada', rectangle: 'Rectangular', guestCount: 'personas', addGuest: 'Añadir', removeGuest: 'Quitar',
    objectNames: nameObjects('Tenedor', 'Cuchillo', 'Plato', 'Cuenco', 'Taza', 'Cuchara', 'Palillos', 'Servilleta', 'Bandeja', 'Olla para hotpot', 'Plato de hoja', 'Plato pequeño', 'Plato compartido', 'Fuente', 'Bandeja de bufé', 'Soporte de varios niveles'),
    cultureTips: makeCultureTips(
      'Centra el plato y coloca el tenedor y el cuchillo a los lados para marcar la disposición.', 'Agrupa los cuencos pequeños en una bandeja y deja espacio para los palillos.', 'Pon el arroz y la sopa individuales cerca de cada persona y los acompañamientos en el centro.', 'Coloca los cuencos individuales alrededor de la olla compartida y deja espacio para alcanzarla.',
      'Reserva primero secciones para la comida sobre la hoja o el plato grande.', 'Pon el plato compartido en el centro y al alcance de todos.', 'Alinea los platos compartidos a lo largo de la mesa para que lleguen a varias personas.', 'Centra la fuente grande y deja sitio para los platos individuales.',
      'Distribuye los platos compartidos simétricamente y reserva sitio para cada plato individual.', 'Coloca los platos individuales y deja espacio para servir los platos por turnos.', 'Reparte los platos pequeños por la mesa para que todos puedan elegir.', 'Pon las fuentes compartidas en el centro y los platos individuales frente a cada persona.',
      'Separa la zona de bufé de los asientos y deja espacio para servir.', 'Deja espacio en el centro para los platos compartidos y coloca los pequeños alrededor.', 'Alinea los bocados pequeños y deja espacio para elegirlos.', 'Pon el soporte en el centro y las tazas y platos individuales junto a cada persona.',
    ),
    descriptions: describe(
      'Servicio individual · cuchillo y tenedor', 'Vajilla modular · porción individual', 'Arroz y sopa individuales · guarniciones compartidas', 'Cocina compartida alrededor de la olla central',
      'Comida distribuida por secciones sobre una hoja', 'Plato redondo para compartir', 'Platos compartidos alineados en la mesa', 'Un plato central grande para compartir',
      'Varios platos servidos a la vez y simétricamente', 'Servicio individual · platos por turnos', 'Pequeños platos compartidos por la mesa', 'Platos centrales repartidos en platos individuales',
      'Zona de bufé separada del comedor', 'Muchos platos compartidos en una mesa larga', 'Pequeños bocados expuestos para elegir', 'Comida dispuesta en niveles sobre un soporte',
    ),
  },
  it: {
    culture: 'CULTURA', language: 'Lingua', culturePrompt: 'Da quali paesi arrivano oggi i tuoi ospiti?', searchPlaceholder: 'Cerca per paese', selectedCultures: 'Culture selezionate', noCultureResults: 'Nessun risultato.', tableTips: 'IDEE PER LA TAVOLA', tipEmpty: 'Scegli una cultura per vedere un’idea di disposizione.', tipDisclaimer: 'Spunti da esplorare, non regole universali.', round: 'Rotondo', square: 'Quadrato', rectangle: 'Rettangolare', guestCount: 'ospiti', addGuest: 'Aggiungi', removeGuest: 'Rimuovi',
    objectNames: nameObjects('Forchetta', 'Coltello', 'Piatto', 'Ciotola', 'Tazza', 'Cucchiaio', 'Bacchette', 'Tovagliolo', 'Vassoio', 'Pentola per hotpot', 'Piatto di foglia', 'Piattino', 'Piatto condiviso', 'Vassoio da portata', 'Vassoio buffet', 'Alzata a più piani'),
    cultureTips: makeCultureTips(
      'Centra il piatto e metti forchetta e coltello ai lati per rendere chiara la disposizione.', 'Raggruppa le ciotole piccole sul vassoio e lascia spazio per le bacchette.', 'Tieni le ciotole personali di riso e zuppa vicino a ogni posto e i contorni condivisi al centro.', 'Disponi le ciotole personali intorno alla pentola condivisa lasciando spazio per raggiungerla.',
      'Riserva prima le sezioni per il cibo sulla foglia o sul piatto grande.', 'Metti il piatto da condividere al centro e a portata di tutti.', 'Allinea i piatti condivisi lungo il tavolo perché siano raggiungibili da più posti.', 'Centra il grande vassoio condiviso e lascia spazio per i piatti personali.',
      'Disponi i piatti condivisi in modo simmetrico e lascia posto per ogni piatto personale.', 'Prepara i piatti personali e lascia spazio per servire le portate in sequenza.', 'Distribuisci i piccoli piatti condivisi perché tutti possano scegliere.', 'Metti i vassoi condivisi al centro e i piatti personali davanti a ogni ospite.',
      'Separa il buffet dai posti a sedere per mantenere libero lo spazio di servizio.', 'Lascia spazio al centro per i piatti condivisi e metti quelli piccoli intorno.', 'Disponi i bocconi in fila lasciando spazio per sceglierli.', 'Metti l’alzata al centro e tazze e piatti personali vicino a ogni ospite.',
    ),
    descriptions: describe(
      'Servizio individuale · coltello e forchetta', 'Composizione modulare · porzione singola', 'Riso e zuppa individuali · contorni condivisi', 'Cottura condivisa attorno alla pentola centrale',
      'Cibo disposto in sezioni su una foglia', 'Piatto rotondo da condividere', 'Piatti condivisi disposti in fila', 'Un grande piatto centrale da condividere',
      'Più portate servite insieme in modo simmetrico', 'Servizio individuale · portate in sequenza', 'Piccoli piatti condivisi sparsi sul tavolo', 'Piatti centrali serviti nei piatti individuali',
      'Buffet separato dalla zona pranzo', 'Molti piatti condivisi su una tavola lunga', 'Piccoli assaggi esposti da scegliere', 'Cibi disposti a livelli su un’alzata',
    ),
  },
  sv: {
    culture: 'MATKULTUR', language: 'Språk', culturePrompt: 'Vilka länder kommer dina gäster från idag?', searchPlaceholder: 'Sök efter land', selectedCultures: 'Valda matkulturer', noCultureResults: 'Inga sökresultat.', tableTips: 'DUKNINGSTIPS', tipEmpty: 'Välj en matkultur för att se ett dukningsförslag här.', tipDisclaimer: 'Förslag att utforska, inte allmängiltiga regler.', round: 'Runt', square: 'Fyrkantigt', rectangle: 'Rektangulärt', guestCount: 'gäster', addGuest: 'Lägg till', removeGuest: 'Ta bort',
    objectNames: nameObjects('Gaffel', 'Kniv', 'Tallrik', 'Skål', 'Kopp', 'Sked', 'Ätpinnar', 'Servett', 'Bricka', 'Hotpot', 'Lövfat', 'Smårättstallrik', 'Delningsfat', 'Serveringsfat', 'Buffébricka', 'Våningsfat'),
    cultureTips: makeCultureTips(
      'Centrera tallriken och placera gaffel och kniv på varsin sida för en tydlig dukning.', 'Samla små skålar på en bricka och lämna plats för ätpinnarna.', 'Ställ personliga ris- och soppskålar nära varje plats och delade tillbehör i mitten.', 'Placera personliga skålar runt den gemensamma grytan och lämna plats så alla når.',
      'Planera först sektionerna för maten på bladet eller det stora fatet.', 'Ställ det gemensamma fatet i mitten så att alla når det.', 'Placera de gemensamma rätterna längs bordet så att flera platser når dem.', 'Centrera det stora delningsfatet och lämna plats för personliga tallrikar.',
      'Ställ de gemensamma rätterna symmetriskt och lämna plats för varje personlig tallrik.', 'Duka personliga tallrikar och lämna plats för rätter som serveras i turordning.', 'Sprid ut små delade rätter så att alla kan välja.', 'Ställ delningsfaten i mitten och de personliga tallrikarna framför varje gäst.',
      'Skilj buffén från sittplatserna och lämna fri yta för servering.', 'Lämna gott om plats i mitten för delade rätter och ställ mindre fat runtom.', 'Ställ små munsbitar på rad och lämna plats för gästerna att välja.', 'Ställ våningsfatet i mitten och koppar och personliga tallrikar nära varje gäst.',
    ),
    descriptions: describe(
      'Individuell kuvertering · kniv och gaffel', 'Modulär dukning · en portion per person', 'Eget ris och soppa · delade tillbehör', 'Gemensam tillagning runt grytan i mitten',
      'Maten delas upp på ett blad', 'Rundt fat att dela', 'Gemensamma rätter längs bordet', 'Ett stort fat i mitten att dela',
      'Flera rätter serveras samtidigt och symmetriskt', 'Individuell dukning · rätter i följd', 'Små delade rätter utspridda på bordet', 'Rätter från mitten läggs på individuella tallrikar',
      'Buffé och matplats hålls åtskilda', 'Många gemensamma rätter på ett långbord', 'Små munsbitar framdukade för val', 'Mat ordnad i flera våningar på ett ställ',
    ),
  },
  ta: {
    culture: 'உணவுப் பண்பாடு', language: 'மொழி', culturePrompt: 'இன்று உங்கள் விருந்தினர்கள் எந்த நாடுகளிலிருந்து வருகிறார்கள்?', searchPlaceholder: 'நாட்டின் பெயரைத் தேடுங்கள்', selectedCultures: 'தேர்ந்தெடுத்த உணவுப் பண்பாடுகள்', noCultureResults: 'முடிவுகள் இல்லை.', tableTips: 'அமைப்பு குறிப்புகள்', tipEmpty: 'உணவுப் பண்பாட்டைத் தேர்ந்தெடுத்தால் அமைப்பு யோசனை இங்கே தெரியும்.', tipDisclaimer: 'இவை ஆராய்வதற்கான யோசனைகள்; பொதுவான விதிகள் அல்ல.', round: 'வட்டம்', square: 'சதுரம்', rectangle: 'நீள்சதுரம்', guestCount: 'விருந்தினர்கள்', addGuest: 'சேர்க்க', removeGuest: 'குறைக்க',
    objectNames: nameObjects('முள்கரண்டி', 'கத்தி', 'தட்டு', 'கிண்ணம்', 'கோப்பை', 'கரண்டி', 'சாப்ஸ்டிக்ஸ்', 'உணவு துடைப்பான்', 'தட்டு', 'ஹாட்பாட் பாத்திரம்', 'இலைத் தட்டு', 'துணை உணவுத் தட்டு', 'பகிர்வுத் தட்டு', 'பரிமாறும் தட்டு', 'பஃபே தட்டு', 'அடுக்குத் தட்டு'),
    cultureTips: makeCultureTips(
      'தட்டை நடுவில் வைத்து, முள்கரண்டி மற்றும் கத்தியை இருபுறமும் வைக்கவும்.', 'சிறிய கிண்ணங்களைத் தட்டில் ஒன்றாக வைத்து, சாப்ஸ்டிக்ஸுக்கு இடம் விடவும்.', 'தனிப்பட்ட சாதம் மற்றும் சூப் கிண்ணங்களை இருக்கைக்கு அருகில் வைத்து, பகிரும் உணவுகளை நடுவில் வைக்கவும்.', 'பகிரும் பாத்திரத்தைச் சுற்றி தனிக் கிண்ணங்களை வைத்து, அனைவரும் எட்டும் இடைவெளியை விடவும்.',
      'இலை அல்லது பெரிய தட்டில் உணவுக்கான பகுதிகளை முதலில் திட்டமிடவும்.', 'பகிரும் தட்டை நடுவில் வைத்து, ஒவ்வொரு இருக்கையிலிருந்தும் எட்டும் வகையில் அமைக்கவும்.', 'பகிரும் உணவுகளை மேசை நெடுக வைத்து பல இருக்கைகளிலிருந்தும் எட்டச் செய்யவும்.', 'பெரிய பகிர்வுத் தட்டை நடுவில் வைத்து, தனித் தட்டுகளுக்கு இடம் விடவும்.',
      'பகிரும் உணவுகளை சமச்சீராக வைத்து, ஒவ்வொருவரின் தட்டுக்கும் இடம் ஒதுக்கவும்.', 'தனித் தட்டுகளை வைத்து, வரிசையாக வரும் உணவுகளுக்கு இடம் விடவும்.', 'சிறிய பகிர்வு தட்டுகளைப் பரப்பி வைத்து அனைவரும் தேர்ந்தெடுக்க வசதி செய்யவும்.', 'பகிரும் தட்டுகளை நடுவிலும் தனித் தட்டுகளை ஒவ்வொரு இருக்கையின் முன்பும் வைக்கவும்.',
      'பஃபே பகுதியையும் அமரும் இடங்களையும் பிரித்து பரிமாறும் இடத்தைத் தெளிவாக வைக்கவும்.', 'பகிரும் உணவுகளுக்காக நடுவில் இடம் விடவும்; சிறிய தட்டுகளைச் சுற்றி வைக்கவும்.', 'சிற்றுண்டிகளை வரிசையாக வைத்து தேர்ந்தெடுக்க இடம் விடவும்.', 'அடுக்குத் தட்டை நடுவில் வைத்து, கோப்பைகளையும் தனித் தட்டுகளையும் இருக்கைக்கு அருகில் வைக்கவும்.',
    ),
    descriptions: describe(
      'தனிப்பட்ட தட்டு · கத்தியும் முள்கரண்டியும்', 'தொகுதி அமைப்பு · ஒருவருக்கான பரிமாறல்', 'தனிப்பட்ட சாதமும் சூப்பும் · பகிரும் பக்க உணவுகள்', 'நடுவிலுள்ள பாத்திரத்தைச் சுற்றி ஒன்றாகச் சமைத்தல்',
      'இலையில் பகுதிகளாக உணவை அமைத்தல்', 'வட்டத் தட்டில் பகிர்ந்து உண்ணுதல்', 'மேசை நெடுக உணவுகளைப் பகிர்ந்து வைத்தல்', 'நடுவிலுள்ள பெரிய தட்டைப் பகிர்தல்',
      'பல உணவுகளைச் சமச்சீராக ஒன்றாகப் பரிமாறுதல்', 'தனிப்பட்ட பாத்திரங்கள் · வரிசையாக உணவு பரிமாறுதல்', 'சிறிய பகிர்வு தட்டுகளைப் பரப்பி வைத்தல்', 'நடுவிலுள்ள உணவை தனித் தட்டுகளில் எடுத்தல்',
      'உணவுப் பகுதியையும் அமரும் பகுதியையும் பிரித்தல்', 'நீண்ட மேசையில் பல பகிர்வு உணவுகள்', 'தேர்ந்தெடுக்க சிற்றுண்டிகளை வரிசைப்படுத்தல்', 'அடுக்குத் தட்டில் உணவை அடுக்கி வைத்தல்',
    ),
  },
  am: {
    culture: 'የምግብ ባህል', language: 'ቋንቋ', culturePrompt: 'ዛሬ እንግዶችዎ ከየትኞቹ አገሮች ይመጣሉ?', searchPlaceholder: 'በአገር ስም ይፈልጉ', selectedCultures: 'የተመረጡ ባህሎች', noCultureResults: 'ምንም ውጤት የለም።', tableTips: 'የማዕድ አቀማመጥ ምክሮች', tipEmpty: 'ባህል ሲመርጡ የማዕድ አቀማመጥ ሀሳብ እዚህ ይታያል።', tipDisclaimer: 'እነዚህ ለሙከራ የሚረዱ ሀሳቦች ናቸው፤ ሁሉን የሚወክሉ ህጎች አይደሉም።', round: 'ክብ', square: 'ካሬ', rectangle: 'ረጅም አራት ማዕዘን', guestCount: 'እንግዶች', addGuest: 'ጨምር', removeGuest: 'ቀንስ',
    objectNames: nameObjects('ሹካ', 'ቢላዋ', 'ሳህን', 'ሳህን', 'ኩባያ', 'ማንኪያ', 'ቾፕስቲክስ', 'ናፕኪን', 'ትሪ', 'የሆትፖት ድስት', 'የቅጠል ሳህን', 'የጎን ምግብ ሳህን', 'የጋራ ሳህን', 'ትልቅ ማቅረቢያ ሳህን', 'የቡፌ ትሪ', 'ባለደረጃ ማቅረቢያ'),
    cultureTips: makeCultureTips(
      'ሳህኑን መሃል አድርገው ሹካና ቢላዋን በሁለቱም ጎኖች ያስቀምጡ።', 'ትንንሽ ሳህኖችን በትሪ ላይ ያሰባስቡና ለቾፕስቲክስ ቦታ ይተዉ።', 'የግል ሩዝና ሾርባ ሳህኖችን ከመቀመጫ አጠገብ፣ የጋራ ምግቦችን መሃል ያድርጉ።', 'የጋራውን ድስት በግል ሳህኖች ዙሪያ አድርገው ለመድረስ ቦታ ይተዉ።',
      'በቅጠሉ ወይም በትልቁ ሳህን ላይ የምግብ ክፍሎችን አስቀድመው ያቅዱ።', 'የጋራውን ሳህን መሃል አድርገው ከሁሉም መቀመጫ እንዲደረስ ያድርጉ።', 'የጋራ ምግቦችን በጠረጴዛው ርዝመት አስቀምጠው ከብዙ መቀመጫዎች እንዲደረሱ ያድርጉ።', 'ትልቁን የጋራ ሳህን መሃል አድርገው ለግል ሳህኖች ቦታ ይተዉ።',
      'የጋራ ምግቦችን በሚዛናዊ ሁኔታ አስቀምጠው ለእያንዳንዱ ሰው ሳህን ቦታ ይተዉ።', 'የግል ሳህኖችን አዘጋጅተው በተራ ለሚቀርቡ ምግቦች ቦታ ይተዉ።', 'ትንንሽ የጋራ ሳህኖችን በማዕድ ላይ አሰራጭተው ሁሉም እንዲመርጥ ያድርጉ።', 'የጋራ ማቅረቢያዎችን መሃል፣ የግል ሳህኖችን ከእያንዳንዱ መቀመጫ ፊት ያድርጉ።',
      'የቡፌ ቦታን ከመቀመጫዎች ለይተው ለማቅረብ ቦታ ይተዉ።', 'በመሃል ለጋራ ምግቦች ቦታ ይተዉና ትንንሽ ሳህኖችን ዙሪያ ያስቀምጡ።', 'ትንንሽ ምግቦችን በመስመር አድርገው ለመምረጥ ቦታ ይተዉ።', 'ማቅረቢያውን መሃል አድርገው ኩባያና የግል ሳህኖችን ከመቀመጫ አጠገብ ያድርጉ።',
    ),
    descriptions: describe(
      'የግል ማቅረቢያ · ቢላዋና ሹካ', 'በሞጁል የተደረደረ · ለአንድ ሰው', 'የግል ሩዝና ሾርባ · የሚጋሩ ጎን ምግቦች', 'በመሃል ያለውን ድስት ከበው አብሮ ማብሰል',
      'ምግብን በቅጠል ላይ በክፍል ማድረግ', 'ክብ ሳህን በጋራ መካፈል', 'የጋራ ምግቦችን በረድፍ ማስቀመጥ', 'አንድ ትልቅ ሳህን በመሃል መካፈል',
      'ብዙ ምግቦችን በተመጣጣኝ ሁኔታ አብሮ ማቅረብ', 'የግል ዕቃዎች · ምግቦችን በተራ ማቅረብ', 'ትንንሽ የጋራ ሳህኖችን በማዕድ ማሰራጨት', 'የመሃል ምግብን ወደ የግል ሳህኖች ማካፈል',
      'የቡፌ እና የመመገቢያ ቦታዎችን መለየት', 'በረጅም ጠረጴዛ ላይ ብዙ የጋራ ምግቦች', 'ለመምረጥ ትንንሽ ምግቦችን ማሳየት', 'ምግብን በደረጃ መደርደሪያ ማቅረብ',
    ),
  },
  fil: {
    culture: 'KULTURA NG PAGKAIN', language: 'Wika', culturePrompt: 'Saang mga bansa nagmula ang mga bisita mo ngayon?', searchPlaceholder: 'Maghanap ayon sa bansa', selectedCultures: 'Mga napiling kultura', noCultureResults: 'Walang nahanap.', tableTips: 'MGA TIP SA AYOS', tipEmpty: 'Pumili ng kultura para makakita ng ideya sa ayos ng mesa.', tipDisclaimer: 'Mga mungkahi ito para tuklasin, hindi pangkalahatang tuntunin.', round: 'Bilog', square: 'Parisukat', rectangle: 'Parihaba', guestCount: 'bisita', addGuest: 'Dagdagan', removeGuest: 'Bawasan',
    objectNames: nameObjects('Tinidor', 'Kutsilyo', 'Plato', 'Mangkok', 'Tasa', 'Kutsara', 'Chopstick', 'Panyo', 'Bandeha', 'Kaldero ng hotpot', 'Dahong pinggan', 'Pinggang pang-ulam', 'Pinggang pinagsasaluhan', 'Bandeha', 'Bandeha ng buffet', 'Patung-patong na lagayan'),
    cultureTips: makeCultureTips(
      'Igitna ang plato at ilagay ang tinidor at kutsilyo sa magkabilang panig.', 'Pagsama-samahin ang maliliit na mangkok sa bandeha at maglaan ng puwang para sa chopstick.', 'Ilagay malapit sa bawat upuan ang sariling kanin at sabaw; ilagay sa gitna ang pinagsasaluhang ulam.', 'Ilagay ang mga sariling mangkok sa paligid ng hotpot at maglaan ng puwang para maabot ito.',
      'Maglaan muna ng mga bahagi para sa pagkain sa dahon o malaking plato.', 'Igitna ang pinggang pinagsasaluhan at tiyaking naaabot ito mula sa bawat upuan.', 'Ihanay ang mga pinagsasaluhang putahe sa haba ng mesa para maabot ng maraming bisita.', 'Igitna ang malaking bandeha at maglaan ng puwang para sa mga sariling plato.',
      'Ayusin nang simetriko ang mga pinagsasaluhang putahe at maglaan ng puwang para sa bawat plato.', 'Ihanda ang mga sariling plato at maglaan ng puwang para sa sunod-sunod na putahe.', 'Ilagay sa iba’t ibang bahagi ng mesa ang maliliit na pinggan para makapili ang lahat.', 'Ilagay sa gitna ang bandehang pinagsasaluhan at sa harap ng bawat bisita ang sariling plato.',
      'Ihiwalay ang buffet sa mga upuan at panatilihing maluwag ang puwang ng paghahain.', 'Mag-iwan ng maluwag na gitna para sa mga pinagsasaluhang putahe at ilagay sa paligid ang maliliit na plato.', 'Ihanay ang maliliit na kagat-kagat at maglaan ng puwang para makapili.', 'Igitna ang patungan at ilagay malapit sa bawat bisita ang tasa at sariling plato.',
    ),
    descriptions: describe(
      'Sariling ayos · kutsilyo at tinidor', 'Modular na ayos · sariling bahagi', 'Sariling kanin at sabaw · pinagsasaluhang ulam', 'Sabay-sabay na pagluluto sa gitnang palayok',
      'Pagkain na hinati-hati sa dahon', 'Pinagsasaluhang bilog na pinggan', 'Mga pinagsasaluhang putahe sa kahabaan ng mesa', 'Isang malaking pinggan sa gitna para pagsaluhan',
      'Sabay-sabay at simetrikong paghahain ng mga putahe', 'Sariling kubyertos · sunod-sunod na paghahain', 'Maliliit na pinggang pinagsasaluhan sa mesa', 'Mula sa gitnang putahe tungo sa sariling pinggan',
      'Magkahiwalay ang buffet at kainan', 'Maraming pinagsasaluhang putahe sa mahabang mesa', 'Mga kagat-kagat na pagkain na mapagpipilian', 'Pagkaing nakaayos sa patung-patong na tuntungan',
    ),
  },
  ar: {
    culture: 'ثقافة الطعام', language: 'اللغة', culturePrompt: 'من أي بلدان يأتي ضيوفك اليوم؟', searchPlaceholder: 'ابحث حسب اسم البلد', selectedCultures: 'الثقافات المختارة', noCultureResults: 'لا توجد نتائج.', tableTips: 'أفكار لترتيب المائدة', tipEmpty: 'اختر ثقافة لعرض فكرة لترتيب الأواني هنا.', tipDisclaimer: 'هذه أفكار للاستكشاف وليست قواعد عامة.', round: 'دائري', square: 'مربع', rectangle: 'مستطيل', guestCount: 'الضيوف', addGuest: 'زيادة العدد', removeGuest: 'تقليل العدد',
    objectNames: nameObjects('شوكة', 'سكين', 'طبق', 'وعاء', 'كوب', 'ملعقة', 'عيدان الطعام', 'منديل', 'صينية', 'قدر هوت بوت', 'طبق ورقي', 'طبق جانبي', 'طبق للمشاركة', 'طبق تقديم كبير', 'صينية بوفيه', 'حامل متعدد الطبقات'),
    cultureTips: makeCultureTips(
      'ضع الطبق في الوسط والشوكة والسكين على جانبيه لتوضيح الترتيب.', 'اجمع الأوعية الصغيرة على صينية واترك مساحة لعيدان الطعام.', 'ضع أوعية الأرز والحساء الفردية قرب كل مقعد، والأطباق المشتركة في الوسط.', 'رتب الأوعية الفردية حول القدر المشترك واترك مساحة ليصل إليه الجميع.',
      'حدد أولاً أقسام الطعام على الورقة أو الطبق الكبير.', 'ضع طبق المشاركة في الوسط بحيث يسهل الوصول إليه من كل مقعد.', 'رتب الأطباق المشتركة على امتداد الطاولة لتصل إليها المقاعد المختلفة.', 'ضع طبق المشاركة الكبير في الوسط واترك مساحة للأطباق الفردية.',
      'رتب الأطباق المشتركة بشكل متناظر واترك مكاناً لطبق كل ضيف.', 'جهز الأطباق الفردية واترك مساحة للأطباق التي ستقدم تباعاً.', 'وزع الأطباق الصغيرة على الطاولة ليتمكن الجميع من الاختيار.', 'ضع أطباق المشاركة في الوسط والأطباق الفردية أمام كل ضيف.',
      'افصل منطقة البوفيه عن المقاعد واترك مساحة واضحة للتقديم.', 'اترك مساحة واسعة في الوسط للأطباق المشتركة وضع الأطباق الصغيرة حولها.', 'رتب اللقيمات الصغيرة في صف واترك مساحة للاختيار.', 'ضع الحامل في الوسط والأكواب والأطباق الفردية قرب كل مقعد.',
    ),
    descriptions: describe(
      'مكان فردي · سكين وشوكة', 'ترتيب وحداتي · حصة لكل شخص', 'أرز وحساء فرديان · أطباق جانبية مشتركة', 'طهي مشترك حول القدر في الوسط',
      'تقسيم الطعام على ورقة نبات', 'طبق دائري للمشاركة', 'أطباق مشتركة مصطفة على طول الطاولة', 'طبق كبير واحد في الوسط للمشاركة',
      'تقديم أطباق متعددة معًا وبشكل متناسق', 'أدوات فردية · تقديم الأطباق بالتتابع', 'أطباق صغيرة مشتركة موزعة على الطاولة', 'تقسيم أطباق الوسط في أطباق فردية',
      'فصل منطقة البوفيه عن منطقة الطعام', 'أطباق مشتركة كثيرة على طاولة طويلة', 'لقيمات صغيرة معروضة للاختيار', 'ترتيب الطعام في طبقات على حامل',
    ),
  },
  ka: {
    culture: 'საკვების კულტურა', language: 'ენა', culturePrompt: 'დღეს თქვენი სტუმრები რომელი ქვეყნებიდან მოდიან?', searchPlaceholder: 'ქვეყნის სახელით ძიება', selectedCultures: 'არჩეული კულტურები', noCultureResults: 'შედეგები არ მოიძებნა.', tableTips: 'სუფრის გაწყობის რჩევები', tipEmpty: 'აირჩიეთ კულტურა, რომ აქ ჭურჭლის განლაგების იდეა გამოჩნდეს.', tipDisclaimer: 'ეს იდეები შესასწავლადაა და არა უნივერსალური წესები.', round: 'მრგვალი', square: 'კვადრატული', rectangle: 'მართკუთხა', guestCount: 'სტუმრები', addGuest: 'დამატება', removeGuest: 'შემცირება',
    objectNames: nameObjects('ჩანგალი', 'დანა', 'თეფში', 'ჯამი', 'ჭიქა', 'კოვზი', 'ჩოპსტიკები', 'ხელსახოცი', 'ლანგარი', 'ჰოთპოტის ქვაბი', 'ფოთლის თეფში', 'გარნირის თეფში', 'საზიარო თეფში', 'დიდი ლანგარი', 'ბუფეტის ლანგარი', 'მრავალსართულიანი სადგამი'),
    cultureTips: makeCultureTips(
      'თეფში ცენტრში მოათავსეთ, ჩანგალი და დანა კი ორივე მხარეს.', 'პატარა ჯამები ლანგარზე დააჯგუფეთ და ჩოპსტიკებისთვის ადგილი დატოვეთ.', 'ბრინჯისა და წვნიანის პირადი ჯამები თითოეულ ადგილთან დადეთ, საერთო კერძები კი შუაში.', 'პირადი ჯამები საერთო ქვაბის გარშემო მოათავსეთ და ყველასთვის მისაწვდომი სივრცე დატოვეთ.',
      'ჯერ ფოთოლზე ან დიდ თეფშზე საკვების განყოფილებებისთვის ადგილი დაგეგმეთ.', 'საზიარო თეფში შუაში დადეთ, რათა ყველა ადგილიდან მისწვდნენ.', 'საერთო კერძები მაგიდის სიგრძეზე განათავსეთ, რომ რამდენიმე ადგილიდან მისწვდნენ.', 'დიდი საზიარო ლანგარი შუაში მოათავსეთ და პირადი თეფშებისთვის ადგილი დატოვეთ.',
      'საერთო კერძები სიმეტრიულად დაალაგეთ და თითოეული პირადი თეფშისთვის ადგილი გამოყავით.', 'პირადი თეფშები მოამზადეთ და რიგრიგობით მოსატანი კერძებისთვის ადგილი დატოვეთ.', 'პატარა საზიარო თეფშები მაგიდაზე გაანაწილეთ, რათა ყველამ აირჩიოს.', 'საზიარო ლანგრები შუაში დადეთ, პირადი თეფშები კი თითოეული სტუმრის წინ.',
      'ბუფეტის სივრცე დასაჯდომი ადგილებისგან გამოყავით და მომსახურებისთვის ადგილი დატოვეთ.', 'საერთო კერძებისთვის შუაში ფართო ადგილი დატოვეთ, პატარა თეფშები კი გარშემო მოათავსეთ.', 'პატარა ლუკმები რიგად დაალაგეთ და არჩევისთვის ადგილი დატოვეთ.', 'სადგამი შუაში მოათავსეთ, ჭიქები და პირადი თეფშები კი ადგილებთან ახლოს.',
    ),
    descriptions: describe(
      'ინდივიდუალური სერვირება · დანა და ჩანგალი', 'მოდულური სერვირება · ერთი ულუფა', 'ინდივიდუალური ბრინჯი და წვნიანი · საერთო დანამატები', 'ერთობლივი მომზადება ცენტრალურ ქვაბში',
      'საკვები ფოთოლზე ნაწილებად არის განლაგებული', 'მრგვალი საერთო ლანგარი', 'საერთო კერძები მაგიდის გასწვრივ', 'ერთი დიდი საერთო თეფში ცენტრში',
      'რამდენიმე კერძი ერთად და სიმეტრიულად მიაქვთ', 'ინდივიდუალური ჭურჭელი · კერძები რიგრიგობით', 'პატარა საერთო თეფშები მაგიდაზეა განაწილებული', 'ცენტრალური კერძები ინდივიდუალურ თეფშებზე ნაწილდება',
      'ბუფეტი და სასადილო სივრცე განცალკევებულია', 'ბევრი საერთო კერძი გრძელ მაგიდაზე', 'პატარა ლუკმები არჩევისთვის არის გამოფენილი', 'საკვები სადგამზე იარუსებად არის განლაგებული',
    ),
  },
  eu: {
    culture: 'JAN-EDATEKO KULTURA', language: 'Hizkuntza', culturePrompt: 'Zein herrialdetatik datoz gaur zure gonbidatuak?', searchPlaceholder: 'Bilatu herrialdearen izenaz', selectedCultures: 'Hautatutako kulturak', noCultureResults: 'Ez da emaitzarik aurkitu.', tableTips: 'MAHAI-ANTOLAKETARAKO IDEIAK', tipEmpty: 'Aukeratu kultura bat mahai-antolaketarako ideia bat ikusteko.', tipDisclaimer: 'Esploratzeko ideiak dira, ez arau unibertsalak.', round: 'Biribila', square: 'Karratua', rectangle: 'Laukizuzena', guestCount: 'gonbidatuak', addGuest: 'Gehitu', removeGuest: 'Kendu',
    objectNames: nameObjects('Sardexka', 'Labana', 'Platera', 'Katilua', 'Katilua', 'Koilara', 'Makilatxoak', 'Ezpainzapia', 'Erretilua', 'Hotpot-eltzea', 'Hosto-platera', 'Plater txikia', 'Partekatutako platera', 'Erretilu handia', 'Buffet-erretilua', 'Maila anitzeko euskarria'),
    cultureTips: makeCultureTips(
      'Jarri platera erdian eta sardexka eta labana bi aldeetan, antolaketa argitzeko.', 'Bildu katilu txikiak erretiluan eta utzi makilatxoentzako lekua.', 'Jarri norberaren arroz- eta zopa-ontziak leku bakoitzaren ondoan, eta plater partekatuak erdian.', 'Jarri norberaren ontziak eltze partekatuaren inguruan eta utzi guztiek iristeko lekua.',
      'Antolatu lehenik hostoan edo plater handian janariaren atalak.', 'Jarri plater partekatua erdian, eserleku guztietatik iristeko moduan.', 'Lerrokatu plater partekatuak mahaiaren luzeran, hainbat lekutatik iristeko.', 'Jarri plater handi partekatua erdian eta utzi tokia norberaren platerei.',
      'Antolatu plater partekatuak simetrikoki eta utzi tokia gonbidatu bakoitzaren platerari.', 'Prestatu norberaren platerak eta utzi lekua platerak txandaka zerbitzatzeko.', 'Banatu plater txiki partekatuak mahaian, guztiek aukeratu ahal izateko.', 'Jarri plater partekatuak erdian eta norberarenak gonbidatu bakoitzaren aurrean.',
      'Bereizi buffeta eta eserlekuak, zerbitzatzeko espazioa libre uzteko.', 'Utzi erdian leku zabala plater partekatuentzat eta jarri txikiak inguruan.', 'Lerrokatu mokadu txikiak eta utzi lekua aukeratzeko.', 'Jarri maila anitzeko euskarria erdian eta katiluak eta norberaren platerak eserlekuetatik gertu.',
    ),
    descriptions: describe(
      'Banakako mahai-tresnak · labana eta sardexka', 'Antolaketa modularra · banakako anoa', 'Norberaren arroza eta zopa · partekatzeko osagarriak', 'Erdiko lapikoan denon artean kozinatzea',
      'Janaria hosto batean ataletan antolatuta', 'Plater biribila partekatzeko', 'Plater partekatuak mahaiaren luzeran', 'Erdiko plater handi bat partekatzeko',
      'Hainbat plater batera eta simetrikoki zerbitzatuta', 'Norberaren tresnak · platerak txandaka zerbitzatuta', 'Plater txiki partekatuak mahaian banatuta', 'Erdiko platerak norberaren plateretan banatuta',
      'Buffeta eta jantokia bereizita', 'Plater partekatu ugari mahai luzean', 'Aukeratzeko mokadu txikiak ikusgai', 'Janaria mailaka antolatuta euskarri batean',
    ),
  },
};
