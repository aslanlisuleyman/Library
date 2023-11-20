

import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBook, setSelectedBook] = useState("");


  const modalRef = useRef()

  const changeHandler =(book)=>{
    setSelectedBook(book);
   
  }

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then((data) => {
          console.log(data.data.items);
          setResult(data.data.items);
        })
        
    }
    else {
      setResult([]);
      setSelectedBook("")
    }
  }, [searchTerm]);
  

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className='library'>
        <img
          src='https://www.state.gov/wp-content/uploads/2019/04/shutterstock_83045623-e1555360482941-2560x852.jpg'
          alt=''
        />
        <h1>Data Book Searching App</h1>
        <input type='text' placeholder='Find Book'  className='inp' onChange={handleInputChange} />
      </div>

      <div className='cards' >
        {result.length === 0 ? (
          <div className='nothing'><h1>Nothing <br /> To <br />Show!?</h1></div>
        ) : (
          result.map((book) => (
            <div className="card" key={book.id} style={{ width: '18rem' }}>
     <img src={book.volumeInfo.imageLinks.thumbnail} className="card-img-top" alt="Resim Açıklaması" />
       <div className="card-body">
         <p className="card-text">{book.volumeInfo.title}</p>
         <p className="card-text">{book.volumeInfo.authors}</p>
         <div className="d-flex justify-content-around">
          <button><a href={book.volumeInfo.previewLink} target='_blank' >Preview</a></button> 
           <button onClick={()=>changeHandler(book)} className='prev'>Details </button>
         </div>
      </div>
     </div>
          ))
        )}
      </div>

       {
        selectedBook &&(
          <div className='box' ref={modalRef}>
          <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt="" />
          <p>{selectedBook.volumeInfo.title}</p>
          <p>{selectedBook.volumeInfo.description}</p>
  
  </div>
      
        ) }
      
      <Footer />
    </>
  );
}

export default App;
