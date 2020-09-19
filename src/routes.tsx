import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TasksForm from './pages/Tasks/Form'
import TaskDetail from './pages/Tasks/Detail'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/tarefas' component={Tasks} />
      <Route exact path='/tarefas_cadastro' component={TasksForm} />
      <Route exact path='/tarefas_cadastro/:id' component={TasksForm} />
      <Route exact path='/tarefas/:id' component={TaskDetail} />
    </Switch>
  )
}

export default Routes;