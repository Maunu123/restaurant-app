import { createContext, useEffect ,useState} from "react";
import axios from 'axios'
export const StoreContext= createContext(null)

const StoreContextProvider= (props) => {


    
    const [cartItems,setCartItems] = useState({}); 
    const url=(import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "")
    const [token,setToken] =useState(localStorage.getItem("token")||"")
    const [food_list,setFoodList]=useState([])
    const [foodLoading,setFoodLoading]=useState(true)
    const [foodError,setFoodError]=useState("")

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
    
            await axios.post(url + "/api/cart/add" , { itemId } , {headers: { token }
            })
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                if (itemInfo) totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList= async () => {
        setFoodLoading(true)
        setFoodError("")
        try {
            const response = await axios.get(url+"/api/food/list", { timeout: 15000 });
            if (!response.data.success || !Array.isArray(response.data.data)) {
                throw new Error("Invalid food list response")
            }
            setFoodList(response.data.data)
        } catch {
            setFoodError("Unable to load the menu. Please try again shortly.")
        } finally {
            setFoodLoading(false)
        }
    }

    const loadCartData=async (token) => {
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            try {
                await loadCartData(localStorage.getItem("token"));
            } catch (error) {
                console.error("Unable to load saved cart:", error.message);
            }
            }

        }
        loadData();
    },[])

    

    const contextValue={
        food_list,
        foodLoading,
        foodError,
        fetchFoodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,


    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
