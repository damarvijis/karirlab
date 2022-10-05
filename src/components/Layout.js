import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getDataFiltered, setSort, setFilterCategories, setEditedFilter } from "../store/actions/postAction";

function Layout({children}) {
  const dispatch = useDispatch();

  const { titlePage, categories, searchCategories, sort } = useSelector((state) => state.PostReducer);

  const setFilteredPost = (sort, searchFilter) => {
    dispatch(getDataFiltered(sort, 'Categories', searchFilter))
  }

  let changeSearchCategories = ((data) => {
    dispatch(setFilterCategories(data))
    dispatch(setEditedFilter(true))
  })

  let changeSearchSort = ((data) => {
    dispatch(setSort(data))
    dispatch(setEditedFilter(true))
  })

  useEffect(() => {
    setFilteredPost(sort, searchCategories)
  }, [sort, searchCategories]);

  return (
    <div>
      <Row>
        <Col xxl={2} xl={2} md={0} sm={0}>
          <Navbar bg="light" expand="lg">
            <Container className="Layout">
              <Navbar.Brand>Reddit Clone</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-column">
                  {
                    titlePage === 'Daftar Post' ?
                    <>
                      <Link to="/create" className="MyLink" style={{textDecoration: 'none', color: '#717172'}}>Add Post</Link>
                      <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {
                          categories.map((e, i) => {
                            return (
                              <NavDropdown.Item key={i} onClick={() => changeSearchCategories(e)}>{e}</NavDropdown.Item>
                            )
                          })
                        }
                      </NavDropdown>
                      <NavDropdown title="Sort" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => changeSearchSort('Most Upvote')}>Most Upvote</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeSearchSort('Most Comment')}>Most Comment</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeSearchSort('Latest')}>Latest</NavDropdown.Item>
                      </NavDropdown>
                      </> :
                      <Link className="MyLink" to="/" style={{textDecoration: 'none', color: '#717172'}}>Back To Post List</Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col xxl={10} xl={10} md={12} sm={12}>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand className="mx-auto">{titlePage}</Navbar.Brand>
            </Container>
          </Navbar>
          <div>{children}</div>
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
