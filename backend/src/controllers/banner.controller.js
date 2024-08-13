import { connection } from "../db/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addBanner = asyncHandler(async (req, res) => {
    const { title=null, code, stdin, stdout=null, language, username } = req.body
    
    const query = 'insert into snippets(id,title,code,stdin,stdout,language,username) value(uuid(),?,?,?,?,?,?)'

    try {
        const result =await connection.query(query, [title, code, stdin, stdout, language, username])
        res.status(200)
        .json(
            new ApiResponse(200,"Snippet added successfully")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(400,"some field is required or server problem",error)
        )
        console.log(error);
    }
})

const getBanner=asyncHandler(async(req,res)=>{
    const query = 'select * from banner where id=?'

    try {
        const result =await connection.query(query,['b1'])

        res.status(200).json(
            new ApiResponse(200,"Banner fetched successfully",result[0])
            )
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500,"server problem",error)
        )
        console.log(error);
    }
})

const updateBanner=asyncHandler(async(req,res)=>{
    const bannerId = 'b1';  
    const updateData = req.body;  
    
    if (!Object.keys(updateData).length) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updateData)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    const sql = `UPDATE banner SET ${fields.join(', ')} WHERE id = ?`;
    values.push(bannerId);  // Add the bannerId to the values array

    try {
    const result =await connection.query(sql, values) 
        res.status(200).json(
            new ApiResponse(200,"Banner updated successfully",result)
            )
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500,"server problem",error)
        )
        console.log(error);
    }
})
export{
    addBanner,
    getBanner,
    updateBanner
}