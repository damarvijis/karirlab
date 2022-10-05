import { UPDATE_POST, SET_EDITED_FILTER, SET_DETAIL_POST, SET_POST, SET_TITLEPAGE, SET_CATEGORIES, SET_TEMPPOST, SET_SORT, SET_FITLER_CATEGORIES } from "../actionTypes";

export function setDataPost(payload) {
  return {
    type: SET_POST,
    payload,
  };
}

export function setUpdatePost(payload) {
  return {
    type: UPDATE_POST,
    payload,
  };
}

export function setDetailPost(payload) {
  return {
    type: SET_DETAIL_POST,
    payload,
  };
}

export function setSort(payload) {
  return {
    type: SET_SORT,
    payload,
  };
}

export function setEditedFilter(payload) {
  return {
    type: SET_EDITED_FILTER,
    payload,
  };
}

export function setFilterCategories(payload) {
  return {
    type: SET_FITLER_CATEGORIES,
    payload,
  };
}

export function setDataTempPost(payload) {
  return {
    type: SET_TEMPPOST,
    payload,
  };
}

export function setDataCategories(payload) {
  return {
    type: SET_CATEGORIES,
    payload,
  };
}

export function setTitlePage(payload) {
  return {
    type: SET_TITLEPAGE,
    payload,
  };
}

export function getDataFiltered(sort, filter, searchFilter) {
  return (dispatch, getState) => {
    let data = getState().PostReducer.tempPost
    let output = [...data];
    if (filter === 'Categories' && searchFilter !== 'All Categories') {
      let dataSearch = searchFilter.toLowerCase()
      output = data.filter(function (el) {
        const condition = new RegExp(dataSearch)
        if (el.subreddit !== null) {
          return condition.test(el.subreddit.toLowerCase())
        }
      })
    }
    if (sort === 'Most Upvote') {
      output.sort((a, b) => {
        return b.upvote - a.upvote
      })
    } else if (sort === 'Most Comment') {
      output.sort((a, b) => {
        return b.comments.length - a.comments.length
      })
    } else if (sort === 'Latest') {
      output.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }
    dispatch(setDataPost(output))
  }
}

export function updateUpvote(type, id, flag) {
  return (dispatch, getState) => {
    let arrayData = getState().PostReducer.tempPost
    const validData = arrayData.findIndex((x) => {
      return Number(x.id) === Number(id)
    })
    if (validData >= 0) {
      let tempData = arrayData[validData]
      let newData
      if (type === 'up') {
        newData = {
          ...tempData,
          upvote: tempData.upvote + 1
        }
      } else if (type === 'down') {
        newData = {
          ...tempData,
          upvote: tempData.upvote === 0 ? 0 : tempData.upvote - 1
        }
      }
      arrayData.splice(validData, 1, newData)
      dispatch(setDataPost(arrayData))
      dispatch(setDataTempPost(arrayData))
      if (!flag || flag !== 'fromPost') {
        dispatch(setDetailPost(arrayData[validData]))
      } else {
        dispatch(setUpdatePost(true))
      }
    }
  }
}

export function updateComment(comment, id) {
  return (dispatch, getState) => {
    let arrayData = getState().PostReducer.tempPost
    const validData = arrayData.findIndex((x) => {
      return Number(x.id) === Number(id)
    })
    if (validData >= 0) {
      let tempData = arrayData[validData]
      let newData = {
        ...tempData,
        comments: [...tempData.comments, comment]
      }
      arrayData.splice(validData, 1, newData)
      dispatch(setDataPost(arrayData))
      dispatch(setDataTempPost(arrayData))
      dispatch(setDetailPost(arrayData[validData]))
    }
  }
}

export function addNewPosting(data) {
  return (dispatch, getState) => {
    let arrayData = getState().PostReducer.tempPost
    dispatch(setDataPost([...arrayData, data]))
    dispatch(setDataTempPost([...arrayData, data]))
  }
}

export function setMyOwnTime(date) {
  let newDataDate = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    let day = newDataDate.getDay()
    let tempDay = ''
    switch (day) {
      case 0:
        tempDay = "Sunday";
        break;
      case 1:
        tempDay = "Monday";
        break;
      case 2:
        tempDay = "Tuesday";
        break;
      case 3:
        tempDay = "Wednesday";
        break;
      case 4:
        tempDay = "Thursday";
      case 5:
        tempDay = "Friday";
        break;
      case 6:
        tempDay = "Saturday";
        break;
    }
    let hour = newDataDate.getHours()
    let minutes = newDataDate.getMinutes()
    let newDate = newDataDate.getDate()
    let month = newDataDate.getMonth() + 1
    let tempMonth = ''
    let year = newDataDate.getFullYear()
    switch (month) {
      case 1:
        tempMonth = "January";
        break;
      case 2:
        tempMonth = "February";
        break;
      case 3:
        tempMonth = "March";
        break;
      case 4:
        tempMonth = "April";
      case 5:
        tempMonth = "May";
        break;
      case 6:
        tempMonth = "June";
        break;
      case 7:
        tempMonth = "July";
        break;
      case 8:
        tempMonth = "August";
        break;
      case 9:
        tempMonth = "September";
        break;
      case 10:
        tempMonth = "October";
        break;
      case 11:
        tempMonth = "November";
        break;
      case 12:
        tempMonth = "December";
        break;
    }
    return `${tempDay}, ${newDate} ${tempMonth} ${year} at ${hour}:${minutes}`
}