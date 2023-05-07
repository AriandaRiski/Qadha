import Alerts from "@/components/puasa/Alerts";
import Nav from "@/components/puasa/Nav";
import Puasa_table from "@/components/puasa/Puasa_table";
import AppContext from "@/context/appContext";
import Layout from "@/layouts/Layout";
import { useContext, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const Index = ({ puasa }) => {

    const value = useContext(AppContext);

    const [savePuasa, setSavePuasa] = useState({ nama_puasa: "" })
    const [editPuasa, setEditPuasa] = useState({ id: "", nama_puasa: "" })
    const [message, setMessage] = useState("")

    const handleSave = (e) => {
        // const handleSave = ({target : { name, value }}) => {
        // setSavePuasa({...savePuasa.nama_puasa, [name] : value});
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
            nama_puasa: ""
        })

        if (result) {

            setMessage(result.message);
            document.getElementsByClassName("exit")[0].click();

            let prevPuasa = value.puasa;
            prevPuasa.push(result);
            value.setDataPuasa(prevPuasa);
        }
    }

    const handleUpdate = async (e) => {
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
            document.getElementsByClassName("cancelEdit")[0].click();

            const prevPuasa = value.puasa.filter(puasa => {
                return puasa.id != editPuasa.id
            })
            prevPuasa.push(result);
            value.setDataPuasa(prevPuasa);
        }
    }

    const handleDelete = async (id) => {

        const reqOption = {
            method: "DELETE"
        }

        const response = await fetch("http://localhost:3000/api/puasa/" + id, reqOption);
        const result = await response.json();

        if (result) {
            setMessage(result.message);

            const prevPuasa = value.puasa;
            const newPuasa = prevPuasa.filter(puasa => {
                return puasa.id != id;
            })

            value.setDataPuasa(newPuasa);
        }
    }

    const handleTarget = (e) => {
        setTarget({ ...target, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Layout title="data puasa">
                <div id="addModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleAdd}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Tambah Puasa</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">X</button>
                                </div>
                                <div className="modal-body">

                                    <FloatingLabel label="Nama Puasa">
                                        <Form.Control
                                            type="text" placeholder="Nama Puasa"
                                            name="nama_puasa" value={savePuasa.nama_puasa}
                                            onChange={handleSave} required
                                        />
                                    </FloatingLabel>
                                    {/*                                 
                                <label>Name</label>
                                <input type="text" className="form-control" name="nama_puasa" value={savePuasa.nama_puasa} onChange={handleSave} autoFocus required /> 
                            */}

                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default exit" name="submit" data-dismiss="modal" defaultValue="Cancel" />
                                    <input type="submit" className="btn btn-success" defaultValue="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="editModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit </h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="updateId" className="updateId" />
                                    <FloatingLabel label="Nama Puasa">
                                        <Form.Control
                                            type="text" placeholder="Nama Puasa"
                                            name="nama_puasa" value={editPuasa.nama_puasa}
                                            onChange={handleUpdate} required
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" name="submit" className="btn btn-default cancelEdit" data-dismiss="modal" defaultValue="Cancel" />
                                    <input type="submit" className="btn btn-success" defaultValue="Edit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container-xl">
                    <div className="table-responsive d-flex flex-column">
                        <Alerts text={message} setMessage={setMessage} style={message.length > 0 ? 'block' : 'none'} jumlah={value?.puasa?.length} />
                        <div className="table-wrapper">
                            <Nav />
                            <Puasa_table setEditPuasa={setEditPuasa} puasa={puasa} handleDelete={handleDelete} />
                            {/* <Pagination/> */}
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export async function getServerSideProps({ req }) {

    const response = await fetch("http://localhost:3000/api/puasa");
    const getPuasa = await response.json();

    return {
        props: {
            puasa: getPuasa
        }
    }
}

export default Index;