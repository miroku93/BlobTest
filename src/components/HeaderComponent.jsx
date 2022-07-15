import React, { Component } from "react";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: "ko",
    };

    this.langhandleChange = this.langhandleChange.bind(this);
  }

  langhandleChange = (e) => {
    this.setState({ locale: e.target.value });
    localStorage.setItem("locale", e.target.value);
  };

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="http://localhost:3000" className="navbar-brand">
                App
              </a>
            </div>

            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <select
                    onChange={this.langhandleChange}
                    defaultValue={localStorage.getItem("locale")}
                  >
                    {["en", "ko"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
