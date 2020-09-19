import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, Badge } from 'react-bootstrap'
import moment from 'moment'

import api from '../../../services/api'
import './index.css'

interface ITask {
  id: number,
  title: string,
  description: string,
  finished: boolean,
  created_at: Date,
  updated_at: Date
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();
  const [task, setTask] = useState<ITask>()

  useEffect(() => {
    findTask(id)
  }, [id])

  function formateDate(data: Date | undefined) {
    return moment(data).format("DD/MM/YYYY")
  }

  function back() {
    history.goBack()
  }

  async function findTask(id: number) {
    await api.get<ITask>(`/tasks/${id}`)
      .then((resp) => {
        setTask(resp.data)
      })
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Detail</h1>
        <Button onClick={back} variant="dark" size="sm">Voltar</Button>
      </div>
      <br />

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br />

            <Badge variant={task?.finished ? "success" : "warning"}>
              {task?.finished ? "Finalizado" : "Pendente"}
            </Badge>
            <br />

            <strong>Data de Cadastro: </strong>
            <Badge variant="info">
              { formateDate(task?.created_at) }
            </Badge>

            <br />
            <strong>Data de Atualização: </strong>
            <Badge variant="info">
              { formateDate(task?.updated_at) }
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Detail;