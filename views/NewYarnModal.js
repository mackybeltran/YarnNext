import { Component, createRef } from 'react'
import './NewYarnModal.scss'
import { createNewYarnAction } from '../controllers/yarnController.js'

class NewYarnModal extends Component {
    constructor(props){
        super(props)
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleNewYarnSubmit = this.handleNewYarnSubmit.bind(this);
        this.fileInput = createRef();
        this.state = {
            title: '',
        }       
    }

    handleTitleChange(event){
        this.setState({
            title: event.target.value
        })
    }

    handleNewYarnSubmit(event){
        event.preventDefault();
        const title = this.state.title
        const file = this.fileInput.current.files[0]
        const user = this.props.isAuthenticated

        createNewYarnAction(file, title, user)
        .then(result => {
            location.assign('/myyarns')
        })
    }



    render(){
        return <div className={this.props.newYarnModalOn ? 'NewYarnModal' : 'none'}>
            <div 
            className='_close-btn'
            onClick={() => this.props.newYarnModalChange(false)}>
                x
            </div>
            <div className='_form'>
                <form 
                    className='_form-collection'
                    onSubmit={this.handleNewYarnSubmit}>
                    <input 
                        type='text' 
                        className='_input-title'
                        placeholder='TITLE'
                        value={this.state.title}
                        onChange={this.handleTitleChange}/>

                    <br/>
                    <div className='_file-title'>
                        upload a cover image:
                    </div>
                    
                    <input
                        type='file'
                        className='_input-file'
                        ref={this.fileInput}
                        />
                    <input
                        type='submit'/>
                </form>
            </div>
        </div>
    }
}

export default NewYarnModal