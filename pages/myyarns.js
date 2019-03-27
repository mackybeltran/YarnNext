import Meta from '../views/Meta.js'
import App from '../views/App.js'
import Footer from '../views/Footer.js'
import Yarnlist from '../views/Yarnlist.js'

const Myyarns = (props) => {


    return <App>{(appState) => {
        return <div>
            <Meta/>

            <Yarnlist appState={appState}/>
            <Footer/>
        </div>
    }}</App>
            

}

export default Myyarns
