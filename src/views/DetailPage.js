import { useDispatch, useSelector } from "react-redux";
import { 
  setTitlePage,
  setMyOwnTime,
  updateUpvote,
  updateComment
} from '../store/actions/postAction'
import Video from 'react-video-renderer';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";


export const DetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { detailPost } = useSelector((state) => state.PostReducer);
  
  const [addComment, setAddComment] = useState(false)
  const [myPost, setMyPost] = useState(null)
  const [comment, setComment] = useState({
    name: '',
    comment: ''
  })

  let changeFormComment = (e) => {
    const { value, name } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  let sumbitFormComment = (e) => {
    e.preventDefault();
    dispatch(updateComment(comment, id))
    setAddComment(false)
    setComment({
      name: '',
      comment: ''
    })
    alert('success!!!')
  };

  useEffect(() => {
    dispatch(setTitlePage('Detail ' + detailPost?.title))
  }, [dispatch]);

  useEffect(() => {
    setMyPost(detailPost)
  }, [detailPost]);
   
  return (
    <div className="d-flex justify-content-center">
      <Card className="myCard my-3">
        {
          myPost?.fileType === '' || myPost?.fileType === 'image' ?
          <Card.Img variant="top" src={myPost?.file ? myPost?.file : 'https://apply.sts.net.pk/assets/images/default-upload-image.jpg'} /> : 
          <Video src={myPost?.file}>
            {(video, state, actions) => {
              const loadingComponent = state.isLoading ? 'loading...' : undefined;
              return (
                <div>
                  {video}
                  {loadingComponent}<br/>
                  <button onClick={actions.play}>Play</button>
                  <button onClick={actions.pause}>Pause</button>
                </div>
              )
            }}
          </Video>
        }
        <Card.Body>
          <Card.Title><h2>{myPost?.title}</h2></Card.Title>
          <Card.Text className="text-secondary fs-5">
            <i onClick={(() => {dispatch(updateUpvote('up', id))})} className="bi bi-caret-up-fill" style={{ cursor: 'pointer' }}></i> &nbsp;
            <span>{myPost?.upvote} Upvote</span> &nbsp;
            <i onClick={(() => {dispatch(updateUpvote('down', id))})} className="bi bi-caret-down-fill" style={{ cursor: 'pointer' }}></i>
          </Card.Text>
          <Card.Subtitle className="text-secondary">
            Submitted on {myPost ? setMyOwnTime(myPost?.createdAt) : ''} by {myPost?.user} to {myPost?.subreddit ? myPost?.subreddit : 'Others'}
          </Card.Subtitle>
          <br/>
          <Card.Text className="fs-4">
            {myPost?.description}
          </Card.Text>
          <br/>
          <Row>
            <Col>
              <Card.Text className="fs-4">
                Comment:
              </Card.Text>
            </Col>
            <Col className={addComment ? "d-none" : "d-flex justify-content-end"}>
              <Button onClick={() => setAddComment(true)} variant="primary">Add Comment</Button>
            </Col>
          </Row>
          <Row className={addComment ? "mt-2 mb-4" : "d-none"}>
            <Form onSubmit={sumbitFormComment}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={changeFormComment}
                  type="text"
                  value={comment?.name}
                  placeholder="Name"
                  name="name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  onChange={changeFormComment}
                  type="text"
                  value={comment?.comment}
                  placeholder="Comment"
                  name="comment"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="me-2"
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setAddComment(false)
                  setComment({
                    name: '',
                    comment: ''
                  })
                }
              }>
                Cancel
              </Button>
            </Form>
          </Row>
          {
            myPost?.comments.map((e, i) => {
              return (
                <div key={i} className="mb-3">
                  <Card.Text className="fs-5">
                    {i + 1}. {e.comment}<br/>
                    <span className="fs-6 text-secondary">&nbsp;&nbsp;&nbsp; created by: {e.name}</span>
                  </Card.Text>
                </div>
              )
            })

          }
        </Card.Body>
      </Card>
    </div>
  );
}