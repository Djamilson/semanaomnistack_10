import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';

import {InputBlock } from './styles';

import { Form, Input } from '@rocketseat/unform';
const schema = Yup.object().shape({
  github_username: Yup.string().required('O nome do dev é obrigatório'),
  techs: Yup.string().required('A tecnologia é obrigatório'),
  latitude: Yup.string().required('A latitude é obrigatório'),
  longitude: Yup.string().required('A longitude é obrigatório'),
});

export default function DevForm({ onSubmit }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      { timeout: 30000 }
    );
  }, []);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function handleSubmit(data, { resetForm }) {
    await onSubmit(data, resetForm);
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <hr />
      <h2> Dados do Dev </h2>
      <InputBlock>
        <label>Nome do GitHub</label>
        <Input name="github_username" placeholder="Nome do GitHub" />
      </InputBlock>
      <InputBlock>
        <label>Tecnologias</label>
        <Input name="techs" placeholder="Tecnologias" />
      </InputBlock>
      <hr />

      <h2> Localização </h2>
      <InputBlock>
        <label>Latitude</label>
        <Input
          name="latitude"
          placeholder="Latitude"
          onChange={e => setLatitude(e.target.value)}
        />
      </InputBlock>
      <InputBlock>
        <label>Longitude</label>
        <Input
          name="longitude"
          placeholder="Longitude"
          onChange={e => setLongitude(e.target.value)}
        />
      </InputBlock>
      <button type="submit">Salvar</button>
    </Form>
  );
}

DevForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
