import React from "react";
import Navbar from '../Navbar'
import Container from '../Container'
import Row from '../Row'
import Jumbotron from '../Jumbotron';
import Col from '../Col'

function NoMatch() {
  return (
<div>
            <Navbar />
                <Jumbotron>

                <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            
                        </Col>
                    </Row>

                </Container>
            </div>

  );
}

export default NoMatch;