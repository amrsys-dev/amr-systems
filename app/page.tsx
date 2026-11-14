"use client";

import { useState } from "react";

type Locale = "en" | "ar" | "ru" | "tg" | "uz";

const copy = {
  en: {
    nav: ["Ecosystem", "Products", "Architecture", "About", "Contact"],
    eyebrow: "INDEPENDENT TECHNOLOGY ECOSYSTEM", hero1: "Engineering ideas", hero2: "into systems.",
    lead: "AMR Systems connects focused digital products, intelligent software, and practical solutions for real-world industries.",
    explore: "Explore products", architectureLink: "Our architecture", approach: "OUR APPROACH",
    statement: "One ecosystem.", statementStrong: "Independent products.", statementEnd: "A shared direction.",
    ecoLabel: "01 — THE ECOSYSTEM", ecoTitle1: "Different tools.", ecoTitle2: "Connected thinking.",
    ecoDesc: "We build a family of focused products. Each solves a distinct problem while following a common architectural approach.",
    principles: [["Independent modules", "Each product has its own purpose and can evolve independently."], ["Connected architecture", "Clear interfaces connect modules without forcing them into one application."], ["Practical engineering", "Development is guided by real workflows, measurable outcomes, and honest capabilities."]],
    productsLabel: "02 — PRODUCT PORTFOLIO", productsTitle1: "Built around", productsTitle2: "real disciplines.",
    productsDesc: "Five distinct directions within the AMR ecosystem. Descriptions reflect current development scope, not promises of finished functionality.",
    categories: ["DESIGN & CONFIGURATION", "MODEL ANALYSIS", "CUTTING OPTIMIZATION", "SERVICE DISCOVERY", "MATERIALS RESEARCH"],
    descriptions: [
      "A visual workspace for configuring furniture and shaping product concepts in 3D.",
      "Furniture-model analysis focused on understanding structure and decomposing designs into components.",
      "A dedicated direction for optimizing the cutting of sheet materials and profiles.",
      "A platform concept for discovering services and matching requests with relevant providers.",
      "Research and development of composite material solutions."
    ],
    status: "IN DEVELOPMENT", research: "RESEARCH", osLabel: "03 — AMR OS", osTitle1: "A modular", osTitle2: "system of systems.",
    osDesc: "AMR OS is the architectural direction behind the ecosystem: autonomous applications connected through explicit interfaces and shared navigation.",
    aboutLabel: "04 — ABOUT AMR", aboutTitle1: "Technology should", aboutTitle2: "solve something real.",
    aboutDesc: "AMR Systems is developing an interconnected portfolio of digital products shaped by practical industry experience. We value clear architecture, useful tools, and progress that can be demonstrated.",
    footer: "Back to top", purpose: "TECHNOLOGY WITH PURPOSE", modular: "MODULAR BY DESIGN /// BUILT TO CONNECT", modules: ["CONSTRUCTOR", "VISION", "CUTTING", "SERVICE HUB", "MATERIALS"]
  },
  ru: {
    nav: ["Экосистема", "Продукты", "Архитектура", "О нас", "Контакты"],
    eyebrow: "НЕЗАВИСИМАЯ ТЕХНОЛОГИЧЕСКАЯ ЭКОСИСТЕМА", hero1: "Превращаем идеи", hero2: "в работающие системы.",
    lead: "AMR Systems объединяет специализированные цифровые продукты, интеллектуальное программное обеспечение и практические решения для реальных отраслей.",
    explore: "Наши продукты", architectureLink: "Наша архитектура", approach: "НАШ ПОДХОД",
    statement: "Единая экосистема.", statementStrong: "Независимые продукты.", statementEnd: "Общее направление.",
    ecoLabel: "01 — ЭКОСИСТЕМА", ecoTitle1: "Разные инструменты.", ecoTitle2: "Единая логика.",
    ecoDesc: "Мы создаём семейство специализированных продуктов. Каждый решает отдельную задачу, следуя общей архитектурной концепции.",
    principles: [["Независимые модули", "У каждого продукта собственная задача и возможность развиваться независимо."], ["Связанная архитектура", "Чёткие интерфейсы соединяют модули, не превращая их в одно приложение."], ["Практичная инженерия", "Разработка опирается на реальные процессы, измеримые результаты и подтверждённые возможности."]],
    productsLabel: "02 — ПОРТФЕЛЬ ПРОДУКТОВ", productsTitle1: "Решения для", productsTitle2: "реальных задач.",
    productsDesc: "Пять отдельных направлений экосистемы AMR. Описания отражают текущий статус разработки, а не обещают готовые функции.",
    categories: ["ДИЗАЙН И КОНФИГУРАЦИЯ", "АНАЛИЗ МОДЕЛЕЙ", "ОПТИМИЗАЦИЯ РАСКРОЯ", "ПОИСК УСЛУГ", "ИССЛЕДОВАНИЕ МАТЕРИАЛОВ"],
    descriptions: ["Визуальная среда для конфигурации мебели и создания её 3D-концепций.", "Анализ мебельных моделей, их структуры и декомпозиции на компоненты.", "Отдельное направление оптимизации раскроя листовых материалов и профилей.", "Концепция платформы поиска услуг и подбора исполнителей под запросы.", "Исследование и разработка композитных материалов."],
    status: "В РАЗРАБОТКЕ", research: "ИССЛЕДОВАНИЯ", osLabel: "03 — AMR OS", osTitle1: "Модульная", osTitle2: "система систем.",
    osDesc: "AMR OS — архитектурная основа экосистемы: автономные приложения, связанные понятными интерфейсами и общей навигацией.",
    aboutLabel: "04 — О КОМПАНИИ", aboutTitle1: "Технологии должны", aboutTitle2: "решать реальные задачи.",
    aboutDesc: "AMR Systems развивает портфель взаимосвязанных цифровых продуктов, опираясь на практический отраслевой опыт. Наши принципы — ясная архитектура, полезные инструменты и проверяемый результат.",
    footer: "Наверх", purpose: "ТЕХНОЛОГИИ С ЦЕЛЬЮ", modular: "МОДУЛЬНОСТЬ ПО ЗАМЫСЛУ /// СВЯЗНОСТЬ ПО АРХИТЕКТУРЕ", modules: ["КОНСТРУКТОР", "АНАЛИЗ", "РАСКРОЙ", "СЕРВИСЫ", "МАТЕРИАЛЫ"]
  },
  tg: {
    nav: ["Экосистема", "Маҳсулотҳо", "Меъморӣ", "Дар бораи мо", "Тамос"],
    eyebrow: "ЭКОСИСТЕМАИ МУСТАҚИЛИ ТЕХНОЛОГӢ", hero1: "Ғояҳоро ба", hero2: "низомҳо табдил медиҳем.",
    lead: "AMR Systems маҳсулоти рақамии махсус, нармафзори зеҳнӣ ва роҳҳои ҳалли амалиро барои соҳаҳои воқеӣ муттаҳид мекунад.",
    explore: "Маҳсулотҳо", architectureLink: "Меъмории мо", approach: "УСУЛИ МО",
    statement: "Як экосистема.", statementStrong: "Маҳсулоти мустақил.", statementEnd: "Ҳадафи муштарак.",
    ecoLabel: "01 — ЭКОСИСТЕМА", ecoTitle1: "Воситаҳои гуногун.", ecoTitle2: "Тафаккури пайваста.",
    ecoDesc: "Мо маҷмӯи маҳсулоти махсусро месозем. Ҳар кадом вазифаи алоҳидаро ҳал мекунад ва ба меъмории умумӣ такя менамояд.",
    principles: [["Модулҳои мустақил", "Ҳар маҳсулот мақсади худро дорад ва метавонад мустақилона рушд кунад."], ["Меъмории пайваст", "Интерфейсҳои равшан модулҳоро мепайванданд, бе он ки онҳоро ба як барнома табдил диҳанд."], ["Муҳандисии амалӣ", "Рушд ба равандҳои воқеӣ, натиҷаҳои ченшаванда ва имкониятҳои тасдиқшуда такя мекунад."]],
    productsLabel: "02 — МАҲСУЛОТҲО", productsTitle1: "Барои", productsTitle2: "вазифаҳои воқеӣ.",
    productsDesc: "Панҷ самти мустақили экосистемаи AMR. Тавсифҳо ҳолати кунунии рушдро нишон медиҳанд, на ваъдаи вазифаҳои тайёрро.",
    categories: ["ТАРҲРЕЗӢ ВА ТАНЗИМ", "ТАҲЛИЛИ МОДЕЛ", "БЕҲСОЗИИ БУРИШ", "ҶУСТУҶӮИ ХИЗМАТРАСОНӢ", "ТАҲҚИҚИ МАВОД"],
    descriptions: ["Муҳити визуалӣ барои танзими мебел ва сохтани консепсияҳои 3D.", "Таҳлили сохтори моделҳои мебел ва ҷудо кардани онҳо ба ҷузъҳо.", "Самти алоҳида барои беҳсозии буриши маводи варақӣ ва профилҳо.", "Консепсияи платформа барои ҷустуҷӯи хизматрасонӣ ва мувофиқ кардани дархостҳо бо иҷрокунандагон.", "Таҳқиқ ва таҳияи маводи композитӣ."],
    status: "ДАР ҲОЛИ РУШД", research: "ТАҲҚИҚОТ", osLabel: "03 — AMR OS", osTitle1: "Меъмории", osTitle2: "низомҳои модулӣ.",
    osDesc: "AMR OS самти меъмории экосистема мебошад: барномаҳои мустақил бо интерфейсҳои равшан ва роҳнамоии муштарак пайваст мешаванд.",
    aboutLabel: "04 — ДАР БОРАИ AMR", aboutTitle1: "Технология бояд", aboutTitle2: "масъалаи воқеиро ҳал кунад.",
    aboutDesc: "AMR Systems портфели маҳсулоти рақамии ба ҳам алоқамандро бо такя ба таҷрибаи амалии соҳавӣ рушд медиҳад. Мо меъмории равшан, воситаҳои муфид ва натиҷаи санҷидашавандаро қадр мекунем.",
    footer: "Ба боло", purpose: "ТЕХНОЛОГИЯ БО ҲАДАФ", modular: "МОДУЛӢ АЗ РӮИ ТАРҲ /// ПАЙВАСТ АЗ РӮИ МЕЪМОРӢ", modules: ["КОНСТРУКТОР", "ТАҲЛИЛ", "БУРРИШ", "ХИЗМАТРАСОНӢ", "МАВОД"]
  },
  uz: {
    nav: ["Ekotizim", "Mahsulotlar", "Arxitektura", "Biz haqimizda", "Aloqa"],
    eyebrow: "MUSTAQIL TEXNOLOGIK EKOTIZIM", hero1: "G‘oyalarni", hero2: "tizimlarga aylantiramiz.",
    lead: "AMR Systems ixtisoslashgan raqamli mahsulotlar, intellektual dasturiy ta’minot va real sohalar uchun amaliy yechimlarni birlashtiradi.",
    explore: "Mahsulotlarni ko‘rish", architectureLink: "Arxitekturamiz", approach: "BIZNING YONDASHUV",
    statement: "Yagona ekotizim.", statementStrong: "Mustaqil mahsulotlar.", statementEnd: "Umumiy yo‘nalish.",
    ecoLabel: "01 — EKOTIZIM", ecoTitle1: "Turli vositalar.", ecoTitle2: "Yagona fikrlash.",
    ecoDesc: "Biz ixtisoslashgan mahsulotlar oilasini yaratamiz. Har biri umumiy arxitektura tamoyiliga amal qilgan holda alohida muammoni hal qiladi.",
    principles: [["Mustaqil modullar", "Har bir mahsulot o‘z maqsadiga ega va mustaqil rivojlanishi mumkin."], ["Bog‘langan arxitektura", "Aniq interfeyslar modullarni bitta ilovaga majburan birlashtirmasdan bog‘laydi."], ["Amaliy muhandislik", "Ishlab chiqish real jarayonlar, o‘lchanadigan natijalar va tasdiqlangan imkoniyatlarga asoslanadi."]],
    productsLabel: "02 — MAHSULOTLAR", productsTitle1: "Haqiqiy", productsTitle2: "vazifalar uchun.",
    productsDesc: "AMR ekotizimidagi beshta mustaqil yo‘nalish. Tavsiflar tayyor funksiyalar va’dasi emas, balki ishlab chiqishning hozirgi holatini aks ettiradi.",
    categories: ["DIZAYN VA SOZLASH", "MODEL TAHLILI", "KESISHNI OPTIMALLASHTIRISH", "XIZMATLARNI TOPISH", "MATERIALLAR TADQIQOTI"],
    descriptions: ["Mebelni sozlash va 3D konsepsiyalarini yaratish uchun vizual muhit.", "Mebel modellarining tuzilishini tahlil qilish va qismlarga ajratish.", "List materiallari va profillarni kesishni optimallashtirish bo‘yicha alohida yo‘nalish.", "Xizmatlarni topish va so‘rovlarni mos ijrochilar bilan bog‘lash platformasi konsepsiyasi.", "Kompozit materiallarni tadqiq qilish va ishlab chiqish."],
    status: "ISHLAB CHIQILMOQDA", research: "TADQIQOT", osLabel: "03 — AMR OS", osTitle1: "Modulli", osTitle2: "tizimlar tizimi.",
    osDesc: "AMR OS ekotizimning arxitektura yo‘nalishidir: mustaqil ilovalar aniq interfeyslar va umumiy navigatsiya orqali bog‘lanadi.",
    aboutLabel: "04 — AMR HAQIDA", aboutTitle1: "Texnologiya", aboutTitle2: "haqiqiy muammoni hal qilishi kerak.",
    aboutDesc: "AMR Systems amaliy sanoat tajribasiga tayangan holda o‘zaro bog‘langan raqamli mahsulotlar portfelini rivojlantirmoqda. Biz aniq arxitektura, foydali vositalar va tekshiriladigan natijalarni qadrlaymiz.",
    footer: "Yuqoriga", purpose: "MAQSADLI TEXNOLOGIYA", modular: "MODULLI TUZILMA /// O‘ZARO BOG‘LIQLIK", modules: ["KONSTRUKTOR", "TAHLIL", "KESISH", "XIZMATLAR", "MATERIALLAR"]
  },
  ar: {
    nav: ["المنظومة", "المنتجات", "البنية", "من نحن", "اتصل بنا"],
    eyebrow: "منظومة تقنية مستقلة", hero1: "نحوّل الأفكار", hero2: "إلى أنظمة متكاملة.",
    lead: "تجمع AMR Systems المنتجات الرقمية المتخصصة والبرمجيات الذكية والحلول العملية للصناعات الواقعية.",
    explore: "استكشف المنتجات", architectureLink: "البنية المعمارية", approach: "نهجنا",
    statement: "منظومة واحدة.", statementStrong: "منتجات مستقلة.", statementEnd: "اتجاه مشترك.",
    ecoLabel: "01 — المنظومة", ecoTitle1: "أدوات مختلفة.", ecoTitle2: "رؤية مترابطة.",
    ecoDesc: "نبني مجموعة من المنتجات المتخصصة. يعالج كل منتج مشكلة محددة ضمن نهج معماري مشترك.",
    principles: [["وحدات مستقلة", "لكل منتج غرضه الخاص ويمكنه التطور بشكل مستقل."], ["بنية مترابطة", "تربط الواجهات الواضحة الوحدات دون إجبارها على أن تصبح تطبيقاً واحداً."], ["هندسة عملية", "يعتمد التطوير على سير عمل واقعي ونتائج قابلة للقياس وقدرات مثبتة."]],
    productsLabel: "02 — مجموعة المنتجات", productsTitle1: "مصممة", productsTitle2: "لمهام واقعية.",
    productsDesc: "خمسة مسارات مستقلة ضمن منظومة AMR. تعكس الأوصاف نطاق التطوير الحالي ولا تمثل وعوداً بوظائف مكتملة.",
    categories: ["التصميم والإعداد", "تحليل النماذج", "تحسين القص", "اكتشاف الخدمات", "أبحاث المواد"],
    descriptions: ["مساحة مرئية لإعداد الأثاث وتشكيل مفاهيم المنتجات ثلاثية الأبعاد.", "تحليل نماذج الأثاث لفهم بنيتها وتقسيم التصاميم إلى مكونات.", "مسار متخصص لتحسين قص الألواح والقطاعات.", "مفهوم منصة لاكتشاف الخدمات ومطابقة الطلبات مع مقدمي الخدمات المناسبين.", "بحث وتطوير حلول المواد المركبة."],
    status: "قيد التطوير", research: "بحث وتطوير", osLabel: "03 — AMR OS", osTitle1: "بنية", osTitle2: "منظومة من الأنظمة.",
    osDesc: "AMR OS هو التوجه المعماري للمنظومة: تطبيقات مستقلة تتصل عبر واجهات واضحة وتنقل مشترك.",
    aboutLabel: "04 — عن AMR", aboutTitle1: "يجب أن", aboutTitle2: "تحل التقنية مشكلة حقيقية.",
    aboutDesc: "تعمل AMR Systems على تطوير مجموعة مترابطة من المنتجات الرقمية مستندة إلى الخبرة العملية في الصناعة. نؤمن بالبنية الواضحة والأدوات المفيدة والنتائج القابلة للتحقق.",
    footer: "العودة للأعلى", purpose: "تقنية لها هدف", modular: "تصميم معياري /// ترابط مدروس", modules: ["المُنشئ", "الرؤية", "القص", "الخدمات", "المواد"]
  }
} as const;

