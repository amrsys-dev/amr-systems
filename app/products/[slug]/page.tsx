import Link from "next/link";
import { notFound } from "next/navigation";

const products = {
  "3d-constructor": {
    name: "AMR 3D Constructor",
    discipline: "FURNITURE DESIGN & CONFIGURATION",
    status: "IN DEVELOPMENT",
    summary: "A visual workspace for building furniture projects from configurable blocks and components.",
    purpose: "The Constructor is the project-building layer of the AMR furniture workflow. It is intended to let a user assemble a furniture concept from defined modules and components instead of drawing every element from scratch.",
    scope: ["Furniture projects assembled from reusable blocks", "Configurable dimensions and component properties", "Structured project data prepared for downstream analysis"],
    next: "The first milestone is a small, reliable library of furniture blocks and a repeatable project structure that can be tested against real furniture."
  },
  vision: {
    name: "AMR Vision",
    discipline: "FURNITURE MODEL ANALYSIS",
    status: "IN DEVELOPMENT",
    summary: "A furniture analysis engine focused on model structure, component decomposition, and calculation data.",
    purpose: "Vision is intended to interpret structured furniture-project data, identify component relationships, and prepare a reliable breakdown for material, hardware, and manufacturing calculations.",
    scope: ["Structural and component decomposition", "Relationships between parts and assemblies", "Structured outputs for downstream cutting and calculation"],
    next: "The first proof is a dependable decomposition of real projects created in AMR 3D Constructor. Broad automatic recognition is deliberately out of scope for the first milestone."
  },
  cutting: {
    name: "AMR Cutting",
    discipline: "CUTTING OPTIMIZATION",
    status: "IN DEVELOPMENT",
    summary: "A dedicated tool direction for arranging cuts on sheet materials and linear profiles.",
    purpose: "Cutting receives structured part dimensions and material information, then helps organize an efficient cutting layout. It is a separate application in the AMR workflow.",
    scope: ["Sheet-material cutting layouts", "Linear profile cutting direction", "Use of structured part dimensions and material data"],
    next: "The priority is to verify the data handoff from Vision and produce usable layouts for real furniture jobs."
  },
  "service-hub": {
    name: "AMR Service Hub",
    discipline: "SERVICE DISCOVERY & MATCHING",
    status: "IN DEVELOPMENT",
    summary: "A platform for discovering service providers and matching incoming requests with relevant executors.",
    purpose: "Service Hub helps customers find relevant providers based on service category and request context. It connects the parties; it does not set their prices, process their agreements, or act as a financial intermediary.",
    scope: ["Service and provider discovery", "Request routing to relevant executors", "Independent communication and agreement between the parties"],
    next: "The focus is on reliable request classification, provider relevance, and clear communication flows."
  },
  self: {
    name: "AMR SELF",
    discipline: "PERSONAL DIGITAL IDENTITY",
    status: "IN DEVELOPMENT",
    summary: "A personal digital identity and contact hub for presenting and sharing essential information.",
    purpose: "SELF is designed as a compact digital profile that brings a person's key contact details and selected links together in one shareable place.",
    scope: ["Personal profile and identity presentation", "Centralized contact details and selected links", "A simple destination for sharing professional presence"],
    next: "The priority is a clean profile experience that works well on mobile and makes sharing contact information straightforward."
  },
  safar: {
    name: "AMR SAFAR",
    discipline: "TRAVEL UTILITIES",
    status: "IN DEVELOPMENT",
    summary: "A travel utility direction focused on visa countdowns, route and fuel calculations, and ride-request discovery.",
    purpose: "SAFAR brings practical travel helpers into one accessible experience, including tools and community information useful for journeys in and around Saudi Arabia.",
    scope: ["Visa-expiry countdown utility", "Route distance, estimated travel time, and fuel-use calculations", "Discovery of travel and shared-ride requests"],
    next: "The priority is to keep travel information clear and useful, and to distinguish calculated estimates from user-submitted listings."
  }
} as const;

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];
  if (!product) notFound();

  return (
    <main className="product-page">
      <header className="topbar">
        <Link className="brand" href="/"><b>AMR</b><span>SYSTEMS</span></Link>
        <Link className="contact" href="/#products">← All products</Link>
      </header>
      <section className="wrap product-hero">
        <div className="eyebrow"><i /> {product.discipline}</div>
        <div className="product-hero-grid">
          <div>
            <div className="product-status-line">{product.status}</div>
            <h1>{product.name}</h1>
            <p className="product-lead">{product.summary}</p>
          </div>
          <div className="product-mark" aria-hidden="true"><span>AMR</span><small>/{slug.toUpperCase()}</small></div>
        </div>
      </section>
      <section className="wrap product-detail-section">
        <div className="detail-label">01 — PURPOSE</div>
        <div><h2>What this product is for</h2><p>{product.purpose}</p></div>
      </section>
      <section className="product-detail-band">
        <div className="wrap product-detail-section">
          <div className="detail-label">02 — SCOPE</div>
          <div><h2>Defined focus</h2><ul>{product.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>
      <section className="wrap product-detail-section">
        <div className="detail-label">03 — NEXT MILESTONE</div>
        <div><h2>Development direction</h2><p>{product.next}</p></div>
      </section>
      <footer className="wrap footer"><Link className="brand" href="/"><b>AMR</b><span>SYSTEMS</span></Link><span>© {new Date().getFullYear()} AMR Systems</span><Link href="/#products">Ecosystem overview ↑</Link></footer>
    </main>
  );
}
