import React from 'react';
import PropTypes from 'prop-types';

import { Container, UserInfo } from './styles';

export default function DevItem({ dev }) {
  return (
    <Container>
      <header>
        <img
          src={
            dev.avatar_url ||
            'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt={dev.name}
        />
        <div>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil</a>
    </Container>
  );
}

DevItem.propTypes = {
  dev: PropTypes.object.isRequired,
};
