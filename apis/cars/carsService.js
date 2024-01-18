import carSchema from "./Model.js";

let successFunc=(statusCode, status, msg, data)=>{
  return {
    statusCode: statusCode,
    status: status,
    msg: msg,
    data: data,
  }
}
let failureFunc=(statusCode, status, msg, error)=>{
  return {
    statusCode: statusCode,
    status: status,
    msg: msg,
    error: error,
  }
}

let getAll_Service = async (req, res) => {
  try{
    let data = await carSchema.find({})
    return successFunc(200, true, 'all cars fetched', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

let getCar_Service = async (req, res) => {
  try{
    let data = await carSchema.findById(req.params.carId)
    return successFunc(200, true, 'selected car fetched', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

let createCar_Service = async (req, res) => {
  try{
    let data = await carSchema.create(req.body)
    return successFunc(200, true, 'car uploaded', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

let updateCar_Service = async (req, res) => {
  try{
    let data = await carSchema.findByIdAndUpdate({ _id: req.params.carId }, req.body)
    return successFunc(200, true, 'selected car updated', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

let deleteCar_Service = async (req, res) => {
  try{
    let data = await carSchema.deleteOne({ _id: req.params.carId })
    return successFunc(200, true, 'selected car deleted', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

let search_Service = async (req, res) => {
  try{
    let condition = {}
      let query=req.query
      if (query.make) {
          condition.make = query.make;
      }
      if (query.model) {
        condition.model = query.model;
      }
      if (query.fuel) {
        condition.fuel = query.fuel;
      }
      if (query.mfg) {
        condition.mfg = query.mfg;
      } 
      console.log(condition)
    let data = await carSchema.find(condition);
    return successFunc(200, true, 'cars fetched', data)
  } catch(error){
      return failureFunc(500, false, 'internal server error', error)
  }
}

export {
  getAll_Service, 
  getCar_Service,
  createCar_Service,
  updateCar_Service,
  deleteCar_Service,
  search_Service
}