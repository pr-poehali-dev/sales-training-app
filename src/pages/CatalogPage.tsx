import { useState } from "react";
import Icon from "@/components/ui/icon";

const departments = [
  {
    id: "santekhnika",
    name: "Сантехника",
    emoji: "🚿",
    url: "https://www.bober-stroy.ru/santekhnika/",
    categories: [
      {
        name: "Смесители",
        items: [
          { name: "Смеситель для кухни", desc: "Для мойки, с поворотным изливом, картриджный механизм" },
          { name: "Смеситель для ванной", desc: "Двухвентильный или однорычажный, с душевым шлангом" },
          { name: "Смеситель для умывальника", desc: "Настенный или на раковину, высокий/низкий" },
        ],
      },
      {
        name: "Унитазы и инсталляции",
        items: [
          { name: "Унитаз напольный", desc: "Компакт с бачком, косой/прямой выпуск" },
          { name: "Подвесной унитаз + инсталляция", desc: "Экономит место, скрытый бачок в стене" },
          { name: "Инсталляция", desc: "Металлический каркас с механизмом смыва" },
        ],
      },
      {
        name: "Трубы и фитинги",
        items: [
          { name: "Трубы ПП (полипропилен)", desc: "Для горячей и холодной воды, сварка" },
          { name: "Трубы металлопластик", desc: "Гибкие, не требуют пайки, для тёплого пола" },
          { name: "Фитинги", desc: "Угольники, тройники, муфты, переходники" },
        ],
      },
      {
        name: "Ванны и душ",
        items: [
          { name: "Акриловая ванна", desc: "Лёгкая, тёплая на ощупь, хорошая теплоизоляция" },
          { name: "Стальная ванна", desc: "Прочная, долговечная, дешевле акриловой" },
          { name: "Душевой поддон", desc: "Акриловый или керамический, разные размеры" },
        ],
      },
    ],
  },
  {
    id: "sad",
    name: "Сад",
    emoji: "🌱",
    url: "https://www.bober-stroy.ru/sad/",
    categories: [
      {
        name: "Поливочное оборудование",
        items: [
          { name: "Шланги поливочные", desc: "ПВХ или армированные, 1/2\", 3/4\", разная длина" },
          { name: "Капельный полив", desc: "Система капельного орошения для грядок и теплиц" },
          { name: "Дождеватели", desc: "Роторные и веерные, для газона и клумб" },
        ],
      },
      {
        name: "Инструменты",
        items: [
          { name: "Лопаты", desc: "Штыковая и совковая, разные ручки" },
          { name: "Вилы", desc: "Садовые и навозные, 4-зубые и 5-зубые" },
          { name: "Грабли", desc: "Металлические и веерные, для сена и листьев" },
        ],
      },
      {
        name: "Теплицы и парники",
        items: [
          { name: "Теплица из поликарбоната", desc: "3x4, 3x6, 3x8 м, сотовый поликарбонат 4–6 мм" },
          { name: "Парник дуговой", desc: "Мини-теплица, дуги + укрывной материал" },
          { name: "Поликарбонат листовой", desc: "4 мм, 6 мм, 8 мм — продаётся отдельно" },
        ],
      },
    ],
  },
  {
    id: "skobyanye",
    name: "Скобяные изделия",
    emoji: "🔩",
    url: "https://www.bober-stroy.ru/skobyanye_izdeliya/",
    categories: [
      {
        name: "Замки и замочные системы",
        items: [
          { name: "Замок врезной", desc: "В дверное полотно, цилиндровый или сувальдный" },
          { name: "Замок навесной", desc: "Дужковый, дисковый, разные размеры" },
          { name: "Ручки дверные", desc: "Нажимные, круглые, с замком и без" },
        ],
      },
      {
        name: "Крепёж",
        items: [
          { name: "Гвозди", desc: "Строительные, финишные, винтовые — разные длины" },
          { name: "Шурупы и саморезы", desc: "По дереву, по металлу, кровельные с шайбой" },
          { name: "Анкеры и дюбели", desc: "Для бетона, кирпича, гипсокартона" },
        ],
      },
      {
        name: "Петли и фурнитура",
        items: [
          { name: "Петли дверные", desc: "Карточные, пружинные, для тяжёлых дверей" },
          { name: "Мебельная фурнитура", desc: "Направляющие, петли, ручки для мебели" },
          { name: "Уголки и скобы", desc: "Соединительные, усиленные, для стропил" },
        ],
      },
    ],
  },
  {
    id: "kraski",
    name: "Краски",
    emoji: "🎨",
    url: "https://www.bober-stroy.ru/",
    categories: [
      {
        name: "Краски для интерьера",
        items: [
          { name: "Латексная краска", desc: "Для стен и потолка, моющаяся, разные основы" },
          { name: "Акриловая краска", desc: "Быстросохнущая, без запаха, для любых поверхностей" },
          { name: "Краска для потолка", desc: "Белая матовая, скрывает неровности" },
        ],
      },
      {
        name: "Краски для экстерьера",
        items: [
          { name: "Фасадная краска", desc: "Влагостойкая, морозостойкая, паропроницаемая" },
          { name: "Краска для деревянных фасадов", desc: "С антисептиком, стойкость к УФ" },
          { name: "Краска для металла", desc: "Грунт-эмаль 3-в-1, антикоррозийная" },
        ],
      },
      {
        name: "Грунтовки",
        items: [
          { name: "Грунтовка универсальная", desc: "Для пористых поверхностей, улучшает адгезию" },
          { name: "Глубокого проникновения", desc: "Для сильновпитывающих оснований" },
          { name: "Антигрибковая грунтовка", desc: "Для влажных помещений, ванных, подвалов" },
        ],
      },
    ],
  },
];

