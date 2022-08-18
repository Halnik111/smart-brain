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
import SignIn from "./components/singIn/SignIn";
import Register from "./components/register/Register";

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
            route: 'signIn',
            isSignedIn: false
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

    onRouteChange = (route) => {
        if(route === 'signOut')
            this.setState({isSignedIn: false})
        else if (route === 'home')
            this.setState({isSignedIn: true})

        this.setState({route: route});
    }

    render() {
        let {imageUrl, isSignedIn, route, box, celeb} = this.state;
        return (
            <div className="App">
                <Background/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                        <CelebrityRecognition celebrity={celeb} />
                        <FaceRecognition box={box} imageURL={imageUrl} celeb={celeb}/>
                    </div>
                    : (
                        this.state.route === 'register'
                            ?<Register onRouteChange={this.onRouteChange} />
                            : <SignIn onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }
}

export default App;
