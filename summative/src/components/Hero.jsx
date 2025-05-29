import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import HeroBanner from "../assets/Hero banner.png";
import "./Hero.css";

function Hero() {
    const navigate = useNavigate();
    const { selectedGenre } = useStoreContext();

    return (
        <div className="hero" onClick={() => navigate(`/movies/genre/${selectedGenre}`)}>
            <label className="hero-label" htmlFor="hero-poster">ALL-YOU-CAN-BINGE</label>
            <img id="hero-poster" className="hero-poster" src={HeroBanner} />
        </div>
    );
}

export default Hero;