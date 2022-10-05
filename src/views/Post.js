import { useDispatch, useSelector } from "react-redux";
import { setUpdatePost, setTitlePage, setSort, getDataFiltered, setFilterCategories, setEditedFilter } from '../store/actions/postAction'
import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Pagination from 'react-bootstrap/Pagination';

export const Post = () => {
  const { updatedPost, post, sort, searchCategories, editedFilter } = useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();
  let [posts, setPosts] = useState([])
  let [page, setPage] = useState(1)
  let [perPage, setPerPage] = useState(20)
  let [pageCount, setPageCount] = useState(0)
  let [rows, setRows] = useState(0)

  useEffect(() => {
    dispatch(setTitlePage('Daftar Post'))
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSort('Most Upvote'))
    dispatch(setFilterCategories('All Categories'))
    dispatch(getDataFiltered(sort, 'Categories', searchCategories))
  }, []);

  const paginateTable = (data) => {
    if (data && data.length > 0) {
      let start = (page - 1) * perPage
      let end = start + perPage
      setRows(data.length)
      setPageCount(Math.ceil(rows / perPage))
      return data.slice(start, end)
    } else {
      return data
    }
  }

  useEffect(() => {
    setPosts(paginateTable(post))
    setRows(post.length)
    setPageCount(Math.ceil(rows / perPage))
  }, [page, post, rows]);

  useEffect(() => {
    if (updatedPost) {
      setPosts(paginateTable(post))
      setRows(post.length)
      setPageCount(Math.ceil(rows / perPage))
      dispatch(setUpdatePost(false))
      dispatch(getDataFiltered(sort, 'Categories', searchCategories))
    }
  }, [updatedPost]);

  useEffect(() => {
    if (editedFilter) {
      setPage(1)
      dispatch(setEditedFilter(false))
    }
  }, [editedFilter]);

  let next = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  let previous = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  let first = (e) => {
    e.preventDefault();
    setPage(1);
  };

  let last = (e) => {
    e.preventDefault();
    setPage(pageCount);
  };

  return (
    <div>
      <h5>Categories: {searchCategories === '' ? '-' : searchCategories}</h5>
      <h5>Sorted By: {sort === '' ? '-' : sort}</h5><br/>
        {
          posts.map((e, i) => {
            return (
              <PostItem key={i} post={e} />
            )
          })
        }
        <Pagination className="my-5 ms-3">
          <Pagination.First disabled={page === 1} onClick={first} />
          <Pagination.Prev disabled={page === 1} onClick={previous} />
          <Pagination.Item onClick={page === 1 ? first : previous} active={page === 1}>{page === 1 ? 1 : page === pageCount ? pageCount === 2 ? pageCount - 1 : pageCount - 2 : page - 1}</Pagination.Item>
          <Pagination.Item disabled={pageCount === 1} onClick={page === pageCount ? previous : page === 1 ? next : null} active={(page !== 1 && page !== pageCount) || (pageCount === 2 && page === pageCount)}>{page === 1 ? 2 : page === pageCount ? pageCount === 2 ? 2 : pageCount - 1 : page}</Pagination.Item>
          <Pagination.Item disabled={pageCount === 1 || pageCount === 2} onClick={page === pageCount ? last : next} active={page === pageCount && (pageCount !== 2 && pageCount !== 1)}>{page === pageCount ? pageCount === 2 || pageCount === 1 ? 3 : pageCount : page === 1 ? 3 : page + 1}</Pagination.Item>
          <Pagination.Next onClick={next} disabled={page === pageCount} />
          <Pagination.Last onClick={last} disabled={page === pageCount} />
        </Pagination>
    </div>
  )
}