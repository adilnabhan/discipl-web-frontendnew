import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Dumbbell, Sparkles, ArrowRight, Star, MapPin } from 'lucide-react';

const Home = () => {
  const featuredGyms = [
    {
      id: 1,
      name: "Iron Forge Athletics",
      category: "Strength & Conditioning",
      location: "Indiranagar, Bangalore",
      rating: 4.9,
      reviews: 142,
      price: "₹2,499/mo",
      verified: true,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      name: "Zen Wellness & Yoga",
      category: "Mind & Body",
      location: "Jayanagar, Bangalore",
      rating: 4.8,
      reviews: 96,
      price: "₹1,899/mo",
      verified: true,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      name: "CrossFit Beast Mode",
      category: "Functional Fitness",
      location: "Koramangala, Bangalore",
      rating: 4.7,
      reviews: 118,
      price: "₹3,200/mo",
      verified: false,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#111827]">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#111827] text-white">
        {/* Dynamic Abstract Shapes for Modern Luxury */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-[#111827]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Hero Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: `radial-gradient(#DC2626 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#DC2626]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">Elite Fitness Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-none">
            Transforming Fitness Management <br />
            <span className="text-[#DC2626] bg-clip-text">for the Modern Era</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            Discover premium gyms, trainers and memberships across India. Connect with the ultimate performance fitness centers powered by state-of-the-art technology.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/fitness-directory"
              className="group bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(220,38,38,0.3)] inline-flex items-center gap-2"
            >
              Explore Gyms
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="border border-[#374151] hover:border-white text-white hover:bg-white/5 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "250+", label: "Elite Gyms" },
              { num: "50k+", label: "Active Members" },
              { num: "1,200+", label: "Certified Trainers" },
              { num: "99.9%", label: "Slot Booking Success" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl md:text-4xl font-extrabold text-[#111827]">{stat.num}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Gyms Directory Preview */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
                Featured Elite Gyms
              </h2>
              <p className="text-[#4B5563] mt-2 max-w-xl">
                Carefully curated premium spaces featuring cutting-edge layouts, professional gear, and elite coaching.
              </p>
            </div>
            <Link
              to="/fitness-directory"
              className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-2 group text-sm md:text-base"
            >
              Browse Full Directory
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGyms.map((gym) => (
              <Link
                key={gym.id}
                to={`/gym/${gym.id}`}
                className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-red-500/20 block"
              >
                {/* Gym Cover Image */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {gym.verified && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Verified Elite</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-[#111827]/85 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold">
                    {gym.price}
                  </div>
                </div>

                {/* Gym Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-1 rounded-md">
                      {gym.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-700">{gym.rating}</span>
                      <span className="text-[11px] text-gray-400">({gym.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#DC2626] transition-colors mb-2">
                    {gym.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{gym.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <span className="text-xs font-medium text-gray-400">View detailed schedule & tiers</span>
                    <span className="text-sm font-bold text-[#DC2626] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate trust and precision partners banner */}
      <section className="py-16 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-8">Trusted by Elite Communities & Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            <span className="font-extrabold text-2xl tracking-tighter">STRIPE</span>
            <span className="font-black text-2xl italic tracking-tight">NIKE.FIT</span>
            <span className="font-extrabold text-2xl tracking-wider">CLASSPASS</span>
            <span className="font-bold text-2xl tracking-widest">NOTION</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;