import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Shows a prompt dialog when changing pages.
 * 
 * @param showPrompt - If true, the prompt is shown when changing pages
 * @param message - The message to display
 */
export default function useRouterPrompt(showPrompt: boolean, message: string) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = (url: string) => {
            const currentPath = router.asPath;
            if (currentPath !== url && showPrompt && !window.confirm(message)) {
                router.events.emit('routeChangeError');
                router.replace(currentPath);
                throw 'Abort route change. Please ignore this error.';
            }
        }

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (showPrompt) {
                event.preventDefault();
                event.returnValue = message;
                return message;
            }
        }

        router.events.on('routeChangeStart', handleRouteChangeStart);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [showPrompt, message, router]);
}