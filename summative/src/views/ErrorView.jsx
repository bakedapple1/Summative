import Header from "../components/Header";
import Footer from "../components/Footer";
import DeadBerry from "../assets/Dead berry.png";
import "./ErrorView.css";

function ErrorView() {

    return (
        <div className="error-view">
            <Header />
            <div className="error">
                <h1 className="error-msg">Oops! The page you were looking for doesn't exist!</h1>
                <img className="error-img" src={DeadBerry} />
            </div>
            <Footer />
        </div>
    );
}

export default ErrorView;