import React, {useState, useEffect} from 'react'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import {  useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string";
import {isEmpty} from "lodash"
import { useDebouncedCallback } from "use-debounce"
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from '../../components/ListUsers';
import {getFollowsApi} from "../../api/follow"

import "./Users.scss"

export default function Users(props) {
    const history = useNavigate();
    const params = useUsersQuery();
    const {setRefreshCheckLogin} = props; 
    const [users, setUsers] = useState(null);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [btnLoading, setBtnLoading] = useState(false);


    useEffect(() =>{
      console.log("ddakadkdak")
      getFollowsApi(queryString.stringify(params))
      .then(response => {
        if (isEmpty(response)){
          setUsers([])
        }else{
          setUsers(response);
        }
      }).catch(() => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeType = (type) => {
        
        setUsers(null);
        if(type === "new"){
          setTypeUser("new")
        }else{
          setTypeUser("follow")
        }
        history({
          search: queryString.stringify({ type:type , search: "", page: 1 }),
        });
        window.location.reload()
    }


    const moreData = () => {
      setBtnLoading(true);
      const newPage = parseInt(params.page) + 1;
      history({
        search: queryString.stringify({ ...params, page: newPage }),
      });
      window.location.reload()
    };

  return (
    <BasicLayout title = "Usuarios" className= "users" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className='users__title'>
        <h2>Usuarios</h2>
        <input type='text' placeholder = 'Busca un usuario...'/>
      </div>
      <ButtonGroup className='users__options'>
        <Button className={typeUser === "follow" && "active"} onClick={() => onChangeType("follow")}>Siguiendo</Button>
        <Button className={typeUser === "new" && "active"} onClick={() => onChangeType("new")}>Nuevos</Button>
      </ButtonGroup>

      {!users ? (
        <div className='users__loading'>
            <Spinner animation='border' variant='info'/>
            Buscando Usuarios
        </div>
      ): (
        <>
        <ListUsers users={users}/>
        <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Cargar mas usuarios"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </>
      )}
    </BasicLayout>
  )
}

function useUsersQuery(){
  const sear = useLocation().search;
  const params = new URLSearchParams(sear)
  const page = params.get('page')
  const type = params.get('type')
  const search = params.get('search')
  
  
  // console.log(page, type, search);
    return {page, type, search}
}

