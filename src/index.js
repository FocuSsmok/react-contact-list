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
                <div className="contact-item__delete x-icon" onClick={() => this.props.onClick(this.props.id)} tabIndex="0">
                    <span className="x-icon__line"></span>
                    <span className="x-icon__line"></span>
                </div>
            </li> 
        );
    }
}

class ContactList extends Component {
    render() {
        // const listItems = this.contactItems();
        return (
            <ul className="contact-list">
                {this.props.items}
            </ul>
        );
    }
}

class AddItem extends Component {
    render() {
        return(
            <div className={this.props.clicked === false ? 'addItem' : 'addItem' + ' addItem--visible'}>
                <div className="addItem__name-wrap box box--wrap">
                    <input type="text" placeholder="Name:" className="addItem__input" />
                </div>
                <div className="addItem__stand-wrap box box--wrap">
                    <input type="text" placeholder="Stand:" className="addItem__input" />
                </div>
                <div className="addItem__button-wrap box box--wrap">
                    <button className="btn btn--add" onClick={(event) => this.props.onClick(event)}>Dodaj</button>
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
                        <button onClick={() => this.props.onClick()} className="btn-wrap__btn btn">Dodaj</button>
                    </div>
                </nav>
            </header>
        );
    }
}

// App ma pelna kontrole nad reszta komponentow to glowny komponent
// re renderuje komponenty i dokonuje zmian

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // members: [...people],
            members: [],
            clicked: false
        };
        this.contactItems = this.contactItems.bind(this);
        // this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
    }
    changeVisible() {
        let click = this.state.clicked;
        this.setState({
            clicked: true
        });
        // console.log(this.state.clicked);/
    }
    addMember(event) {
        const activeMembers = this.state.members;
        const btn = event.target;
        // console.log(event);
        const stand = event.target.parentElement.previousElementSibling.firstElementChild;
        const name = stand.parentElement.previousElementSibling.firstElementChild;
        let click = this.state.clicked;

        if (stand.value && name.value) {
            let id = 0;
            if (activeMembers.length) {
                id = activeMembers[activeMembers.length - 1].id + 1;
            } else {
                id = 0;
            }
            activeMembers.push(
                {id: id, name: name.value, stand: stand.value}
            );
            // people.length = 0;
            // people = [...activeMembers];
            localStorage.setItem("contacts", JSON.stringify(activeMembers));
            this.setState({members: activeMembers});
            this.setState(
                {clicked: !click}
            );
        }
    }
    removeEl(id) {
        const members = [...this.state.members];
        for (let i = 0; i < members.length; i++) {
            if (members[i].id === id) {
                console.log(true);
                const tmp = members.splice(i, 1);
                console.log(tmp);
            }
        }
        // console.log(people);
        localStorage.setItem("contacts", JSON.stringify(members));
        this.setState({
            members: members
        });
    }
    contactItems() {
        // const contacts = this.getFromLocalStorage();
        const members = [...this.state.members];
        // const members = items.concat(contacts);
        const listItems = [];
        for (let i = 0; i < members.length; i++) {
            listItems[i] = <ContactItem key={members[i].id} name={members[i].name}
                stand={members[i].stand} id={members[i].id} onClick={this.removeEl.bind(this)}
            />
        }
        return listItems;
    }
    componentWillMount() {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        // const copyMembers = [...this.state.members];
        if (contacts) {
            this.setState({
                // members: copyMembers.concat(contacts)
                members: contacts
            });
        }
    }
    render() {
        // this.getFromLocalStorage();
        const listItems = this.contactItems();
        // const listItems = items.concat(contacts);
        return(
            <div className="app">
                <AddItem clicked={this.state.clicked} onClick={this.addMember.bind(this)} />
                <AppHeader onClick={this.changeVisible.bind(this)}/>
                <ContactList items={listItems} />
            </div>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
