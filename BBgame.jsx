import React,{ useState } from 'react';
import Try from './Try';

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0;i<4;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

const BBgame = () =>{
    const [result,setResult] = useState('');
    const [value,setValue] = useState('');
    const [answer,setAnswer] = useState(getNumbers); //lazy init useState는 값을 넣는 경우 함수를 넣는 경우가 있는데 함수를 넣으면 처음 실행될 때 함수의 return이 들어가고 다시 render 할 떄는 실행되지 않음
    const [tries,setTries] = useState([]);

    const onSubmitForm = (e) => { 
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries)=>{
                return [...prevTries,{try : value, result : '홈런!'}]
            });
            alert('홈런! 게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(length >= 9){
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers()); // getNumbers를 넣어도 함수를 넣은 판정이 돼서 돌아가나 getNumbers()를 넣어 호출하는게 바람직함
                setTries([]);
            }else{
                for(let i = 0;i<4;i+=1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if(answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries)=>{
                    return [...prevTries, {try : value, result : `${strike} 스트라이크, ${ball} 볼 입니다.` }]
                })
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return(
       <div>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input maxLength={4} value = {value} onChange = {onChangeInput}></input>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((v,i) => {
                return (
                   <Try key={`${i+1}차 시도 : `} tryInfo={v}/>
                );
            })}  
        </ul>
        </div>
    );
};

export default BBgame;