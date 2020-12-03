import React, { Component } from "react";
import Strings from "../components/Strings/Strings.jsx";
import words from "../components/Words/Words.json";

// words.map( word => {
//   fetch("http://178.128.196.163:3000/api/records/", {
//                 method: 'PUT',
//                 body: JSON.stringify({data: word}),
//                 headers: {'Content-Type': 'application/json'},
//             }) .then((response) => response.json())
//             .catch((error) => {

//                 if (error) {
//                     this.props.alert.error("Произошла ошибка " + error.message);
//                 }
//             })
// })

class Crud extends Component {
  constructor() {
    super();
  }
  state = {
    words: [],
    upData: [],
    wordsToUp: [],
    stylesForForm: {
      display: "none",
    },
    stylesForBtnAdd: {
      display: "inline-block",
    },
    
  };

  addForm = () => {
    return (
      <form style={this.state.stylesForForm} className="table-add-form">
        <button type="button" className="table-add-form__num td">
          {this.state.words.length + 1}
        </button>
        <input
          maxLength="20"
          className="table-add-form__word td tbody-td"
          type="text"
        />
        <input
          maxLength="20"
          className="table-add-form__transcription td tbody-td"
          type="text"
        />
        <input
          maxLength="20"
          className="table-add-form__translation td tbody-td"
          type="text"
        />
        <button
          type="button"
          onClick={() => {
            this.addNewTr();
            this.deleteInputValue();
          }}
          className="table-add-form__confirm"
        >
          &#10004;
        </button>
      </form>
    );
  };

  checkStyleOfForm = () => {
    if (this.state.stylesForForm.display === "none") {
      this.setState({
        stylesForForm: {
          display: "flex",
        },
        stylesForBtnAdd: {
          display: "none",
        },
      });
    } else {
      this.setState({
        stylesForForm: {
          display: "none",
        },
        stylesForBtnAdd: {
          display: "inline-block",
        },
      });
    }
  };

  idWord = (props) => {
    if (props === "") {
      return (document.querySelector(".table-add-form__word").value = props);
    } else {
      return document.querySelector(".table-add-form__word").value;
    }
  };
  idTranscription = (props) => {
    if (props === "") {
      return (document.querySelector(
        ".table-add-form__transcription"
      ).value = props);
    } else {
      return document.querySelector(".table-add-form__transcription").value;
    }
  };
  idTranslation = (props) => {
    if (props === "") {
      return (document.querySelector(
        ".table-add-form__translation"
      ).value = props);
    } else {
      return document.querySelector(".table-add-form__translation").value;
    }
  };

  addNewTr = () => {
    this.checkStyleOfForm();
    if (
      document.querySelector(".table-add-form__word").value.replace(/\s+/g, "")
        .length >= 1 &&
      document
        .querySelector(".table-add-form__transcription")
        .value.replace(/\s+/g, "").length >= 1 &&
      document
        .querySelector(".table-add-form__translation")
        .value.replace(/\s+/g, "").length >= 1
    ) {
      this.state.upData.push({
        data: {
          name: this.idWord(),
          surname: this.idTranscription(),
          login: this.idTranslation(),
        },
      });
      this.putDataInBackend();
      this.setState({
        upData: [],
      });
    } else {
      return alert(
        "Необходимо заполнить ВСЕ поля ввода и ввести минимум по одному символу, исключая пробелы!"
      );
    }
  };

  deleteInputValue = () => {
    this.idWord(""), this.idTranscription(""), this.idTranslation("");
  };

