function FeatureCard({ emoji, title, description }) {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl p-8 border border-slate-800 hover:border-cyan-400 hover:scale-105 transition duration-300">

      <div className="text-5xl mb-5">
        {emoji}
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-gray-400 mt-4 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;