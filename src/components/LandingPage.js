import '../styles/LandingPage.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from './Tooltip';
import goodImg from '../images/goodImg.jpg';
import badImg from '../images/badImg.jpg';




var React = require("react");

class LandingPage extends React.Component {

    helpTextStyle = {
        backgroundColor: '#FFFFFF',
        position: "fixed",
        top: "10%",
        left: "10%",
        right:"10%",
        borderRadius: "20px 0px 0px 20px",
        margin: "10px",
        height: "70%",
        overflowY: "scroll"
    }

    get useHelp() {
        return (
            <Tooltip
                floatRight={true}
                displayElement={
                    <div style={this.helpTextStyle}>
                        <div style={{margin:"15px"}}>
                        <h4 style={{textAlign:"center"}}>Latex Converter</h4>
                        <p style={{textAlign:"center"}}>
                            As mentioned in the above description, this tool can be used to convert images of formulas to latex form.
                        </p>
                        <h4 style={{textAlign:"center"}}>Image Requirement</h4>
                        <p style={{textAlign:"center"}}>
                            The image needs to be on a white background, with symbols and numbers clear and noticable. Moreover,
                            the tool can only accept one line of formulas as a time.
                        </p>
                        <h4 style={{textAlign:"center"}}>Good image example:</h4>
                        <img src= {goodImg} className="media-object"
                            alt={"Good Image"} height = {'auto'} width = {window.innerWidth*0.8}
                            draggable= 'false'/>
                        <h4 style={{textAlign:"center"}}>Bad image example:</h4>
                        <img src= {badImg} className="media-object"
                            alt={"Bad Image"} height = {'auto'} width = {window.innerWidth*0.8}
                            draggable= 'false'/>
                        </div>
                    </div>
                }/>
        )
    }

    copyClipboard = () => {
        var textArea = document.createElement("textarea");
      
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
      
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
      
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;
      
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
      
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';
      
      
        textArea.value = this.props.response['equation'];
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copying text command was ' + msg);
        } catch (err) {
          console.log('Unable to copy');
        }
      
        document.body.removeChild(textArea);
      }

    render() {
        let main = 0, output = 1, confirmation = 2, detection = 3;
        let image, results, warning;
        if (this.props.img) {
            image = <div> <div className="row center-div message">Your Image:</div> <div className="row"><div className="col-12 center-div"><img src={this.props.img} className="center-div image-preview" /></div></div></div>
        } else {
            image = <div className="row"></div>
        }
        if (this.props.currentStep == detection) {
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
        } else if (this.props.currentStep == output) {
            if ('warning' in this.props.response && this.props.response['warning']) {
                warning = 'WARNING: LOW ACCURACY OUTPUT EXPECTED';
            }
            results = 
            <div>
            <div className="cont">
            <Grid container  >
                <Grid item sm>
                <Paper style = {{padding:20, marginTop:10, marginBottom:10, textAlign: 'center', border:'2px solid #4e6096'}}>
                Output: <br/>
                <br/>
                {warning}
                <br/>
                <br/>
                {this.props.response['equation']}

                </Paper>
                </Grid>
            </Grid>
            </div>
            <div className="col-12 center-div">
                <div className="choose-file">
                    <input type="file" name="file" id="file" class="myButton" onChange={this.props.handleInput} />
                    <label for="file">Choose a file</label>
                </div>
                <div className="choose-file">
                <button onClick={this.copyClipboard}  class = "convertButton"> Copy to Clipboard </button>
                </div>
            </div>
            </div>
        } else if (this.props.currentStep == confirmation) {
            results = 
            <div className="col-12 center-div">
                <div className="choose-file">
                    <input type="file" name="file" id="file" class="myButton" onChange={this.props.handleInput} />
                    <label htmlFor="file">Choose a file</label>
                </div>
            <div className="choose-file">
                <button onClick={this.props.fetchResult}  class = "convertButton"> Convert </button>
            </div>
            </div>
        } else if (this.props.currentStep == main) {
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
                {this.useHelp}
                {image}
                {results}
            </div>
        );
    }
}

export default LandingPage;
