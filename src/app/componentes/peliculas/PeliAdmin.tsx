import { useState } from "react";
import { Pelicula } from "../../modelos/Pelicula";
import { ARREGLO_PELICULAS } from "../../mocks/Pelicula-mocks";
import { ARREGLO_PELICULA_GENERO } from "../../utilidades/dominios/DomGenero";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export const PeliAdmin = () => {
  const [arrPeliculas] = useState<Pelicula[]>(ARREGLO_PELICULAS);

  const [objPeli, setObjPeli] = useState<Pelicula>(
    new Pelicula(0, "", "", "", "", "")
  );
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };

  const obtenerNombreGenero = (valor: string) => {
    for (const objGen of ARREGLO_PELICULA_GENERO) {
      if (objGen.codGenero == valor) {
        return objGen.nombreGenero;
      }
    }
  };

  const eliminarPelicula = (codigo: number) => {
    const cantidad = arrPeliculas.length;

    for (let i = 0; i < cantidad; i++) {
      if (arrPeliculas[i] != undefined) {
        const comparar = arrPeliculas[i].codPelicula;

        if (comparar == codigo) {
          arrPeliculas.splice(i, 1);
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>codigo</th>
                <th style={{ width: "20%" }}>Nombre</th>
                <th style={{ width: "25%" }}>Genero</th>
                <th style={{ width: "25%" }}>protagonista</th>
                <th style={{ width: "10%" }}>imagen</th>
                <th style={{ width: "10%" }}>opciones</th>
              </tr>
            </thead>
            <tbody>
              {arrPeliculas.map((mipeli: Pelicula) => (
                <tr className="align-middle" key={mipeli.codPelicula}>
                  <td>{mipeli.codPelicula}</td>
                  <td>{mipeli.nombrePelicula}</td>
                  <td>{obtenerNombreGenero(mipeli.codGeneroPelicula)}</td>
                  <td>{mipeli.protagonistaPelicula}</td>
                  <td>
                    <img
                      src={mipeli.imagenPeliculaBase64}
                      alt=""
                      className="imagenListado"
                    />
                    <div className="text-info">{mipeli.imagenPelicula}</div>
                  </td>
                  <td className="text-center">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setObjPeli(mipeli);
                      }}
                    >
                      <i className="fa-solid fa-trash-can rojito"></i>
                    </a>{" "}
                    <NavLink to={"/pactual/" + mipeli.codPelicula}>
                      <i className="fa-regular fa-pen-to-square verde"></i>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> eliminar pelicula </Modal.Title>

              </Modal.Header>
              <Modal.Body>
                <h3>
                  es ta seguro de que desea eliminar ? {objPeli.nombrePelicula}{" "}
                </h3>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondari"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    eliminarPelicula(objPeli.codPelicula);
                    setShow(false);
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
           
          </Modal>
        </div>
      </div>
    </>
  );
};
