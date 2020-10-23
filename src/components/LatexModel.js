import LandingPage from '../components/LandingPage';
var React = require("react");

class LatexModel extends React.Component {
    state = {
        currentStep: 0
    };
    fetchResult = () => {
        console.log('Requesting from API');
        var formData = new FormData();
        formData.append('image', this.state.img_file);
        fetch('https://latex-converter.com/predict', {
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
                });
            }
        );
    };
    handleChange = (event) => {
        this.setState({
            img_file: event.target.files[0],
            img_obj: URL.createObjectURL(event.target.files[0]),
            currentStep: 3
        }, () => {
            this.fetchResult()
        })
    };

    render() {
        return (
            <LandingPage handleChange={this.handleChange} fetchResult={this.fetchResult} img={this.state.img_obj} currentStep={this.state.currentStep}
                response={this.state.response} />
        );
    }
}

export default LatexModel;


