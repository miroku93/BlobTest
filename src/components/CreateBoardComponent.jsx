import React, { Component } from "react";
import BoardService from "../service/BoardService";
import axios from "axios";

class CreateBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      no: this.props.match.params.no,
      type: 1,
      title: "",
      contents: "",
      memberNo: "",
      selectedFiles: {},
      //blob : new Blob([]),
      delNo: [],
    };

    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
    this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.uploadBoard = this.uploadBoard.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.handleFileInputHandler = this.handleFileInputHandler.bind(this);
  }

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeContentsHandler = (event) => {
    this.setState({ contents: event.target.value });
  };

  changeMemberNoHandler = (event) => {
    this.setState({ memberNo: event.target.value });
  };

  handleFileInputHandler = async (event) => {
    event.persist();
    // for (let i = 0; i < file.length; i++) {
    //   this.selectedFiles.push(file[i]);
    //   console.log(this.selectedFiles);
    // }

    console.log(event.target.files);
    this.setState({ selectedFiles: event.target.files });
    // for (let i = 0; i < event.target.files.length; i++) {
    // console.log(
    //   "for:-----------------:" + i + ";" + event.target.files.FileList[i]
    // );

    // this.setState({
    //   selectedFiles: [...this.state.selectedFiles, event.target.files],
    // });
    // }
  };

  //-----------------------테스트------------------------
  handlePost = (event) => {
    event.preventDefault();
    console.log("----------------------------------");
    const board = {
      type: this.state.type,
      title: this.state.title,
      contents: this.state.contents,
      memberNo: this.state.memberNo,
    };

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("board", new Blob([JSON.stringify(board)]), {
      type: "application/json",
    });

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    try {
      const res = axios.post("/api/upload", formData);
      console.log(res);
      alert("성공");
    } catch (err) {
      alert("실패");
    }
    this.props.history.push("/board");
  };
  //-----------------------------------------------------

  createBoard = (event) => {
    event.preventDefault();
    let board = {
      type: this.state.type,
      title: this.state.title,
      contents: this.state.contents,
      memberNo: this.state.memberNo,
    };
    console.log("board => " + JSON.stringify(board));

    if (this.state.no === "_create") {
      BoardService.createBoard(board).then((res) => {
        this.props.history.push("/board");
      });
    } else {
      BoardService.updateBoard(this.state.no, board).then((res) => {
        this.props.history.push("/board");
      });
    }
  };

  //create a new board
  //onSubmit = (event) => {
  uploadBoard = (event) => {
    console.log("--------uploadBoard-------");

    event.preventDefault();
    event.persist();

    let board = {
      type: Number(this.state.type),
      title: this.state.title,
      contents: this.state.contents,
      memberNo: Number(this.state.memberNo),
    };

    console.log(this.state.selectedFiles.length);

    let files = this.state.selectedFiles;
    console.log("files:" + files);
    console.log("files.length:" + files.length);
    console.log("files:" + files[0]);
    console.log("files:" + files[1]);
    console.log("files:" + files[2]);
    //Create Board
    if (this.state.no === "_create") {
      //Board Data
      if (files.length == 0 || files.length == undefined) {
        console.log("uploadBoard data => " + JSON.stringify(board));
        BoardService.createBoard(board).then((res) => {
          this.props.history.push("/board");
        });
        //create FromData
      } else {
        //multipartFormData
        let formData = new FormData();
        console.log("-----------input formdata---------------------");

        //formData.append("files", this.state.selectedFiles);

        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
        formData.append("jsonList", new Blob([JSON.stringify(board)]), {
          type: "application/json",
        });

        console.log("-----------for formData---------------------");
        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
        BoardService.createBoard_formData(formData).then((res) => {
          this.props.history.push("/board");
        });
      }
      // Update Board
    } else {
      //Board Data
      if (files.length === 0) {
        console.log("uploadBoard data => " + JSON.stringify(board));
        BoardService.updateBoard(this.state.no, board).then((res) => {
          this.props.history.push("/board");
        });
      } else {
        //multipartFormData
        let formData = new FormData();
        formData.append("file", this.state.selectedFile);
        formData.append("jsonList", new Blob([JSON.stringify(board)]), {
          type: "application/json",
        });

        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
        BoardService.upload(formData).then((res) => {
          this.props.history.push("/board");
        });
      }
    }
  };

  cancel() {
    this.props.history.push("/board");
  }

  getTitle() {
    if (this.state.no === "_create") {
      return <h3 className="text-center">새글을 작성해주세요</h3>;
    } else {
      return <h3 className="text-center">{this.state.no}글을 수정 합니다.</h3>;
    }
  }

  // For update function add
  componentDidMount() {
    if (this.state.no === "_create") {
      return;
    } else {
      BoardService.getOneBoard(this.state.no).then((res) => {
        let board = res.data;
        console.log("board => " + JSON.stringify(board));

        this.setState({
          type: board.type,
          title: board.title,
          contents: board.contents,
          memberNo: board.memberNo,
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form encType="multipart/form-data">
                  <div className="form-group">
                    <label> Type </label>
                    <select
                      placeholder="type"
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.changeTypeHandler}
                    >
                      <option value="1">자유게시판</option>
                      <option value="2">질문과 답변</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Title </label>
                    <input
                      type="text"
                      placeholder="title"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Contents </label>
                    <textarea
                      placeholder="contents"
                      name="contents"
                      className="form-control"
                      value={this.state.contents}
                      onChange={this.changeContentsHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> MemberNo </label>
                    <input
                      placeholder="memberNo"
                      name="memberNo"
                      className="form-control"
                      value={this.state.memberNo}
                      onChange={this.changeMemberNoHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="profile_files"
                      multiple="multiple"
                      onChange={this.handleFileInputHandler}
                    />
                  </div>
                  <button
                    type="onSubmit"
                    className="btn btn-success"
                    //onClick={this.createBoard}
                    onClick={this.uploadBoard}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBoardComponent;
