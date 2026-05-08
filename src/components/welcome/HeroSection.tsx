export default function HeroSection() {
  return (
    <section className="flex flex-col items-center pb-4">
      {/* Mobile: shorter image, text below it. Desktop: text overlaid on image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[3/1] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
          alt="Mountain landscape"
          className="w-full h-full object-cover block"
        />
        {/* Gradient only on desktop where text is overlaid */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
        {/* Desktop overlay text — hidden on mobile */}
        <div className="hidden sm:flex absolute inset-0 flex-col items-center justify-end pb-8 px-6 text-center">
          <h1 className="text-4xl font-semibold leading-tight text-gray-800 mb-2">
            Discover the World,
            <br />
            One Country at a Time.
          </h1>
          <p className="text-base leading-relaxed text-gray-700 max-w-md mx-auto">
            Get to know all 250 nations — their people, places, and the little
            things that make each one home.
          </p>
        </div>
      </div>

      {/* Mobile text — sits BELOW the image */}
      <div className="sm:hidden text-center px-6 pt-6 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold leading-tight text-gray-900 mb-3">
          Discover the World,
          <br />
          One Country at a Time.
        </h1>
        <p className="text-sm leading-relaxed text-gray-600">
          Get to know the people, places, and cultures behind every country on
          Earth.
        </p>
      </div>
    </section>
  );
}
