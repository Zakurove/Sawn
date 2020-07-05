import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class MainPage extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-info">Welcome to Tawassam!</h1>
          <p className="lead text-info">
            This is your distentation for learning and teaching visual materials
            in health care!
          </p>
        </div>

        <div className="container">
          <h1 className="text-left pb-2 text-info">Select Block:</h1>
          <div className="row align-items-start">
            <div className="col text-center pb-2">
              <img
                src={
                  "https://citytoday.news/wp-content/uploads/2017/10/heart_health.jpg"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
                {" "}
                <a
                  href="/CVS"
                  className=" btn btn-warning stretched-link text-center"
                >
                Cardiovascular
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696058752675348520/unknown.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
                {" "}
                <a
                  href="/MSK"
                  className="btn btn-warning stretched-link text-center"
                >
                Musculoskeletal
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://png.pngtree.com/png-vector/20191214/ourlarge/pngtree-human-lungs-anatomy-vector-illustration-on-white-background-png-image_2074510.jpg"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />{" "}
              <a
                href="/Respiratory"
                className="btn btn-warning stretched-link text-center"
              >
                Respiratory
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696056414740807760/unknown.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
              <a
                href="/Hematology"
                className="btn btn-warning stretched-link text-center"
              >
                Hematology/Oncology
              </a>
            </div>
          </div>
          <div className="row align-items-center mt-2">
            <div className="col text-center">
              <img
                src={
                  "https://www.pngkit.com/png/detail/61-617794_brain-clipart-transparent-background-brain-clipart.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
              <a
                href="/Neurology"
                className="btn btn-warning stretched-link text-center"
              >
                Neurology
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696045738031054978/unknown.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
              <a
                href="/Endocrine"
                className="btn btn-warning stretched-link text-center"
              >
                Endocrine
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696062020918837288/unknown.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
              <a
                href="/Gastrointestinal"
                className="btn btn-warning stretched-link text-center"
              >
                Gastrointestinal
              </a>
            </div>

            <div className="col text-center">
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696064400532045834/unknown.png"
                }
                className="img-fluid pb-2"
                alt="Responsive image"
                style={{height: "320px", width: "300"}}
              />
              <a
                href="/Genitourinary"
                className="btn btn-warning stretched-link text-center"
              >
                Genitourinary
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
