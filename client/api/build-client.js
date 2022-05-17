import axios from "axios";  
export default ({req})=>{
  // check if we are running on the browser or server
  if (typeof window === "undefined") {
    // we are on server
    // return a asynchronous request wi
      return axios.create({
        baseURL:'http://www.ticketing-app-prod.site',
        headers:req.headers
      })
  } else {
    //we are on the browser
    return axios.create({
      baseURL:'/',
    })
  }
}

