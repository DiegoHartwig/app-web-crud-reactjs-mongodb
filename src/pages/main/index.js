import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {

    state = {
        contacts:[],
        contactInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadContacts();
    }

    loadContacts = async (page = 1) => {
        console.log(page);
        const response = await api.get(`/contacts?page=${page}`);

        const { docs, ...contactInfo } = response.data;

        this.setState({ contacts: docs, contactInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadContacts(pageNumber);

    };

    nextPage = () => {
        const { page, contactInfo } = this.state;
       
        if(page === contactInfo.page) return;

        const pageNumber = page +1;       

        this.loadContacts(pageNumber);
    };

    render() {
        const { contacts, page, contactInfo } = this.state;

        return (
            <div className="contact-list">
                { contacts.map(contact => (
                    <article key={contact._id}>
                        <strong>{contact.name}</strong>
                        <p>{contact.email}</p>                      
                        <Link to={`/contacts/${contact._id}`}>Visualizar Contato</Link>
                    </article>                   
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === contactInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}