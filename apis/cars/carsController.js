import { getAll_Service, 
  getCar_Service,
  createCar_Service,
  updateCar_Service,
  deleteCar_Service,
  search_Service } from "./carsService.js"
    
  let failureFunc=(status, msg, error)=>{
    return {
      status: status,
      msg: msg,
      error: error,
    }
  }

   let getAll = async (req, res)=> {
    try {
        let data = await getAll_Service(req,res)
        res.status(200).send(data)
    } catch (error) {
        res.send(failureFunc(500, 'internal server error', error))
      }
    }

   let getCar = async (req, res) => {
     try {
       let data = await getCar_Service(req, res);
       res.status(200).send(data);
     } catch (error) {
        res.send(failureFunc(500, 'internal server error', error))
     }
   };

let createCar = async (req, res) => {
    try {
    let data = await createCar_Service(req);
    res.status(200).send(data);
  } catch (error) {
      res.send(failureFunc(500, 'internal server error', error))
  }
};

let updateCar = async (req, res) => {
  try {
    let data = await updateCar_Service(req);
    res.status(200).send(data);
  } catch (error) {
      res.send(failureFunc(500, 'internal server error', error))
  }
};

let deleteCar = async (req, res) => {
  try {
    let data = await deleteCar_Service(req);
    res.status(200).send(data);
  } catch (error) {
      res.send(failureFunc(500, 'internal server error', error))
  }
};

let search = async (req, res) => {
  try {
    let data = await search_Service(req, res);
    res.status(200).send(data);
  } catch (error) {
      res.send(failureFunc(500, 'internal server error', error))
  }
};

export {
  getAll,
  createCar,
  updateCar,
  getCar,
  deleteCar,
  search
}