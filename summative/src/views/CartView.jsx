import { useStoreContext } from "../context";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import './CartView.css';
import { useLocation, useNavigate } from "react-router-dom";

function CartView() {
    const { cart, setCart, setPrevPage } = useStoreContext();
    const navigate = useNavigate();
    const location = useLocation();

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    return (
        <div className="cart-view-container">
            <Header />
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                {cart.size === 0 ? (
                    <div className="cart-empty-label">Your cart is empty.</div>
                ) : (
                    <div className="cart-items">
                        {cart.entrySeq().map(([key, movie]) => {
                            return (
                                <div className="cart-item" key={key}>
                                    <img className="cart-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => navigateTo(`/movies/details/${movie.id}`)} />
                                    <h1 className="cart-mov-title">{movie.title}</h1>
                                    <button className="remove-button" onClick={() => setCart((prevCart) => prevCart.delete(movie.id))}>
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartView;