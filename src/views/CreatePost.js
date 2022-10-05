import { useDispatch, useSelector } from "react-redux";
import { setTitlePage, addNewPosting, setDataCategories } from '../store/actions/postAction'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

export const CreatePost = () => {
  const dispatch = useDispatch();
  const { tempPost, categories } = useSelector((state) => state.PostReducer);

  const [addNewCategories, setAddNewCategories] = useState(false)
  const [myCategories, setMyCategories] = useState([])
  const [newCategories, setNewCategories] = useState('')
  const [newPost, setNewPost] = useState({
    id: tempPost.length + 1,
    upvote: 0,
    file: '',
    fileType: '',
    title: '',
    description: '',
    comments: [],
    user: '',
    subreddit: '',
    createdAt: ''
  })

  let changeFormAddPost = (e) => {
    let { value, name } = e.target;
    setNewPost({
      ...newPost,
      createdAt: new Date(),
      [name]: value
    });
  };

  let uploadFileHandler = (e) => {
    let { files } = e.target;
    if (files) {
      let value = `${URL.createObjectURL(files[0])}`
      setNewPost({
        ...newPost,
        createdAt: new Date(),
        file: value,
        fileType: files[0].type.split('/')[0]
      });
    }
  };

  let changeFormAddCategories = (e) => {
    const { value } = e.target;
    setNewCategories(value);
  };

  let submitAddNewPost = (e) => {
    e.preventDefault();
    dispatch(addNewPosting(newPost))
    alert('success!!!')
  };

  let submitAddNewCategories = () => {
    dispatch(setDataCategories([...categories, newCategories]))
    setAddNewCategories(false)
    alert('success!!!')
  };

  useEffect(() => {
    dispatch(setTitlePage('Create Post'))
  }, [dispatch]);

  useEffect(() => {
    setMyCategories(categories)
  }, [categories]);

  return (
    <div>
      <Form onSubmit={submitAddNewPost}>
        <Row>
          <Col sm={12} md={6} xl={6}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                maxLength="255"
                required
                type="text"
                onChange={changeFormAddPost}
                value={newPost?.user}
                name="user"
                placeholder="Name"
              />
              <Form.Text className={newPost?.user !== '' ? "d-none" : "text-danger"}>
                Required.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} xl={6}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                maxLength="255"
                required
                type="text"
                onChange={changeFormAddPost}
                name="title"
                value={newPost?.title}
                placeholder="Title"
              />
              <Form.Text className={newPost?.title !== '' ? "d-none" : "text-danger"}>
                Required.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} xl={6}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Categories</Form.Label>
              <Form.Select onChange={changeFormAddPost} value={newPost?.subreddit} name="subreddit" required aria-label="Categories">
                <option disabled>Categories</option>
                {
                  myCategories.map((e, i) => {
                    if (e !== 'All Categories') {
                      return <option key={i} value={e}>{e}</option>
                    }
                  })
                }
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} xl={6} className={addNewCategories ? '' : 'd-none'}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Add New Categories</Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={changeFormAddCategories}
                  value={newCategories}
                  maxLength="255"
                  style={{ width: '75%', height: '40px' }}
                />
                <Button
                  className="mb-3 mx-3"
                  style={{ height: '40px' }}
                  variant="primary"
                  onClick={() => submitAddNewCategories()}
                >
                  Add
                </Button>
                <Button
                  className="mb-3 me-3"
                  style={{ height: '40px' }}
                  variant="danger"
                  onClick={() => {
                    setAddNewCategories(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} xl={6} className={addNewCategories ? 'd-none' : ''}>
            <Button
              className="mb-3 mx-3 myButton"
              style={{ height: '40px' }}
              variant="primary"
              onClick={() => {
                setAddNewCategories(true)
              }}
            >
              Add New Categories
            </Button>
          </Col>
          <Col sm={12} md={12} xl={12}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg , .png , .jpeg, .mp4"
                placeholder="Description"
                onChange={uploadFileHandler}
                name="image"
              />
            </Form.Group>
          </Col>
          <Col sm={12} md={12} xl={12}>
            <Form.Group className="mb-3 mx-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                maxLength="255"
                required
                value={newPost?.description}
                type="text"
                placeholder="Description"
                onChange={changeFormAddPost}
                name="description"
              />
              <Form.Text className={newPost?.description !== '' ? "d-none" : "text-danger"}>
                Required.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm={12} md={12} xl={12}>
            <Button className="mb-3 mx-3" variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}