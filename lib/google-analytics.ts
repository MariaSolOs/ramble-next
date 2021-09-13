/**
 * Sets up gtag so that we track pages using the "natural" page paths.
 * 
 * @param url - The path to the page
 */
export const handlePageView = (url: string) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: url
    });
}