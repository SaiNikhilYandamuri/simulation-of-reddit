import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Row,
  Col,
  ListGroup,
  Form,
  Card,
  Modal,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faComments,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function UserList() {
  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <span class="input-group-btn">
          <button className="search">
            <FontAwesomeIcon className="sicon" icon={faSearch} />
          </button>
        </span>
      </div>
      <ListGroup className="user-list" as="ul">
        <ListGroup.Item variant="primary" as="li">
          John Doe
        </ListGroup.Item>
        <ListGroup.Item variant="primary" as="li">
          Jane Doe
        </ListGroup.Item>
        <ListGroup.Item variant="primary" as="li">
          Perl Borgen
        </ListGroup.Item>
        <ListGroup.Item variant="primary" as="li">
          Action Jackson
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default UserList;
