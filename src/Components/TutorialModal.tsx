import React from "react"
import Modal from "react-bootstrap/Modal"

interface ModalProps {
    show: boolean,
    handleClose: Function,
}

export default function TutorialModal({show, handleClose}: ModalProps) {
    return (
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Tutorial</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>What is this?</h4>
                <p>This is a polynomial regression model which estimates a polynomial function
                    that is the closest to the points provided by the user.
                </p>
                <hr />
                <h4>How does it work?</h4>
                <p>..its complicated</p>
                <hr />
                <h4>Guide</h4>
                <p>First, input some points in the <text className="text-info-emphasis">Data</text> section (or
                press the 🎲 to get a random one).</p>
                <p>After inputting some points, move to the <text className="text-info-emphasis">Regression</text> section.
                There, you can configurate the machine learning's properties.</p>
                <ul>
                <li>The <text className="text-info-emphasis">iterations</text> field is how many times the 
                model will try to improve the estimate.</li>
                <li>The <text className="text-info-emphasis">learning rate</text> field is how aggressive
                the refinement is.</li>
                <li>The <text className="text-info-emphasis">amount of terms</text> field is how many
                terms your polynomial function will have.</li>
                </ul>
                <p>After filling in all the values, press either <text className="text-info-emphasis">Run (adaptive) </text>
                or <text className="text-info-emphasis">Run (unadaptive)</text>. The adaptive option will adjust the 
                <text className="text-info-emphasis"> learning rate</text> throughout the training, so it is
                faster, more accurate and safer. <i>(the unadaptive training may give numbers that are too high which will cause an error.)</i></p>
                <hr />
                <p className="text-muted">Made by Omer Smorodinsky. <a href="https://github.com/omer-sm/polynomial-reg-ui" target="_blank" rel="noreferrer">GitHub</a></p>
            </Modal.Body>
        </Modal>
    )
}