import React, {useContext} from 'react';
import styles from './NavBar.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";

const NavBar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Gymly</div>
            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="/" className={({ isActive}) =>
                        isActive
                            ? styles.active
                            : ''
                    }
                    end>
                        ГЛАВНАЯ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={({ isActive}) =>
                        isActive
                            ? styles.active
                            : ''
                    }
                             end>
                        ПРОФИЛЬ
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogout} className={styles.navLinkButton}>
                        ВЫЙТИ
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;