import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const useInfiniteScroll = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: UseInfiniteScrollProps) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return observerRef;
};