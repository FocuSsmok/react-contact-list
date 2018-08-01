import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let people = [
    {id: 0, name: 'Patryk Przebirowski', stand: 'Web Developer'},
    {id: 1, name: 'Grażyna Mączka', stand: 'HR Manager'},
    {id: 2, name: 'Janusz Tracz', stand: 'Head of Deparment'}
];

class ContactItem extends Component {
    render() {
        return(
           <li className="contact-item">
                <div className="contact-item__icon-wrap">
                    <i className="fas fa-address-card"></i>
                </div>
                <div className="contact-item__data-wrap">
                    <span className="contact-item__name">
                        {this.props.name}
                    </span>
                    <span className="contact-item__stand">
                        {this.props.stand}
                    </span>
                </div>
                <div className="contact-item__delete x-icon" onClick={() => this.props.onClick(this.props.id)}>
                    <span className="x-icon__line"></span>
                    <span className="x-icon__line"></span>
                </div>
            </li> 
        );
    }
}

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.removeEl = this.removeEl.bind(this);
        this.state = {
            members: [...people]
        }
    }

    removeEl(id) {
        const members = [...this.state.members];
        for (let i = 0; i < members.length; i++) {
            if (members[i].id === id) {
                members.splice(i, i + 1);
            }
        }
        // console.log(people);
        this.setState({
            members: members
        });
    }

    contactItems() {
        const members = [...this.state.members];
        const listItems = [];
        for (let i = 0; i < members.length; i++) {
            listItems[i] = <ContactItem key={members[i].id} name={members[i].name}
                stand={members[i].stand} id={members[i].id} onClick={this.removeEl}
            />
        }
        return listItems;
    }
    render() {
        const listItems = this.contactItems();
        // console.log(this);
        return (
            <ul className="contact-list">
                {listItems}
            </ul>
        );
    }
}

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'addItem',
            members: [...people],
            name: '',
            stand: ''
        };
    }
    addMember(event) {
        const activeMembers = this.state.members;
        const btn = event.target;
        const stand = event.target.parentElement.previousElementSibling.firstElementChild;
        const name = stand.parentElement.previousElementSibling.firstElementChild;
        
        if (stand.value && name.value) {
            const id = activeMembers[activeMembers.length - 1].id + 1;
            activeMembers.push(
                {id: id, name: name.value, stand: stand.value}
            );
            // people.length = 0;
            // people = [...activeMembers];
            this.setState({members: activeMembers});
        }
    }
    render() {
        console.log(this.props.clicked);
        return(
            <div className={this.props.clicked === false ? 'addItem' : 'addItem' + ' addItem--visible'}>
                <div className="addItem__name-wrap box box--wrap">
                    <input type="text" placeholder="Name:" className="addItem__input" />
                </div>
                <div className="addItem__stand-wrap box box--wrap">
                    <input type="text" placeholder="Stand:" className="addItem__input" />
                </div>
                <div className="addItem__button-wrap box box--wrap">
                    <button className="btn btn--add" onClick={this.addMember.bind(this)}>Dodaj</button>
                </div>
            </div>
        );
    }
}

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    addItem() {
        let click = this.state.clicked;
        this.setState({
            clicked: true
        });
        // console.log(this.state.clicked);/
    }
    render() {
        return(
            <header className="app__header header">
                <nav className="app__nav nav">
                    <div className="nav__wrap-title">
                        <a href="#" className="nav__title">
                            {/* <img src="#" className="nav__logo" /> */}
                            <i className="fas fa-address-book"></i>
                            Lista kontaktów
                        </a>
                    </div>
                    <div className="header__btn-wrap btn-wrap">
                        <button onClick={this.addItem.bind(this)} className="btn-wrap__btn btn">Dodaj</button>
                    </div>
                </nav>
                <AddItem clicked={this.state.clicked} />
            </header>
        );
    }
}

class App extends Component {
    render() {
        return(
            <div className="app">
                <AppHeader />
                <ContactList />
            </div>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
