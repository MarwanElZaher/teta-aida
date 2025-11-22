"use client";

import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h3 className={styles.brand}>Teta-Aida</h3>
                    <p className={styles.tagline}>{t.footer.follow}</p>
                    <div className={styles.links}>
                        <Link href="#" className={styles.link}>{t.footer.instagram}</Link>
                        <Link href="mailto:hello@teta-aida.com" className={styles.link}>{t.footer.email}</Link>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>{t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
