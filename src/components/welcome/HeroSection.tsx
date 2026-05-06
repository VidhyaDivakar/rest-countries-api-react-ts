export default function HeroSection() {
  return (
    <section className="flex flex-col items-center pb-4">
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
          alt="Mountain landscape"
          className="w-full h-full object-cover block"
        />
        {/* White fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 px-6 text-center">
          <h1 className="text-4xl font-semibold leading-tight text-gray-800 mb-2">
            Discover the World,
            <br />
            One Country at a Time.
          </h1>
          <p className="text-base leading-relaxed text-gray-700 max-w-md mx-auto">
            Explore comprehensive data on over 250 nations, from population and
            geography to cultural details.
          </p>
        </div>
      </div>
    </section>
  );
}
