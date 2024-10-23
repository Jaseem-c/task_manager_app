import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import Tasks from './Tasks'
import Header from './Header'

function Home() {
    return (
        <>
            {/* header */}
            <Header/>
            {/* tasks */}
            <Tasks />
        </>
    )
}

export default Home