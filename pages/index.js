import Meta from '../views/Meta.js'
import Home from '../views/Home.js'
import App from '../views/App.js'
import Footer from '../views/Footer.js'

const Index = (props) => {


    return <App>{(appState) => {
        return <div>
            <Meta/>

            <Home appState={appState}/>
            <Footer/>
        </div>
    }}</App>
            

}

export default Index

