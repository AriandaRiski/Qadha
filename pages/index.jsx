import Layout from "@/layouts/Layout";
import {Tab, Tabs} from 'react-bootstrap';
import Puasa from "./puasa";
import { useState } from "react";
import AppContext from "@/context/appContext";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";

const Shalat = () => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height={225} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                    <p className="card-text">COMING SOON !!!</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">1</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">2</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

const home = ({puasa}) => {

    const [dataPuasa, setDataPuasa] = useState(puasa);

    const {data : session} = useSession();

    const handleLogout = () => {
        signOut()
    }

    return (
        <>
            <Layout title="Qadha">
            <main>
                <div className="px-4 pt-5 my-5 text-center border-bottom">
                    <h1 className="display-4 fw-bold text-body-emphasis">{session ? session.user.name : ''}</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            {/* <Link href="/login" className="btn btn-primary btn-lg px-4 me-sm-3">Login</Link> */}
                            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="overflow-hidden" style={{maxHeight: '30vh'}}>
                        <div className="container px-5">
                            <img src="https://getbootstrap.com/docs/5.3/examples/heroes/bootstrap-docs.png" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width={700} height={500} loading="lazy" />
                        </div>
                    </div>
                </div>
            </main>
            {/* <div className="b-example-divider" /> */}

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="position-relative">
                            <Tabs defaultActiveKey="tab_puasa" id="uncontrolled-tab-example" className="mb-3" fill>
                                <Tab eventKey="tab_puasa" title="Puasa">
                                    <AppContext.Provider 
                                        value = {{
                                            puasa : dataPuasa,
                                            setDataPuasa : setDataPuasa
                                    }}>
                                    <Puasa/>
                                    </AppContext.Provider>

                                </Tab>
                                <Tab eventKey="shalat" title="Shalat">
                                    <Shalat/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Layout>  
        </>
      )
}

export async function getServerSideProps({req}) {
    const session = await getSession({req})
    if(!session){
        return{
            redirect : {
                destination: '/login',
                permanent: false
            }
        }
    }

    const response = await fetch("http://localhost:3000/api/puasa");
    const puasa = await response.json();

    return { 
        props: { 
            puasa : puasa,
            session
        } 
    }
}


export default home;
