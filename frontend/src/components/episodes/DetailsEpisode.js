import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMessage } from "../../actions/messages";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { EditEpisode } from "./EditEpisode.js";
import * as episodeActions from "../../actions/episodes.js";

export class DetailsEpisode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      modalShow: false,
      noteContent: "",
      noteContentEdit: "",
      x: 0,
      y: 0,
      noteMode: false,
      noteButtonText: "Enable Adding Notes",
      showNotesButtonText: "Hide Notes",
      showNotes: false,
      isEditing: false,
      tooltipOpen: false,
      popoverOpen: false,
      episode: this.props.episode,
      testing: ["hello", "One"],
      selectedImageId: null,
      EditedNoteId: null,
      noteEditMode: false,
      modalEditShow: false,
      noteEditingState: false,
      noteDisplay: "",
      optionsState: false,
      isRemovingImage: false,
      episode: this.props.episode,
      deleteModalShow: false,
      user: null,
      // username: this.props.auth.user.username
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.deleteModalOpen = this.deleteModalOpen.bind(this);
    this.saveEpisode = this.saveEpisode.bind(this);
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.doneImage = this.doneImage.bind(this);
  }
  static propTypes = {
    episode: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  //------------------------------------------------------------------------------
  //                                     EDIT & DELETE
  saveEpisode(event) {
    this.forceUpdate();
    this.setState({ isEditing: false });
    this.setState({ optionsState: false });
    setTimeout(() =>  window.location.reload(), 300);
  }
  doneImage(event) {
    this.setState({ isRemovingImages: false });
    this.setState({ optionsState: false });
    this.forceUpdate();
  }
  //To delete episode
  deleteEpisode(event) {
    this.props.actions.deleteEpisode(this.state.episode.id);
  }

  //For knowing if the user is editing or not and acting accordingly
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  toggleRemoveImages() {
    this.setState({ isRemovingImages: !this.state.isRemovingImages });
  }

  //For toggling options button
  toggleOptions() {
    this.setState({ optionsState: !this.state.optionsState });
  }
  deleteModalOpen() {
    this.setState({ deleteModalShow: true });
  }
  deleteModalClose() {
    this.setState({
      modalInputName: "",
      deleteModalShow: false,
    });
  }
  //------------------------------------------------------------------------------
  //                                     LIFECYCLE
  componentDidMount() {
    this.setState({
      tooltipOpen: true,
      user: this.props.user,
    });

    // this.props.actions.getEpisodes(this.props.block, this.props.subject);
    this.props.actions.getAllEpisodes();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.episode.id != nextProps.episode.id) {
      this.setState({ episode: nextProps.episode });
    }
  }

  //------------------------------------------------------------------------------
  //                                        RENDER
  render() {
    const { user } = this.props.auth;
    const episodeId = this.props.selectedEpisodeId;
    const { x, y } = this.state;
    if (this.state.redirectDelete == true) {
      return <Redirect to={"/episodes"} />;
    }

    if (this.state.isEditing) {
      return (
        <Fragment>
          <EditEpisode
            createMessage={this.props.createMessage}
            rerenderParent={this.rerenderParent}
            episode={this.props.episode}
            updateEpisode={this.props.actions.updateEpisode}
            onChange={this.updateEpisodeState}
            onSave={this.saveEpisode}
            addEpisode={this.props.actions.addEpisode}
          />
        </Fragment>
      );
    }
    // if (this.state.isRemovingImages) {
    //   return (
    //     <Fragment>
    //       <DeleteEpisode
    //         episode={this.props.episode}
    //         removeImage={this.props.actions.removeImage}
    //         doneImage={this.doneImage}
    //       />
    //     </Fragment>
    //   );
    // }
    return (
      <Fragment>
        <Modal
          show={this.state.modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.modalClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-info text-center"
            >
              Add Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="noteForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  value={this.state.noteContent}
                  name="noteContent"
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  rows="3"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={(e) => this.modalClose(e)}
              className="btn btn-warning"
              form="noteForm"
            >
              Save
            </Button>
            <Button
              onClick={(e) => this.modalClose(e)}
              className="btn btn-secondary ml-2"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modalEditShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.modalEditClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-info text-center"
            >
              Edit Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="noteForm" onSubmit={this.onEditSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  value={this.state.noteContent}
                  name="noteContent"
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  rows="3"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={(e) => this.modalEditClose(e)}
              className="btn btn-warning"
              form="noteForm"
            >
              Save
            </Button>
            <Button
              onClick={(e) => this.modalEditClose(e)}
              className="btn btn-secondary ml-2"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.deleteModalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.deletModalClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-info text-center"
            >
              Are you sure you want to delete this episode?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="danger"
              // To delete the episode
              onClick={(e) => {
                this.deleteModalClose(e);
                this.deleteEpisode(e);
              }}
              // To go back to previous page after deleteing the episode
              href={`#/${this.props.episode.condition.toLowerCase()}`}
              style={{ justifyContent: "center" }}
              form="noteForm"
            >
              <i class="far fa-trash-alt"></i>
              <span> </span>
              Remove
            </Button>
            <Button
              onClick={(e) => this.deleteModalClose(e)}
              className="btn btn-secondary ml-2 "
              style={{ justifyContent: "center" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container" key={this.props.episode.id}>
          <div className="row">
            <div className="col">
              <h1 className="text-info text-center my-3">
                {this.props.episode.title}
              </h1>
            </div>
          </div>

          {/* Row that contains both slider and explanation */}
          <div className="row " style={{ height: "770px" }}>
            {/* Slider and buttons above it */}
            {/* <div className="col-sm-8 order-sm-12 mb-4" style={{  padding: "0px" }} >
             
            </div> */}

            {/* Explanation and buttons above it */}
            <div className="col-sm-12 order-sm-1" style={{ padding: "0px" }}>
              <div>
                {this.state.optionsState && (
                  <Button
                    variant="danger"
                    size="sm"
                    style={{
                      marginBottom: "5px",
                      marginRight: "2px",
                      marginLeft: "2px",
                    }}
                    onClick={(e) => {
                      this.deleteModalOpen(e);
                    }}
                  >
                    <i class="far fa-trash-alt"></i>
                    <span> </span>
                    Delete Episode
                  </Button>
                )}

                {this.state.optionsState && (
                  <Button
                    variant="info"
                    size="sm"
                    style={{
                      marginBottom: "5px",
                      marginRight: "2px",
                      marginLeft: "2px",
                    }}
                    onClick={this.toggleEdit}
                  >
                    <i class="fas fa-edit"></i>
                    <span> </span>
                    Edit Episode
                  </Button>
                )}
              </div>

              <div>
                <Button
                  className="btn btn-secondary "
                  style={{ marginBottom: "3px", marginRight: "3px" }}
                  href={`#/${this.props.episode.condition.toLowerCase()}`}
                >
                  Back to episodes list
                </Button>
                {user
                  ? this.props.auth.user.username ==
                      this.props.episode.owner_username && (
                      <Button
                        className=" float-right"
                        style={{ marginBottom: "3px", marginRight: "3px" }}
                        variant="warning"
                        onClick={this.toggleOptions}
                      >
                        <i class="fas fa-cog"></i>
                        <span> </span>
                        Options
                      </Button>
                    )
                  : ""}
                <div
                  className="collapsible form-group"
                  style={{ display: "none" }}
                >
                  <a href="#" className="btn btn-info my-2">
                    Edit Episode
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">Date: </span>
                      {this.props.episode.datee}
                    </p>
                  </div>

                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">Aware during episode: </span>
                      {this.props.episode.awareness}
                    </p>
                  </div>
                </div>

                <div className="col-4">
                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">type: </span>
                      {this.props.episode.type}
                    </p>
                  </div>

                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">Duration: </span>
                      {this.props.episode.duration}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">Medications: </span>
                      {this.props.episode.medications}
                    </p>
                  </div>

                  <div
                    className=" mb-3 mt-2 text-left py-3 px-3 style-1 col"
                    style={{
                      border: "2px solid #17a2b8",
                      borderRadius: "13px",
                      background: "rgb(235, 236, 237)",
                      minHeight: "80px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <p
                      className="mx-auto  text-center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      <span className="text-info">Notes: </span>
                      {this.props.episode.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </Fragment>
    );
  }
}

function getEpisodeById(episodes, id) {
  var episode = episodes.find((episode) => episode.id == id);

  return Object.assign({ episode }, episode);
}

function mapStateToProps(state, ownProps) {
  let episodes = state.episodes.episodes;

  let auth = state.auth;
  let episode = {
    title: "",
    description: "",
    condition: "",
    id: "",
    images: [],
  };
  let selectedEpisodeId = ownProps.match.params.id;
  if (selectedEpisodeId && episodes.length > 0) {
    episode = getEpisodeById(episodes, selectedEpisodeId);
  }

  return { episode: episode, auth: auth };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(episodeActions, dispatch),
    createMessage: bindActionCreators(createMessage, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsEpisode);
