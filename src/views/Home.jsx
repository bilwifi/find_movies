import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Dimmer,Loader, Pagination, Icon, Input, Label } from "semantic-ui-react";
import ListesFilms from "../components/ListesFilms";
import themoviedb from "../services/api/api.themoviedb";
import "../assets/scss/home.scss";

export default function Home() {
  const [dataMovies, setDataMovies] = useState([]);
  const [typeListMovies, setTypeListMovies] = useState("upcoming");
  const [curentPage, setCurentPage] = useState(1);
  const [titlePage, setTitlePage] = useState("News");
  const [loading, setLoading] = useState("true");
  useEffect(() => {
    setLoading(true)
    console.log(loading);
    themoviedb
      .get(`/movie/${typeListMovies}?page=${curentPage}`)
      .then((response) => {
        setDataMovies(response.data);
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
        console.log("une erreure est survenue");
      });
  }, [typeListMovies, curentPage]);

  const searchMovies = (e) => {
    const query = e.target.value.trim();
    if (query.length > 0 && query != "") {
      setCurentPage(1);
      setTitlePage("Recherche");
      themoviedb
        .get(`/search/movie?query=${query}&page=${curentPage}`)
        .then((response) => {
          setDataMovies(response.data);
        })
        .catch((e) => {
          console.log(e);
          console.log("une erreure est survenue");
        });
    }
  };
  return (
    <>
      <section className="container">
        {loading ? (
          <Dimmer active>
            <Loader size="huge">Chargement</Loader>
          </Dimmer>
        ) : (
          ""
        )}
        <div class="callout callout-danger text-white">
          <h4>Find Movies</h4>
          {titlePage}
        </div>
        <Container fluid="xs">
          <div className=" clearfix">
            <div className="float-left">
              <Label.Group tag>
                <Label
                  as="a"
                  color={titlePage == "News" ? "red" : null}
                  onClick={(e) => {
                    setTypeListMovies("upcoming");
                    setTitlePage("News");
                  }}
                >
                  News
                </Label>
                <Label
                  as="a"
                  color={titlePage == "Top vu" ? "red" : null}
                  onClick={(e) => {
                    setTypeListMovies("popular");
                    setTitlePage("Top vu");
                  }}
                >
                  Top vu
                </Label>
                <Label
                  as="a"
                  color={titlePage == "Top classés" ? "red" : null}
                  onClick={(e) => {
                    setTypeListMovies("top_rated");
                    setTitlePage("Top classés");
                  }}
                >
                  Top classés
                </Label>
              </Label.Group>
            </div>
            <Input
              icon="search"
              placeholder="Search..."
              onChange={searchMovies}
              className="float-right"
            />
          </div>
          <br />
          <div className="">
            <ListesFilms dataMovies={dataMovies.results} />
          </div>
          <div className="text-center">
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
                const value = e.target.attributes.value
                  ? e.target.attributes.value.value
                  : 1;
                setCurentPage(value);
              }}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
