import React, { useState, useEffect } from "react";
// import { Grid, Image } from "semantic-ui-react";
import { Row, Col, Card } from "react-bootstrap";
import { Dimmer, Image, Rating } from "semantic-ui-react";

import DetailFilm from "./DetailFilm";

function ListesFilms({ dataMovies }) {
  const [viewDetail, setViewDetail] = useState(false);
  const [movieSelected, setMovieSelected] = useState("");

  return (
    <>
      <Row>
        {dataMovies
          ? dataMovies.map((movie) => {
              return (
                <Col sm="3">
                  <Card
                    onClick={(e) => {
                      setViewDetail(true);
                      setMovieSelected(movie.id);
                    }}
                  >
                    <Image
                      fluid
                      label={{
                        as: "a",
                        color: "red",
                        corner: "right",
                        detail: movie.vote_average,
                        circular: true,
                        // icon: "ss",
                      }}
                      src={
                        movie.poster_path
                          ? "https://image.tmdb.org/t/p/w300/" +
                            movie.poster_path
                          : "https://semantic-ui.com/images/wireframe/image.png"
                      }
                    />
                  </Card>
                  <div className="text-white">
                    <p>
                      <br />
                      <h2 className="h5">{movie.title}</h2>
                      <span className="text-muted">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "-"}
                      </span>
                    </p>
                  </div>
                  <br />
                </Col>
              );
            })
          : ""}
      </Row>

      <Dimmer
        active={viewDetail}
        onClickOutside={(e) => setViewDetail(false)}
        page
      >
        <DetailFilm idMovie={movieSelected} />
      </Dimmer>
    </>
  );
}

export default ListesFilms;
