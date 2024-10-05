import { useInfiniteQuery } from '@tanstack/react-query';
import { client } from '../api/client';
import { Player } from '../types/player.types';

const NO_OF_RECORDS_PER_PAGE = '50';

interface PlayersFetchResponse {
    meta: {
        next_cursor: number | null;
        per_page: number;
    };
    data: Player[];
}

const fetchPlayer = async ({ cursor = 0, search = '' }: { cursor?: number; search?: string }): Promise<PlayersFetchResponse> => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const urlParams = new URLSearchParams({
        cursor: cursor.toString(),
        ...(search && { search }),
        per_page: NO_OF_RECORDS_PER_PAGE,
    });
    const res = await client.get<PlayersFetchResponse>(`${baseUrl}/v1/players/?${urlParams}`);
    return res.data;
};

export const useFetchPlayer = (search?: string) => {
    if (!search) search = '';
    const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery({
        queryFn: ({ pageParam = 0 }) => fetchPlayer({ cursor: pageParam, search }),
        queryKey: ['players', search],
        initialPageParam: 0,
        getNextPageParam: (lastPage: PlayersFetchResponse) => {
            return lastPage.meta.next_cursor !== null ? lastPage.meta.next_cursor : undefined;
        },
    });

    return {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage,
    };
};
