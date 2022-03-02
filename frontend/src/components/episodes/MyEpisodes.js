import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getMyEpisodes, deleteEpisode, getEpisodes } from "../../actions/episodes.js";
import FormEpisode from "./FormEpisode.js";
import DetailsEpisode from "./DetailsEpisode.js";

export class MyEpisodes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      condition: this.props.condition,
      selectedEpisodeId: null,
      selectedEpisode: null,
      username: null,
    };
    this.backToMyEpisodes = this.backToMyEpisodes.bind(this);
  }
  rendering(user) {
      
    if (user && this.state.isUpdating == true) {
        if (this.state.username !== null) {
            
      this.setState({
        isUpdating: false,
      });
    }
        this.setState({username: user.username})
      this.props.getMyEpisodes(user.username);
    }
  }

  static propTypes = {
    //This is the first "episode" from the func down below
    episodes: PropTypes.array.isRequired,
    getMyEpisodes: PropTypes.func.isRequired,
    getEpisodes: PropTypes.func.isRequired,
    deleteEpisode: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }
  backToMyEpisodes(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true});
  }
  render() {
    const { user } = this.props.auth;  
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsEpisode
            selectedEpisodeId={this.state.selectedEpisodeId}
            episode={this.state.selectedEpisode}
            condition={'Cardiovascular'}
            backToList={this.backToMyEpisodes}
          />
        </Fragment>
      );
    }

    {
      this.rendering(user);
    }
    return (
      <div className="container">
        <h1 className="text-center py-2 text-info">
          {this.state.username +"'s"} Episodes
        </h1>
        <p></p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.episodes.map((episode) => (
              <tr key={episode.id}>
                <td>{episode.id}</td>
                <td>{episode.title}</td>

                <td>
                  <a
                    href= {`#/myepisodes/${episode.id}`}
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
                    View Episode
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  episodes: state.episodes.episodes,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMyEpisodes, deleteEpisode, getEpisodes })(MyEpisodes);