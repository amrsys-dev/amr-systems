import Link from "next/link";
import { notFound } from "next/navigation";

const products: Record<string, { name: string; desc: string; status: string; points: string[] }> = {
  self: { name: "Self", desc: "Цифровая визитка и личный кабинет", status: "Dev", points: ["Ссылки на аккаунты", "Настройки видимости", "QR-код", "Локальные модули: виза, задачи, финансы"] },
  cutting: { name: "Cutting", desc: "Оптимизация раскроя листов и профиля", status: "Dev", points: ["2D гильотина", "1D профиль", "Карта раскроя", "Процент использования"] },
  constructor: { name: "3D Constructor", desc: "Проектирование мебели и кухонь", status: "Soon", points: ["Шаблоны", "Параметры", "Библиотека панелей", "Связка с Cutting"] },
  safar: { name: "Safar", desc: "Помощник для СНГ в Саудовской Аравии", status: "Live", points: ["Виза", "Жильё", "Попутчики", "Такси", "eSIM"] },
};

export function generateStaticParams() {
  return Object.keys(products).map(slug => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products[slug];
  if (!p) notFound();

  return (
    <main className="product">
      <nav className="nav">
        <Link href="/" className="logo">AMR</Link>
        <Link href="/#products" className="back">← Продукты</Link>
      </nav>
      <section className="product-hero">
        <span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span>
        <h1>{p.name}</h1>
        <p>{p.desc}</p>
      </section>
      <section className="product-points">
        <h2>Что внутри</h2>
        <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
      </section>
      <footer><Link href="/">AMR Systems</Link></footer>
    </main>
  );
}
