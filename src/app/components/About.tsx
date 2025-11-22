"use client";

import Image from 'next/image';
import styles from './About.module.css';
import { useLanguage } from '../context/LanguageContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const About = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section id="about" className={styles.about} ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.content} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}>
                    <h2 className={styles.title}>{t.about.title}</h2>
                    <p className={styles.text}>{t.about.text1}</p>
                    <p className={styles.text}>{t.about.text2}</p>
                </div>
                <div className={`${styles.imageWrapper} ${isVisible ? 'animate-visible delay-200' : 'animate-hidden'}`}>
                    <Image
                        src="/images/teta-aida.jpg"
                        alt="Teta Aida"
                        width={400}
                        height={500}
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
