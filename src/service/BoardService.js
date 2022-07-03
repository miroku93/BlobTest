import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
  // getBoards(p_num) {
  //   return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
  // }

  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }

  upload(formData) {
    console.log("---------------upload-------------------");
    console.log(formData);
    return axios.post("http://localhost:8080/api/upload", formData);
  }

  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(no) {
    return axios.get(BOARD_API_BASE_URL + "/" + no);
  }

  updateBoard(no, board) {
    return axios.put(BOARD_API_BASE_URL + "/" + no, board);
  }

  deleteBoard(no) {
    return axios.delete(BOARD_API_BASE_URL + "/" + no);
  }
}

export default new BoardService();
