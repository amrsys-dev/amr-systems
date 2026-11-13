const products = [
  ["01", "AMR 3D Constructor", "DESIGN & CONFIGURATION", "A visual workspace for configuring furniture and shaping product concepts in 3D.", "IN DEVELOPMENT"],
  ["02", "AMR Vision", "MODEL ANALYSIS", "Furniture-model analysis focused on understanding structure and decomposing designs into components.", "IN DEVELOPMENT"],
  ["03", "AMR Cutting", "CUTTING OPTIMIZATION", "A dedicated direction for optimizing the cutting of sheet materials and profiles.", "IN DEVELOPMENT"],
  ["04", "AMR Service Hub", "SERVICE DISCOVERY", "A platform concept for discovering services and matching requests with relevant providers.", "IN DEVELOPMENT"],
  ["05", "AMR Materials", "MATERIALS RESEARCH", "Research and development of composite material solutions.", "RESEARCH"],
];

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top"><b>AMR</b><span>SYSTEMS</span></a>
      <nav><a href="#ecosystem">Ecosystem</a><a href="#products">Products</a><a href="#architecture">Architecture</a><a href="#about">About</a></nav>
      <a className="contact" href="mailto:contact@amrsys.net">Contact ↗</a>
    </header>

    <section className="hero wrap" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><i/> INDEPENDENT TECHNOLOGY ECOSYSTEM</div>
        <h1>Engineering ideas<br/><em>into systems.</em></h1>
        <p>AMR Systems connects focused digital products, intelligent software, and practical solutions for real-world industries.</p>
        <div className="actions"><a className="primary" href="#products">Explore products <span>↘</span></a><a className="secondary" href="#architecture">Our architecture ↗</a></div>
      </div>
      <div className="orbital" aria-label="Abstract diagram of connected technology modules">
        <div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>
        <div className="core"><b>AMR</b><small>SYSTEMS</small></div>
        <span className="node n1">● DESIGN</span><span className="node n2">● ANALYSIS</span><span className="node n3">● OPTIMIZATION</span><span className="node n4">● SERVICES</span>
        <small className="orbit-note">MODULAR BY DESIGN /// BUILT TO CONNECT</small>
      </div>
      <div className="hero-foot"><span>01 / 05</span><span>TECHNOLOGY WITH PURPOSE</span></div>
    </section>

    <div className="statement"><div className="wrap"><small>OUR APPROACH</small><p>One ecosystem. <strong>Independent products.</strong> A shared direction.</p></div></div>

    <section className="wrap section" id="ecosystem">
      <div className="section-head"><div><small>01 — THE ECOSYSTEM</small><h2>Different tools.<br/><em>Connected thinking.</em></h2></div><p>We build a family of focused products. Each solves a distinct problem while following a common architectural approach.</p></div>
      <div className="principles">
        <article><small>01</small><h3>Independent modules</h3><p>Each product has its own purpose and can evolve independently.</p></article>
        <article><small>02</small><h3>Connected architecture</h3><p>Clear interfaces connect modules without forcing them into one application.</p></article>
        <article><small>03</small><h3>Practical engineering</h3><p>Development is guided by real workflows, measurable outcomes, and honest capabilities.</p></article>
      </div>
    </section>

    <section className="products" id="products"><div className="wrap section">
      <div className="section-head"><div><small>02 — PRODUCT PORTFOLIO</small><h2>Built around<br/><em>real disciplines.</em></h2></div><p>Five distinct directions within the AMR ecosystem. Descriptions reflect current development scope, not promises of finished functionality.</p></div>
      <div className="product-list">{products.map(([num,name,category,desc,status])=><article className="product" key={num}>
        <span className="number">{num}</span><div className="product-info"><small>{category}</small><h3>{name}</h3><p>{desc}</p></div><span className="status">{status}</span><span className="arrow">↗</span>
      </article>)}</div>
    </div></section>

    <section className="wrap section" id="architecture">
      <div className="section-head"><div><small>03 — AMR OS</small><h2>A modular<br/><em>system of systems.</em></h2></div><p>AMR OS is the architectural direction behind the ecosystem: autonomous applications connected through explicit interfaces and shared navigation.</p></div>
      <div className="architecture"><div className="arch-core">AMR<small>ECOSYSTEM</small></div><span className="module m1">CONSTRUCTOR</span><span className="module m2">VISION</span><span className="module m3">CUTTING</span><span className="module m4">SERVICE HUB</span><span className="module m5">MATERIALS</span></div>
    </section>

    <section className="about" id="about"><div className="wrap about-inner"><div><small>04 — ABOUT AMR</small><h2>Technology should<br/><em>solve something real.</em></h2></div><p>AMR Systems is developing an interconnected portfolio of digital products shaped by practical industry experience. We value clear architecture, useful tools, and progress that can be demonstrated.</p></div></section>
    <footer className="wrap footer"><a className="brand" href="#top"><b>AMR</b><span>SYSTEMS</span></a><span>© {new Date().getFullYear()} AMR Systems</span><a href="#top">Back to top ↑</a></footer>
  </main>;
}
