import { connectDB } from "../lib/db.js"


export const getCompaniesForAgents = async(req,res) => {
    const db = await connectDB()
    const companies = await db.query(`SELECT * FROM COMPANIES`)
    // console.log(companies.rows)
    return res.json(companies.rows)
}