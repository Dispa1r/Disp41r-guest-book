import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

function Transger(timeStamp){
     var timeStamp1 = new Date(timeStamp);//直接用 new Date(时间戳) 格式转化获得当前时间
     console.log(timeStamp1);
     var result = timeStamp1.toLocaleDateString().replace(/\//g, "-") + " " + timeStamp1.toTimeString().substr(0, 8);
     return result
}

function NearToInt(money){
  return Big(money).div(10 ** 24);
}

export default function Messages({ messages }) {
  return (
    <>
      <h2>Messages</h2>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : 'no-premium'}>
          <strong>{message.sender}</strong>   {Transger(((message.timeStamp-message.timeStamp%1000000)/1000000))} {(message.money/1000000000000000000000000).toFixed(2)}Ⓝ :<br/>
          {message.text}
          
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
