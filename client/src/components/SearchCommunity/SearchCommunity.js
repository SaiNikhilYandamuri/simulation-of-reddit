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
import NavBar from "../NavBar/NavBar";

function SearchCommunity() {
  let gPageSize = 0;
  const [community, setSearchcommunity] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [pageNum, setPageNum] = useState(1);
  const history = useHistory();
  const [displayList, setDisplayList] = useState([]);
  const [onChangeTriggered, setOnChangeTriggerd] = useState(false);
  const [onSortTriggered, setOnSortTriggerd] = useState(false);
  const [sortdesk, setSortstringdesk] = useState("Created at");
  const [searchString, setSearchString] = useState("");
  const [sortString, setSortStringIn] = useState("");
  const getSearchCommunity = (searchString, sort, pageNum, pageSize) => {
    setPageSize(pageSize);
    console.log(searchString);
    console.log(sort);
    Axios.post(
      endPointObj.url + "api/searchCommunity",
      {
        searchString,
        sort,
        pageNum,
        pageSize,
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
  const handleUsers = (sortStringin, pageNum, pageSize) => {
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
    if (
      sortStringin !== "numberOfUpvotesDesc" &&
      sortStringin !== "numberOfUpvotesAsc"
    ) {
      setOnSortTriggerd(false);
    }
    setSortStringIn(sortStringin);
    getSearchCommunity(searchString, sortStringin, pageNum, pageSize);
  };

  const communityPage = (group) => {
    console.log(group);
    handleClickGroup(group);
  };

  const handleClickGroup = (communityName) => {
    history.push({
      pathname: "/communityPage",
      search: "?name=" + communityName,
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
    // setOnChangeTriggerd(true);

    // let final_list = community.filter((li) => {
    //   return li.communityName.includes(opt.target.value);
    // });
    //setDisplayList(final_list);
  };
  const time = (timestamp) => {
    if (timestamp) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      timestamp = new Date(timestamp).toLocaleDateString(undefined, options);
      return timestamp;
    }
    return "";
  };

  const clickNext = (searchString, sortdesk, pageNum, pageSize) => {
    gPageSize = pageSize + 1;
    setPageSize(gPageSize);
    getSearchCommunity(searchString, sortdesk, pageNum, gPageSize);
  };

  const upVoteClick = () => {
    console.log("hello");
    console.log(searchString);
    getSearchCommunity(searchString, sortdesk, pageNum, pageSize);
  };

  useEffect(() => {
    getSearchCommunity("", "", 1, 2);
  }, []);

  return (
    <div className="search-comm">
      <NavBar></NavBar>
      <FormGroup row>
        <Col sm={2}>
          <Dropdown className="drop-down">
            <Dropdown.Toggle id="dropdown-basic" variant="dark">
              {sortdesk}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleUsers("createdat", pageNum, pageSize)}
              >
                Created at
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleUsers("numberOfMembers", pageNum, pageSize)
                }
              >
                Most number of users
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleUsers("numberOfPosts", pageNum, pageSize)}
              >
                Most number of posts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleVotes("Most upvoted posts", pageNum, pageSize)
                }
              >
                Most upvoted posts
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col sm={2}>
          <Dropdown className="drop-down">
            <Dropdown.Toggle id="dropdown-basic" variant="dark">
              {pageSize}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  getSearchCommunity(searchString, sortString, pageNum, 2);
                }}
              >
                2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  getSearchCommunity(searchString, sortString, pageNum, 5);
                }}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  getSearchCommunity(searchString, sortString, pageNum, 10);
                }}
              >
                10
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm={4}>
          <Input
            type="text"
            className="comm-search"
            placeholder="Search Community Name"
            onChange={(opt) => onChange(opt, community)}
            pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
            title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
          />
        </Col>
        {onSortTriggered == true && (
          <Col sm={3} className="button-div">
            <Button
              variant="dark"
              style={{ width: 100, height: 40 }}
              onClick={() =>
                handleUsers("numberOfUpvotesDesc", pageNum, pageSize)
              }
            >
              Asc
            </Button>{" "}
            <Button
              variant="dark"
              style={{ width: 100, height: 40 }}
              onClick={() =>
                handleUsers("numberOfUpvotesAsc", pageNum, pageSize)
              }
            >
              Des
            </Button>
          </Col>
        )}
      </FormGroup>

      <div>
        <br />
      </div>
      {/* {onChangeTriggered == true &&
        displayList.map((com) => (
          <article className="row post-width">
            <div class="arrows">
              {console.log("search comm", com)}
              <VoteButton
                type={"community"}
                id={com.communityName}
                searchString={searchString}
                sortdesk={sortdesk}
                upVoteClick={upVoteClick}
                votes={
                  parseInt(com.numberOfUpvotes) -
                  parseInt(com.numberOfDownvotes)
                }
              />
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
                    onClick={() => communityPage(com.communityName)}
                    className="posturl"
                  >
                    {com.communityName}
                  </Nav.Link>
                </span>
              </div>
            </div>
          </article>
        ))} */}

      {/* {onChangeTriggered == false && */}

      {community.map((com) => (
        <article className="row post-width">
          <div class="arrows">
            <VoteButton
              type={"community"}
              id={com.communityName}
              searchString={searchString}
              sortdesk={sortdesk}
              upVoteClick={upVoteClick}
              votes={
                parseInt(com.numberOfUpvotes) - parseInt(com.numberOfDownvotes)
              }
            />
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
                  onClick={() => communityPage(com.communityName)}
                  className="links-dashboard-groups"
                >
                  {com.communityName}
                </Nav.Link>
              </span>
            </div>
          </div>
        </article>
      ))}
      <div className="col-sm-12">
        <center>
          <Button
            variant="dark"
            onClick={() =>
              clickNext(searchString, sortString, pageNum, pageSize)
            }
          >
            Next
          </Button>
          &nbsp;
          <Button
            variant="dark"
            onClick={() =>
              clickPrev(searchString, sortString, pageNum, pageSize)
            }
          >
            Previous
          </Button>
        </center>
      </div>
    </div>
  );
}
export default SearchCommunity;
