import { Map } from "immutable";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState(Map());
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [prevPage, setPrevPage] = useState("");
    const [purchaseHistory, setPurchaseHistory] = useState(Map());
    const [query, setQuery] = useState("");
    const [searchPageNum, setSearchPageNum] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState("*");
    const [toggleState, setToggleState] = useState(Array(12).fill(false));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setLoading(false);
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    return (
        <StoreContext.Provider value={{ currentUser, setCurrentUser, toggleState, setToggleState, selectedGenre, setSelectedGenre, pageNum, setPageNum, searchPageNum, setSearchPageNum, cart, setCart, query, setQuery, prevPage, setPrevPage, loading, purchaseHistory, setPurchaseHistory }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}