import { Quote } from '../types';

export const STATIC_QUOTES: Quote[] = [
  { content: "雄关漫道真如铁，而今迈步从头越。", author: "毛泽东", source: "忆秦娥·娄山关" },
  { content: "天若有情天亦老，人间正道是沧桑。", author: "毛泽东", source: "七律·人民解放军占领南京" },
  { content: "自信人生二百年，会当水击三千里。", author: "毛泽东", source: "七古·不惧" },
  { content: "一万年太久，只争朝夕。", author: "毛泽东", source: "满江红·和郭沫若同志" },
  { content: "牢骚太盛防肠断，风物长宜放眼量。", author: "毛泽东", source: "七律·和柳亚子先生" },
  { content: "为有牺牲多壮志，敢教日月换新天。", author: "毛泽东", source: "七律·到韶山" },
  { content: "人法地，地法天，天法道，道法自然。", author: "老子", source: "道德经" },
  { content: "上善若水。水善利万物而不争，处众人之所恶，故几于道。", author: "老子", source: "道德经" },
  { content: "胜人者有力，自胜者强。", author: "老子", source: "道德经" },
  { content: "大器晚成，大音希声，大象无形。", author: "老子", source: "道德经" },
  { content: "千里之行，始于足下。", author: "老子", source: "道德经" },
  { content: "天地与我并生，而万物与我为一。", author: "庄子", source: "齐物论" },
  { content: "君子之交淡若水，小人之交甘若醴。", author: "庄子", source: "山木" },
  { content: "人生天地之间，若白驹之过隙，忽然而已。", author: "庄子", source: "知北游" },
  { content: "且视他人之疑目如盏盏鬼火，大胆去走你的夜路。", author: "史铁生", source: "病隙碎笔" },
  { content: "所谓无底深渊，下去，也是前程万里。", author: "木心", source: "素履之往" },
  { content: "我与我周旋久，宁作我。", author: "世说新语", source: "品藻" },
  { content: "生活是种律动，须有光有影，有左有右，有晴有雨。", author: "老舍" },
  { content: "万物皆有裂痕，那是光照进来的地方。", author: "莱昂纳德·科恩" },
  { content: "你未必出类拔萃，但一定与众不同。", author: "宫崎骏" },
  { content: "知足者富。", author: "老子", source: "道德经" },
  { content: "宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒。", author: "洪应明", source: "菜根谭" },
  { content: "星星之火，可以燎原。", author: "毛泽东" },
  { content: "世界是你们的，也是我们的，但是归根结底是你们的。", author: "毛泽东" },
  { content: "治大国，若烹小鲜。", author: "老子", source: "道德经" },
];

export const getRandomFallbackQuotes = (count: number): Quote[] => {
  const shuffled = [...STATIC_QUOTES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
