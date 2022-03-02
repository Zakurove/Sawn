import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="font-small mt-auto bg-dark" id="down">
        <div className="container">
          <div className="row">
            <div className="d-block mx-auto pt-5">
              <div className="mb-3 flex-center">
                <a
                  className="tw-ic text-info pl-4 ml-2"
                  href="https://twitter.com/codepoiesis"
                >
                  <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>

                <a
                  className="tw-ic text-warning"
                  href="mailto:codepoiesis@gmail.com"
                >
                  <i className="far fa-envelope fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3 text-light">
          © 2020 Copyright:
          <a href="https://twitter.com/codepoiesis" className="text-light">
            {" "}
            Codepoiesis
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
