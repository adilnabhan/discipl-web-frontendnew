import React, { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Clock, Dumbbell, Users, Filter, Search, Loader } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface GymItem {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
  category: string;
  amenities: string[];
  hours: string;
  membership: string;
  image: string;
}

import { useNavigate } from 'react-router-dom';

const FitnessDirectory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultMockGyms: GymItem[] = [
    {
      id: 1,
      name: "Iron Paradise Gym",
      description: "State-of-the-art equipment and professional trainers for serious fitness enthusiasts. Specializing in strength training and bodybuilding.",
      address: "123 Muscle Street, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      reviews: 245,
      category: "Gym",
      amenities: ["Free Weights", "Cardio Equipment", "Personal Training", "Locker Rooms"],
      hours: "5:00 AM - 11:00 PM",
      membership: "₹2,499/mo",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      name: "Zen Wellness Studio",
      description: "Peaceful environment focused on yoga, meditation, and holistic wellness practices. Perfect for mind-body connection.",
      address: "456 Serenity Lane, Uptown",
      phone: "(555) 987-6543",
      rating: 4.9,
      reviews: 189,
      category: "Yoga",
      amenities: ["Yoga Classes", "Meditation Room", "Massage Therapy", "Wellness Workshops"],
      hours: "6:00 AM - 9:00 PM",
      membership: "₹1,899/mo",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      name: "CrossFit Beast Mode",
      description: "High-intensity functional fitness training with experienced coaches. Build strength, endurance, and community.",
      address: "789 Power Avenue, Industrial District",
      phone: "(555) 456-7890",
      rating: 4.7,
      reviews: 156,
      category: "CrossFit",
      amenities: ["CrossFit Classes", "Olympic Lifting", "Metabolic Conditioning", "Nutrition Coaching"],
      hours: "5:30 AM - 10:00 PM",
      membership: "₹3,200/mo",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
    }
  ];

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fitnesscenter/gym/list/`);
        // The API returns paginated results under "results" or direct array
        const list = response.data.results || response.data;
        if (Array.isArray(list) && list.length > 0) {
          const mapped = list.map((g: any) => {
            const city = g.location?.city || '';
            const state = g.location?.state || '';
            const building = g.location?.building_name || '';
            const addr = [building, city, state].filter(Boolean).join(', ') || 'Bangalore, India';
            
            return {
              id: g.id,
              name: g.name,
              description: g.description || 'Premium fitness arena, fully customized for top-tier training performance.',
              address: addr,
              phone: g.phone_number || '+91 99000 12345',
              rating: Number(g.average_rating) || 4.8,
              reviews: g.review_count || 12,
              category: g.categories?.[0]?.name || 'Gym',
              amenities: ["Free Weights", "Cardio Units", "Trainer Guided"],
              hours: "6:00 AM - 10:00 PM",
              membership: "₹2,499/mo",
              image: g.logo || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
            };
          });
          setGyms(mapped);
        } else {
          // Fallback if the database has no gyms yet
          setGyms(defaultMockGyms);
        }
      } catch (err) {
        console.warn("Failed to fetch from Django API, falling back to mock dataset:", err);
        setGyms(defaultMockGyms);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  const categories = ['All', 'Gym', 'Yoga', 'CrossFit', 'Swimming', 'Dance', 'Sports Training', 'Pilates'];

  const filteredDirectories = gyms.filter(directory => {
    const matchesCategory = selectedCategory === 'All' || 
      directory.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Gym' && (directory.category.toLowerCase() === 'gym' || directory.category.toLowerCase() === 'strength'));
      
    const matchesSearch = searchTerm === '' || 
      directory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Gym': 'bg-red-100 text-red-800',
      'Yoga': 'bg-green-100 text-green-800',
      'CrossFit': 'bg-orange-100 text-orange-800',
      'Swimming': 'bg-blue-100 text-blue-800',
      'Dance': 'bg-pink-100 text-pink-800',
      'Sports Training': 'bg-purple-100 text-purple-800',
      'Pilates': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 text-black  sm: h-[15rem] md: h-[15rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fitness <span className="text-red-500">Directory</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
              Find the perfect fitness center that matches your goals and lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              Browse Fitness Centers
            </h2>
            <div className="flex items-center text-gray-600">
              <Filter className="w-5 h-5 mr-2" />
              <span>{filteredDirectories.length} results</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fitness centers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            {searchTerm && (
              <div className="mt-2 text-gray-600 text-sm">
                Found {filteredDirectories.length} center{filteredDirectories.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </div>
            )}
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader className="w-12 h-12 text-red-500 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Fetching fitness centers from database...</p>
            </div>
          ) : filteredDirectories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Dumbbell className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No fitness centers found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'No centers match your current filters. Try adjusting your search or category selection.' 
                  : 'No fitness centers available at the moment.'}
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDirectories.map((directory) => (
              <div
                key={directory.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={directory.image}
                    alt={directory.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(directory.category)}`}>
                      {directory.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-lg font-bold text-red-500">{directory.membership}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-black">
                      {directory.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {directory.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {directory.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.address}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.hours}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.reviews} reviews</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {directory.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {directory.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{directory.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/gym/${directory.id}`)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 text-sm"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Own a Fitness Center?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our directory and connect with fitness enthusiasts in your area
          </p>
          <button className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200">
            List Your Business
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default FitnessDirectory;