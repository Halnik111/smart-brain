import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Background from "./components/background/background";
import Rank from "./components/rank/rank";
import {Component} from "react";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/face-recognition/FaceRecognition";

const app = new Clarifai.App({
    apiKey: '840e115894c145bfb30bcad9d6babb6c'
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageURL: '',
        }
    }


    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onSubmit = () => {
        this.setState({imageURL: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function (response) {
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function (err) {

            }
        )
    }

    render() {
        return (
            <div className="App">
                <Background/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition imageURL={this.state.imageURL}/>
            </div>
        );
    }
}

export default App;
