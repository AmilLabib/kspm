import Link from "next/link";

export default function MateriPage() {
  return (
    <div style={{ minHeight: "60vh", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Materi</h1>
        <p style={{ color: "#374151", marginBottom: "1rem" }}>
          This is the Materi page. Add your lesson content, links, or resources here.
        </p>
        <Link href="/" style={{ color: "#2563EB" }}>Back to Home</Link>
      </div>
    </div>
  );
}
