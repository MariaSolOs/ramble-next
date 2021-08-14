import useSWR from 'swr';

type Response = Record<string, { name: string; nativeName: string; }>;

const API_URL = 'https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json';

/**
 * @returns Array of (all?) possible languages. 
 * Used by the experience builder language slide.
 */
export default function useLanguages() {
    const { data } = useSWR(API_URL, url => 
        fetch(url)
        .then(res => res.json())
        .then((res: Response) => 
            Object.values(res).map(({ nativeName }) => {
                const firstName = nativeName.split(',')[0];
                const capitalizedName = firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1);
                return capitalizedName;
            })
        )
    );

    return data || [];
}