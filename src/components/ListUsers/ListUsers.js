import React from 'react'
import {map, isEmpty} from 'lodash'
import '../../page/Users/Users'
import Users from '../../page/Users/Users';
import User from './User';


export default function ListUsers(props) {
    const {users} = props;

    if (isEmpty(users)){
        return <h2>No se han encontrado resultados</h2>
    }


  return (
    <ul className='list-users'>
        {map(users, user => (
            <User key = {user.id} user = {user} />
        ))}
    </ul>
  )
}
