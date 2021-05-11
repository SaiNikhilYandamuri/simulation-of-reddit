/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Nav, Col, Button, NavDropdown, Dropdown } from "react-bootstrap";
import { FormGroup, Input } from "reactstrap";
import "./SearchCommunity.css";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import VoteButton from "../VoteButton/VoteButton";
import post from "../resources/post.png";
import { useHistory } from "react-router-dom";

function SearchCommunity() {
  const [community, setSearchcommunity] = useState([]);
  const history = useHistory();
  const [displayList, setDisplayList] = useState([]);
  const [onChangeTriggered, setOnChangeTriggerd] = useState(false);
  const [onSortTriggered, setOnSortTriggerd] = useState(false);
  const [sortdesk, setSortstringdesk] = useState("Created at");
  const [searchString, setSearchString] = useState("");
  const getSearchCommunity = (searchString, sort) => {
    console.log(sort);
    Axios.post(
      endPointObj.url + "api/searchCommunity",
      {
        searchString,
        sort,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setSearchcommunity(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUsers = (sortStringin) => {
    console.log(sortStringin == "numberOfUpvotesDesc");
    switch (sortStringin) {
      case "createdat":
        setSortstringdesk("Created at");
        sortStringin = "";
        break;
      case "numberOfMembers":
        setSortstringdesk("Most number of users");
        break;
      case "numberOfPosts":
        setSortstringdesk("Most number of posts");
        break;
    }
    if (sortStringin !== "numberOfUpvotesDesc" && sortStringin !== "numberOfUpvotesAsc") {
      setOnSortTriggerd(false);
    }
    getSearchCommunity(searchString, sortStringin);
  };

  const communityPage = (group) => {
    handleClickGroup(group);
  };

  const handleClickGroup = (path) => {
    history.push({
      pathname: "/",
    });
  };

  const handleVotes = (string) => {
    setSortstringdesk(string);
    setOnSortTriggerd(true);
  };
  const onChange = (opt, list) => {
    if (opt == null || opt == "undefined") {
      opt = "";
    }

    setSearchString(opt.target.value);
    getSearchCommunity(opt.target.value, " ");
    setOnChangeTriggerd(true);

    let final_list = community.filter((li) => {
      return li.communityName.includes(opt.target.value);
    });
    setDisplayList(final_list);
  };
  const time = (timestamp) => {
    if (timestamp) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      timestamp = new Date(timestamp).toLocaleDateString(undefined, options);
      return timestamp;
    }
    return "";
  };

  useEffect(() => {
    getSearchCommunity();
  }, []);

  return (
    <div>
      <FormGroup row>
        <Col sm={3}>
          <Dropdown>
            {/* <Button color="primary">Sort</Button> */}
            Sort By {sortdesk}
            <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUsers("createdat")}>
                Created at
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleUsers("numberOfMembers")}>
                Most number of users
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleUsers("numberOfPosts")}>
                Most number of posts
              </Dropdown.Item>
              <NavDropdown.Item
                onClick={() => handleVotes("Most upvoted posts")}
              >
                {" "}
                Most upvoted posts
              </NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm={3}>
          <Input
            type="text"
            placeholder="Search Community Name"
            onChange={(opt) => onChange(opt, community)}
            pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
            title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
          />
        </Col>
        {onSortTriggered == true && (
          <Col sm={3}>
            <Button
              variant="dark"
              style={{ width: 100, height: 40 }}
              onClick={() => ("numberOfUpvotesAsc")}
            >
              Asc
            </Button>{" "}
            <Button
              variant="dark"
              style={{ width: 100, height: 40 }}
              onClick={() => handleUsers("numberOfUpvotesDesc")}
            >
              Des
            </Button>
          </Col>
        )}
      </FormGroup>

      <div>
        <br />
      </div>
      {onChangeTriggered == true &&
        displayList.map((com) => (
          <article className="row post">
            <div class="arrows">
              <VoteButton />
            </div>

            <img src={post} height="55" width="55" class="thumbnail" />
            <div class="info">
              <header>
                <span className="subreddit-text">
                  <a className="posturl">{com.description}</a>
                </span>
              </header>
              <div>
                submitted on {time(com.creationTime)} by{" "}
                <span class> {com.createdBy}</span>
                from{" "}
                <span>
                  <Nav.Link
                    data-testid="Group"
                    key={com.description}
                    onClick={() => communityPage(com.communtityName)}
                    className="posturl"
                  >
                    {com.communityName}
                  </Nav.Link>
                </span>
              </div>
            </div>
          </article>
        ))}

      {onChangeTriggered == false &&
        community.map((com) => (
          <article className="row post">
            <div class="arrows">
              <VoteButton />
            </div>

            <img src={post} height="55" width="55" class="thumbnail" />
            <div class="info">
              <header>
                <span className="subreddit-text">
                  <a className="posturl">{com.description}</a>
                </span>
              </header>
              <div>
                submitted on {time(com.creationTime)}
                by <span class>{com.createdBy}</span>
                from{" "}
                <span>
                  <Nav.Link
                    data-testid="Group"
                    key={com.communtityName}
                    onClick={() => communityPage(com.communtityName)}
                    className="links-dashboard-groups"
                  >
                    {com.communityName}
                  </Nav.Link>
                </span>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
export default SearchCommunity;
