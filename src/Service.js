import axios from "axios";
import cookie from "./cookie";
const url = "http://localhost:3001/";

class Service {
  //Get Posts
  // static getClasses(){
  //     return new Promise(async (resolve, rejects) => {
  //         try{
  //          const res = await axios.get(url)
  //          const data = res.data
  //          resolve(
  //              data.map(post => post)
  //          )
  //         }catch(err){
  //             rejects(err)
  //         }
  //     })
  // }

  // Get UserInfo
  static getUserInfo() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    return axios.get(`${url}users/user`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Start Stream
  static getCurrentlyStreaming() {
    const token = cookie.getCookie("auth-token");
    return axios.get(`${url}users/getCurrentlyStream`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Start Stream
  static startStream(
    streamTitle,
    description,
    isPrivate,
    password,
    isStreaming
  ) {
    const token = cookie.getCookie("auth-token");
    console.log(streamTitle + description + isPrivate + password);
    return axios.post(
      `${url}users/startStream`,
      {
        streamTitle,
        description,
        isPrivate,
        password,
        isStreaming
      },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // Get Stream detail
  static getStreamDetail(streamCode) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${url}users/getStreamDetail`,
      { streamCode },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // // Create a new class for the current user
  // static createClass(classroomName){
  //     const token = cookie.getCookie("auth-token") //window.localStorage.getItem("auth-token")
  //     if (classroomName != null && classroomName != ""){
  //         return axios.post(`${url}users/createclass`,{
  //             classroomName
  //         },{ params:{}, headers: { 'auth-token': token } })
  //     }
  // }

  // // To join class
  // static joinClass(code){
  //     const token = cookie.getCookie("auth-token") //window.localStorage.getItem("auth-token")
  //     return axios.post(`${url}users/joinclass`, {
  //         code
  //     },{ params:{}, headers: { 'auth-token': token } })
  // }

  // Post Data for signing up
  static async signUp(email, pwd, name) {
    return axios.post(`${url}auth/signUp`, {
      email,
      pwd,
      name
    });
  }

  // Post Data for login
  static async login(email, pwd) {
    const credential = await axios.post(`${url}auth/login`, {
      email,
      pwd
    });
    const { token } = credential.data;
    if (token) {
      cookie.setCookie("auth-token", token, 30); //window.localStorage.setItem("auth-token",token)
      localStorage.setItem("LastLogged", Date.now());
      window.location.replace("/home");
      return null;
    } else {
      return { message: credential.data.message };
    }
  }

  static async logout() {
    cookie.setCookie("auth-token", "", 30);
    localStorage.setItem("LastLogged", Date.now());
  }
}

export default Service;
