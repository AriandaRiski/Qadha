import { prisma } from "config/db";

export default async function handler(req, res) {
  
    switch (req.method) {
        case 'GET':
            return await getUser(req, res);
        
        case 'POST':
            return await addUser(req, res);
    }
}

// hash password
const bcrypt = require('bcrypt')
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const addUser = async(req,res) => {
    try {

        const { username, email, password } = req.body;
        const pass = await hashPassword(password);

        const data = {
            username : username,
            email : email,
            password : pass
        }

        const cek_duplikat = await prisma.user.findFirst({
            where : {
                email : email
            }
        })

        if(cek_duplikat) return res.status(422).json({error : 'email sudah digunakan!'})

        const result = await prisma.user.create({
            data    : data,
            select  : {
                id: true
            }
        })

        return res.status(200).json({  success : true, user : data});

    } catch (error) {
        return res.status(500).json(error);
    }
}

const getUser = async(req, res) => {
    try {
        const result = await prisma.user.findMany();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}