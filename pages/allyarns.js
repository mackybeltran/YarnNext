import Meta from '../views/Meta.js'
import App from '../views/App.js'
import Footer from '../views/Footer.js'
import Yarnlist from '../views/Yarnlist.js'

const Allyarns = (props) => {


    return <App>{(appState) => {
        return <div>
            <Meta/>

            <Yarnlist 
                appState={appState}
                allYarns={true}/>
            <Footer/>
        </div>
    }}</App>
            

}

export default Allyarns