const products = ["AMR 3D Constructor", "AMR Vision", "AMR Cutting", "AMR Service Hub", "AMR Materials"];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[locale];
  const rtl = locale === "ar";
  return <main dir={rtl ? "rtl" : "ltr"} lang={locale}>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="AMR Systems"><b>AMR</b><span>SYSTEMS</span></a>
      <nav className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}>{t.nav.slice(0,4).map((label,i)=><a key={label} href={["#ecosystem","#products","#architecture","#about"][i]} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="header-actions">
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "MENU"}</button>
        <select aria-label="Select language" value={locale} onChange={e=>setLocale(e.target.value as Locale)}>
          <option value="en">EN — English</option><option value="ar">AR — العربية</option><option value="ru">RU — Русский</option><option value="tg">TJ — Тоҷикӣ</option><option value="uz">UZ — O‘zbekcha</option>
        </select>
        <a className="contact" href="mailto:contact@amrsys.net">{t.nav[4]} ↗</a>
      </div>
    </header>
    <section className="hero wrap" id="top">
      <div className="hero-copy"><div className="eyebrow"><i/> {t.eyebrow}</div><h1>{t.hero1}<br/><em>{t.hero2}</em></h1><p>{t.lead}</p>
        <div className="actions"><a className="primary" href="#products">{t.explore} <span>↘</span></a><a className="secondary" href="#architecture">{t.architectureLink} ↗</a></div>
      </div>
      <div className="orbital" aria-label="AMR original CSS ecosystem graphic"><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/><div className="core"><b>AMR</b><small>SYSTEMS</small></div>
        <span className="node n1">● {t.modules[0]}</span><span className="node n2">● {t.modules[1]}</span><span className="node n3">● {t.modules[2]}</span><span className="node n4">● {t.modules[3]}</span><small className="orbit-note">{t.modular}</small>
      </div>
      <div className="hero-foot"><span>01 / 05</span><span>{t.purpose}</span></div>
    </section>
    <div className="statement"><div className="wrap"><small>{t.approach}</small><p>{t.statement} <strong>{t.statementStrong}</strong> {t.statementEnd}</p></div></div>
    <section className="wrap section" id="ecosystem"><div className="section-head"><div><small>{t.ecoLabel}</small><h2>{t.ecoTitle1}<br/><em>{t.ecoTitle2}</em></h2></div><p>{t.ecoDesc}</p></div>
      <div className="principles">{t.principles.map(([title,desc],i)=><article key={title}><small>0{i+1}</small><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </section>
    <section className="products" id="products"><div className="wrap section"><div className="section-head"><div><small>{t.productsLabel}</small><h2>{t.productsTitle1}<br/><em>{t.productsTitle2}</em></h2></div><p>{t.productsDesc}</p></div>
      <div className="product-list">{products.map((name,i)=><article className="product" key={name}><span className="number">0{i+1}</span><div className="product-info"><small>{t.categories[i]}</small><h3>{name}</h3><p>{t.descriptions[i]}</p></div><span className="status">{i===4?t.research:t.status}</span><span className="arrow">↗</span></article>)}</div>
    </div></section>
    <section className="wrap section" id="architecture"><div className="section-head"><div><small>{t.osLabel}</small><h2>{t.osTitle1}<br/><em>{t.osTitle2}</em></h2></div><p>{t.osDesc}</p></div>
      <div className="architecture"><div className="arch-core">AMR<small>ECOSYSTEM</small></div>{t.modules.map((m,i)=><span className={`module m${i+1}`} key={m}>{m}</span>)}</div>
    </section>
    <section className="about" id="about"><div className="wrap about-inner"><div><small>{t.aboutLabel}</small><h2>{t.aboutTitle1}<br/><em>{t.aboutTitle2}</em></h2></div><p>{t.aboutDesc}</p></div></section>
    <footer className="wrap footer"><a className="brand" href="#top"><b>AMR</b><span>SYSTEMS</span></a><span>© {new Date().getFullYear()} AMR Systems</span><a href="#top">{t.footer} ↑</a></footer>
  </main>;
}
