import React, { useState } from 'react'
import './styles.css';


export const App = () => {

  const [message, setMessage] = useState('')

  const [balanced, setBalanced] = useState(false);

  const [seeMessage, setSeeMessage] = useState(false);

  const handleInputChange = ({target}) => {
    setSeeMessage(false);  
    setMessage( target.value )

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setSeeMessage(true);

    balancedPar(message) ? setBalanced(true) : setBalanced(false);

    setMessage('');
  }
  
  const balancedPar = (pars) => {
    const stack = [];
    const emoji = [];

    let countEmoji= 0;
    let negativeExceedStack= 0;
    let current = 0;
    let prev = 0;

    for (let single of pars){
        if(single === '('){
            if(emoji[prev]===':'){
                countEmoji++;
            }
            stack.push(single);
            
        }

        if(single === ')'){
            if(emoji[prev]===':'){
                countEmoji++;
            }
           
            if( stack.length === 0){
                negativeExceedStack++;
                
            }
            
            if(countEmoji === 0 && stack.length === 0){
                return false;
            }
            stack.pop();
        }
        
        if(single === ':'){
            emoji[current] = single; 
        }

        if(current > 0 ){
            prev++;
        }

        current ++;
    }

    if((stack.length === 0 && negativeExceedStack <= countEmoji) || (stack.length === countEmoji && negativeExceedStack <= countEmoji)){
        return true;
    }else{
        return false;
    }
  }


  return (
    <div>
        <h1>Mensajes</h1>
        <br/>
      <div className="row">
           
            <div className="col-5">
              <form onSubmit={ handleSubmit } >
                  <input  
                      type='text'
                      name='mensaje'
                      className='form-control'
                      placeholder='....'
                      autoComplete='off'
                      value={message}
                      onChange={handleInputChange}
                  />
                  <div className = "d-grid gap-2">

                      <button 
                          type="submit"
                          className = "btn btn-outline-primary mt-1 " > Agregar </button>
                  </div>       
              </form>   
            </div>
      </div>
      <br/>

      {seeMessage && (balanced? <h4 className="text-primary">Balanceado!</h4> : <h4 className="text-danger">Desbalanceado!</h4>)}

    </div>
  )
}
