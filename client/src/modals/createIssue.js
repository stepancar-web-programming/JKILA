/* eslint-disable */
import React, {useContext, useState} from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { createIssue, fetchIssues } from '../http/issueApi';
import {Context} from "../index";

const CreateIssue = observer(({ show, onHide }) => {
  const { project, user } = useContext(Context);
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [desc, setDesc] = useState('');
  const [reporter, setReporter] = useState(user.user.id);
  const { id } = useParams();

  const addIssue = () => {
    console.log(summary, priority, status);
    createIssue(summary, id, priority, status, desc, reporter).then((data) => {
      setSummary('');
      setPriority('');
      setDesc('');
      setReporter(user.user.id);
      fetchIssues(id).then((data) => project.setIssues(data));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Short summary">
              <Form.Control value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc}
                            onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel controlId="floatingSelect1" label="Priority">
            <Form.Select className="mt-2 mb-3" onChange={(e) => setPriority(e.target.value)} defaultValue="Medium">
              <option> Highest </option>
              <option> High </option>
              <option> Medium </option>
              <option> Low </option>
              <option> Lowest </option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect2" label="Reporter">
            <Form.Select className="mt-2 mb-3" onChange={(e) => {setReporter(e.target.value);
                                                        console.log(reporter)}}>
              {project.users
                .map((user) => <option hidden={user.id === reporter} key={user.id} value={user.id}>{user.username}</option>)}
            </Form.Select>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addIssue}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateIssue;
