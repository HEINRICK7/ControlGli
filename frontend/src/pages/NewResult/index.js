import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import { useToasts } from 'react-toast-notifications';


import './styles.css';
import '../../global.css';

import api from '../../services/api';

export default function NewResult(){
    const [result, setResult] = useState('');
    const [description, setDescription] = useState('');
    const [created_at, setCreated_at] = useState('');

    const { addToast } = useToasts();

    const history = useHistory();

    const userId = localStorage.getItem('userId');

    async function handleNewResult(e){
        e.preventDefault();

        const data ={
            result,
            created_at,
            description,
        }

        if(result !== '' && description !== '' && created_at !== ''){
            try{
                await api.post('results', data, {
                   headers: {
                       Authorization : userId,
                   }
                })

                addToast('Resultado salvo com sucesso.', {
                    appearance: 'success',
                    autoDismiss: true
                })

                history.push('/profile');

            }catch(error){
                addToast('Erro, tente novamente.', {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        }else{
            addToast('Preencha todos os campos.', {
                appearance: 'info',
                autoDismiss: true
            })

        }
       
    }
    
    return(
        <div className="new-result-container">
                <div className="content">
                    <section>
                        <h1>ControlGli</h1>
                         <h2>Cadastre um resultado</h2>
                         <p>Salve sua aferição.</p> 
                         <Link to="/profile" >
                            <FiArrowLeft size={18} color="#ED5757" /> 
                            Voltar para Home
                         </Link>
                    </section>

                    <form onSubmit={handleNewResult}> 
                        <input 
                            type="text" 
                            placeholder="Seu resultado"
                            value={result}
                            onChange= {e => setResult(e.target.value)}
                        /> 
                        <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange= {e => setDescription(e.target.value)}
                        />
                        <input
                            type="date"
                            value={created_at}
                            onChange= {e => setCreated_at(e.target.value)}
                        />

                        <button className="button" type="submit">Salvar</button>
                    </form>
                </div>
            </div>  
    )
}