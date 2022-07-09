/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_num: 1,
      paging: {},
      boards: [],
      checkLists: [],
    };

    this.createBoard = this.createBoard.bind(this);
    this.deleteView = this.deleteView.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    // BoardService.getBoards().then((res) => {
    //   this.setState({ boards: res.data });
    BoardService.getBoards(this.state.p_num).then((res) => {
      console.log(res);
      this.setState({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
  }

  // changeHandler = (checked, id) => {
  //   if (checked) {
  //     this.setState([...this.state.checkLists, id]);
  //   } else {
  //     // 체크 해제
  //     this.setState(this.state.checkLists.filter((el) => el !== id));
  //   }
  // };

  changeHandler = (event, no) => {
    // 체크할 시 CheckList에 id값 넣기
    if (event.target.checked) {
      console.log("event.target.checked IN----------:" + no);
      //this.setState({ checkLists: no });
      //this.setState([...this.state.checkLists, no]);
      this.setState((state) => {
        const checkLists = state.checkLists.concat(no);
        return { checkLists };
      });
      console.log("this.state.checkLists:" + this.state.checkLists);
    } else {
      console.log("event.target.checked else----------");
      // this.setState(
      //   this.state.checkLists.filter((checkedId) => checkedId !== no)
      // );
      this.setState((state) => {
        const checkLists = state.checkLists.filter(
          (checkedId) => checkedId !== no
        );
        return { checkLists };
      });
    }
  };

  createBoard() {
    console.log("this.state.checkLists:" + this.state.checkLists);
    this.props.history.push("/create-board/_create");
  }

  readBoard(no) {
    this.props.history.push(`/read-board/${no}`);
  }

  listBoard(p_num) {
    console.log("pageNum : " + p_num);
    BoardService.getBoards(p_num).then((res) => {
      console.log(res.data);

      this.setState({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
    //console.log(this.state.boards);
  }

  deleteView(e) {
    e.preventDefault();
    e.persist();
    if (
      window.confirm(
        "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
      )
    ) {
      let no = this.state.checkLists;

      if (no.length > 0) {
        console.log("delete no => " + no);
        BoardService.deleteBoard(no).then((res) => {
          //BoardService.deleteBoard(no).then((res) => {
          console.log("delete result => " + JSON.stringify(res));
          if (res.status === 200) {
            this.props.history.push("/board");
          } else {
            alert("글 삭제가 실패했습니다.");
          }
          this.props.history.push("/board");
        });
      } else {
        alert("글 삭제가 실패했습니다!!!!");
        this.props.history.push("/board");
      }
    }
  }

  viewPaging() {
    const pageNums = [];

    for (
      let i = this.state.paging.pageNumStart;
      i <= this.state.paging.pageNumEnd;
      i++
    ) {
      pageNums.push(i);
    }

    return pageNums.map((page) => (
      <li className="page-item" key={page.toString()}>
        <a className="page-link" onClick={() => this.listBoard(page)}>
          {page}
        </a>
      </li>
    ));
  }

  isPagingPrev() {
    if (this.state.paging.prev) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.currentPageNum - 1)}
            tabindex="-1"
          >
            Previous
          </a>
        </li>
      );
    }
  }

  isPagingNext() {
    if (this.state.paging.next) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.currentPageNum + 1)}
            tabIndex="-1"
          >
            Next
          </a>
        </li>
      );
    }
  }

  isMoveToFirstPage() {
    if (this.state.p_num !== 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(1)}
            tabIndex="-1"
          >
            Move to First Page
          </a>
        </li>
      );
    }
  }

  isMoveToLastPage() {
    if (this.state.p_num !== this.state.paging.pageNumCountTotal) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)}
            tabIndex="-1"
          >
            LastPage({this.state.paging.pageNumCountTotal})
          </a>
        </li>
      );
    }
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Boards List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.createBoard}>
            글 작성
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={this.deleteView}
          >
            삭제
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>선택</th>
                <th>글 번호</th>
                <th>타이틀 </th>
                <th>작성자 </th>
                <th>작성일 </th>
                <th>갱신일 </th>
                <th>좋아요수</th>
                <th>조회수</th>
                <th>파일</th>
              </tr>
            </thead>
            <tbody>
              {this.state.boards.map((board) => (
                <tr key={board.no}>
                  <td>
                    <input
                      name={board.no}
                      type="checkbox"
                      className="checkbox ck"
                      // onChange={(e) => {
                      //   this.changeHandler(e.currentTarget.checked, board.no);
                      // }}
                      // checked={
                      //   this.state.checkLists.filter(board.no) ? true : false
                      // }
                      onChange={(e) => this.changeHandler(e, board.no)}
                      //checked={this.checkLists.includes(board)}
                    />
                  </td>
                  <td> {board.no} </td>
                  <td>
                    {" "}
                    <a onClick={() => this.readBoard(board.no)}>
                      {board.title}{" "}
                    </a>
                  </td>
                  <td> {board.memberNo} </td>
                  <td> {board.createdTime} </td>
                  <td> {board.updatedTime} </td>
                  <td> {board.likes} </td>
                  <td> {board.counts} </td>
                  <td> {board.bfile} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {this.isMoveToFirstPage()}
              {this.isPagingPrev()}
              {this.viewPaging()}
              {this.isPagingNext()}
              {this.isMoveToLastPage()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default ListBoardComponent;
