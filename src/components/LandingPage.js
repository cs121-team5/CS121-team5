import '../styles/LandingPage.css'
import ResultPage from '../components/LatexOutput';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



var React = require("react");


class LandingPage extends React.Component {
    render() {
        let image, results;
        if (this.props.img) {
            image = <div className="row"><div className="col-12 center-div"><img src={this.props.img} className="center-div image-preview" /></div></div>
        } else {
            image = <div className="row"></div>
        }
        if (this.props.currentStep == 3) {
            console.log('working')
            results =
                <div className="row spinner">
                    <div className="col-12 center-div">
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Detecting flower
                        </button>
                    </div>
                </div>
        } else if (this.props.currentStep == 1) {
            results = <div>{this.props.response}</div>
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
                        This simple converter converts an image of handwritten mathematical equations to latex form:
                        Permitted symbols include +, -, =, {">"}, {"<"} and numbers.
                        Upload your image below:
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 center-div choose-file">
                        <input type="file" name="file" id="file" class="myButton" onChange={this.props.handleChange} />
                        <label for="file">Choose a file</label>
                    </div>
                    
                    {/* <div className="col-12 center-div choose-file">
                        <input type="file" name="file" id="file" class="choose" onChange={this.props.handleChange} />
                        <label for="file">Choose a file</label>
                    </div> */}
                </div>
                {image}
                <div className="cont">
                    <Grid container  >
                    <Grid item sm>
                    <Paper style = {{padding:20, marginTop:10, marginBottom:10, textAlign: 'center'}}>
                        Output
                    </Paper>
                    </Grid>
                    </Grid>
                </div>
                {results}
            </div>
        );
    }
}

export default LandingPage;
