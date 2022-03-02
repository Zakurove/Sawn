import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getEpisodes, deleteEpisode } from "../../actions/episodes.js";
// import { loadingOn, loadingOff } from "../../actions/loading.js";
import FormEpisode from "./FormEpisode.js";
import DetailsEpisode from "./DetailsEpisode.js";

export class ListEpisodes extends Component {
  static propTypes = {
    goCluster: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isViewing: false,
      condition: this.props.condition,
      selectedEpisodeId: null,
      selectedEpisode: null,
      conditionLink: null,

    };
    this.backToList = this.backToList.bind(this);
  }
  //Before render, to fetch info about this list regarding  and condition
  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.condition == "Hematology/Oncology") {
        this.setState({
          conditionLink: "hemOnc",
        });
      }
      if (this.props.condition !== "Hematology/Oncology") {
        const conditionLink = this.props.condition.toLowerCase();
        this.setState({
          conditionLink: conditionLink,
        });
      }
      this.setState({
        isUpdating: false,
      });

      // setTimeout(
      //   () => this.setState({ isUpdating: false }),
      //   3000
      // );

      //   setTimeout(
      //     function() {
      //         this.setState({ isUpdating: false });

      //     }
      //     .bind(this),
      //     3000
      // );

      // setTimeout(() => {

      // })
      this.props.getEpisodes(this.state.condition);
    }

    this.backToList = this.backToList.bind(this);
  }

  static propTypes = {
    //This is the first "episode" from the func down below
    episodes: PropTypes.array.isRequired,
    getEpisodes: PropTypes.func.isRequired,
    deleteEpisode: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    condition: PropTypes.string.isRequired,

  };

  componentDidMount() {
    this.props.getEpisodes(this.props.condition);
  }
  backToList(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true, isReady: false });
    this.props.getEpisodes(this.props.condition);
  }
  render() {
        // // The loading handler
        // if (this.props.loadingState == true) {
        //   setTimeout(() => this.props.loadingOff(), 1000);
        //   }

    if (this.state.isCreating) {
      return (
        <Fragment>
          <FormEpisode
            condition={this.state.condition}
            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsEpisode
            selectedEpisodeId={this.state.selectedEpisodeId}
            episode={this.state.selectedEpisode}
            condition={this.state.condition}

            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    const { user } = this.props.auth;
    {
      this.rendering();
    }

    // The loading handler
    if (this.state.isReady == false) {
    setTimeout(() => this.setState({ isReady: true }), 600);
    }


    //The List component
    if (this.state.isReady) {
      return (
        <div className="container">
          <h1 className="text-center py-2 text-info">
            {this.state.condition} Episodes
          </h1>
          {/* <hr /> */}
          <a className="btn btn-secondary mt-1" href={`#/`}>
            Previous Page
          </a>


                <Button
                  className="btn btn-info ml-1 mt-1"
                  onClick={(e) => {
                    this.setState({
                      isCreating: true,
                    });
                  }}
                >
                  Add a New Episode
                </Button>
             


          
          <p></p>
          <table className="table table-striped mx-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                
                <th>Awareness</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Date</th>

                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.episodes.map((episode) => (
                <Fragment>
                            {user
            ? this.props.auth.user.profile.role &&
              (this.props.auth.user.profile.role == "Physician" || this.props.auth.user.username == episode.owner_username)  && (


                <tr key={episode.id}>
                  
                  <td>{episode.id}</td>
                  <td>{episode.owner_username}</td>
                  <td>{episode.awareness}</td>
                  <td>{episode.duration}</td>
                  <td>{episode.type}</td>
                  <td>{episode.datee}</td>
                  <td>
                    <a
                      href={`#/${this.state.conditionLink}/episodes/${episode.id}`}
                      className="btn btn-warning"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={(e) => {
                        this.setState({
                          selectedEpisodeId: episode.id,
                          // isViewing: true,
                          selectedEpisode: episode,
                        });
                      }}
                    >
                      Details
                    </a>
                  </td>
                </tr>
                  
                  
                  )
                  : ""}
                  </Fragment>   

              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // The loading component
    if (this.state.isReady == false) {
    return (

    <Fragment>
<div className="cssload-loader mt-5">
	<div className="cssload-inner cssload-one"></div>
	<div className="cssload-inner cssload-two"></div>
	<div className="cssload-inner cssload-three"></div>
</div>
    </Fragment>

    );
    }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  episodes: state.episodes.episodes,
  auth: state.auth,
  loadingState: state.loadingState,
});

export default connect(mapStateToProps, { getEpisodes, deleteEpisode })(ListEpisodes);
