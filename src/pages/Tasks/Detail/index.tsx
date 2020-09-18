import React from 'react';
import { Button } from 'react-bootstrap'

const Detail: React.FC = () => {
  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Detail</h1>
        <Button variant="dark" size="sm">Voltar</Button>
      </div>
      <br />
    </div>
  )
}

export default Detail;