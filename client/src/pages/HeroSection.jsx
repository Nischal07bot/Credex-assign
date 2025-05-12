// src/components/HeroSection.jsx
const HeroSection = () => {
    return (
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Sell Your Unused Software Licenses
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Get instant valuation and cash for your unused software licenses. 
              Fast, secure, and hassle-free process.
            </p>
            <button onClick={handleGetQuote} className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;