"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { toggleCart, items } = useCart();
    const { t, language, setLanguage } = useLanguage();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image
                        src="/logo.jpg"
                        alt="Teta-Aida Logo"
                        width={70}
                        height={70}
                        className={styles.logoImage}
                    />
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <li><Link href="#about" className={styles.navLink}>{t.nav.story}</Link></li>
                <li><Link href="#products" className={styles.navLink}>{t.nav.pantry}</Link></li>
                <li><Link href="#testimonials" className={styles.navLink}>{t.nav.love}</Link></li>
            </ul>
            <div className={styles.actions}>
                <button onClick={toggleLanguage} className={styles.langButton}>
                    {language === 'ar' ? 'English' : 'العربية'}
                </button>
                <button onClick={toggleCart} className={styles.cartButton}>
                    🛒 <span className={styles.cartCount}>{itemCount}</span>
                </button>
                <Link href="#products" className={styles.ctaButton}>
                    {t.nav.shop}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
