import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/DashboardUser/DashboardUser.scss";
import Loading from "../components/Loading";
import { getUserDetail } from "../FilesStore/Actions";
import defaultUser from '../assets/img/user_default.png'
import Cards from '../components/Cards'
import { Button } from 'antd'

function DashboardUser() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const { userDetail } = useSelector((state) => state);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getUserDetail(user.result.id, user.result.role))
  }, [dispatch, user.result.id, user.result.role]);

  if (!userDetail) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="Container-General">
        <div>
          <div className="DashboardUser-userInfo">
            <h1>Información General</h1>
            <img src={userDetail.imageUrl || defaultUser} />
            <p>Nombre: {`${userDetail.firstName} ${userDetail.lastName}`}</p>
            <p>Email: {`${userDetail.email}`}</p>
            <p>Rol: {userDetail.role}</p>
          </div>
          <div className="Container-Favs">
            <h1 className="DashboardUser-section-Title" id="Favs-hotels">
              Hoteles Favoritos
            </h1>
            <div className="Favs-Cards">
                {userDetail.favs.length === 0 ? (
                  <div>{`No Tienes Hotel Favorito :(`}</div>
                ) : (
                  <div>
                    {userDetail.favs.map((f) => {
                      return (
                        <Cards
                          name={f.name}
                          key={f.id}
                          id={f.id}
                          img={f.images}
                          price={f.pricePerNight}
                        />
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
          <div className="Container-Reservs">
            <h1 className="DashboardUser-section-Title">
              Ultimas reservaciones
            </h1>
            <div className="Last-reservs">
                {!userDetail.Reservations ? (
                  <div>{`No Tienes Reservaciones Previas :(`}</div>
                ) : (
                  <table className="DashboardUser_reservationInfo" >
                    <thead>
                      <tr>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetail.Reservations.map((f) => {
                        return (
                          <tr key={f.id}>
                            <td>{f.date_start}</td>
                            <td>{f.date_end}</td>
                            <td>{f.detail}</td>
                            <td>{f.status}</td>
                            <td><a href={f.link_mercado_pago} target='_blank'>Pagar</a><Button type="text"><strong>Eliminar</strong></Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardUser;
