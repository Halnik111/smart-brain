import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Background from "./components/background/background";
import Rank from "./components/rank/rank";
import {Component} from "react";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/face-recognition/FaceRecognition";
import CelebrityRecognition from "./components/celebrity-recognition/celebrity-recognition";

const app = new Clarifai.App({
    apiKey: '840e115894c145bfb30bcad9d6babb6c'
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageURL: '',
            box: {},
            celeb: [{
                name: '',
                probability: ''
            }],
        }
    }




    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    recognizeFace = (data) => {
        const celebData = data.outputs[0].data.regions[0].data.concepts;
        this.setState({celeb: celebData});
        const clarifai_face = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifai_face.left_col * width,
            topRow: clarifai_face.top_row * height,
            rightCol: width - (clarifai_face.right_col * width),
            bottomRow: height - (clarifai_face.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }


    onSubmit = () => {
        this.setState({imageURL: this.state.input})
        app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
           .then(response => this.displayFaceBox(this.recognizeFace(response)))
           .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App">
                <Background/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <CelebrityRecognition celebrity={this.state.celeb} />
                <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} celeb={this.state.celeb}/>
            </div>
        );
    }
}

export default App;
