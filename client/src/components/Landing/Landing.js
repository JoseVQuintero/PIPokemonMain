
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Landing.css';

export class Landing extends Component {
  render() {
    return (
      <div className="landing">       
        <Link to="/home">
          <button>
            <span style={{ color: "white" }}>Begins</span>
          </button>
        </Link>
      </div>
    );
  }
}

export default connect(null, null)(Landing);
