import React, { useEffect } from 'react';

const URL = "http://localhost:5000";

const App: React.FC = () => {
  useEffect(() => {
    fetch(URL + "/getall")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      );
  })

  const post = () => {
    const data = {name: "Awesome Book 2", author: "David", published: "2020"}
    fetch(URL + "/add", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((result) => console.log(result))
  }

  return (
    <div className="App">
      <div onClick={post}>Click me</div>
    </div>
  );
}

export default App;
