const API_URI='http://localhost:3000/api';
export const api={
    getQuote:async(data)=>{
        try{
            const response=await fetch(`${API_URI}/compute`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data)
            })
            if(!response.ok){
                throw new Error("Failed to fetch the quote");
            }
            const result=await response.json();
            return result;
        }
        catch(error){
            throw new Error("Failed to fetch the quote");
        }
    },
    acceptQuote:async(data)=>{
        try{
            const response=await fetch(`${API_URI}/leads/quote`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data)
            })
            if(!response.ok){
                throw new Error("Failed to accept the quote");
            }
            const result=await response.json();
            return result;
        }
        catch(error){
            throw new Error("Failed to accept the quote");
        }
    }
}