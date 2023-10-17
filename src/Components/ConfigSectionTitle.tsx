import React from "react"
import Row from "react-bootstrap/Row"



interface IConfigSectionTitleProps {
    title: string
}

export default function ConfigSectionTitle({title}: IConfigSectionTitleProps) {
    return (
        <Row>
            <h3>{title}</h3>
            <hr style={{borderWidth: "0.2rem", width: "90%", margin: "0 5%"}}/>
        </Row>
    )
}