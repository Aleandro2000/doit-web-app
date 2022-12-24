export default function Footer(props)
{
    return(
        <center style={{marginTop: props.top}}>
            <div className="footer" data-aos={props.aos}>
                <p>
                    <b>
                        © Powered by <i><u>Aleandro2000 from GitHub</u></i>, All right reserved.
                    </b>
                </p>
                <p>
                    <a href={process.env.REACT_APP_DOIT_FACEBOOK}>
                        <i className="fa fa-facebook social-media" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
                    </a>
                    <a href={process.env.REACT_APP_DOIT_INSTAGRAM}>
                        <i className="fa fa-instagram social-media"/>
                    </a>
                    <a href={process.env.REACT_APP_DOIT_YOUTUBE}>
                        <i className="fa fa-youtube social-media"/>
                    </a>
                    <a href={process.env.REACT_APP_DOIT_LINKEDIN}>
                        <i className="fa fa-linkedin social-media"/>
                    </a>
                </p>
                <br/>
            </div>
        </center>
    );
}