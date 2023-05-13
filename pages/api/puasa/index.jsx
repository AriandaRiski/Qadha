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

        // const result = await prisma.puasa.findMany({
        //     where: {
        //         user_id: req.body.user_id,
        //       },
        // });

        return res.status(201).json(result);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

const addPuasa = async(req,res) => {
    try {

        const { nama_puasa, tanggal_puasa, user_id } = req.body;

        const data = {
            nama_puasa : nama_puasa,
            tanggal_puasa : tanggal_puasa,
            user_id : user_id
        }

        const result = await prisma.puasa.create({
            data    : data,
            select  : {
                id: true
            }
        })

        // return res.status(200).json({success : true, result, message : "Data Berhasil ditambahkan!" });
        return res.status(200).json({...result, nama_puasa, tanggal_puasa, message : "Data Berhasil ditambahkan!"});

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}