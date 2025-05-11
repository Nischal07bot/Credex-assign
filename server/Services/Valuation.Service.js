export const computeValuation=(type, qty) =>{
    const base = { Basic: 10, Professional: 20, Enterprise: 30 }[type] || 10;
    const raw = base * qty;
    const fuzz = raw * (Math.random() * 0.2 - 0.1);
    return `$${Math.round(raw + fuzz)}`;
  }
  