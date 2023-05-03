import { Table } from "react-bootstrap";
import Input from "./Input";

const Puasa_table = ({puasa, handleDelete, setEditPuasa}) => {

    const dataGenerator = () => {
        return(
            <>
                {
                    puasa.map((puasa, index) => {

                        return (
                            <Input key = {puasa} keyPuasa = {puasa} setEditPuasa={setEditPuasa} handleDelete={handleDelete} number={index}/>
                        )
                    })
                }
            </>
        )
    }

    return(
            <>
                <Table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Puasa</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dataGenerator()}
                    </tbody>
                </Table>
            </>

    )
}

export default Puasa_table;