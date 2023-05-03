import moment from "moment/moment";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const Input = ({keyPuasa, handleDelete, number, setEditPuasa}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchId = async(id) => {
    const response = await fetch("http://localhost:3000/api/puasa/"+id)
    const result = await response.json();
    setEditPuasa(result);
  }

    return (
      <>
          <tr>
            <td>{number+1}</td>
            <td>{keyPuasa.nama_puasa}</td>
            <td>{moment(keyPuasa.tanggal_puasa).format('DD MMMM YYYY')}</td>
            <td>
              {/* <a href="#editModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"><AiFillEdit /></i></a> */}
              {/* <a href="#deleteModal"  className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><AiFillDelete /></i></a> */}
              <Button variant="warning" href="#editModal" className="edit" data-toggle="modal" onClick={() => fetchId(keyPuasa.id)}><AiFillEdit /></Button>
              <Button variant="danger" onClick={handleShow}><AiFillDelete /></Button>
            </td>
          </tr>


          <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Apakah Anda Yakin ingin menghapus data?</Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleClose}>Tidak</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(keyPuasa.id)} onClose={handleClose}>Ya</Button>
            </Modal.Footer>
          </Modal>
      </>
    )
}

export default Input;