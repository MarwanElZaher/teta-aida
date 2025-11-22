"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import { useLanguage } from '../context/LanguageContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Hero = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section className={styles.hero}>
            <Image
                src="/images/jars-in-picnic.jpg"
                alt="Teta Aida's Picnic Spread"
                fill
                priority
                className={styles.backgroundImage}
            />
            <div
                ref={ref}
                className={`${styles.content} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}
            >
                <Image
                    src="/logo.jpg"
                    alt="Teta Aida Logo"
                    width={240}
                    height={240}
                    className={styles.logo}
                />
                <h1 className={styles.headline}>{t.hero.headline}</h1>
                <p className={styles.subheadline}>
                    {t.hero.subheadline}
                </p>
                <Link href="#products" className={styles.ctaButton}>
                    {t.hero.cta}
                </Link>
            </div>
        </section>
    );
};

export default Hero;
