import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import AvatarNoFound from "../../assets/avatar-no-found.png";

import "./ListUsers.scss"

export default function User(props) {
  const { user } = props;
  const [userInfo, setIserInfo] = useState(null);

  useEffect(() => {
    getUserApi(user.id).then((response) => {
      setIserInfo(response);
    });
  }, [user]);

  return (
    <Card as={Link} to={`/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar
            ? `${API_HOST}/obtenerAvatar?id=${user.id}`
            : AvatarNoFound
        }
        alt={`${user.nombre} ${user.apellidos}`}
      />
      <Card.Body className="texto">
        <h5>
          {user.nombre} {user.apellido}
        </h5>
        <p>{userInfo?.biografia}</p>
      </Card.Body>
    </Card>
  );
}