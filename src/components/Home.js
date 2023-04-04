import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <section className="section" style={{color:"white"}}>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />

            <Link to="/seller">Go to the Seller page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />

            <Link to="/products">Go to the products</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
