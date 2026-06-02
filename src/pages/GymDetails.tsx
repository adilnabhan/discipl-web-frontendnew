import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, Instagram, Globe, Check, AlertCircle, Clock, ChevronRight } from 'lucide-react';

const GymDetails = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock detailed gym object (could be fetched from http://localhost:8000/api/v1/fitnesscenter/organization/<id>/)
  const gymData = {
    id: id || "1",
    name: "Iron Forge Athletics",
    subtitle: "Premium Strength & Conditioning Arena",
    location: "Indiranagar, Bangalore",
    rating: 4.9,
    reviews: 142,
    verified: true,
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    logoImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=150",
    phone: "+91 98765 43210",
    email: "info@ironforge.com",
    instagram: "@ironforge_athletics",
    website: "www.ironforgeathletics.in",
    description: "Welcome to Iron Forge Athletics, Bangalore's premier conditioning gym. We feature 15,000 sq. ft. of elite training space equipped with specialized Rogue power racks, eleiko weightlifting platforms, premium cardio units, and a dedicated athletic recovery lounge.",
    amenities: [
      "Olympic Lifting Platforms",
      "Specialized Strength Rigs",
      "Athletic Recovery Suite",
      "Certified Strength Coaches",
      "Locker Rooms & Showers",
      "Healthy Smoothie Bar"
    ],
    plans: [
      {
        id: "standard",
        name: "Standard Monthly",
        price: "₹2,499",
        period: "per month",
        description: "Ideal for self-guided gym training and access to all standard weightlifting equipment.",
        features: ["Unlimited floor gym access", "Locker room & shower access", "1 trainer orientation session"],
        highlighted: false
      },
      {
        id: "elite",
        name: "Elite Quarterly",
        price: "₹6,499",
        period: "per quarter",
        description: "Our most popular tier. Includes group classes, specialty conditioning spaces, and guidance.",
        features: ["Everything in Standard", "Access to all Group Classes", "2 personal coaching sessions/mo", "Recovery suite access (1/mo)", "Ramadan Night Session entry"],
        highlighted: true
      },
      {
        id: "pro",
        name: "Annual Pro Pass",
        price: "₹22,000",
        period: "per year",
        description: "Ultimate commitment. Unlimited specialty facilities, direct trainer messaging, and premium perks.",
        features: ["24/7 Priority access", "Unlimited Group & CrossFit classes", "Weekly personal training support", "Unlimited Recovery suite", "Customized nutrition & BMR tracking"],
        highlighted: false
      }
    ],
    slots: [
      {
        id: "slot1",
        name: "Morning Olympic Lifting",
        time: "6:00 AM - 8:00 AM",
        type: "Coached Session",
        status: "expired"
      },
      {
        id: "slot2",
        name: "Open Gym Floor",
        time: "8:00 AM - 12:00 PM",
        type: "Free Training",
        status: "live"
      },
      {
        id: "slot3",
        name: "Noon Cardio Blast",
        time: "12:00 PM - 2:00 PM",
        type: "Group HIIT",
        status: "live"
      },
      {
        id: "slot4",
        name: "Evening Strength Club",
        time: "4:00 PM - 7:00 PM",
        type: "Coached Session",
        status: "scheduled"
      },
      {
        id: "slot5",
        name: "Ramadan Night Workout",
        time: "9:00 PM - 11:30 PM",
        type: "Seasonal Special",
        status: "ramadan",
        dateRange: "1 March - 30 March"
      }
    ]
  };

  const handleRequestMembership = (planName: string) => {
    alert(`Membership request for "${planName}" submitted successfully! A manager from ${gymData.name} will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#111827] pb-24">
      {/* Gym Banner Hero */}
      <section className="relative h-[400px] w-full bg-[#111827] overflow-hidden">
        <img
          src={gymData.bannerImage}
          alt={gymData.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
      </section>

      {/* Profile Overview Container */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Logo overlay */}
            <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-white shadow-md flex-shrink-0">
              <img src={gymData.logoImage} alt={gymData.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">{gymData.name}</h1>
                {gymData.verified && (
                  <div className="bg-emerald-50 border border-emerald-300/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Verified Elite</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 font-medium text-lg">{gymData.subtitle}</p>
              <p className="text-sm text-gray-400 font-normal">{gymData.location}</p>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="grid grid-cols-2 gap-4 text-sm border-t md:border-t-0 md:border-l border-[#E5E7EB] pt-6 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-[#DC2626]" />
              <span>{gymData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4 text-[#DC2626]" />
              <span>{gymData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Instagram className="w-4 h-4 text-[#DC2626]" />
              <span>{gymData.instagram}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-4 h-4 text-[#DC2626]" />
              <span>{gymData.website}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Description & Slots left, Plans right */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Gym */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4 tracking-tight">About the Facility</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{gymData.description}</p>
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Core Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gymData.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Today's Schedule & Slots</h2>
                <p className="text-xs text-gray-500 mt-1">Live active floor session tracking</p>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {gymData.slots.map((slot) => {
                let badge = null;
                let cardStyle = "border-[#E5E7EB]";
                let textStyle = "text-gray-900";
                
                if (slot.status === 'live') {
                  badge = (
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                      LIVE Now
                    </span>
                  );
                  cardStyle = "border-emerald-300/40 bg-emerald-50/10 shadow-sm";
                } else if (slot.status === 'ramadan') {
                  badge = (
                    <span className="bg-red-50 text-[#DC2626] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-red-100">
                      Ramadan Night Session
                    </span>
                  );
                  cardStyle = "border-red-200 bg-red-50/5";
                } else if (slot.status === 'expired') {
                  badge = (
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Finished
                    </span>
                  );
                  cardStyle = "opacity-50 border-dashed bg-gray-50/30";
                  textStyle = "text-gray-400";
                } else {
                  badge = (
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-blue-100">
                      Scheduled
                    </span>
                  );
                }

                return (
                  <div key={slot.id} className={`border rounded-xl p-4 flex justify-between items-center transition-all ${cardStyle}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-base ${textStyle}`}>{slot.name}</h4>
                        {slot.dateRange && (
                          <span className="text-[10px] text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                            {slot.dateRange}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="font-semibold">{slot.time}</span>
                        <span>•</span>
                        <span>{slot.type}</span>
                      </div>
                    </div>
                    {badge}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Column (Membership Plans) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 tracking-tight">Select Membership</h2>
            <div className="space-y-4">
              {gymData.plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-[#DC2626] bg-red-50/5 ring-1 ring-[#DC2626]"
                      : plan.highlighted
                      ? "border-amber-300 bg-amber-50/10 shadow-sm"
                      : "border-[#E5E7EB] hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-extrabold text-gray-900">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 uppercase px-2 py-0.5 rounded tracking-wide">
                          Best Value
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-gray-900">{plan.price}</span>
                      <p className="text-[10px] text-gray-400">{plan.period}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
                  
                  <div className="space-y-1.5 mb-4">
                    {plan.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className="text-[10px] text-[#DC2626] font-semibold pl-5">
                        +{plan.features.length - 3} more elite benefits
                      </p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestMembership(plan.name);
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      plan.highlighted
                        ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                        : "border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                    }`}
                  >
                    Request Membership
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2 bg-gray-50 rounded-lg p-3 text-xs text-gray-500 border border-gray-100">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Payments are processed securely. A platform fee of ₹4 applies to registration.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GymDetails;
