import { prisma } from "config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getPuasaById(req, res);
        
        case "PUT":
            return await updatePuasa(req, res);
        
        case "DELETE":
            return await deletePuasa(req, res);
    }
}

const getPuasaById = async(req, res) => {
    try {

        const {id} = req.query;

        const result = await prisma.puasa.findMany({
            where : {
                user_id : parseInt(id)
            }
        })

        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({
            message : " data tidak ditemukan!"
        });
    }
}

const updatePuasa = async(req, res) => {
    try {
        
        const {id} = req.query;
        const {nama_puasa, tanggal_puasa} = req.body;

        const result = await prisma.puasa.update({
            where : {
                id : parseInt(id)
            },

            data : {
                nama_puasa : nama_puasa,
                tanggal_puasa : tanggal_puasa
            }
        })

        return res.status(201).json({
            success : true,
            message : "data berhasil diupdate !",
            data : {
                id, nama_puasa, tanggal_puasa
            }
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "data gagal diupdate!"
        })
    }
}

const deletePuasa = async(req, res) => {
    try {

        const {id} = req.query;
        const result = await prisma.puasa.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(201).json({
            success : true,
            message : "data berhasil dihapus !"
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}