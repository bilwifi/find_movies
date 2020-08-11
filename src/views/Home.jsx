import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  Dimmer,
  Loader,
  Pagination,
  Icon,
  Input,
  Label,
  Header,
} from "semantic-ui-react";
import ListesFilms from "../components/ListesFilms";
import ScrollButton from "../components/ScrollTopButton";
import themoviedb from "../services/api/api.themoviedb";
import "../assets/scss/home.scss";
const menus = [
  {
    title: "News",
    url: "upcoming",
  },
  {
    title: "Top vu",
    url: "popular",
  },
  {
    title: "Top classés",
    url: "top_rated",
  },
];
export default function Home() {
  const [dataMovies, setDataMovies] = useState([]);
  const [typeListMovies, setTypeListMovies] = useState("upcoming");
  const [curentPage, setCurentPage] = useState(1);
  const [titlePage, setTitlePage] = useState("News");
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    themoviedb
      .get(`/movie/${typeListMovies}?page=${curentPage}`)
      .then((response) => {
        setDataMovies(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setErrorModal(true);
        console.log("une erreure est survenue");
      });
  }, [typeListMovies, curentPage]);

  const searchMovies = (e) => {
    const query = e.target.value.trim();
    if (query.length > 0 && query !== "") {
      setCurentPage(1);
      setTitlePage("Recherche");
      themoviedb
        .get(`/search/movie?query=${query}&page=${curentPage}`)
        .then((response) => {
          setDataMovies(response.data);
        })
        .catch((e) => {
          console.log("une erreure est survenue");
          setErrorModal(true);
        });
    }
  };
  return (
    <>
      <main className="container">
        <div className="callout callout-danger text-white">
          <h4>Find Movies</h4>
          {titlePage}
        </div>
        <Container fluid="xs">
          <div className=" clearfix">
            <div className="float-sm-left float-none">
              <Label.Group tag>
                {menus.map((menu) => {
                  return(<Label
                    as="a"
                    color={titlePage === menu.title ? "red" : null}
                    onClick={(e) => {
                      setTypeListMovies(menu.url);
                      setTitlePage(menu.title);
                    }}
                    className="text-decoration-none"
                    key={menu.title}
                  >
                    {menu.title}
                  </Label>
                )})}
              </Label.Group>
            </div>
            <div className="float-sm-right   text-align-center ">
              <Input
                icon="search"
                placeholder="Search..."
                onChange={searchMovies}
                className=" text-align-center"
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
            {dataMovies.total_pages > 20 ? (
              <Pagination
                defaultActivePage={1}
                activePage={curentPage}
                ellipsisItem={null}
                boundaryRange={1}
                siblingRange={1}
                firstItem={null}
                lastItem={null}
                size="mini"
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={dataMovies.total_pages}
                onPageChange={(e, { activePage }) => {
                  setCurentPage(activePage);
                  window.scrollTo(0, 0);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </Container>
      </main>
      {loading ? (
        <Dimmer active>
          <Loader size="huge">Chargement</Loader>
        </Dimmer>
      ) : (
        ""
      )}
      <Dimmer active={errorModal}>
        <Header icon>
          <Icon name="warning sign" color="red" />
          <p className="text-danger">
            Une erreur est survenue, Veillez vérifier votre connexion et
            actualiser la page !
          </p>
        </Header>
      </Dimmer>
      <ScrollButton/>
    </>
  );
}
