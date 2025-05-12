import mongoose from 'mongoose';
const valuationSchema=mongoose.Schema({
    licensetype: { type: String, required: true },
    quantity:    { type: Number, required: true },
    valuation:   { type: String, required: true },
    requestedAt: { type: Date, default: Date.now }
})
const Valuation=mongoose.model('Valuation',valuationSchema);
export default Valuation;