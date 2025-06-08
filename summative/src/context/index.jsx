import { Map } from "immutable";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [toggleState, setToggleState] = useState(Array(12).fill(false));
    const [selectedGenre, setSelectedGenre] = useState("*");
    const [pageNum, setPageNum] = useState(1);
    const [searchPageNum, setSearchPageNum] = useState(1);
    const [cart, setCart] = useState(Map());
    const [query, setQuery] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setLoading(false);
            } else {
                setCurrentUser(null);
                console.log("No user");
            }
        });
    }, []);

    return (
        <StoreContext.Provider value={{ currentUser, setCurrentUser, toggleState, setToggleState, selectedGenre, setSelectedGenre, pageNum, setPageNum, searchPageNum, setSearchPageNum, cart, setCart, query, setQuery, prevPage, setPrevPage, loading }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}