import { useState } from 'react';

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const points = new Uint8Array(7);
  const [votes, setVotes] = useState(points);
  const [mostVotes, setMostVotes] = useState(0);

  const copy = [...votes];
  const maxEl = Math.max(...copy);

  const findElementIndex = (arr, element) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === element) {
        return i;
      }
    }
  };

  const index = findElementIndex(copy, maxEl);
  console.log();

  const getNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const addVote = () => {
    const copy = [...votes];
    setVotes(
      copy.map((vote, i) => {
        if (i === selected) {
          return (vote += 1);
        } else return vote;
      })
    );
    setMostVotes(index);
  };

  return (
    <>
      <Title text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={addVote}>vote</button>
      <button onClick={getNextAnecdote}>next anecdote</button>
      <Title text="Anecdote with most votes" />
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[index]} votes</div>
    </>
  );
};

export default App;
