import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

const useIntersectionObserver = (options?: IntersectionObserverOptions): { ref: RefObject<HTMLDivElement | null>; isVisible: boolean } => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only trigger once
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return { ref, isVisible };
};

export default useIntersectionObserver;
