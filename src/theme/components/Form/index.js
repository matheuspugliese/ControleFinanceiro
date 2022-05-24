import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './form.css';

import { useProvider } from '../../../context';
import { useForm } from 'react-hook-form';

import CurrencyInput from 'react-currency-masked-input'
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';

export const translate = {
  type: {
    Entrada: 'Entrada',
    Saida: 'Saida',
  },
};

const schema = Yup.object({
  date: Yup.date().required('Digite a data'),
  motivo: Yup.string().required('Digite o motivo'),
  type: Yup.string().required('Digite um tipo'),
  category: Yup.string().required('Digite uma conta'),
  value: Yup.string().required('Digite um valor'),
});

function Form({ title }) {
  const push = useNavigate();
  const { handleAdd, handleEdit, items } = useProvider();
  const { id } = useParams();
  const isEditing = !!id;

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      isEditing
        ? items.find((value) => value.id === id)
        : undefined,
  });

   
  const onSubmit = ({ date, ...dados }) => {
    const newDate = DateTime.fromJSDate(date).toLocaleString(
      DateTime.DATE_SHORT,
      { locale: 'pt-BR' }
    );

    (isEditing ? handleEdit : handleAdd)({
      ...dados,
      date: newDate,
      id: isEditing ? id : nanoid(5),
    });
    push('/');
  };

  return (
    <div className="form">
      <form className="form-container">
        <p>{title}</p>
        <label className="input-wrap">
          <p>Data</p>
          <input
            className="input"
            type="date"
            maxLength={8}
            name="date"
            {...register('date', { required: true })}
          />
        </label>
        {formState.errors?.date && (
          <span className="error">{formState.errors.date.message}</span>
        )}
        <label className="input-wrap">
          <p>Titulo</p>
          <input
            className="input"
            placeholder="Digite um titulo"
            maxLength={20}
            type="text"
            name="motivo"
            {...register('motivo', { required: true })}
          />
        </label>
        {formState.errors?.motivo && (
          <span className="error">{formState.errors.motivo.message}</span>
        )}
        <label className="input-wrap">
          <p>Tipo</p>
          <select
              className="input"
              placeholder="Selecione o Tipo"
              name="type"
              {...register('type', { required: true })}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saida">Saida</option>
            </select>
        </label>
        {formState.errors?.type && (
          <span className="error">{formState.errors.type.message}</span>
        )}
        <label className="input-wrap">
          <p>Categoria</p>
          <input
            className="input"
            placeholder="Digite uma Categoria"
            maxLength={20}
            type="text"
            name="category"
            {...register('category', { required: true })}
          />
        </label>
        {formState.errors?.account && (
          <span className="error">{formState.errors.category.message}</span>
        )}
        <label className="input-wrap">
          <p>Valor</p>
           <input 
            name="value" 
            required 
            className="input"
            {...register('value', { required: true })}
          />
        </label>
        {formState.errors?.value && (
          <span className="error">{formState.errors.value.message}</span>
        )}
        <button
          type="submit"
          id="btn"
          onClick={handleSubmit(onSubmit)}
          value="Submit"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Form;
