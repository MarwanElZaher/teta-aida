"use client";

import styles from './Testimonials.module.css';
import { useLanguage } from '../context/LanguageContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Testimonials = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    const testimonials = [
        {
            id: 1,
            text: t.testimonials.quotes[0],
            author: 'Sarah M.',
        },
        {
            id: 2,
            text: t.testimonials.quotes[1],
            author: 'Ahmed K.',
        },
        {
            id: 3,
            text: t.testimonials.quotes[2],
            author: 'Laila R.',
        },
    ];

    return (
        <section id="testimonials" className={styles.testimonials} ref={ref}>
            <div className={styles.container}>
                <h2 className={`${styles.title} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}>{t.testimonials.title}</h2>
                <div className={styles.grid}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`${styles.card} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <p className={styles.quote}>&quot;{testimonial.text}&quot;</p>
                            <p className={styles.author}>- {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
