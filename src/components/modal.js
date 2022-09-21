import "../css/modal.css";

export default function Modal({close}){
    return(
        <div className="main-container">
            <div className="modal-container">
                <button className="button-close" onClick={()=>close()}>X</button>
                <div className="text-container">
                    <h1>Haven't Sign up?</h1>
                    <p>Let's get you started!</p>
                    <a href="/user/register" className="button">Sign-Up</a>
                    <p>Already have an account?</p>
                    <a href="/user/login" className="button">Log-In</a>
                </div>
                <div className="image-container"/>
            </div>
        </div>
    )
}