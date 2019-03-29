import Meta from '../views/Meta.js'
import App from '../views/App.js'
import Footer from '../views/Footer.js'
import { withRouter } from 'next/router'
import EditYarn from '../views/EditYarn.js'

const Edit = withRouter(props => (


    <App>{(appState) => {
        return <div>
            <Meta/>
            <EditYarn appState={appState}/>        
            <Footer/>
        </div>
    }}</App>
            

))

export default Edit
