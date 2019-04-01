import Meta from '../views/Meta.js';
import App from '../views/App.js';
import Footer from '../views/Footer.js';
import { withRouter } from 'next/router';
import EditYarn from '../views/EditYarn.js';
import { compareUserIdFromYarnToAuthId } from '../controllers/yarnController.js'
import { readUserIdFromYarn } from '../models/yarnModel.js'
import { Component } from 'react';

class Edit extends Component {
//Todo: need to make loading and not authorized components.
    render(){
        return <App router={this.props.router.query.id}>{(appState) => {                 
            let edit      
            switch (appState.isValidUser){
                case null:
                    edit = <div>
                        loading
                    </div>
                break
                case true:             
                    edit = <EditYarn appState={appState}/>
                break
                case false:
                    edit = <div>
                        NOT AUTHORIZED
                </div>
                break
                default:
                    edit = <div>
                        loading
                    </div> 
            }
            return <div>
                <Meta/>
                {edit}
                <Footer/>
            </div>
        }}</App>
    }
}



export default withRouter(Edit)
