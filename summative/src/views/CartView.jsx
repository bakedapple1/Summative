import { useLocation, useNavigate } from "react-router-dom";
import { Map } from "immutable";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useStoreContext } from "../context";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import './CartView.css';

function CartView() {
    const { currentUser, cart, setCart, setPrevPage } = useStoreContext();
    const navigate = useNavigate();
    const location = useLocation();

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    async function checkout() {
        try {
            const docRef = doc(firestore, "users", currentUser.email);
            const docSnap = await getDoc(docRef);
            const data = { previousPurchases: { ...docSnap.data().previousPurchases, ...cart.toJS() } };
            await updateDoc(docRef, data);
            setCart(Map());
            alert("Checkout successful! Thank you for your purchase.");
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    }

    return (
        <div className="cart-view-container">
            <Header />
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                {cart.size === 0 ? (
                    <div className="cart-empty-label">Your cart is empty.</div>
                ) : (
                    <div className="cart-content">
                        <button className="checkout-button" onClick={() => checkout()}>Checkout</button>
                        <div className="cart-items">
                            {cart.entrySeq().map(([key, movie]) => {
                                return (
                                    <div className="cart-item" key={key}>
                                        <img className="cart-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => navigateTo(`/movies/details/${movie.id}`)} />
                                        <h1 className="cart-mov-title">{movie.title}</h1>
                                        <button className="remove-button" onClick={() => setCart((prevCart) => prevCart.delete(key))}>
                                            Remove
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartView;