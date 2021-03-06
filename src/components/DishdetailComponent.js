import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


// assigment 3


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false
        };

        
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <div>

                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit  Comment </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={{size: 12}}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Col>
                        </Row>
                         
                        <Row className="form-group">
                            <Label htmlFor="yourname" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                    placeholder="Your name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>


                        </LocalForm>                    
                    </ModalBody>
                </Modal>
 

            </div>


        );

    }

}


function RenderDish({dish}) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}


function RenderComments({comments}) {
    if (comments != null) {

        const comm = comments.map((comment) => {
            return (
                <li  key = {comment.id}>

                    <p>{comment.comment}</p>
                    <p>-- {comment.author} ,                        
                    {new Intl.DateTimeFormat('en-US', {year:'numeric', month: 'long', day: '2-digit'}).format(new Date(comment.date))}
                    </p>                        
                    
                </li>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1" >
                <h4 >Comments</h4>
                <ul className='list-unstyled'>
                    {comm}


                </ul>
                <CommentForm>


                </CommentForm>
            </div>

        );
    }
    else
        return(
            <div></div>
        );


}
    

    
const  DishDetail = (props) => {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            
            <RenderComments comments={props.comments} />

        </div>
        </div>
    );
}


    


export default DishDetail;