  addBackendData = () => {
    let controller = new AbortController();
    fetch("http://178.128.196.163:3000/api/records/", {
      method: "GET",
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((result) => {
        let backendData = [];

        result.map((resss) => {
          if (resss.data) {
            backendData.push(resss);
          }
        });
        
          if(!document.querySelector('button').getAttribute('disabled')){
            this.setState({
              words: backendData,
            });
          } else {
            return
          }
        
      })
      .catch((error) => console.log(error));
      // controller.abort();
  };

  putDataInBackend = () => {
    fetch("http://178.128.196.163:3000/api/records", {
      method: "PUT",
      body: JSON.stringify(this.state.upData[0]),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  deleteBackendData = (e) => {
    let id = [];
    id.push(e.target.getAttribute("id"));
    fetch("http://178.128.196.163:3000/api/records/" + id.join(" "), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };


  editBackendData = (e) => {
    document.querySelectorAll('button').forEach(bar => {
      bar.setAttribute("disabled", "disabled")
      })
      this.addBackendData()

    let id = [];
    id.push(e.target.getAttribute("id"));
    let inputs = e.target.parentElement.children;
    for(let i = 0; i < inputs.length; i++){
      if(inputs[i].tagName === 'INPUT'){
        inputs[i].classList.add(`editInput${i}`)
        inputs[i].removeAttribute('readonly') 
        inputs[i].setAttribute('value', '')       
      }
      if(inputs[i].classList.contains('tbody-btn-edit')){
        inputs[i].style.display = "none"
      }
      if(inputs[i].classList.contains('tbody-btn-up')){
        inputs[i].style.display = "inline-block"
        inputs[i].removeAttribute('disabled')
      }
    }
    e.target.parentElement.classList.add('edit') 
  }

  onChangeName = (name, index) => {
    const word = this.state.words[index];
    word.data.name = name;
    const words = [...this.state.words]
    words[index] = word
    this.setState({words})
  }
  onChangeSurname = (surname, index) => {
    const word = this.state.words[index];
    word.data.surname = surname;
    const words = [...this.state.words]
    words[index] = word
    this.setState({words})
  }
  onChangeLogin = (login, index) => {
    const word = this.state.words[index];
    word.data.login = login;
    const words = [...this.state.words]
    words[index] = word
    this.setState({words})
  }

  upBackendData = (e) => {
    document.querySelectorAll('button').forEach(bar => {
      bar.removeAttribute('disabled')
      })
    let id = [];
    id.push(e.target.getAttribute("id"));
    let upWord = {};
    let inputs = e.target.parentElement.children;
    for(let i = 0; i < inputs.length; i++){
      if(inputs[i].tagName === 'INPUT'){
        inputs[i].classList.remove(`editInput${i}`)
        inputs[i].setAttribute('readonly', 'readOnly')     
      }
      if(inputs[i].classList.contains('tbody-btn-edit')){
        inputs[i].style.display = "inline-block"
      }
      if(inputs[i].classList.contains('tbody-btn-up')){
        inputs[i].style.display = "none"
      }
    }
    e.target.parentElement.classList.remove('edit') 
    this.state.words.map(word => {
      if(word._id === id.join(' ')){
        upWord = word
      }
    })

        fetch("http://178.128.196.163:3000/api/records/" + id.join(" "), {
        method: "POST",
        body: JSON.stringify(upWord),
        headers: { "Content-Type": "application/json" }

    })
      .then((response) => response.json())
      .catch((error) => console.log(error));


    this.addBackendData()
  }


  render() {
    let word = null;
    this.addBackendData();

    return (
      <section className="container">
        <h1>Словарь</h1>
        <div className="table">
          <form className="thead">
            <button className="th">№</button>
            <input className="th tbody-td" type="text" value="Слово" readOnly />
            <input
              className="th tbody-td"
              type="text"
              value="Транскрипция"
              readOnly
            />
            <input
              className="th tbody-td"
              type="text"
              value="Перевод"
              readOnly
            />
          </form>
          {
            (word = this.state.words.map((word, index) => {
              return (
                <Strings
                  key={index}
                  num={index + 1}
                  name={word.data.name}
                  surname={word.data.surname}
                  login={word.data.login}
                  _id={word._id}
                  deleteFoo={this.deleteBackendData}
                  editFoo={this.editBackendData}
                  upFoo={this.upBackendData}
                  onChangeName={event => this.onChangeName(event.target.value, index)}
                  onChangeSurname={event => this.onChangeSurname(event.target.value, index)}
                  onChangeLogin={event => this.onChangeLogin(event.target.value, index)}
                />
              );
            }))
          }
          <this.addForm />
          <button
            type="button"
            className="table-btn__add"
            style={this.state.stylesForBtnAdd}
            onClick={this.checkStyleOfForm}
          >
            +
          </button>
        </div>
      </section>
    );
  }
}

export default Crud;
