const Place = require('../model/Place')

const getPlace = async(req, res)=>{
    const {id} = req.params
    console.log('id', id)
    const place = await Place.findOne({_id: id}).lean()
    // .select('-userID').select('-_id').select('-__v')
    // .select('-createdAt').select('-updatedAt')
    res.status(200).json(place)
}

const getAll = async(req, res)=>{
    const {id} = req.params
    const {search} = req.query
    let type = []

    if(id === 'rent'){
        type = ['House Rental', 'Flat Rental']
    }else if(id === 'homestay'){
        type = ['House Homestay', 'Flat Homestay','Tent Homestay', 'Farm Homestay', 'Tree house Homestay', 'Cabin Homestay']
    }else if(id === 'hostel'){
        type = ['Hostel']
    }else if(id === 'hotel'){
        type = ['Hotel']
    }else if(id === 'pg'){
        type = ['Paying guest']
    }
    if(type.length){
        if(search){
            const place = await Place.find({type: {$in: type}, city: search})
            .sort({'points': -1}).lean().limit(12)
            console.log(place.length)
            res.json(place)
            return
        }else{
            const place = await Place.find({type: {$in: type}})
            .sort({'points': -1}).lean().limit(12)
            console.log(place.length)
            res.json(place)
            return
        }
    }else{
        if(search){
            const place = await Place.find({city: search}).sort({'points': -1}).lean().limit(12)
            console.log(place.length)
            res.json(place)
            return
        }else{
            const place = await Place.find().sort({'points': -1}).lean().limit(12)
            console.log(place.length)
            res.json(place)
            return
        }
    }
}