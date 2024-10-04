import { useEffect, useState } from 'react';

export function useDebounce(searchTerm: string) {
    const [debouncedTerm, setDebouncedTerm] = useState<string | undefined>();
    const debounceFunction = () => {
        const debounce = setTimeout(() => {
            setDebouncedTerm(searchTerm.trim());
        }, 1000);
        return () => clearTimeout(debounce);
    };
    useEffect(debounceFunction, [searchTerm]);
    return { debouncedTerm };
}
