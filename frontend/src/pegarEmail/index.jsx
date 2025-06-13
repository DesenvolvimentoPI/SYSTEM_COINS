import './style.css';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function ConseguirEmailAlteraSenha(){
    return(
        <>
            <div className='container-principal_tipo_login'>
                <form action="" className='form_login'>
                    <h1>ALTERAR E-MAIL</h1>
                    <p>Digite os campos abaixo para alterar sua senha!</p>
                        <div className='inputs'>
                            <h2>E-mail</h2>
                            <input type="email" 
                            required
                            placeholder='Digite seu E-mail'
                            onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div className='inputs'>
                            <h2>CPF</h2>
                            <input type="email" 
                            required
                            placeholder='Digite seu CPF'
                            onChange={event => setEmail(event.target.value)}/>
                        </div>
                        
                        <button>Verificar</button>
                </form>
            </div>
        </>
    )
}