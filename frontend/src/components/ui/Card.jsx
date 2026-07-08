function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-3xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;