import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'

export default function Error() {

    return (
        <>
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardGroup>
                    <Card border="primary" style={{ width: '80%' }}>
                        <Card.Img variant="top" src="images/404.png" width="100px" height="600px" />
                    </Card>
                    <Card bg="light" border="primary" style={{ width: '18rem' }}>
                        <Card.Header><h2>401 Error | Page not found</h2></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Sorry, but nothing matched your search terms. Please try again with some different keywords.
                            </Card.Text>
                            <a href="home"><Button variant="primary">Go To Home</Button></a>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
            

        </>
    )
}