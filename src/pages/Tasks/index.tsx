import React, { useState, useEffect } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import api from '../../services/api'
import './index.css'

interface ITask {
  id: number,
  title: string,
  description: string,
  finished: boolean,
  created_at: Date,
  updated_at: Date
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const history = useHistory()

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    await api.get('/tasks')
      .then((resp) => {
        setTasks(resp.data)
      })
  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`)
      .then((resp) => {
        if(resp.status === 200)
          loadTasks()
      })
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`)
      .then((resp) => {
        if(resp.status === 200)
          loadTasks()
      })
  }

  function formateDate(data: Date) {
    return moment(data).format("DD/MM/YYYY")
  }

  function newTask() {
    history.push('/tarefas_cadastro')
  }

  function editTask(id: number) {
    history.push(`/tarefas_cadastro/${id}`)
  }

  function viewTask(id: number) {
    history.push(`/tarefas/${id}`)
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks page</h1>
        <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
      </div>
      <br />

      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => (
              <tr key={task.id}>
                <td>{ task.id }</td>
                <td>{ task.title }</td>
                <td>{ formateDate(task.updated_at) }</td>
                <td>
                  <Badge variant={ task.finished ? "success": "warning" }>
                    { task.finished ? "Finalizado": "Pendente" }
                  </Badge>
                </td>
                <td>
                  <Button size="sm" disabled={task.finished} onClick={() => editTask(task.id)}>Editar</Button>{' '}
                  <Button size="sm" disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>Finalizar</Button>{' '}
                  <Button size="sm" variant="info" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Excluir</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Task;
