"use client";

import styles from './WhyChooseUs.module.css';
import { useLanguage } from '../context/LanguageContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const WhyChooseUs = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    const features = [
        {
            icon: '🌿',
            title: t.why.features.natural.title,
            text: t.why.features.natural.text,
        },
        {
            icon: '👵',
            title: t.why.features.recipes.title,
            text: t.why.features.recipes.text,
        },
        {
            icon: '🇪🇬',
            title: t.why.features.authentic.title,
            text: t.why.features.authentic.text,
        },
        {
            icon: '🤲',
            title: t.why.features.handcrafted.title,
            text: t.why.features.handcrafted.text,
        },
    ];

    return (
        <section className={styles.whyChooseUs} ref={ref}>
            <div className={styles.container}>
                <h2 className={`${styles.title} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}>{t.why.title}</h2>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureText}>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
