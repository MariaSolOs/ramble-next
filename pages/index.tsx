import Footer from 'components/Footer';

const Home = () => {
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    return (
        <>
            <div style={{ margin: '100px auto' }}></div>
            <Footer />
        </>
    );
}

export default Home;