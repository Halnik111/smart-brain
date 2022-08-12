import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Background from "./components/background/background";
import Rank from "./components/rank/rank";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }


    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onSubmit = () => {
        console.log('click');
        console.log(this.state.input);
    }

    render() {
        return (
            <div className="App">
                <Background/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default App;
