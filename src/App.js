import React, { useEffect, useState } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { listBusinesses } from './graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBusiness as createBusinessMutation,
  deleteBusiness as deleteBusinessMutation,
  updateBusiness as updateBusinessMutation
} from './graphql/mutations';
import { createMultiposts as createMultipostsMutation
} from './graphql/mutations';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("fileStorage", []);

const initialFormState = { name: '', about: '' }

const App = () => {
  const [hideLightbox, setHideLightbox] = useState(true);
  const [hideLightbox1, setHideLightbox1] = useState(true);
  const [business, setBusiness] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [fileStorage, setfileStorage] = store.useState("fileStorage")
  let [state, setState] = useState(null);

  useEffect(() => {
    fetchBusiness();
    fetchFile();
  }, []);

  async function fetchBusiness() {
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    await Promise.all(BusinessFromAPI.map(async business => {
      if (business.image) {
        Storage.configure({ level: 'private' })
        const image = await Storage.get('Profile/Pic_Profile');
        business.image = image;
      }
      //console.log(business.image);
      return business;
    }))
    setBusiness(apiData.data.listBusinesses.items);
  }

  async function fetchFile() {
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    await Promise.all(BusinessFromAPI.map(async business => {

      Storage.configure({ level: 'private' })
      const files = await Storage.list('Files/')
      const urls = []
      for (const file of files) {
        const value = { key: file.key, value: await Storage.get(file.key) }
        // const value = await Storage.get(file.key) 
        urls.push(value)
      }

      //.then(({ results }) => console.log(results))
      //.catch((err) => console.log(err));
      // console.log(urls);
      setfileStorage(urls);


    }))
  }

  const AllFiles = (props) => {

    function isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    const Files = props.files;

    /*
        console.log(Files['length'])
        for (let i = 0; i < Files['length']; i++) {
          { console.log(Files[i]) }
        }*/

    const listItems = Files.map((file) =>
      <>
        {
          (isImage(file.key)) === true &&
          <Col md={3}>
            <img src={file.value ? file.value : ""} style={{ width: 75 }} />
          </Col>
        }
      </>
    );

    return (
      <Row>
        {listItems}
      </Row>
    );

  }

  async function createBusiness() {
    if (!formData.name || !formData.about) return;
    await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBusiness([...business, formData]);
    setFormData(initialFormState);
    window.location.reload();
  }


  async function updateBusiness() {
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    const id_businesses = BusinessFromAPI[0]['id']
    await Promise.all(BusinessFromAPI.map(async business => {
      return business;
    }))
    if (!formData.name || !formData.about) return;
    const updateBusiness = {
      id: id_businesses,
      name: formData.name,
      about: formData.about
    }

    await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
    setBusiness([...business, formData]);
    setFormData(initialFormState);
    window.location.reload();
  }

  async function deleteBusiness({ id }) {
    const newBusinessArray = business.filter(business => business.id !== id);
    setBusiness(newBusinessArray);
    await API.graphql({ query: deleteBusinessMutation, variables: { input: { id } } });
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    Storage.configure({ level: 'private' })
    await Storage.put("Profile/Pic_Profile", file,
      {
        contentType: "image/png"
      });
    fetchBusiness();
  }

  return (
    <div className="App">
      <Container>
        {business.map(business => (business.id)) == '' ?
          <Row>
            <Col md={4} />
            <Col md={4}>
              <h1>Business List</h1>
              <Form.Control type='text'
                onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                placeholder="Business name"
                value={formData.name}
              />
              <br />
              <Form.Control type='text'
                onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                placeholder="about"
                value={formData.about}
              />
              <br />
              <Form.Control
                type="file"
                onChange={onChange}
              />
              <br />
              <Button onClick={createBusiness}>Save Data</Button>
            </Col>
            <Col md={4} />
          </Row>
          :
          business.map(business => (
            <>
              <Row>
                <Col md={3} />
                <Col md={6} key={business.id || business.name}>
                  <h2>{business.name}</h2>
                  {
                    business.image && <img src={business.image} style={{ width: 400 }} />
                  }
                  <p>{business.about}</p>
                </Col>
                <Col md={3} />
              </Row>

              <Row>
                { }
                <AllFiles files={fileStorage} />
              </Row>
              <br />
              <Row>
                <Col md={4} />
                <Col md={3}>
                  <Button onClick={() => deleteBusiness(business)}>Delete Info</Button>
                </Col>
                <Col md={3}>
                  <Button onClick={() => setHideLightbox(false)}>Edit</Button>
                </Col>
                <Col md={2} />
              </Row>
              <br />
              <Row className={`${hideLightbox ? "hide-lightbox" : "ligthbox"}`}>
                <Col md={4} />
                <Col md={4}>
                  <h3>Edit Business</h3>
                  <Form.Control type='text'
                    onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                    placeholder={"Bus. Name: " + business.name}
                    value={formData.name}
                  />
                  <br />
                  <Form.Control type='text'
                    onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                    placeholder={"About: " + business.about}
                    value={formData.about}
                  />
                  <br />
                </Col>
                <Col md={4} />
                <Col md={4} />
                <Col md={2}>
                  <Button onClick={updateBusiness}>Update</Button>
                </Col>
                <Col md={2}>
                  <Button onClick={() => setHideLightbox(true)}>Close</Button>
                </Col>
                <Col md={4} />
              </Row>
            </>
          ))
        }
      </Container>
      <br />
      <AmplifySignOut />
    </div>

  );
}

export default withAuthenticator(App);