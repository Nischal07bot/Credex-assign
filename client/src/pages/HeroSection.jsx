// src/components/HeroSection.
// jsx
import {useState} from 'react';
import {api} from '../Services/api';
import {useAuth} from '../context/AuthContext.jsx';

const HeroSection = () => {
    const {user, logout} = useAuth();
    const [formData,setFormData]=useState({
        licensetype:'',
        quantity:1
    });
    const [quoteResult, setQuoteResult] = useState(null);//for getting the quote result
    const [isLoading, setIsLoading] = useState(false);//for getting the modal loading
    const [showModal,setShowModal]=useState(false);
    const handleChange=(e)=>{//handling on the input change
        const {name,value}=e.target;
        setFormData(prev =>({
            ...prev,
            [name]:value
        })
        )
    }
    const handleGetQuote=async(e)=>{
       e.preventDefault();//js function to prevent the default behaviour of the form 
       setIsLoading(true);//setting the loading to true
       setQuoteResult(null);//clearing the previous result
       setShowModal(true);
       try{
        const result=await api.getQuote({
            licensetype:formData.licensetype,
            quantity:formData.quantity
        });
        console.log(result);
        setQuoteResult(result);
        setIsLoading(false);
       }
       catch(error)
       {
        console.log(error);
        setIsLoading(false);
        alert("An error occurred while getting the quote. Please try again.");
       }
    }
    const handleAcceptQuote=async()=>{
        try{
            const result=await api.acceptQuote({
                email:user.email,
                quote:quoteResult.estimatedValue || quoteResult.value || 'N/A'
            });
            console.log(result);
        }
        catch(error){
            console.log(error);
            alert("An error occurred while accepting the quote. Please try again.");
        }
    }
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-16">
                {/* Add Logout Button */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={logout}
                        className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Sell Your Unused Software Licenses
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Get instant valuation and cash for your unused software licenses. 
                        Fast, secure, and hassle-free process.
                    </p>
                    
                    <form onSubmit={handleGetQuote} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="licensetype"
                                value={formData.licensetype}
                                onChange={handleChange}
                                placeholder="Enter software license type"
                                className="w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-white"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Number of licenses"
                                min="1"
                                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Getting Quote...' : 'Get a Quote'}
                        </button>
                    </form>

                    {/* Quote Result Display */}
                    {quoteResult && (
                        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Your Quote Result</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-indigo-600">License Type:</span>
                                    <span className="font-semibold text-indigo-600">{formData.licensetype}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-indigo-600">Quantity:</span>
                                    <span className="font-semibold text-indigo-600">{formData.quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-indigo-600">Estimated Value:</span>
                                    <span className="font-semibold text-green-600">
                                        ${quoteResult.estimatedValue || quoteResult.value || 'N/A'}
                                    </span>
                                </div>
                                {quoteResult.validityPeriod && (
                                    <div className="flex justify-between">
                                        <span className="text-indigo-600">Quote Valid Until:</span>
                                        <span className="font-semibold text-indigo-600">{quoteResult.validityPeriod}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6">
                                <button 
                                    className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                                    onClick={() => {
                                        // Add your accept quote logic here
                                        handleAcceptQuote();
                                        alert('Quote accepted! Our team will contact you shortly.');
                                    }}
                                >
                                    Accept Quote
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  };
  
  export default HeroSection;