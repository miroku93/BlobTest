import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
const BOARD_API_BASE_URL1 = "http://localhost:8080/api";

class BoardService {
  getBoards(p_num) {
    return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
  }

  // getBoards() {
  //   return axios.get(BOARD_API_BASE_URL);
  // }

  //Create formData
  createBoard_formData(formData) {
    console.log("--------------- //Create formData--------------");
    return axios.post(BOARD_API_BASE_URL1 + "/upload", formData);
    //return axios.post(BOARD_API_BASE_URL + "/formdata/", formData);
  }

  //Create board
  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }

  //update formData
  updateBoard_formData(no, formData) {
    return axios.put(BOARD_API_BASE_URL + "/formData/" + no, formData);
  }

  //update board
  updateBoard(no, board) {
    return axios.put(BOARD_API_BASE_URL + "/" + no, board);
  }

  getOneBoard(no) {
    return axios.get(BOARD_API_BASE_URL + "/" + no);
  }

  deleteBoard(no) {
    //return axios.delete(BOARD_API_BASE_URL + "/" + no);
    console.log("deleteBoard -----------------:" + no);
    return axios.delete(BOARD_API_BASE_URL + "/" + no);
  }
}

export default new BoardService();
