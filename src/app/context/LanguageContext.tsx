"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'ar' | 'en';

type Translations = {
    nav: {
        story: string;
        pantry: string;
        love: string;
        shop: string;
    };
    hero: {
        headline: string;
        subheadline: string;
        cta: string;
    };
    about: {
        title: string;
        text1: string;
        text2: string;
    };
    products: {
        title: string;
        add: string;
        items: {
            [key: number]: {
                name: string;
                description: string;
            };
        };
    };
    why: {
        title: string;
        features: {
            natural: { title: string; text: string };
            recipes: { title: string; text: string };
            authentic: { title: string; text: string };
            handcrafted: { title: string; text: string };
        };
    };
    testimonials: {
        title: string;
        quotes: {
            [key: number]: string;
        };
    };
    cart: {
        title: string;
        empty: string;
        total: string;
        checkout: string;
        remove: string;
    };
    footer: {
        follow: string;
        rights: string;
        instagram: string;
        email: string;
    };
};

const translations: Record<Language, Translations> = {
    ar: {
        nav: {
            story: "حكايتنا",
            pantry: "مخللاتنا",
            love: "حب العيلة",
            shop: "تسوق الآن",
        },
        hero: {
            headline: "نكهات مصرية أصيلة، من إيد تيتا عايدة",
            subheadline: "زيتون، كرنب، ومخللات معمولة يدويًا بخلطات سرية متوارثة عبر الأجيال. قديم بس دهب.",
            cta: "تسوق المخلل",
        },
        about: {
            title: "حكايتنا",
            text1: "تيتا عايدة هي تحية لدفء البيوت المصرية ونكهات مطابخ جداتنا اللي ميتشبعش منها. اتولدنا من حنين لطعم البيت الأصلي، وبنقدم لكم مخللات معمولة بصبر وحب.",
            text2: "وصفاتنا مصرية 100%، متوارثة جيل ورا جيل. كل برطمان زيتون، كل حتة كرنب مقرمشة، وكل مخلل فيه الطعم الأصلي لتراثنا. بنستخدم بس أجود المكونات الطبيعية، زي ما تيتا كانت بتعمل بالظبط.",
        },
        products: {
            title: "مخللات تيتا",
            add: "أضف للسلة",
            items: {
                1: { name: "زيتون أخضر (مخلل)", description: "زيتون أخضر منقى باليد، متخلل في زيت زيتون ولمون، طعم غني ومزز." },
                2: { name: "مخلل كرنب", description: "كرنب مخلل مقرمش ولونه يفتح النفس، بتوازن مثالي بين المزازة والطعم البيتي." },
                3: { name: "مخلل خيار", description: "خيار صغير مقرمش، متخلل مع توم وأعشاب للقرمشة الكلاسيكية." },
                4: { name: "لمون معصفر", description: "لمون معصفر تقليدي بالعصفر وحبة البركة والشطة، يضيف طعم حرش لأي أكلة." },
            },
        },
        why: {
            title: "ليه تختار تيتا عايدة؟",
            features: {
                natural: { title: "طبيعي 100%", text: "بدون مواد حافظة، بدون إضافات. بس مكونات طبيعية." },
                recipes: { title: "وصفات متوارثة", text: "نكهات أصيلة متوارثة من تيتا عايدة نفسها." },
                authentic: { title: "طعم مصري أصيل", text: "طعم مصر الحقيقي في كل برطمان." },
                handcrafted: { title: "صنع يدوي", text: "معمول بكميات صغيرة بعناية واهتمام بالتفاصيل." },
            },
        },
        testimonials: {
            title: "رأي عيلتنا الكبيرة",
            quotes: {
                0: "الزيتون طعمه زي اللي كانت جدتي بتعمله بالظبط. تحفة بجد!",
                1: "مبقدرش أبطل أكل من مخلل الكرنب. هو الإضافة المقرمشة المثالية لأي أكلة.",
                2: "اللمون المعصفر ده في حتة تانية. طعم غني جداً في كل برطمان!",
            },
        },
        cart: {
            title: "سلتك",
            empty: "سلتك فاضية.",
            total: "المجموع",
            checkout: "إتمام الطلب",
            remove: "حذف",
        },
        footer: {
            follow: "تابعونا لآخر الأخبار والوصفات اللذيذة!",
            rights: "© 2025 تيتا عايدة. جميع الحقوق محفوظة.",
            instagram: "انستجرام",
            email: "راسلنا",
        },
    },
    en: {
        nav: {
            story: "Our Story",
            pantry: "The Pickles",
            love: "Family Love",
            shop: "Shop Now",
        },
        hero: {
            headline: "Authentic Egyptian Flavors, Made by Teta Aida",
            subheadline: "Handcrafted olives, kronb, and pickles using secret family recipes passed down through generations. Old but Gold.",
            cta: "Shop The Pickles",
        },
        about: {
            title: "Our Story",
            text1: "Teta-Aida is a tribute to the warmth of Egyptian homes and the timeless flavors of our grandmothers' kitchens. Born from a longing for the authentic taste of home, we bring you handcrafted preserved foods made with patience and love.",
            text2: "Our recipes are 100% Egyptian, passed down through generations. Every jar of olives, every crunchy piece of kronb, and every pickle carries the true essence of our heritage. We use only the finest natural ingredients, just like Teta used to.",
        },
        products: {
            title: "From Teta's Pantry",
            add: "Add to Basket",
            items: {
                1: { name: "Green Olives (Mkhalel)", description: "Hand-picked green olives cured in olive oil and lemon, delivering a rich, tangy flavor." },
                2: { name: "Pickled Cabbage (Kronb)", description: "Crunchy, vibrant pickled cabbage with a perfect balance of sour and savory." },
                3: { name: "Pickled Cucumbers", description: "Small, crisp cucumbers pickled with garlic and herbs for that classic crunch." },
                4: { name: "Lemon Measfar", description: "Traditional preserved lemons with saffron and chili, adding a zesty kick to any meal." },
            },
        },
        why: {
            title: "Why Choose Teta-Aida?",
            features: {
                natural: { title: "100% Natural", text: "No preservatives, no additives. Just pure, natural ingredients." },
                recipes: { title: "Generational Recipes", text: "Authentic flavors passed down from Teta Aida herself." },
                authentic: { title: "Authentic Egyptian", text: "The true taste of Egypt in every jar." },
                handcrafted: { title: "Handcrafted", text: "Made in small batches with care and attention to detail." },
            },
        },
        testimonials: {
            title: "What Our Customers Say",
            quotes: {
                0: "The green olives taste exactly like the ones my grandmother used to make. Absolutely delicious!",
                1: "I can't get enough of the pickled cabbage. They are the perfect crunchy addition to any meal.",
                2: "The Lemon Measfar is a game changer. So much flavor in one jar!",
            },
        },
        cart: {
            title: "Your Basket",
            empty: "Your basket is empty.",
            total: "Total",
            checkout: "Checkout",
            remove: "Remove",
        },
        footer: {
            follow: "Follow us for the latest updates and delicious recipes!",
            rights: "© 2025 Teta-Aida. All rights reserved.",
            instagram: "Instagram",
            email: "Email Us",
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ar');

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [dir, language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
