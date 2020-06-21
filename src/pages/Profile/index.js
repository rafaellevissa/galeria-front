import React, {useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [images, setImages]=useState([]);
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,

            }
        }).then(response => {
            setImages(response.data);
        })
    }, [userId]);
    
    async function handleDeleteImage(id){
        try{
            await api.delete(`images/${id}`, {
                headers:{
                    Authorization: userId,
                }
            });
            setImages(images.filter(image => image.id !== id));
        }catch(err){
            alert('Erro ao deletar imagem, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="galeria" />
                <span>Bem vindo(a), {userName}</span>

                <Link className="button" to="/image/new">Cadastrar nova imagem</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Imagens cadastradas</h1>
            <ul>
                {images.map(image => (
                    <li key={image.id}>
                        <strong>Thumb da Imagem:</strong>
                        <p>{image.thumbnail}</p>

                        <strong>Descrição:</strong>
                        <p>{image.description}</p>

                        <strong>Dimensão:</strong>
                        <p>{image.dimension}</p>

                        <strong>Formato:</strong>
                        <p>{image.format}</p>

                        <strong>Thumbnail:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(image.value)}</p>

                        <button onClick={() => handleDeleteImage(image.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}