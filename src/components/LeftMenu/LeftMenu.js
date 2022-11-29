import React, {useState} from 'react'
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom";
import LogoWhite from "../../assets/logo-white.png"
import {logoutApi} from "../../api/auth"
import TweetModal from "../../components/Modal/TweetModal";

import useAuth from '../../hooks/useAuth';

import "./LeftMenu.scss"

export default function LeftMenu(props) {
  const {setRefreshCheckLogin} = props;
  const [showModal, setShowModal] = useState(false);
  const user = useAuth();


  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };
  return (
    <div className='left-menu'>
      <img src={LogoWhite} className="logo" alt="twitter"/>
      <Link to='/'>
      <ion-icon name="home-outline"></ion-icon>  Inicio
      </Link>
      <Link to='/users?page=1&type=follow&search='>
      <ion-icon name="people-outline"></ion-icon>  Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
      <ion-icon name="person-circle-outline"></ion-icon>  Perfil
      </Link>
      <Link to="/" onClick={logout}>
      <ion-icon name="power-outline"></ion-icon>  Cerrar Sesion
      </Link>

      <Button onClick={() => setShowModal(true)}>Interactuar</Button>
      <TweetModal show={showModal} setShow={setShowModal}/>
      
    </div>
  )
}