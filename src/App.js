import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Background from "./components/background/background";
import Rank from "./components/rank/rank";
import {Component} from "react";
import FaceRecognition from "./components/face-recognition/FaceRecognition";
import CelebrityRecognition from "./components/celebrity-recognition/celebrity-recognition";
import SignIn from "./components/singIn/SignIn";
import Register from "./components/register/Register";



const initialState = {
    input: '',
        imageURL: '',
    box: {},
    celeb: [{
        name: '',
        probability: ''
    }],
        route: 'signIn',
    isSignedIn: false,
    user: {
    id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }


    loadUser = (user) => {
        this.setState({user: user})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    //TODO recognize all faces on image

    //TODO display face details under the face frame

    //TODO make it possible to edit/delete profile

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
        fetch("https://halnik-face-recognition.herokuapp.com/imageUrl", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res) {
                fetch("https://halnik-face-recognition.herokuapp.com/image", {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id,
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count[0].entries}))
                    })
                    .catch(console.log);
            }
            this.displayFaceBox(this.recognizeFace(res))
        })
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signOut')
            this.setState(initialState)
        else if (route === 'home')
            this.setState({isSignedIn: true})

        this.setState({route: route});
    }

    render() {
        let {imageURL, isSignedIn, route, box, celeb} = this.state;
        return (
            <div className="App">
                <Background/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                <Logo/>
                { route === 'home'
                    ? <div>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                        <CelebrityRecognition celebrity={celeb} />
                        <FaceRecognition box={box} imageURL={imageURL} celeb={celeb}/>
                    </div>
                    : (
                        this.state.route === 'register'
                            ?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                            : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }
}

export default App;
