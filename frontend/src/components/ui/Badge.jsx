function Badge({ children, color = "cyan" }) {
  const colors = {
    cyan: "bg-cyan-500",
    yellow: "bg-yellow-500 text-black",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  return (
    <span
      className={`${colors[color]} px-3 py-1 rounded-full text-sm font-bold`}
    >
      {children}
    </span>
  );
}

export default Badge;