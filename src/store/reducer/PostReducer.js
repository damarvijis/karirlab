import { UPDATE_POST, SET_EDITED_FILTER, SET_DETAIL_POST, SET_POST, SET_TITLEPAGE, SET_TEMPPOST, SET_SORT, SET_CATEGORIES, SET_FITLER_CATEGORIES } from "../actionTypes";

let dataPost = []
for (let i = 0; i < 65; i++) {
  if (i <= 20) {
    dataPost.push({
      id: i + 1,
      upvote: i + 1,
      file: `https://picsum.photos/id/${Math.floor(
        Math.random() * 50
      )}/400/300`,
      fileType: 'image',
      title: "Football",
      description: "Football is very easy for me.",
      comments: [
        {
          name: 'Damar',
          comment: 'good'
        },
        {
          name: 'Jati',
          comment: 'good'
        },
      ],
      user: 'Damar',
      subreddit: "Sport",
      createdAt: new Date(new Date().setHours(new Date().getHours() - 3))
    })
  } else if (i > 20 && i <= 42) {
    dataPost.push({
      id: i + 1,
      upvote: i + 1,
      file: `https://picsum.photos/id/${Math.floor(
        Math.random() * 50
      )}/400/300`,
      fileType: 'image',
      title: "Laptop",
      description: "i've bought laptop yesterday.",
      comments: [
        {
          name: 'Damar',
          comment: 'good'
        },
        {
          name: 'Jati',
          comment: 'good'
        },
      ],
      user: 'Mursalin',
      subreddit: "Tech",
      createdAt: new Date(new Date().setHours(new Date().getHours() - 2))
    })
  } else {
    dataPost.push({
      id: i + 1,
      upvote: i + 1,
      file: `https://picsum.photos/id/${Math.floor(
        Math.random() * 50
      )}/400/300`,
      fileType: 'image',
      title: "Yogyakarta",
      description: "Jogjakarta berhati nyaman.",
      comments: [
        {
          name: 'Damar',
          comment: 'good'
        },
        {
          name: 'Jati',
          comment: 'good'
        },
      ],
      user: 'Rayen',
      subreddit: "Nature",
      createdAt: new Date(new Date().setHours(new Date().getHours() - 1))
    })
  }
}

const initialState = {
  post: [...dataPost],
  tempPost: [...dataPost],
  titlePage: '',
  categories: ['All Categories', 'Sport', 'Tech', 'Nature'],
  searchCategories: '',
  sort: '',
  detailPost: null,
  editedFilter: false,
  updatedPost: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST:
      return { ...state, post: action.payload };
    case UPDATE_POST:
      return { ...state, updatedPost: action.payload };
    case SET_DETAIL_POST:
      return { ...state, detailPost: action.payload };
    case SET_EDITED_FILTER:
      return { ...state, editedFilter: action.payload };
    case SET_TEMPPOST:
      return { ...state, tempPost: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_FITLER_CATEGORIES:
      return { ...state, searchCategories: action.payload };
    case SET_TITLEPAGE:
      return { ...state, titlePage: action.payload };

    default:
      return state;
  }
}

export default reducer;
