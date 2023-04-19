import {AiFillFileAdd, AiFillDelete} from "react-icons/ai";
import { Button, Navbar, Container } from "react-bootstrap";
import Target from "./target";

const Nav = () => {

    return(
        <>
            <Navbar expand="sm" variant="light" bg="light" >
                <Container >
                    {/* <Target/> */}
                    <Button variant="primary" size="sm" href="#addModal" data-toggle="modal" style={{float : 'right'}}>
                        <AiFillFileAdd/>Tambah List
                    </Button>
                    {/* <Button variant="danger" size="lg" href="#" data-toggle="modal" className="delete_all_data">
                        <AiFillDelete />Delete
                    </Button> */}
                </Container>
            </Navbar>
        </>
    )
}

export default Nav;