import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Background from "./components/background/background";

function App() {

  return (
    <div className="App">
        <Background />
        <Navigation />
        <Logo />
        <ImageLinkForm />
    </div>
  );
}

export default App;
