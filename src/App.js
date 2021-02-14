import styled from 'styled-components';
import Board from './Board/Board';



const Body = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #202931;
  color: grey;
  font-size: 25px;
  font-weight: 700;
`;
const App = () => {

  return (
    <Body>
      <Board/>
    </Body>
  )
}

export default App;