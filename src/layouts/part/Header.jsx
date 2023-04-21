import { useSession } from "next-auth/react";

const Header = () => {
    const {data : session} = useSession();

 return (
    <>
        <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx={12} cy={13} r={4} /></svg>
                    <strong>Qadha</strong>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon" /> */}
                    <img src={session ? session.user.image : ''} width={20} height={20}/>
                    {session ? session.user.name : ''}
                </button>
            </div>
        </div>
    </>
 )
}

export default Header;