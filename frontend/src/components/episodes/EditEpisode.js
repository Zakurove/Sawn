import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEpisode, updateEpisode } from "../../actions/episodes.js";
import { createMessage } from "../../actions/messages";
import { Button, Modal } from "react-bootstrap";



export class EditEpisode extends Component {
  state = {
    episode: this.props.episode,
    title: this.props.episode.title,
    description: this.props.episode.description,
    awareness: this.props.episode.awareness,
    duration: this.props.episode.duration,
    datee: this.props.episode.datee,
    type: this.props.episode.type,
    medications: this.props.episode.medications,
    notes: this.props.episode.notes,
    condition: this.props.episode.condition,

  };
  static propTypes = {
    episode: PropTypes.object.isRequired,
    addEpisode: PropTypes.func.isRequired,
    updateEpisode: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    const episode = new FormData();
    episode.append("awareness", this.state.awareness);
    episode.append("duration", this.state.duration);
    episode.append("datee", 'dd');
    episode.append("type", this.state.type);
    episode.append("medications", this.state.medications);
    episode.append("notes", this.state.notes);
    episode.append("condition", this.state.condition);

    this.props.updateEpisode(episode, this.state.episode.id);
    setTimeout(() =>  this.props.onSave(e), 400);
    this.setState({
      title: "",
      description: "",
    });
  
}
  componentWillReceiveProps(nextProps) {
    if (this.props.episode.id != nextProps.episode.id) {
      this.setState({ episode: nextProps.episode });
    }
  }
  render() {
    const { awareness, duration, medications, notes, type } = this.state;
    return (
      <div className="container">
      <h1 className="text-center py-2 text-info">
        {this.props.condition}: create a episode
      </h1>
      <Button
        className="btn btn-secondary mb-2"
        onClick={this.props.backToList}
      >
        Previous Page
      </Button>

      <div className="row pt-4" style={{ borderTop: "2px solid #ffc107" }}>
        <div className="col">
          <form onSubmit={this.onSubmit} id="episodeForm">
            <div className="form-group">
              <h5 className="text-info">Were you aware in this episode?</h5>
          
              <div className="form-check"> 
                <input
                  className="form-check-input"
                  type="radio"
                  name="awareness"
                  id="awareYes"
                  value="Yes"
                  onChange={this.onChange}
                  checked={this.state.awareness === "Yes"}
                />
                <label class="form-check-label" for="awaresYes">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="awareness"
                  id="awareNo"
                  value="No"
                  onChange={this.onChange}
                  checked={this.state.awareness === "No"}
                />
                <label class="form-check-label" for="awareNo">
                  No
                </label>
              </div>
              </div>
        
              <div className="form-group">
              <h4 className="text-info">What was the duration of this episode?</h4>
              <input
                className="form-control"
                type="text"
                name="duration"
                onChange={this.onChange}
                value={duration}
                placeholder="Duration"
                
              />
            </div>

            <div className="form-group">
              <h5 className="text-info">What was the type of your seizure?</h5>
          
              <div className="form-check"> 
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="tonic-clonic"
                  value="tonic-clonic"
                  onChange={this.onChange}
                  checked={this.state.type === "tonic-clonic"}
                />
                <label class="form-check-label" for="tonic-clonic">
                  Tonic-clonic (convulsive)
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="absence"
                  value="absence"
                  onChange={this.onChange}
                  checked={this.state.type === "absence"}
                />
                <label class="form-check-label" for="absence">
                Absence
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="myoclonic"
                  value="myoclonic"
                  onChange={this.onChange}
                  checked={this.state.type === "myoclonic"}
                />
                <label class="form-check-label" for="myoclonic">
                Myoclonic
                </label>
              </div>
              </div>
            <div className="form-group">
              <h4 className="text-info">Medications you take, if any:</h4>
              <textarea
                className="form-control"
                type="text"
                name="medications"
                onChange={this.onChange}
                value={medications}
                placeholder="Medications"
              />
            </div>

            <div className="form-group">
              <h4 className="text-info">Notes regarding this episodes:</h4>
              <textarea
                className="form-control"
                type="text"
                name="notes"
                onChange={this.onChange}
                value={notes}
                placeholder="Any notes"
                // rows="6"
              />
            </div>

            <div className="form-group">
            <button
                  type="submit"
                  className="btn btn-lg btn-warning btn-block"
                >
                  Submit
                </button>
              <button
                  
                  onClick={this.props.onSave}
                  className="btn btn-lg btn-secondary btn-block"
                >
                  Cancel
                </button>
            </div>
          </form>
        </div>

      </div>
    </div>
    );
  }
}

export default connect(null, { addEpisode, updateEpisode, createMessage })(EditEpisode);

