import LandingPage from '../components/LandingPage';
var React = require("react");

class LatexModel extends React.Component {
    state = {
        currentStep: 0
    };
    fetchResult = () => {
        this.setState({
            currentStep: 3,
        });
        console.log('Requesting from API');
        var formData = new FormData();
        formData.append('image', this.state.img_file);
        // fetch('http://127.0.0.1:5000/predict', {
        fetch('https://latexapiconnect.herokuapp.com/predict', {
            method: 'POST',
            body: formData
        }).then(
            resp => {
                console.log(resp)
                resp.json().then(data => {
                    this.setState({
                        currentStep: 1,
                        response: data
                    });
                    console.log(data['equation'])
                    console.log('done')
                });
            }
        );
    };
    handleInput = (event) => {
        if (event.target.files[0]) {
        this.setState({
            img_file: event.target.files[0],
            img_obj: URL.createObjectURL(event.target.files[0]),
            currentStep: 2
        })}
    };



    render() {
        return (
            <LandingPage handleInput={this.handleInput} fetchResult={this.fetchResult} img={this.state.img_obj} currentStep={this.state.currentStep}
                response={this.state.response} />
        );
    }
}

export default LatexModel;