export default function CatalogPage() {
  const [activeDept, setActiveDept] = useState(0);
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const dept = departments[activeDept];

  const filteredCategories = dept.categories.map((cat) => ({
    ...cat,
    items: search
      ? cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase())
        )
      : cat.items,
  })).filter((cat) => !search || cat.items.length > 0);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white">
        <h1 className="text-xl font-bold text-beaver-text">Каталог товаров</h1>
        <p className="text-sm text-beaver-muted mt-0.5">Справочник по отделам</p>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-border">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-beaver-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти товар..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-beaver-green/20 border border-transparent focus:border-beaver-green/30 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="X" size={14} className="text-beaver-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Department tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-border">
        {departments.map((d, i) => (
          <button
            key={d.id}
            onClick={() => { setActiveDept(i); setOpenCategory(0); setSearch(""); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeDept === i
                ? "bg-beaver-green text-white"
                : "bg-gray-100 text-beaver-muted hover:bg-gray-200"
            }`}
          >
            <span>{d.emoji}</span>
            <span>{d.name}</span>
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-beaver-muted">
            <Icon name="PackageSearch" size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Ничего не найдено</p>
          </div>
        ) : (
          filteredCategories.map((cat, ci) => (
            <div key={ci} className="bg-white border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenCategory(openCategory === ci ? null : ci)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm text-beaver-text">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-beaver-muted bg-gray-100 px-2 py-0.5 rounded-full">
                    {cat.items.length}
                  </span>
                  <Icon
                    name={openCategory === ci ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-beaver-muted"
                  />
                </div>
              </button>
              {openCategory === ci && (
                <div className="border-t border-border divide-y divide-border">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="px-4 py-3 bg-gray-50/50">
                      <div className="font-medium text-sm text-beaver-text mb-0.5">{item.name}</div>
                      <div className="text-xs text-beaver-muted leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        <a
          href={dept.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-beaver-green/40 rounded-xl text-sm text-beaver-green hover:bg-beaver-green-pale transition-all mt-2"
        >
          <Icon name="ExternalLink" size={14} />
          Открыть раздел на сайте
        </a>
      </div>
    </div>
  );
}
