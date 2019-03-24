import { Component } from 'react';
import Meta from '../components/Meta.js'
import Home from '../components/Home.js'
import { loadFirebase } from '../.env/firebase.js'

class Index extends Component {

    componentWillMount(){
        loadFirebase()
    }

    render(){

        return <div>
                <Meta/>
                <Home/>
            </div>
    }
}

export default Index