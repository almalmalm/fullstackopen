const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const errorStyle = {
    fontSize: 30,
    backgroundColor: '#bacfd1',
    border: '3px solid red',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    color: 'red',
  };

  const addContactStyle = {
    fontSize: 30,
    backgroundColor: '#bacfd1',
    border: '3px solid green',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    color: 'green',
  };

  if (message.includes('Information of')) {
    return <div style={errorStyle}>{message}</div>;
  }

  return <div style={addContactStyle}>{message}</div>;
};

export default Notification;
