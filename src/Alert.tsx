import { Component } from 'react';

type AlertProps = {
  text: string;
};

class Alert extends Component<AlertProps> {
  color: string | undefined;
  constructor(props: AlertProps) {
    super(props);
    this.color = undefined;
  }

  getStyle = (): React.CSSProperties | undefined => {
    return {
      color: this.color,
    };
  };

  render() {
    if (this.props.text === '') return <></>;
    return (
      <div className="alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props: AlertProps) {
    super(props);
    this.color = 'var(--meet-darkgreen)';
  }
}

class ErrorAlert extends Alert {
  constructor(props: AlertProps) {
    super(props);
    this.color = 'var(--meet-red)';
  }
}

export { InfoAlert, ErrorAlert };
