import React from 'react';
import styles from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
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
                    <NavLink to="/exercises" className={({ isActive}) =>
                        isActive
                            ? styles.active
                            : ''
                    }
                             end>
                        УПРАЖНЕНИЯ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({ isActive}) =>
                        isActive
                            ? styles.active
                            : ''
                    }
                             end>
                        ВХОД
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;