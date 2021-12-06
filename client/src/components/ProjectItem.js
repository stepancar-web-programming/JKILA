/* eslint-disable */
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ISSUES } from '../utils/consts';
import {observer} from "mobx-react-lite";

const ProjectItem = observer(({project}) => {
  const history = useHistory();
  return (
    <Row style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '100%', cursor: 'pointer' }} className="mt-3 align-items-center" onClick={() => history.push(ISSUES)}>
        <Card.Body>
          <Card.Title>
            {project.proj_name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Row>
  );
});

export default ProjectItem;