const Place = require('../model/Place')

const updatePoints = async(req, res)=>{
    const {id} = req.params 
    console.log(id)
    res.json()
}

module.exports = {updatePoints}