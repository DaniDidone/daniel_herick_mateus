import Layout from '../components/layout'
import { Jumbotron } from 'react-bootstrap'

function Dns() {
    return(
        <Layout>
            <h2 className="mb-2">DNS</h2>
            <p>Manage your Domain Name System (DNS) settings</p>

            <Jumbotron className="bg-dark border py-5">
                <h3 className="mb-2">DNS Records</h3>
                <p>A, AAAA, and CNAME records can have their traffic routed through the Cloudflare system. Add more records using this form, and click the cloud next to each record to toggle Cloudflare on or off.</p>
            </Jumbotron>
        </Layout>
    );
}

export default Dns;