import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import api from '~/_services/api';

import DevItem from '~/components/DevItem';
import DevForm from '~/components/DevForm';

import { Container, Content, InputBlock } from './styles';

export default function Dashboard() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('/devs');
      setDevs(res.data);
    }
    loadDevs();
  }, []);
  async function handleAddDev(data, resetForm) {
    await api
      .post(`/devs`, { data })
      .then(resp => {
        toast.success(`Dev cadastrado com sucesso!`);
        resetForm();
        setDevs([...devs, resp.data]);
      })
      .catch(error => {
        const str = error.toString();
        const final = str.replace(/\D/g, '');

        if (final === '400') {
          toast.error('Campos inválidos!');
        }

        if (final === '401') {
          toast.error('User already exists');
        }

        if (final === '402') {
          toast.error(
            'Não foi possível adicionar o usuário como administrador do sistema!'
          );
        }

        if (final === '403') {
          toast.error('Não foi possível associar o usuário ao grupo!');
        }
      });
  }

  return (
    <Container>
      <aside>
        <Content>
          <span>Cadastrar Dev</span>
        </Content>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </Container>
  );
}
