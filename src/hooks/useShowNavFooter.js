import { useLocation } from 'react-router-dom';

const noNavFooterPaths = ['/login', '/register'];

export function useShowNavFooter() {
    const location = useLocation();
    // Возвращаем true, если NavBar и Footer должны отображаться
    return !noNavFooterPaths.includes(location.pathname);
}
