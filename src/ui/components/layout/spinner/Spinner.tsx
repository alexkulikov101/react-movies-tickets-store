import React from 'react';
//import spinner from './spinner.gif';

import './Spinner.scss'

interface SpinnerProps {
  key?: number,
}

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => (

  <div className="loading">Loading&#8230;</div>

);

export default Spinner