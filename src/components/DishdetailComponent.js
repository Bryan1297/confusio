import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish(dish) {
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


    renderComments(comments) {
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
                </div>

            );
        }
        else
            return(
                <div></div>
            );


    }
    

    
    render() {

        const dish = this.props.dish

        if (dish != null)        
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1" >
                    
                        {this.renderDish(dish)}

                    </div>                  
                    
                    {this.renderComments(dish.comments)}                   

                </div>
            );

        else
            return(
                <div></div>
            );
    }


    
}

export default Dishdetail;