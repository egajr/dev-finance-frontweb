import React, { useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.minimal.css';
import { saveTransaction } from '../apis';

export interface IValues {
  description: string,
  value: number,
  date: string,
}

const defaultValues: IValues = {
  description: "",
  value: 0.00,
  date: "",
}

let valid = true

function NewTransaction() {
  const [values, setValues] = useState(defaultValues as IValues);

  const history = useHistory();

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const validateFields = (values: any) => {

    if (values.description === "" ||
      values.value === 0 ||
      values.date === "") {
      return valid = false
    } else {
      return valid
    }
  }

  const handleSubmit = (event: any) => {
    validateFields(values)

    if (valid) {
      event.persist();
      saveTransaction(values).then(() => [
        history.goBack()
      ]);
    }
    else {
      toast.error('⚠️ Por favor, preencha todos os campos!');
      valid = true
    }
  }

  

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div id="form">
            <h2>Nova Transação</h2>
            <form action="">
              <div className="input-group">
                <label
                  className="sr-only"
                  htmlFor="description">Descrição</label>
                <TextField className="input"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  defaultValue={values.description}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label
                  className="sr-only"
                  htmlFor="amount">Valor</label>
                <TextField className="input"
                  type="number"
                  id="value"
                  name="value"
                  placeholder="Valor"
                  onChange={handleChange}
                />
                
                <small className="help">Digite o valor sem , ou .(vírgula ou ponto).
                                         Use o sinal - (negativo) para despesas</small>
              </div>
              <div className="input-group">
                <label
                  className="sr-only"
                  htmlFor="date">Data</label>
                <TextField className="input"
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={values.date}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group actions">
                <Link className="button cancel" to={'/'}> Cancelar </Link>
                <Button className="button salvar" onClick={handleSubmit}>Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewTransaction;