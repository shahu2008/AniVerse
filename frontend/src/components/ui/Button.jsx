function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}) {
  const styles = {
    primary:
      "bg-cyan-500 hover:bg-cyan-600 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;