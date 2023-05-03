import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { DropdownButton, Dropdown, ButtonGroup, Button } from "react-bootstrap";

const handleLogout = () => {
    signOut()
}


const Header = () => {
    const {data : session} = useSession();

    if(session) {
        return (
            <>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx={12} cy={13} r={4} /></svg>
                            <strong>Qadha</strong>
                        </a>
                        <ButtonGroup>
                            <Button variant="white"><Image src={session ? session.user.image : 'https://www.pngwing.com/en/free-png-zlrqq'} width={40} height={40} alt="profile"/></Button>

                            <DropdownButton as={ButtonGroup} title = {session.user.email} variant="dark">
                                <Dropdown.Item eventKey="1">
                                    <Button type="button" variant="white" onClick={handleLogout}>Logout</Button>
                                </Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;