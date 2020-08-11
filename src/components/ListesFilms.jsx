import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Dimmer, Image } from "semantic-ui-react";

import DetailFilm from "./DetailFilm";

function ListesFilms({ dataMovies }) {
  const [viewDetail, setViewDetail] = useState(false);
  const [movieSelected, setMovieSelected] = useState("");

  const closeViewDetail = () => setViewDetail(false)
  return (
    <>
      <Row>
        {dataMovies && dataMovies.length !== 0 ? (
          dataMovies.map((movie) => {
            return (
              <Col sm="3" className="" key={movie.id}> 
                <Card
                  onClick={(e) => {
                    setViewDetail(true);
                    setMovieSelected(movie.id);
                  }}
                  className="card-movie bright"
                >
                  <Image
                    fluid
                    label={{
                      as: "a",
                      color: "red",
                      corner: "right",
                      detail: movie.vote_average,
                      circular: true,
                    }}
                    src={
                      movie.poster_path
                        ? "https://image.tmdb.org/t/p/w300/" + movie.poster_path
                        : "https://semantic-ui.com/images/wireframe/image.png"
                    }
                  />
                </Card>
                <div className="text-white">
                  
                    <br />
                    <h2 className="h5">{movie.title}</h2>
                    <span className="text-muted">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "-"}
                    </span>
                </div>
                <br />
              </Col>
            );
          })
        ) : (
          <div className="alert alert-danger text-center col-12 " role="alert">
            Aucun film trouvé !!!
          </div>
        )}
      </Row>

      <Dimmer
        active={viewDetail}
        onClickOutside={(e) => setViewDetail(false)}
        page
      >
        <DetailFilm id={movieSelected} close={closeViewDetail} />
      </Dimmer>
    </>
  );
}

export default ListesFilms;
