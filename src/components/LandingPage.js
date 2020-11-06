import '../styles/LandingPage.css'
import ResultPage from '../components/LatexOutput';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



var React = require("react");


class LandingPage extends React.Component {
    render() {
        let image, results;
        if (this.props.img) {
            image = <div> <div className="row center-div message">Your Image:</div> <div className="row"><div className="col-12 center-div"><img src={this.props.img} className="center-div image-preview" /></div></div></div>
        } else {
            image = <div className="row"></div>
        }
        if (this.props.currentStep == 3) {
            console.log('working')
            results =
                <div className="row spinner">
                    <div className="col-12 center-div">
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Detecting formula
                        </button>
                    </div>
                </div>
        } else if (this.props.currentStep == 1) {
            results = 
            <div className="cont">
            <Grid container  >
                <Grid item sm>
                <Paper style = {{padding:20, marginTop:10, marginBottom:10, textAlign: 'center'}}>
                Output: <br/>
                <br/>
                {this.props.response['equation']}
                </Paper>
                </Grid>
            </Grid>
            </div>
        } else if (this.props.currentStep == 2) {
            results = 
            <div className="col-12 center-div">
                <div className="choose-file">
                    <input type="file" name="file" id="file" class="myButton" onChange={this.props.handleInput} />
                    <label for="file">Choose a file</label>
                </div>
            <div className="choose-file">
                <button onClick={this.props.fetchResult}  class = "convertButton"> Convert </button>
            </div>
            </div>
        } else if (this.props.currentStep == 0) {
            results =   
            <div className="col-12 center-div">
                <div className="choose-file">
                    <input type="file" name="file" id="file" className="myButton" onChange={this.props.handleInput} />
                    <label htmlFor="file">Choose a file</label>
                </div>
            </div>
        } else {
            results = <div></div>
            }
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col-12 header">
                        Handwriting to Latex Converter
                    </h1>
                </div>
                <div className="row">
                    <div className="col-12 message">
                        This simple converter converts an image of handwritten mathematical equations to latex form: <br/>
                        Permitted symbols include +, -, =, {">"}, {"<"}, and numbers. Make sure your image is well cropped,
                        and the text is on a plain white background (no lined paper). <br/>
                        If you would like to make your image digitally, check out <a href="https://jspaint.app/" target="_blank">this link </a> <br/>
                        <br/>
                        Upload your image below:
                    </div>
                </div>
                {image}
                {results}
            </div>
        );
    }
}

export default LandingPage;
