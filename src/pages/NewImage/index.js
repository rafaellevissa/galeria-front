import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function NewImage(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    const userId = localStorage.getItem('userId');
    async function handleNewImage(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('images', data,{
                headers:{
                    Authorization: userId,
                }
            })
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar imagem, tente novamente.');
        }
    }
    return (
        <div className="new-image-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="galeria" />
                    <h1>Cadastrar nova imagem</h1>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#000080"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewImage}> 
                    <input 
                        placeholder="Título da imagem"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        id="file"
                        type="file"                         
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}