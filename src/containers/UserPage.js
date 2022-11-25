import React, { useState, useEffect } from "react";
import { getUserData, getUserRepositories } from "../providers/githubProvider";
import axios from 'axios';

import Navbar from "../components/NavBar/NavBar";
import UserInfos from "../components/UserInfo/UserInfo";
import Repositories from "../components/Repositories/Repositories";
import Tabs from "../components/Tabs/Tabs";
import Loading from "../components/Loading/Loading";

import {TablePagination} from '@mui/material';

function UserPage({ match }) {
  const [user, setUser] = useState();
  const [totalRepos, setTotalRepos] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });
  const userNameParams = match.params.userName;

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(()=>{
    fetchRepositories();
  }, [controller]);

  async function fetchUser() {
    const { data } = await getUserData(userNameParams);
    setUser(data);
    setTotalRepos(data.public_repos);
    console.log(totalRepos)
  }

  async function fetchRepositories() {
    const { data } = await axios.get(`https://api.github.com/users/${userNameParams}/repos?page=${controller.page}&per_page=${controller.rowsPerPage}`);
    setRepositories(data);
  }

const handlePageChange = (event, newPage) => {
  setController({
    ...controller,
    page: newPage
  });
};

const handleChangeRowsPerPage = (event) => {
  setController({
    ...controller,
    rowsPerPage: parseInt(event.target.value, 10),
    page: 0
  });
};

  return (
    <>
      {user ? (
        <>
          <Navbar user={user} />
          <div className="container">
            <UserInfos user={user} />
            <Tabs repos={repositories} user={user} repoCount = {totalRepos}/>
            <Repositories repos={repositories} user={user}/>
            <TablePagination
              component="div"
              onPageChange={handlePageChange}
              page={controller.page}
              count={totalRepos}
              rowsPerPage={controller.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default UserPage;