import LandingPage from '../components/LandingPage';
var React = require("react");

class LatexModel extends React.Component {
    state = {
        // Current process of the page
        currentStep: 0
    };

    // Function to create a fetch call to the API with the uploaded image
    // Returns the result of the model
    fetchResult = () => {
        // Change state of the web display
        this.setState({
            currentStep: 3,
        });
        console.log('Requesting from API');

        // Makes data object to send to API with image
        var formData = new FormData();
        formData.append('image', this.state.img_file);
        // fetch('http://127.0.0.1:5000/predict', {
        fetch('https://latexapiconnect.herokuapp.com/predict', {
            method: 'POST',
            body: formData
        }).then(
            // Processes output image of API
            resp => {
                console.log(resp)
                // If it is a valid response, unpack
                if (resp.ok) {
                resp.json().then(data => {
                    this.setState({
                        currentStep: 1,
                        response: data
                    });
                    console.log(data['equation'])
                    console.log('done')
                });}
                // If not a valid response, save the error
                else {
                    let text = resp['status'] + ' ' + resp['statusText']
                    this.setState({
                        currentStep:1,
                        response: {'equation':text}
                    });
                }
            }
        );
    };

    // Handles uploaded images and saves as state
    handleInput = (event) => {
        if (event.target.files[0]) {
        this.setState({
            img_file: event.target.files[0],
            img_obj: URL.createObjectURL(event.target.files[0]),
            currentStep: 2
        })}
    };


    // Renders the LandingPage component, responsible for display
    render() {
        return (
            <LandingPage handleInput={this.handleInput} fetchResult={this.fetchResult} img={this.state.img_obj} currentStep={this.state.currentStep}
                response={this.state.response} />
        );
    }
}

export default LatexModel;


