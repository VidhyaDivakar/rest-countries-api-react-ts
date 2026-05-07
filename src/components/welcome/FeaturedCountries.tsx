import { featuredCountries } from "./featuredCountriesData";
export default function FeatureCountries() {
  const looped = [...featuredCountries, ...featuredCountries];

  return (
    <section className="my-12 overflow-hidden">
      <div className="text-center mb-8 px-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Where will you go next?
        </h2>
        <p className="text-gray-600">
          A taste of what's waiting around the world
        </p>
      </div>

      <div className="relative">
        {/* Soft fade on the left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Soft fade on the right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* The scrolling track */}
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
          {looped.map((country, index) => (
            <article
              key={`${country.name}-${index}`}
              className="flex-shrink-0 w-72 bg-slate-50 rounded-2xl overflow-hidden shadow-md border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={country.imageUrl}
                  alt={`${country.name} landscape`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {country.name}
                </h3>
                <p className="text-sm text-gray-700 italic mb-3">
                  {country.tagline}
                </p>
                <div className="flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span>📍 {country.capital}</span>
                  <span>👥 {country.population}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
