// src/components/HeroSection.
// jsx
import {useState} from 'react';
import {api} from '../Services/api';
import {useAuth} from '../context/AuthContext.jsx';
import { FaShieldAlt, FaMoneyBillWave, FaClock, FaUserTie } from 'react-icons/fa';
import {SiChatbot} from 'react-icons/si';
import {motion} from 'framer-motion';
import {useEffect} from 'react';
const HeroSection = () => {
    const {user, logout} = useAuth();
    const [formData,setFormData]=useState({
        licensetype:'',
        quantity:1
    });
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
    });
    const [quoteResult, setQuoteResult] = useState(null);//for getting the quote result
    const [isLoading, setIsLoading] = useState(false);//for getting the modal loading
    const [showModal,setShowModal]=useState(false);
    const [clickedtest1,setClickedtest1]=useState(false);
    const [clickedtest2,setClickedtest2]=useState(false);
    const [clickedtest3,setClickedtest3]=useState(false);
    const [showChat,setshowChat]=useState(false);
    const [showHelpbubble,setshowHelpbubble]=useState(false);
    useEffect(()=>{
        if(showChat)
        {
            setshowHelpbubble(false);
        }
        else{
            setshowHelpbubble(true);
        }
    },[showChat])
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
                quote:quoteResult.estimatedValue || quoteResult.value || 'N/A',
                licensetype:formData.licensetype,
                quantity:formData.quantity
            });
            console.log(result);
        }
        catch(error){
            console.log(error);
            alert("An error occurred while accepting the quote. Please try again.");
        }
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add your contact form submission logic here
            console.log('Contact form submitted:', contactForm);
            alert('Thank you for your message. We will get back to you soon!');
            setContactForm({
                name: '',
                email: '',
                company: '',
                licenseType: '',
                message: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to send message. Please try again.');
        }
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="relative min-h-screen  w-screen bg-gradient-to-r from-blue-600 to-indigo-700 overflow-x-hidden">
            {/* Logout Button */}
            <div className="absolute top-4 right-4 z-50 px-4 py-2">
                <button
                    onClick={logout}
                    className="!bg-white !text-indigo-600 ring-2 ring-white px-4 py-2 rounded-lg font-semibold hover:!bg-red-600 hover:!text-white transition-all duration-300 ease-in-out"
                >
                    Logout
                </button>
            </div>
            <div className="group fixed bottom-4 right-4 z-50">
            
                <button

                onClick={() => setshowChat(!showChat)}
                className="fixed bottom-4 right-4 z-50 bg-white text-indigo-600 rounded-full p-4 ring-2 ring-white hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center animate-pulse">
                <SiChatbot className="w-8 h-8" />
                </button>
                {showHelpbubble && (
    <div className="fixed bottom-20 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md z-40 animate-bounce">
        Need help? 👋
    </div>
)}
                
            </div>
            {/* Hero Section */}
            <div className=" w-full px-6 py-16">
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
                                className="w-full px-4 py-2 rounded-lg focus:outline-none ring-2 focus:ring-white"
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
                        <motion.div
                        initial={{opacity:0,y:100}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:2,ease:'easeOut'}}
                        className="mt-8 bg-white rounded-lg p-6 shadow-lg"
                        >
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
                        </motion.div>
                        
                    )}
                </div>
            </div>

            {/* Why Choose Us Section */}
            
    {/* "Why Choose Us" content */}
    <div className="w-full bg-white py-16">
    <div className="w-full mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
    initial={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    onClick={() => setClickedtest1(!clickedtest1)}
    animate={{
        scale: clickedtest1 ? 1.1 : 1, // Scale up when clicked
        opacity: clickedtest1 ? 0.9 : 1, // Reduce opacity when clicked
        zIndex: clickedtest1 ? 10 : 1, // Bring to front when clicked
    }}
>
                        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition duration-300">
                            <FaShieldAlt className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                            <h3 className="text-xl text-gray-800 font-semibold mb-2">Secure Transactions</h3>
                            <p className="text-gray-600">Bank-level security for all your transactions and data protection.</p>
                        </div>
                        </motion.div>
                        <motion.div
    initial={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    onClick={() => setClickedtest2(!clickedtest2)}
    animate={{
        scale: clickedtest2 ? 1.1 : 1, // Scale up when clicked
        opacity: clickedtest2 ? 0.9 : 1, // Reduce opacity when clicked
        zIndex: clickedtest2 ? 10 : 1, // Bring to front when clicked
    }}
>
                        
                        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition duration-300">
                            <FaMoneyBillWave className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                            <h3 className="text-xl text-gray-800 font-semibold mb-2">Best Market Rates</h3>
                            <p className="text-gray-600">Get the highest value for your software licenses in the market.</p>
                        </div>
                        </motion.div>
                        <motion.div
    initial={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    onClick={() => setClickedtest3(!clickedtest3)}
    animate={{
        scale: clickedtest3 ? 1.1 : 1, // Scale up when clicked
        opacity: clickedtest3 ? 0.9 : 1, // Reduce opacity when clicked
        zIndex: clickedtest3 ? 10 : 1, // Bring to front when clicked
    }}
>
                        
                        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition duration-300">
                            <FaClock className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                            <h3 className="text-xl text-gray-800 font-semibold mb-2">Quick Process</h3>
                            <p className="text-gray-600">Fast verification and payment within 24-48 hours.</p>
                        </div>
                        </motion.div>
                    </div>
                </div>

</div>

            {/* Testimonials Section */}
            <div className="w-full bg-gray-50 py-16">
                <div className="w-full mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <FaUserTie className="w-10 h-10 text-indigo-600 mr-4" />
                                <div>
                                    <h4 className="font-semibold">John Smith</h4>
                                    <p className="text-gray-600">CTO, TechCorp Inc.</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"SoftSell helped us recover significant value from our unused licenses. The process was smooth and professional."</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <FaUserTie className="w-10 h-10 text-indigo-600 mr-4" />
                                <div>
                                    <h4 className="font-semibold">Sarah Johnson</h4>
                                    <p className="text-gray-600">IT Director, Global Solutions</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"Excellent service and competitive rates. We've used SoftSell multiple times for our license management needs."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="w-full bg-white py-16">
                <div className="w-full mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={contactForm.company}
                                    onChange={handleContactChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">License Type</label>
                                <select
                                    name="licenseType"
                                    value={contactForm.licenseType}
                                    onChange={handleContactChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option className="text-gray-800" value="">Select License Type</option>
                                    <option className="text-gray-800" value="Microsoft">Basic</option>
                                    <option className="text-gray-800" value="Adobe">Professional</option>
                                    <option className="text-gray-800" value="Autodesk">Enterprise</option>
                                    <option className="text-gray-800" value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    rows="4"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default HeroSection;