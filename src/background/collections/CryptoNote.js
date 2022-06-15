import { NOTES_BASE } from '../utilities/constants';
import { parseNotes } from "@/utilities/parser";

export class CryptoNote{
  constructor() {
    this.notes = [];
    this.fetchNotes();
  }

  fetchNotes() {
    this.notes = [];
    return fetch(NOTES_BASE, {
      method: 'GET'
    }).then(response => response.json())
        .then(data => {
          if(data) {
            this.notes = parseNotes(data);
            return true;
          }
        })
  }

  submitNote({ request }) {
    const { data } = request;
    this.notes.push(data)
    return fetch(NOTES_BASE, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      })
    })
  }

  deleteNote({ request }) {
    const { data } = request;
    this.notes = this.notes.filter((item) => item.id !== data.note);
    return fetch(`https://cryptoinfo-f8ee1-default-rtdb.europe-west1.firebasedatabase.app/notes/${data.note}.json`, {
      method: 'DELETE',
    })
  }

  editNote({request}) {
    const { data } = request;
    return fetch(`https://cryptoinfo-f8ee1-default-rtdb.europe-west1.firebasedatabase.app/notes/${data.id}.json`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      })
    })
  }

}