import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import galeriaImg from '../../assets/galeria.jpg';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Logon(){
    const [id,setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('useId',id);
            localStorage.setItem('userName',response.data.name);
            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Galeria" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#000080"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>        
            <img src={galeriaImg} alt="Galeria" />
        </div>
        
    );
}