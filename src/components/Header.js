import { Link } from "react-router-dom";

const Header=()=>{
    return(
        <div className="header-container">
            <Link to="/" className="route-link"><h3 className="header-tags">jobs</h3></Link>
            <Link to="/bookmarks" className="route-link"><h3 className="header-tags">Bookmarks</h3></Link>
        </div>
    )
}

export default Header;