import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Accordion, Table } from "react-bootstrap";
import { Rating } from "semantic-ui-react";
import themoviedb from "../services/api/api.themoviedb";
// import ListesFilms from "./ListesFilms";
import styled from "styled-components";

import "../assets/scss/detailFilm.scss";

export default function DetailFilm({ idMovie }) {
  const [infoMovie, setInfoMovie] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  useEffect(() => {
    themoviedb
      .get(`/movie/${idMovie}`)
      .then((response) => {
        setInfoMovie(response.data);
      })
      .catch((e) => {
        console.log(e);
        console.log("une erreure est survenue");
      });
    themoviedb
      .get(`/movie/${idMovie}/similar`)
      .then((response) => {
        setSimilarMovie(response.data.results.slice(0, 4));
      })
      .catch((e) => {
        console.log(e);
        console.log("une erreure est survenue");
      });
  }, []);
  const Banner = styled.div`
    background: url(${infoMovie.backdrop_path
      ? "https://image.tmdb.org/t/p/w500/" + infoMovie.backdrop_path
      : "https://semantic-ui.com/images/wireframe/image.png"});
  `;
  console.log(infoMovie);
  return (
    <div className="text-left">
      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={
                infoMovie.poster_path
                  ? "https://image.tmdb.org/t/p/w300/" + infoMovie.poster_path
                  : "https://semantic-ui.com/images/wireframe/image.png"
              }
            />
            <h3>{infoMovie.title}</h3>
            <h4>
              {infoMovie.release_date
                ? new Date(infoMovie.release_date).getFullYear()
                : "-"}
            </h4>
            {/* <span className="minutes">{infoMovie.vote_average}</span> */}
            <p className="type">
              {infoMovie.genres
                ? infoMovie.genres.map((genre) => genre.name + "|")
                : "-"}
            </p>
          </div>
          <div className="movie_desc overflow-auto">
            <p className="text ">{infoMovie.overview}</p>
          </div>
        <div class="movie_social">
          <ul>
            <li>
              { infoMovie.vote_average ?  <Rating icon='star' defaultRating={Math.round(infoMovie.vote_average/2)} maxRating={5} disabled/> : ""}
           
            {console.log(Math.round(infoMovie.vote_average/2))}
            </li>
            <li>
            </li>
            <li>
            </li>
          </ul>
        </div>
        </div>
        <Banner className="blur_back bright_back"></Banner>
      </div>

      {/* <Row>
        <Col>
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img
                  src={
                    infoMovie.poster_path
                      ? "https://image.tmdb.org/t/p/w300/" +
                        infoMovie.poster_path
                      : "https://semantic-ui.com/images/wireframe/image.png"
                  }
                  className="card-img  embed-responsive-item"
                  alt="..."
                />
              </div>
              <div className="col-md-7" style={{ color: "black" }}>
                <div className="card-body">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        Detail du film
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Table striped bordered hover variant="dark" responsive>
                            <thead>
                              <tr>
                                <th colSpan="2"><h3>{infoMovie.title}</h3></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Synopsis</td>
                                <td>{infoMovie.overview}</td>
                              </tr>
                              <tr>
                                <td>Genres</td>
                                <td>
                                  <Label.Group tag>
                                    {infoMovie.genres
                                      ? infoMovie.genres.map((genre) => {
                                          return (
                                            <Label as="a">{genre.name}</Label>
                                          );
                                        })
                                      : "-"}
                                  </Label.Group>
                                </td>
                              </tr>
                              <tr>
                                <td>Date</td>
                                <td>{infoMovie.release_date}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Films simulaires
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <ListesFilms dataMovies={similarMovie}/>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </Col>

  
      </Row> */}
    </div>
  );
}
