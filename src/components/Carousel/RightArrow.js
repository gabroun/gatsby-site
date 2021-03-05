import React from 'react';

class RightArrow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.89373 21.4818C9.74822 21.3366 9.63278 21.1642 9.55401 20.9744C9.47524 20.7845 9.43469 20.581 9.43469 20.3755C9.43469 20.17 9.47524 19.9665 9.55401 19.7767C9.63278 19.5868 9.74822 19.4144 9.89373 19.2693L18.1656 11.0005L9.89373 2.73176C9.74846 2.58648 9.63322 2.41402 9.5546 2.22421C9.47598 2.0344 9.43551 1.83096 9.43551 1.62551C9.43551 1.42006 9.47598 1.21662 9.5546 1.02681C9.63322 0.837 9.74846 0.664534 9.89373 0.519259C10.039 0.373984 10.2115 0.258746 10.4013 0.180124C10.5911 0.101502 10.7945 0.0610352 11 0.0610352C11.2054 0.0610352 11.4089 0.101502 11.5987 0.180124C11.7885 0.258746 11.961 0.373984 12.1062 0.519259L21.4812 9.89426C21.6267 10.0394 21.7422 10.2118 21.821 10.4017C21.8997 10.5915 21.9403 10.795 21.9403 11.0005C21.9403 11.206 21.8997 11.4095 21.821 11.5994C21.7422 11.7892 21.6267 11.9616 21.4812 12.1068L12.1062 21.4818C11.9611 21.6273 11.7887 21.7427 11.5988 21.8215C11.409 21.9003 11.2055 21.9408 11 21.9408C10.7945 21.9408 10.591 21.9003 10.4011 21.8215C10.2113 21.7427 10.0389 21.6273 9.89373 21.4818Z"
          fill={this.props.fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.0625 11C0.0625 10.5856 0.22712 10.1882 0.520146 9.89515C0.813172 9.60212 1.2106 9.4375 1.625 9.4375H17.25C17.6644 9.4375 18.0618 9.60212 18.3549 9.89515C18.6479 10.1882 18.8125 10.5856 18.8125 11C18.8125 11.4144 18.6479 11.8118 18.3549 12.1049C18.0618 12.3979 17.6644 12.5625 17.25 12.5625H1.625C1.2106 12.5625 0.813172 12.3979 0.520146 12.1049C0.22712 11.8118 0.0625 11.4144 0.0625 11Z"
          fill={this.props.fill}
        />
      </svg>
    );
  }
}

export default RightArrow;