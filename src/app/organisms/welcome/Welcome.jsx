import React from 'react';
import './Welcome.scss';

import Text from '../../atoms/text/Text';

import ChatSvg from '../../../../public/res/svg/chat.svg';

function Welcome() {
  return (
    <div className="app-welcome flex--center">
      <div>
        <img className="app-welcome__logo noselect" src={ChatSvg} alt="Townhall" />
        <Text className="app-welcome__heading" variant="h1" weight="medium" primary>Lemonade Townhall</Text>
        <Text className="app-welcome__subheading" variant="s1">Powered by [matrix]</Text>
      </div>
    </div>
  );
}

export default Welcome;
