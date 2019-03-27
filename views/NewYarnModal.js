import { Component, createRef } from 'react'
import './NewYarnModal.scss'
import { addNewYarn } from '../controllers/yarnController'

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
        const cover = this.fileInput.current.files[0]
        const user = this.props.isAuthenticated

        addNewYarn(user, title, cover)
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