import { Map } from "immutable";
import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [userData, setUserData] = useState(Map());
    const [currentUser, setCurrentUser] = useState();
    const [toggleState, setToggleState] = useState(Array(12).fill(false));
    const [preferredGenres, setPreferredGenres] = useState(Array(12).fill(false));
    const [selectedGenre, setSelectedGenre] = useState("*");
    const [pageNum, setPageNum] = useState(1);
    const [searchPageNum, setSearchPageNum] = useState(1);
    const [cart, setCart] = useState(Map());
    const [query, setQuery] = useState("");
    const [prevPage, setPrevPage] = useState("");

    return (
        <StoreContext.Provider value={{ userData, setUserData, currentUser, setCurrentUser, toggleState, setToggleState, preferredGenres, setPreferredGenres, selectedGenre, setSelectedGenre, pageNum, setPageNum, searchPageNum, setSearchPageNum, cart, setCart, query, setQuery, prevPage, setPrevPage }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}