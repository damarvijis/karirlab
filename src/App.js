import './App.css';
import { Post } from './views/Post'
import { CreatePost } from './views/CreatePost'
import { DetailPage } from './views/DetailPage'
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './components/Layout'
import store from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Post />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
