import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../constants';
class RegistrationForm extends React.Component {
    state = {
        id: 0,
        Names: '',
        Maker: '',
        Color: '',
        URL:''
    }
    componentDidMount() {
        if (this.props.user) {
            const { id, Names, Maker, Color, URL } = this.props.user
            this.setState({ id, Names, Maker, Color, URL  });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Names: this.state.Names,
                Maker: this.state.Maker,
                Color: this.state.Color,
                URL: this.state.URL
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                Names: this.state.Names,
                Maker: this.state.Maker,
                Color: this.state.Color,
                URL: this.state.URL
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="Names">Names:</Label>
                <Input type="text" name="Names" onChange={this.onChange} value={this.state.Names === '' ? '' : this.state.Names} />
            </FormGroup>
            <FormGroup>
                <Label for="Maker">Maker:</Label>
                <Input type="text" name="Maker" onChange={this.onChange} value={this.state.Maker === null ? '' : this.state.Maker} />
            </FormGroup>
            <FormGroup>
                <Label for="Color">Color:</Label>
                <Input type="text" name="Color" onChange={this.onChange} value={this.state.Color === null ? '' : this.state.Color} />
            </FormGroup>
            <FormGroup>
                <Label for="URL">URL:</Label>
                <Input type="text" name="URL" onChange={this.onChange} value={this.state.URL === null ? '' : this.state.URL} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;