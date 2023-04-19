import { prisma } from "config/db";

export default async function handler(req, res){
    switch (req.method) {
        case 'GET':
            return await getPuasa(req, res);
        
        case 'POST':
            return await addPuasa(req, res);
    }
}

const getPuasa = async(req, res) => {
    try {
        const result = await prisma.puasa.findMany();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const addPuasa = async(req,res) => {
    try {

        const { nama_puasa, tanggal_puasa } = req.body;

        const data = {
            nama_puasa : nama_puasa,
            // tanggal_puasa : new Date().toISOString()
            // tanggal_puasa : JSON.parse(JSON.stringify(new Date()))
            tanggal_puasa : tanggal_puasa ?? new Date().toJSON()
        }

        const result = await prisma.puasa.create({
            data    : data,
            select  : {
                id: true
            }
        })

        // return res.status(200).json({success : true, result });
        return res.status(200).json({...result, nama_puasa, tanggal_puasa, message : "Data Berhasil ditambahkan!"});

    } catch (error) {
        return res.status(500).json(error);
    }
}