import React, { useState, useEffect } from "react";
import themoviedb from "../services/api/api.themoviedb";
import { Container } from "react-bootstrap";
import { Dimmer, Loader, Icon, Input, Header } from "semantic-ui-react";
import MenuTag from "../components/MenuTag";
import ListesFilms from "../components/ListesFilms";
import Pagination from "../components/Pagination";
import ScrollButton from "../components/ScrollTopButton";
import "../assets/scss/home.scss";

export default function Home() {
  const [dataMovies, setDataMovies] = useState([]);
  const [routeApi, setRouteApi] = useState("upcoming");
  const [curentPage, setCurentPage] = useState("News");
  const [curentPagePagination, setCurentPagePagination] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    setLoading(true);
    themoviedb
      .get(`/movie/${routeApi}?page=${curentPagePagination}`)
      .then((response) => {
        setDataMovies(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setModalError(true);
        console.log("une erreure est survenue");
      });
  }, [routeApi, curentPagePagination]);

  const searchMovies = (e) => {
    const query = e.target.value.trim();
    if (query.length > 0 && query !== "") {
      setCurentPagePagination(1);
      setCurentPage("Recherche");
      themoviedb
        .get(`/search/movie?query=${query}&page=${curentPage}`)
        .then((response) => {
          setDataMovies(response.data);
        })
        .catch((e) => {
          console.log("une erreure est survenue");
          setModalError(true);
        });
    }
  };
  const pagination = (activePage) => {
    setCurentPage(activePage);
  };
  const router = (title, route) => {
    setRouteApi(route);
    setCurentPage(title);
  };

  if(modalError){
    return (
      <Dimmer active={modalError}>
        <Header icon>
          <Icon name="warning sign" color="red" />
          <p className="text-danger">
            Une erreur est survenue, Veillez vérifier votre connexion et
            actualiser la page !
          </p>
        </Header>
      </Dimmer>
    )
  }
  if (loading) {
    return (
      <Dimmer active>
      <Loader size="huge">Chargement</Loader>
    </Dimmer>
    )
  }
  return (
    <>
      <main className="container">
        <div className="callout callout-danger text-white">
          <h4>Find Movies</h4>
          {curentPage}
        </div>
        <Container fluid="xs">
          <div className=" clearfix">
            <div className="float-sm-left float-none">
              <MenuTag curentPage={curentPage} switchPage={router} />
            </div>
            <div className="float-sm-right   text-align-center ">
              <Input
                icon="search"
                placeholder="Rechercher..."
                onChange={searchMovies}
                size="mini"
              />
            </div>
          </div>
          <br />
          <div className="container">
            <ListesFilms
              dataMovies={dataMovies.results ? dataMovies.results : []}
            />
          </div>
          <div className="text-center">
            <Pagination
              activePage={curentPagePagination}
              totalPages={dataMovies.total_pages}
              setActivePage={pagination}
            />
          </div>
        </Container>
      </main>
      <ScrollButton />
    </>
  );
}
