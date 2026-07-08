import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AnimeCard from "./AnimeCard";

function AnimeRow({ title, anime }) {
  const sliderRef = useRef(null);

  if (!anime || anime.length === 0) return null;

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.85;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative mb-20 group">

      {/* Header */}

      <div className="flex items-center justify-between px-10 mb-8">

        <h2 className="text-4xl font-black tracking-wide">

          {title}

        </h2>

        <button className="text-cyan-400 font-semibold hover:text-white transition">

          View All →

        </button>

      </div>

      {/* Left Gradient */}

      <div className="pointer-events-none absolute left-0 top-20 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20"></div>

      {/* Right Gradient */}

      <div className="pointer-events-none absolute right-0 top-20 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20"></div>

      {/* Left Arrow */}

      <button
        onClick={() => scroll("left")}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-cyan-500 hover:scale-110"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}

      <button
        onClick={() => scroll("right")}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-cyan-500 hover:scale-110"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Cards */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-7
          overflow-x-auto
          px-12
          pb-6
          scroll-smooth
          scrollbar-hide
        "
      >
        {anime.map((item) => (
          <div
            key={item.anime_id}
            className="min-w-[290px] flex-shrink-0 transition duration-300 hover:scale-[1.03]"
          >
            <AnimeCard anime={item} />
          </div>
        ))}
      </div>

    </section>
  );
}

export default AnimeRow;