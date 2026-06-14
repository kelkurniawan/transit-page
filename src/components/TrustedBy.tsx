const clients = ["Nusantara", "Mega Raya", "Sentosa", "Bandung Co", "Prima Log"];

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <div className="container">
        <p className="trusted-label">DIPERCAYA OLEH</p>
        <div className="trusted-list">
          {clients.map((name) => (
            <span className="trusted-chip" key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
