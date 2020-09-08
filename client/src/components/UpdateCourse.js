import React from 'react';
import Cookies from 'js-cookie';

export default class UpdateCourse extends React.PureComponent{
    
    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        user: {},
        errors: []
      }

    componentDidMount(){
         
        let path = this.props.location.pathname;
        let url = 'http://localhost:5000/api' + path;
        let newURL = url.slice(0,35);
     
        fetch(newURL)

        .then(res => (res.json()))
        .then((data) => {
            this.setState({ 
                id: data.id,
                title: data.title,
                description: data.description,
                estimatedTime: data.estimatedTime,
                materialsNeeded: data.materialsNeeded,
                user: data.User
            })
        })
        .catch(error => {
            console.log('Error fetching and parsing results', error);
        })
    };

    render(){
        
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded
    } = this.state;
        
    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
            <div>
                <form onSubmit={this.submit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..." 
                                    value={title}
                                    onChange={this.change} />
                                    
                            </div>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.change} />
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            className="course--time--input" 
                                            placeholder="Hours" 
                                            value={estimatedTime}
                                            onChange={this.change} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            className="" 
                                            placeholder="List materials..."
                                            value={materialsNeeded} 
                                            onChange={this.change} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <a className="button button-secondary" href='/' onClick={this.cancel}>Cancel</a>
                    </div>
                </form>
            </div>
        </div>

        )
    }

 /**
     *  @param {event} e Event handler.
     */
   
    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;

        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded
        };
        // Fetch decrypted password in order to validate against encrypted
        const password = Cookies.get('userPassword')
        
        context.data.updateCourse(course, context.authenticatedUser.userInfo, password)
        .then((course) => {
            if (course === null) {
                this.setState(() => {
                return { errors: [ 'Update was unsuccessful' ] };
            });
            } else {
                const path = `/courses/${id}`
                this.props.history.push(path);
            }})
        .catch((err) => {
            console.log(err);
            this.props.history.push('/errors');
          })
        
      }

      //let path = `/courses/${this.state.id}`
      //this.props.history.push(path);
     // e.currentTarget.reset();
      



    change =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
            [name]: value
            };
        });
    }

    cancel = ()=> {
        this.props.history.push('/');
    }


}