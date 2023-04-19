import Header from "@/layouts/part/Header";
import Footer from "@/layouts/part/Footer";
import Head from "next/head";

const Layout = (props) => {
    return(
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header/>
                {props.children}
            <Footer/>
        </>
    )
}

export default Layout;