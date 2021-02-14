import  React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import Input from "./Input";



const Board = () => {
    
    const [quote, setQuote] = useState('');
    const [typed, setTyped] = useState('');
    const [time, setTime] = useState(0);
    const [pressed, setPressed] = useState(false);


    const onChangeHandler = (e) => {
        let typedValue = e.target.value;
        setTyped(typedValue);
    };

    const timerHandler = () => {
        setTime(prev => prev + 1);
    };
    useEffect(()=> {
        if(quote.length === typed.length){
            setPressed(false);
        }
    })
    useEffect(()=> {
       if(!pressed) return;
       const interval = setInterval(timerHandler,1000);

       return () => clearInterval(interval);

    },[pressed]);

    useEffect(()=> {
        
        const randomQuote = async () => {
                const response = await fetch('https://api.quotable.io/random')
                const data = await response.json();
                setTyped('');
                setQuote(data);
                setTime(0);
              }
              randomQuote();
              
    },[]);
    
    

    const typedArray = typed.split('').map(el=> el);

    const quoteColor = quote ? quote.content.split('').map((el, fi) => <Span key={fi} colorChange={!typedArray[fi] ? '#4F96C3':el === typedArray[fi]? 'green':'red'} >{el}</Span>) : 'The context is loading...';
    
    const wpm = () => {
        const totalWord = typed.split('').length/5;
        const totalTime = time/60;
        return Math.round(totalWord/totalTime);
    };
    
    const result = (
        <div>
            <h3>You have completed the context.</h3>
            <h3>Your typing speed is <Span colorChange='#61dafb' style={{fontWeight: 600}}>{wpm()}wpm</Span></h3>
        </div>
    );
    return (
        <Main>
            <Header>
                <h1>Typing Test</h1>
                <h1>Time: <Span colorChange='#4F96C3'>{time<10?'0' + time : time}</Span>s</h1>
            </Header>
            <Container>
            {
                quote.length === typed.length ?
                result:
                <Fragment>
                    <Quote>{ quoteColor }</Quote>
                    <Input ph="Type the quote inside the box....." value={typed} pressed={()=> setPressed(true)} changed={onChangeHandler} />
                </Fragment>
            }
            </Container>
        </Main>
    )
}

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-shadow: 0px 0px 15px #4F96C3;
`;

const Main = styled.main`
    position: relative;
    min-width: 60%;
    max-width: 60%;
    min-height: 70vh;
    background: #202931;
    font-family: 'Rajdhani', sans-serif;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    box-shadow:  0 0 5px 2px #4F96C3, 0 0 7px 5px #4F96C3, 0 0 15px 10px #4F96C3;
`;

const Container = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Quote = styled.h1`
    width: 100%;
    padding: 1rem;
    color: #4F96C3;
    font-size: 2.3rem;
`;

const Span = styled.span`
    color: ${props=>props.colorChange};
    width: ${props=>props.width}px;
`;


export default Board;