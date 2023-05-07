import { React, useState, useEffect, useContext } from 'react'
import DataTable, { Direction } from 'react-data-table-component';
import { Button, Modal, FloatingLabel, Form, Navbar } from 'react-bootstrap';
import AppContext from '@/context/appContext';
import Alerts from './Alerts';
import moment from 'moment';

export default function TablePuasa() {

  const value = useContext(AppContext);

  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("")
  const [rowData, setRowData] = useState({
    id: "",
    nama_puasa: "",
    tanggal_puasa: ""
  })

  // Add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [savePuasa, setSavePuasa] = useState({
    nama_puasa: "",
    tanggal_puasa: new Date().toJSON()
    // tanggal_puasa: ""
  })

  const handleSave = (e) => {
    setSavePuasa({ ...savePuasa, [e.target.name]: e.target.value });
  }

  const handleAdd = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(savePuasa)
    }

    const response = await fetch("http://localhost:3000/api/puasa/", reqOption);
    const result = await response.json();

    setSavePuasa({
      nama_puasa: "",
      tanggal_puasa: ""
    })

    if (result) {

      setMessage(result.message);
      handleClose();

      const prevPuasa = value.puasa;
      prevPuasa.push(result);
      value.setDataPuasa(prevPuasa);
    }
  }

  // Edit
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [editPuasa, setEditPuasa] = useState({ id: "", nama_puasa: "", tanggal_puasa: "" })

  const handleUpdate = (e) => {
    setEditPuasa({ ...editPuasa, [e.target.name]: e.target.value })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPuasa)
    }

    const response = await fetch("http://localhost:3000/api/puasa/" + editPuasa.id, reqOption);
    const result = await response.json();

    if (result) {
      setMessage("Data Berhasil di Update");
      handleCloseEdit();

      const prevPuasa = value.puasa.filter(puasa => {
        return puasa.id != editPuasa.id
      })
      prevPuasa.push(result.data);
      value.setDataPuasa(prevPuasa);
    }
  }

  // Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleDelete = async (id) => {

    const reqOption = {
      method: "DELETE"
    }

    const response = await fetch("http://localhost:3000/api/puasa/" + id, reqOption);
    const result = await response.json();

    if (result) {
      setMessage(result.message);
      handleCloseDelete();

      const prevPuasa = value.puasa;
      const newPuasa = prevPuasa.filter(puasa => {
        return puasa.id != id;
      })

      value.setDataPuasa(newPuasa);
      setData(newPuasa);
    }
  }

  // Datatable
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(value.puasa);
      setPending(false);
    }, 800);
    return () => clearTimeout(timeout);
  });

  const columns = [
    // {
    //   name: '#',
    //   selector: (row, index) => index + 1,
    // },
    {
      name: 'Nama Puasa',
      selector: row => row.nama_puasa,
    },
    {
      name: 'Tanggal',
      selector: row => moment(row.tanggal_puasa).format('DD MMMM YYYY'),
    },
    {
      cell: (row) => {
        const handleModalEdit = (id) => {
          const ids = id.id;

          handleShowEdit(ids);
          setRowData(id)
          setEditPuasa(id)
        }
        return (
          <>
            <Button variant='warning' onClick={() => handleModalEdit(row)}>Edit</Button>
          </>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => {
        const handleModalDelete = (id) => {

          const ids = id.id;
          handleShowDelete(ids);
          setRowData(id)
        }

        return (
          <>
            <Button variant='danger' onClick={() => handleModalDelete(row)}>Hapus</Button>
          </>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Jumlah Per Halaman',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Semua ',
  };

  const action = (
    <>
      <Button variant="success" onClick={handleShow} >
        Tambah Data
      </Button>
    </>
  )

  return (
    <>
      <br />

      {/* Modal Add */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleAdd}>
          <Modal.Body>
            <FloatingLabel label="Nama Puasa">
              <Form.Control
                type="text" placeholder="Nama Puasa"
                name="nama_puasa" value={savePuasa.nama_puasa}
                onChange={handleSave} required
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <input type="submit" className="btn btn-success" defaultValue="Add" />
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Edit */}
      <Modal show={showEdit} onHide={handleCloseEdit} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data {rowData.id} - {rowData.nama_puasa}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpdateSubmit}>
          <Modal.Body>
            <FloatingLabel label="Nama Puasa">
              <Form.Control
                type="text" placeholder="Nama Puasa"
                name="nama_puasa" value={editPuasa.nama_puasa}
                onChange={handleUpdate} required
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <input type="submit" className="btn btn-success" defaultValue="EDIT" />
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete} animation={true}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Apakah Anda Yakin ingin menghapus data?</Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleCloseDelete}>Tidak</Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(rowData.id)}>Ya</Button>
        </Modal.Footer>
      </Modal>

      <Alerts
        text={message}
        setMessage={setMessage}
        style={message?.length > 0 ? 'block' : 'none'}
        jumlah={value?.puasa?.length}
      />

      <DataTable
        title="Data Puasa"
        progressPending={pending}
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationComponentOptions={paginationComponentOptions}
        actions={action}
        direction={Direction.AUTO}
      />
    </>
  )
}
