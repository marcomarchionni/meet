import { Component } from 'react';

type AlertProps = {
  text: string;
};

class Alert extends Component<AlertProps> {
  color: string | undefined;
  className: string;
  constructor(props: AlertProps) {
    super(props);
    this.color = undefined;
    this.className = 'alert';
  }

  getStyle = (): React.CSSProperties | undefined => {
    return {
      color: this.color,
    };
  };

  render() {
    if (this.props.text === '') return <></>;
    return (
      <div className={this.className}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props: AlertProps) {
    super(props);
    this.color = 'var(--meet-darkgreen)';
    this.className = 'alert info-alert';
  }
}

class ErrorAlert extends Alert {
  constructor(props: AlertProps) {
    super(props);
    this.color = 'var(--meet-red)';
    this.className = 'alert error-alert';
  }
}

class WarnAlert extends Alert {
  constructor(props: AlertProps) {
    super(props);
    this.className = 'alert warning-alert';
  }
  getStyle = (): React.CSSProperties | undefined => {
    return {
      backgroundColor: 'var(--meet-orange)',
    };
  };
}

export { InfoAlert, ErrorAlert, WarnAlert };
