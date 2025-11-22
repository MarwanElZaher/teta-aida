"use client";

import Image from 'next/image';
import styles from './FeaturedProducts.module.css';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const products = [
    {
        id: 1,
        name: "Green Olives (Mokhalel)",
        price: 120,
        image: "/images/olive-jar-plate.png",
        description: "Hand-picked green olives, cured in olive oil and lemon.",
    },
    {
        id: 2,
        name: "Pickled Cabbage (Kronb)",
        price: 85,
        image: "/images/kronb-jar-plate.png",
        description: "Crunchy, tangy pickled cabbage with a hint of spice.",
    },
    {
        id: 3,
        name: "Pickled Cucumbers",
        price: 95,
        image: "/images/cucumber-jar-plate.png",
        description: "Classic crunchy cucumbers with garlic and dill.",
    },
    {
        id: 4,
        name: "Lemon Measfar",
        price: 110,
        image: "/images/lemon-jar-plate.png",
        description: "Traditional preserved lemons with safflower and nigella seeds.",
    },
];

const FeaturedProducts = () => {
    const { addToCart, decreaseQuantity, items } = useCart();
    const { t, language } = useLanguage();
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    const getItemQuantity = (id: number) => {
        return items.find((item) => item.id === id)?.quantity || 0;
    };

    return (
        <section id="products" className={styles.products} ref={ref}>
            <div className={styles.container}>
                <h2 className={`${styles.title} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}>{t.products.title}</h2>
                <div className={styles.grid}>
                    {products.map((product, index) => {
                        const quantity = getItemQuantity(product.id);
                        return (
                            <div
                                key={product.id}
                                className={`${styles.card} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={product.image}
                                        alt={t.products.items[product.id].name}
                                        fill
                                        className={styles.productImage}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.productName}>{t.products.items[product.id].name}</h3>
                                    <p className={styles.description}>{t.products.items[product.id].description}</p>
                                    <div className={styles.priceRow}>
                                        <span className={styles.price}>{product.price} {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                                        {quantity > 0 ? (
                                            <div className={styles.quantityControls}>
                                                <button onClick={() => decreaseQuantity(product.id)} className={styles.controlButton}>-</button>
                                                <span className={styles.quantity}>{quantity}</span>
                                                <button onClick={() => addToCart(product)} className={styles.controlButton}>+</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(product)}
                                                className={styles.button}
                                            >
                                                {t.products.add}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
