import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ListSets from "../sets/ListSets";
import { Button } from "react-bootstrap";
export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSet: false,
      isCluster: false,
    };
    this.goSet = this.goSet.bind(this);
    this.goCluster = this.goCluster.bind(this);
  }

  goSet(event) {
    this.setState({ isSet: true, isCluster: false });
  }
  goCluster(event) {
    this.setState({ isSet: false, isCluster: true });
  }
  render() {
    if (this.state.isSet) {
      return (
        <Fragment>
          <ListSets block={this.props.block} subject={this.props.subject} goCluster={this.goCluster} />
        </Fragment>
      );
    }
    if (this.state.isCluster) {
      return (
        <Fragment>
          <ListClusters  block={this.props.block} subject={this.props.subject} goCluster={this.goCluster} goSet={this.goSet} />
        </Fragment>
      );
    }

    return (
      <Fragment>

        <h1 className="text-center"></h1>

<div className="container">
  <h1 className="text-center text-info" >{this.props.block} {this.props.subject}</h1>
  {/* <hr/> */}
  <div className="row align-items-start px-4 mt-4">
      <div className="col-1"></div>

  <Button
    className="btn btn-secondary"
    href={`/#/${this.props.block}`}
  >
    Previous Page
  </Button>
        </div>
  <div className="row align-items-start mt-2 pt-2 px-5 mb-5">
     
    <div className="col-sm-6 col-md-6 col-lg-6 text-center pb-2" >

      <a
                  onClick={(e) => {
                    this.goSet();
                    event.preventDefault();
                  }}
                  href="#"
        className="btn btn-rounded1 mt-2 stretched-link text-center  d-block mx-auto"
        style={{ maxWidth: "390px", fontSize: "3rem", padding: "5rem 2rem" }}
      >
         <i className="fas fa-layer-group mb-2"></i> Sets
      </a>
    </div>

    <div className=" col-sm-6 col-md-6 col-lg-6 text-center pb-2">

      <div
                  onClick={(e) => {
                    this.goCluster();
                    event.preventDefault();
                  }}
                  href="#"
        className="btn btn-rounded1 mt-2 stretched-link text-center  d-block mx-auto"
        style={{ maxWidth: "390px", fontSize: "3rem", padding: "5rem 2rem" }}
      >
      <i className="fas fa-sitemap mb-2"></i>  Clusters
      </div>
    </div>
    {/* <div className="col-1"></div> */}





  </div>
</div>
      </Fragment>
    );
  }
}

export default List;