"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const products = [
  { slug: "safar", name: "Safar", desc: "Помощник для СНГ в Саудовской Аравии", status: "Live", href: "https://amr-safar.vercel.app" },
  { slug: "self", name: "Self", desc: "Цифровая визитка и личный кабинет", status: "Dev" },
  { slug: "cutting", name: "Cutting", desc: "Оптимизация раскроя листов и профиля", status: "Dev" },
  { slug: "constructor", name: "3D Constructor", desc: "Проектирование мебели и кухонь", status: "Soon" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <main>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">AMR</Link>
        <div className="nav-links">
          <a href="#products">Продукты</a>
          <a href="#about">О нас</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1>Одна экосистема.<br/>Бесконечные возможности.</h1>
          <p>Цифровые продукты для дома, ремесла и жизни.</p>
          <a href="#products" className="btn">Смотреть продукты</a>
        </div>
      </section>

      <section id="products" className="products">
        <h2>Продукты</h2>
        <div className="grid">
          {products.map(p => (
            <Link key={p.slug} href={p.href || `/products/${p.slug}`} className="card">
              <span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <h2>AMR Systems</h2>
        <p>Независимые продукты. Общая архитектура. Практичные решения.</p>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} AMR Systems</span>
      </footer>
    </main>
  );
}
